import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";

export interface ChainConfigInfo {
  name: string;
  rpc: string;
  fixedGasPrice: number;
}

export interface ProviderInfo {
  fromAddress: string;
  toAddress: string;
  srcDecimals: number;
  feeLimit: number;
}

export interface BridgeConfigInfo {
  fromChain: string;
  toChain: string;
  sourceBridgeAddress: string;
  targetBridgeAddress: string;
  encryptedPrivateKey: string;
  direction: string;
  providers: ProviderInfo[];
}

export interface ConfigInfo {
  indexer: string;
  chains: ChainConfigInfo[];
  bridges: BridgeConfigInfo[];
}

@Injectable()
export class ConfigureService {
  private readonly configPath =
    this.configService.get<string>("LP_BRIDGE_PATH");
  public readonly config: ConfigInfo = JSON.parse(
    fs.readFileSync(this.configPath, "utf8")
  );
  constructor(private configService: ConfigService) {}
}
