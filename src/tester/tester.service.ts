import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { TasksService } from "../tasks/tasks.service";
import axios from "axios";
import {
  Erc20Contract,
  LnBridgeContract,
  Lnv3BridgeContract,
  DefaultSnapshot,
  OppositeSnapshot,
  zeroAddress,
} from "../base/contract";
import { Any, GWei } from "../base/bignumber";
import { EthereumProvider } from "../base/provider";
import { EthereumConnectedWallet } from "../base/wallet";
import { ConfigureService } from "../configure/configure.service";
import { Encrypto } from "../base/encrypto";

export class ChainInfo {
  chainName: string;
  rpc: string;
  chainId: number;
  provider: EthereumProvider;
  fixedGasPrice: number;
  notSupport1559: boolean;
  lnv2DefaultAddress: string;
  lnv2OppositeAddress: string;
  lnv3Address: string;
}

export class BridgeConnectInfo {
  chainInfo: ChainInfo;
  bridge: LnBridgeContract | Lnv3BridgeContract;
}

export class LnProviderInfo {
  fromAddress: string;
  toAddress: string;
  feeLimit: number;
  maxAmount: number;
  minAmount: number;
  fromToken: Erc20Contract;
}

export class LnBridge {
  fromBridge: BridgeConnectInfo;
  toChain: string;
  toChainId: number;
  bridgeType: string;
  lnProviders: LnProviderInfo[];
  walletAddress: string;
  randomExecTimes: number;
}

@Injectable()
export class TesterService implements OnModuleInit {
  private readonly logger = new Logger("tester");
  private readonly scheduleInterval = 3000;
  private chainInfos = new Map();
  private lnBridges: LnBridge[];
  private timersMap = new Map();

  constructor(
    protected taskService: TasksService,
    protected configureService: ConfigureService
  ) {}

  // the target chain should not be conflict
  async onModuleInit() {
    this.logger.log("autotest service start");
    this.initConfigure();
    this.lnBridges.forEach((targetBridge, index) => {
      this.timersMap.set(index, {
        isProcessing: false
      });
      const fromChainName = targetBridge.fromBridge.chainInfo.chainName;
      this.taskService.addScheduleTask(
        `${fromChainName}-${targetBridge.toChain}-lnbridge-autotest`,
        this.scheduleInterval,
        async () => {
          const chainInfo = this.chainInfos.get(fromChainName);
          const timer = this.timersMap.get(index);
          if (timer.isProcessing) {
            return;
          }
          if (chainInfo.waitIntervalsCount > 0) {
            chainInfo.waitIntervalsCount -= 1;
            return;
          }
          if (targetBridge.randomExecTimes > 0) {
              targetBridge.randomExecTimes -= 1;
              return;
          }
          chainInfo.waitIntervalsCount = 100;
          targetBridge.randomExecTimes = Math.floor(Math.random() * 4800);
          this.logger.log(`[${fromChainName}->${targetBridge.toChain}]schedule send tx, next time ${targetBridge.randomExecTimes}`);
          timer.isProcessing = true;
          try {
            await this.requestBridge(targetBridge);
          } catch (err) {
            this.logger.warn(`[${fromChainName}->${targetBridge.toChain}]send bridge message failed, err: ${err}`);
          }
          timer.isProcessing = false;
        }
      );
    });
  }

