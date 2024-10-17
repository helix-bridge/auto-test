import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HelixChainConf } from "@helixbridge/helixconf";
import { BaseConfigure, BaseConfigService } from "./base.service";
import * as fs from "fs";

export interface RpcNode {
  name: string;
  rpc: string;
  maxGasPrice: number;
  chainId: number;
  fixedGasPrice: number;
  notSupport1559: boolean;
}

export interface TokenInfo {
  symbol: string;
  feeLimit: number;
  minAmount: number;
  maxAmount: number;
}

export interface BridgeInfo {
  direction: string;
  encryptedPrivateKey: string;
  bridgeType: string;
  tokens: TokenInfo[];
}

export interface ConfigInfo {
  env: string;
  indexer: string;
  relayGasLimit: number;
  rpcnodes: RpcNode[];
  bridges: BridgeInfo[];
}

@Injectable()
export class ConfigureService {
  private readonly configPath =
    this.configService.get<string>("LP_BRIDGE_PATH");
  public readonly storePath = this.configService.get<string>(
    "LP_BRIDGE_STORE_PATH"
  );
  public config: ConfigInfo = JSON.parse(
    fs.readFileSync(this.configPath, "utf8")
  );
  public baseConfig: BaseConfigure;
  constructor(
    private configService: ConfigService,
    private baseService: BaseConfigService
  ) {
    this.baseConfig = this.baseService.baseConfigure(
      this.config.env === "test"
    );
  }

  public getChainInfo(name: string): HelixChainConf | null {
    return this.baseConfig.chains.find((chain) => chain.code === name);
  }

  public getMessagerAddress(
    chainName: string,
    channelName: string
  ): string | null {
    const chain = this.getChainInfo(chainName);
    if (chain === null) return null;
    return chain.messagers.find((messager) => messager.name === channelName)
      ?.address;
  }

  get indexer(): string {
    return this.config.indexer ?? this.baseConfig.indexer;
  }

  get supportedChains(): string[] {
    return this.baseConfig.chains.map((item) => item.code);
  }
}

