import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { TasksService } from "../tasks/tasks.service";
import axios from "axios";
import {
  Erc20Contract,
  LnBridgeSourceContract,
  DefaultSnapshot,
  OppositeSnapshot,
  zeroAddress,
} from "../base/contract";
import { Any, EtherBigNumber, Ether, GWei } from "../base/bignumber";
import {
  EthereumProvider,
  TransactionInfo,
  scaleBigger,
} from "../base/provider";
import { EthereumConnectedWallet } from "../base/wallet";
import { ConfigureService } from "../configure/configure.service";
import { Encrypto } from "../base/encrypto";
import { BigNumber } from "ethers";
import { last } from "lodash";

export class ChainInfo {
  chainName: string;
  rpc: string;
  native: string;
  provider: EthereumProvider;
  fixedGasPrice: number;
}

export class BridgeConnectInfo {
  chainInfo: ChainInfo;
  bridge: LnBridgeSourceContract;
}

export class LnProviderInfo {
  fromAddress: string;
  toAddress: string;
  srcDecimals: number;
}

export class LnBridge {
  isProcessing: boolean;
  fromBridge: BridgeConnectInfo;
  toChain: string;
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
    this.lnBridges.forEach((item, index) => {
      const fromChainName = item.fromBridge.chainInfo.chainName;
      this.taskService.addScheduleTask(
        `${fromChainName}-${item.toChain}-lnbridge-autotest`,
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
          if (item.randomExecTimes > 0) {
              item.randomExecTimes -= 1;
              return;
          }
          chainInfo.waitingPendingTimes = 100;
          chainInfo.isProcessing = true;
          item.randomExecTimes = Math.floor(Math.random() * 2400);
          this.logger.log(`[${fromChainName}->${item.toChain}]schedule send tx, next time ${item.randomExecTimes}`);
          try {
            await this.send(item);
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
        let fromBridge = new LnBridgeSourceContract(
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
                srcDecimals: lnProviderConfig.srcDecimals
            };
          });

        return {
          isProcessing: false,
          direction: config.direction,
          fromBridge: fromConnectInfo,
          toChain: config.toChain,
          lnProviders: lnProviders,
          walletAddress: fromWallet.address,
          randomExecTimes: Math.floor(Math.random() * 10),
        };
      })
      .filter((item) => item !== null);
  }

  async send(bridge: LnBridge) {
    this.logger.log("start to send cross chain tx");
    const fromChainInfo = bridge.fromBridge.chainInfo;
    const fromBridgeContract = bridge.fromBridge.bridge as LnBridgeSourceContract;

    const randomIndex = Math.floor(Math.random() * (bridge.lnProviders.length - 1) + 0.5);
    const lnProvider = bridge.lnProviders[randomIndex];
    const randomAmount = Math.floor(Math.random() * 1000);
    let amount = new Any(randomAmount, lnProvider.srcDecimals).Number;
    let value = BigNumber.from(0);
    if (lnProvider.fromAddress === zeroAddress) {
        amount = amount.div(1000000);
        value = amount;
    }
    let query = `{
        sortedLnv20RelayInfos(
            fromChain: \"${fromChainInfo.chainName}\",
            toChain: \"${bridge.toChain}\",
            bridge: \"lnbridgev20-${bridge.direction}\",
            token: \"${lnProvider.fromAddress.toLowerCase()}\",
            amount: \"${amount}\",
            decimals: ${lnProvider.srcDecimals},
        ) {baseFee, lastTransferId, liquidityFeeRate, margin, relayer, sendToken, withdrawNonce}}`;

        const sortedRelayers = await axios
        .post(this.configureService.config.indexer, {
            query,
            variables: {},
            operationName: null,
        })
        .then((res) => res.data.data.sortedLnv20RelayInfos);

        if (!sortedRelayers || sortedRelayers.length === 0) {
            return;
        }
        const relayerInfo = sortedRelayers[0];

        const snapshot = bridge.direction === 'default' ? {
            provider: relayerInfo.relayer,
            sourceToken: relayerInfo.sendToken,
            transferId: relayerInfo.lastTransferId,
            totalFee: amount.mul(BigNumber.from(relayerInfo.liquidityFeeRate)).add(BigNumber.from((relayerInfo.baseFee))),
            withdrawNonce: relayerInfo.withdrawNonce
        } as DefaultSnapshot : {
            provider: relayerInfo.relayer,
            sourceToken: relayerInfo.sendToken,
            transferId: relayerInfo.lastTransferId,
            depositedMargin: relayerInfo.margin,
            totalFee: amount.mul(BigNumber.from(relayerInfo.liquidityFeeRate)).add(BigNumber.from((relayerInfo.baseFee))),
        } as OppositeSnapshot;

        if (lnProvider.fromAddress === zeroAddress) {
            value = value.add(snapshot.totalFee);
        }
        let gasPrice = await fromChainInfo.provider.feeData(1);
        if (fromChainInfo.provider.gasPriceCompare(gasPrice, new GWei(10))) {
            return;
        }
        await fromBridgeContract.transferAndLockMargin(
            snapshot,
            amount,
            bridge.walletAddress,
            gasPrice,
            new EtherBigNumber(1000000).Number,
            value
        );
  }
}