  async initConfigure() {
    const e = new Encrypto();
    e.readPasswd();

    this.chainInfos = new Map(
      this.configureService.config.rpcnodes.map((config) => {
        const chainInfo = this.configureService.getChainInfo(config.name);
        if (!chainInfo) {
          this.logger.error(
            `the chain ${config.name} not support, only support ${this.configureService.supportedChains}`
          );
          return null;
        }
        return [
          config.name,
          {
            chainName: config.name,
            rpc: config.rpc,
            chainId: config.chainId,
            provider: new EthereumProvider(config.rpc),
            fixedGasPrice: config.fixedGasPrice,
            notSupport1559: config.notSupport1559,
            lnv2DefaultAddress: chainInfo.lnv2DefaultAddress,
            lnv2OppositeAddress: chainInfo.lnv2OppositeAddress,
            lnv3Address: chainInfo.lnv3Address,
            tokens: chainInfo.tokens,
            waitIntervalsCount: 0,
          },
        ];
      })
    );
    this.lnBridges = this.configureService.config.bridges
      .map((config) => {
        const direction = config.direction?.split("->");
        if (direction?.length !== 2) {
          this.logger.error(`bridge direction invalid ${config.direction}`);
          return;
        }
        var [fromChain, toChain] = direction;
        let fromChainInfo = this.chainInfos.get(direction[0]);
        if (!fromChainInfo) {
          this.logger.error(`from chain is not invalid ${direction[0]}`);
          return null;
        }
        let toChainInfo = this.chainInfos.get(direction[1]);
        if (!toChainInfo) {
          this.logger.error(`to chain is not invalid ${direction[1]}`);
          return null;
        }

        const privateKey = e.decrypt(config.encryptedPrivateKey);

        let fromWallet = new EthereumConnectedWallet(
          privateKey,
          fromChainInfo.provider
        );
        let fromBridge =
          config.bridgeType == "lnv3"
            ? new Lnv3BridgeContract(
                fromChainInfo.lnv3Address,
                fromWallet.wallet
              )
            : new LnBridgeContract(
                config.bridgeType === "lnv2-default"
                  ? fromChainInfo.lnv2DefaultAddress
                  : fromChainInfo.lnv2OppositeAddress,
                fromWallet.wallet,
                config.bridgeType
              );
        let fromConnectInfo = {
          chainInfo: fromChainInfo,
          bridge: fromBridge,
          safeWallet: undefined,
        };
        let lnProviders = config.tokens
          .map((token) => {
            const symbols = token.symbol.split("->");
            if (symbols.length !== 2) {
              this.logger.error(`invalid token symbols ${token.symbol}`);
              return null;
            }
            const fromToken = fromChainInfo.tokens.find(
              (item) => item.symbol === symbols[0]
            );
            if (!fromToken) {
              this.logger.error(
                `[${fromChainInfo.chainName}]token not support ${
                  symbols[0]
                }, only support ${fromChainInfo.tokens.map(
                  (item) => item.symbol
                )}`
              );
              return null;
            }
            const toToken = toChainInfo.tokens.find(
              (item) => item.symbol === symbols[1]
            );
            if (!toToken) {
              this.logger.error(
                `[${toChainInfo.chainName}]token not support ${
                  symbols[1]
                }, only support ${toChainInfo.tokens.map(
                  (item) => item.symbol
                )}`
              );
              return null;
            }
            return {
              fromAddress: fromToken.address,
              toAddress: toToken.address,
              feeLimit: token.feeLimit,
              maxAmount: token.maxAmount,
              minAmount: token.minAmount,
              fromToken: new Erc20Contract(
                fromToken.address,
                fromWallet.wallet
              ),
            };
          })
          .filter((item) => item !== null);

        return {
          bridgeType: config.bridgeType,
          fromBridge: fromConnectInfo,
          toChain: toChainInfo.chainName,
          toChainId: toChainInfo.chainId,
          lnProviders: lnProviders,
          walletAddress: fromWallet.address,
          randomExecTimes: Math.floor(Math.random() * 10),
        };
      })
      .filter((item) => item !== null);
  }

