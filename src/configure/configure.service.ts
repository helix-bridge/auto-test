import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Chain, MessagerInfo, BaseConfigure, BaseConfigService } from "./base.service";
import * as fs from "fs";

export interface RpcNode {
  name: string;
  rpc: string;
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

  public getChainInfo(name: string): Chain | null {
    return this.baseConfig.chains.find((chain) => chain.name === name);
  }

  public getMessagerAddress(chainName: string, channelName: string): MessagerInfo | null {
      const chain = this.getChainInfo(chainName);
      if (chain === null) return null;
      return chain.messagers.find((messager) => messager.name === channelName);
  }

  get indexer(): string {
    return this.config.indexer ?? this.baseConfig.indexer;
  }

  get supportedChains(): string[] {
    return this.baseConfig.chains.map((item) => item.name);
  }
}

