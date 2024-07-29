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
import {
  EthereumProvider,
} from "../base/provider";
import { EthereumConnectedWallet } from "../base/wallet";
import { ConfigureService } from "../configure/configure.service";
import { Encrypto } from "../base/encrypto";

export class ChainInfo {
  chainName: string;
  rpc: string;
  native: string;
  provider: EthereumProvider;
  fixedGasPrice: number;
}

export class BridgeConnectInfo {
  chainInfo: ChainInfo;
  bridge: LnBridgeContract | Lnv3BridgeContract;
}

export class LnProviderInfo {
  fromAddress: string;
  toAddress: string;
  feeLimit: number;
  fromToken: Erc20Contract;
}

export class LnBridge {
  isProcessing: boolean;
  fromBridge: BridgeConnectInfo;
  toChain: string;
  toChainId: number;
  direction: string;
  lnProviders: LnProviderInfo[];
  walletAddress: string;
  randomExecTimes: number;
}

@Injectable()
export class TesterService implements OnModuleInit {
  private readonly logger = new Logger("tester");
  // called one hour
  private readonly scheduleInterval = 3000;
  private chainInfos = new Map();
  private lnBridges: LnBridge[];

  constructor(
    protected taskService: TasksService,
    protected configureService: ConfigureService
  ) {}

  // the target chain should not be conflict
  async onModuleInit() {
    this.logger.log("autotest service start");
    this.initConfigure();
    this.lnBridges.forEach((targetBridge, index) => {
      const fromChainName = targetBridge.fromBridge.chainInfo.chainName;
      this.taskService.addScheduleTask(
        `${fromChainName}-${targetBridge.toChain}-lnbridge-autotest`,
        this.scheduleInterval,
        async () => {
          const chainInfo = this.chainInfos.get(fromChainName);
          if (chainInfo.isProcessing) {
            return;
          }
          if (chainInfo.waitingPendingTimes > 0) {
            chainInfo.waitingPendingTimes -= 1;
            return;
          }
          if (targetBridge.randomExecTimes > 0) {
              targetBridge.randomExecTimes -= 1;
              return;
          }
          chainInfo.waitingPendingTimes = 100;
          chainInfo.isProcessing = true;
          targetBridge.randomExecTimes = Math.floor(Math.random() * 4800);
          this.logger.log(`[${fromChainName}->${targetBridge.toChain}]schedule send tx, next time ${targetBridge.randomExecTimes}`);
          try {
            await this.requestBridge(targetBridge);
          } catch (err) {
            this.logger.warn(`send bridge message failed, err: ${err}`);
          }
          chainInfo.isProcessing = false;
        }
      );
    });
  }

  async initConfigure() {
    const e = new Encrypto();
    e.readPasswd();

    this.chainInfos = new Map(
      this.configureService.config.chains.map((config) => {
        return [
          config.name,
          {
            chainName: config.name,
            chainId: config.chainId,
            rpc: config.rpc,
            provider: new EthereumProvider(config.rpc),
            fixedGasPrice: config.fixedGasPrice,
            isProcessing: false,
            waitingPendingTimes: 0,
          },
        ];
      })
    );
    this.lnBridges = this.configureService.config.bridges
      .map((config) => {
        let toChainInfo = this.chainInfos.get(config.toChain);
        if (!toChainInfo) {
          this.logger.error(`to chain is not configured ${config.toChain}`);
          return null;
        }
        let fromChainInfo = this.chainInfos.get(config.fromChain);
        if (!fromChainInfo) {
          this.logger.error(`to chain is not configured ${config.fromChain}`);
          return null;
        }
        const privateKey = e.decrypt(config.encryptedPrivateKey);
        let fromWallet = new EthereumConnectedWallet(
          privateKey,
          fromChainInfo.provider
        );
        let fromBridge = config.direction === 'lnv3' ? new Lnv3BridgeContract(
            config.sourceBridgeAddress,
            fromWallet.wallet
        ) : new LnBridgeContract(
          config.sourceBridgeAddress,
          fromWallet.wallet,
          config.direction
        );
        let fromConnectInfo = {
          chainInfo: fromChainInfo,
          bridge: fromBridge,
        };
        let lnProviders = config.providers
          .map((lnProviderConfig) => {
            return {
                fromAddress: lnProviderConfig.fromAddress,
                toAddress: lnProviderConfig.toAddress,
                feeLimit: lnProviderConfig.feeLimit,
                fromToken: new Erc20Contract(lnProviderConfig.fromAddress, fromWallet.wallet),
            };
          });

        return {
          isProcessing: false,
          direction: config.direction,
          fromBridge: fromConnectInfo,
          toChain: config.toChain,
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
    const randomAmount = Math.floor(Math.random() * 1000);
    let srcDecimals = 18;
    if (lnProvider.fromAddress !== zeroAddress) {
        srcDecimals = await lnProvider.fromToken.decimals();
    }
    let amount = new Any(randomAmount, srcDecimals).Number;
    let value = BigInt(0);
    if (lnProvider.fromAddress === zeroAddress) {
        amount = amount / BigInt(1000000);
        value = amount;
    }
    let query = `{
        sortedLnBridgeRelayInfos(
            fromChain: \"${fromChainInfo.chainName}\",
            toChain: \"${bridge.toChain}\",
            bridge: \"lnv2-${bridge.direction}\",
            token: \"${lnProvider.fromAddress.toLowerCase()}\",
            amount: \"${amount}\",
            decimals: ${srcDecimals},
        ) {records {baseFee, protocolFee, lastTransferId, liquidityFeeRate, margin, relayer, sendToken, withdrawNonce}}}`;

    console.log(`query`);

        const sortedRelayers = await axios
        .post(this.configureService.config.indexer, {
            query,
            variables: {},
            operationName: null,
        })
        .then((res) => res.data.data.sortedLnBridgeRelayInfos.records);

        if (!sortedRelayers || sortedRelayers.length === 0) {
            this.logger.log(`no relayers available on ${bridge.fromBridge.chainInfo.chainName} to ${bridge.toChain}`);
            return;
        }
        const relayerInfo = sortedRelayers[0];
        const baseFee = BigInt(relayerInfo.baseFee);
        const protocolFee = BigInt(relayerInfo.protocolFee);
        const totalFee = amount * BigInt(relayerInfo.liquidityFeeRate) / BigInt(100000) + baseFee + protocolFee;

        const snapshot = bridge.direction === 'default' ? {
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
        let gasPrice = await fromChainInfo.provider.feeData(1);
        if (fromChainInfo.provider.gasPriceCompare(gasPrice, new GWei(100))) {
            this.logger.log(`[${fromChainInfo.chainName}]gas price too large ${fromChainInfo.provider.gasPriceValue(gasPrice)}`);
            return;
        }
        this.logger.log("all request parameters checked [OK], start to send test transaction");
        if (bridge.direction === 'lnv3') {
          await (fromBridgeContract as Lnv3BridgeContract).transferAndLockMargin(
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
        } else {
          await (fromBridgeContract as LnBridgeContract).transferAndLockMargin(
              snapshot,
              amount,
              bridge.walletAddress,
              gasPrice,
              null,
              value
          );
        }
        this.logger.log("send transaction finished");
  }
}