  async requestBridge(bridge: LnBridge) {
    this.logger.log("start to send cross chain tx");
    const fromChainInfo = bridge.fromBridge.chainInfo;
    const fromBridgeContract = bridge.fromBridge.bridge;

    const randomIndex = Math.floor(Math.random() * (bridge.lnProviders.length - 1) + 0.5);
    const lnProvider = bridge.lnProviders[randomIndex];
    const randomAmount = Math.random() * (lnProvider.maxAmount - lnProvider.minAmount) + lnProvider.minAmount;
    let srcDecimals = 18;
    if (lnProvider.fromAddress !== zeroAddress) {
        srcDecimals = await lnProvider.fromToken.decimals();
    }
    const decimalPlaces = Math.floor(Math.random() * 6);
    const formattedAmount = Number((randomAmount/1000.0).toFixed(decimalPlaces)) * 1000;
    if (formattedAmount === 0) {
        return;
    }
    let amount = new Any(formattedAmount, srcDecimals).Number;
    let value = BigInt(0);
    if (lnProvider.fromAddress === zeroAddress) {
        value = amount;
    }
    let query = `{
        sortedLnBridgeRelayInfos(
            fromChain: \"${fromChainInfo.chainName}\",
            toChain: \"${bridge.toChain}\",
            bridge: \"${bridge.bridgeType}\",
            token: \"${lnProvider.fromAddress.toLowerCase()}\",
            amount: \"${amount}\",
            decimals: ${srcDecimals},
        ) {records {baseFee, protocolFee, lastTransferId, liquidityFeeRate, margin, relayer, sendToken, withdrawNonce}}}`;

        const sortedRelayers = await axios
        .post(this.configureService.config.indexer, {
            query,
            variables: {},
            operationName: null,
        })
        .then((res) => res.data.data.sortedLnBridgeRelayInfos.records);

        if (!sortedRelayers || sortedRelayers.length === 0) {
            this.logger.log(`no relayers available for ${bridge.fromBridge.chainInfo.chainName}->${bridge.toChain}`);
            return;
        }
        const relayerInfo = sortedRelayers[0];
        const baseFee = BigInt(relayerInfo.baseFee);
        const protocolFee = BigInt(relayerInfo.protocolFee);
        const totalFee = amount * BigInt(relayerInfo.liquidityFeeRate) / BigInt(100000) + baseFee + protocolFee;

        const snapshot = bridge.bridgeType === 'lnv2-default' ? {
            remoteChainId: bridge.toChainId,
            provider: relayerInfo.relayer,
            sourceToken: relayerInfo.sendToken,
            targetToken: lnProvider.toAddress,
            transferId: relayerInfo.lastTransferId,
            totalFee,
            withdrawNonce: relayerInfo.withdrawNonce
        } as DefaultSnapshot : {
            remoteChainId: bridge.toChainId,
            provider: relayerInfo.relayer,
            sourceToken: relayerInfo.sendToken,
            targetToken: lnProvider.toAddress,
            transferId: relayerInfo.lastTransferId,
            depositedMargin: relayerInfo.margin,
            totalFee,
        } as OppositeSnapshot;


        const feeLimit = new Any(lnProvider.feeLimit, srcDecimals).Number;
        if (snapshot.totalFee > feeLimit) {
            this.logger.log(`fee is too big ${snapshot.totalFee} > ${feeLimit}, token ${relayerInfo.sendToken}`);
            return;
        }

        if (lnProvider.fromAddress === zeroAddress) {
            value = value + snapshot.totalFee;
        }
        let gasPrice = fromChainInfo.fixedGasPrice !== undefined
            ? {
                isEip1559: false,
                fee: {
                    gasPrice: new GWei(fromChainInfo.fixedGasPrice).Number,
                },
                eip1559fee: null,
            }
            : await fromChainInfo.provider.feeData(1);
        if (fromChainInfo.provider.gasPriceCompare(gasPrice, new GWei(100))) {
            this.logger.log(`[${fromChainInfo.chainName}]gas price too large ${fromChainInfo.provider.gasPriceValue(gasPrice)}`);
            return;
        }
        this.logger.log(`[${fromChainInfo.chainName}->${bridge.toChain}]all request parameter checked, start to send test transaction`);
        if (bridge.bridgeType === 'lnv3') {
          const tx = await (fromBridgeContract as Lnv3BridgeContract).lockAndRemoteRelease(
              bridge.toChainId,
              relayerInfo.relayer,
              relayerInfo.sendToken,
              lnProvider.toAddress,
              totalFee,
              amount,
              bridge.walletAddress,
              gasPrice,
              null,
              value
          );
          this.logger.log(`Succeeded to send cross chain tx, hash: ${tx.hash}`);
        } else {
          const tx = await (fromBridgeContract as LnBridgeContract).transferAndLockMargin(
              snapshot,
              amount,
              bridge.walletAddress,
              gasPrice,
              null,
              value
          );
          this.logger.log(`Succeeded to send cross chain tx, hash: ${tx.hash}`);
        }
        this.logger.log("send transaction finished");
  }
}

