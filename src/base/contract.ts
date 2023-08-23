import {
  Wallet,
  providers,
  Contract,
  ContractInterface,
  BigNumber,
} from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { erc20 } from "../abi/erc20";
import { lnDefaultSourceBridge } from "../abi/lnDefaultSourceBridge";
import { lnDefaultTargetBridge } from "../abi/lnDefaultTargetBridge";
import { lnOppositeSourceBridge } from "../abi/lnOppositeSourceBridge";
import { lnOppositeTargetBridge } from "../abi/lnOppositeTargetBridge";
import { GasPrice } from "../base/provider";

export const zeroAddress: string = "0x0000000000000000000000000000000000000000";
export const zeroTransferId: string = "0x0000000000000000000000000000000000000000000000000000000000000000";

export class EthereumContract {
  protected contract: Contract;
  public address: string;
  constructor(
    address: string,
    abi: ContractInterface,
    signer: Wallet | providers.Provider
  ) {
    this.contract = new Contract(address, abi, signer);
    this.address = address;
  }

  async call(
    method: string,
    args: any,
    gas: GasPrice,
    value: BigNumber | null = null,
    nonce: number | null = null,
    gasLimit: BigNumber | null = null
  ): Promise<TransactionResponse> {
    const gasArgs = gas.isEip1559 ? gas.eip1559fee : gas.fee;
    const txConfig = Object.entries({
      ...gasArgs,
      value,
      nonce,
      gasLimit,
    }).reduce((c, [k, v]) => (v ? ((c[k] = v), c) : c), {});
    return await this.contract[method](...args, txConfig);
  }

  async staticCall(
    method: string,
    args: any,
    value: BigNumber | null = null,
    gasLimit: BigNumber | null = null
  ): Promise<string> | null {
    try {
      if (value != null) {
        args = [...args, { value: value }];
      }
      await this.contract.callStatic[method](...args);
      return null;
    } catch (error) {
      return error.message;
    }
  }
}

export class Erc20Contract extends EthereumContract {
  constructor(address: string, signer: Wallet | providers.Provider) {
    super(address, erc20, signer);
  }

  // view
  async symbol(): Promise<string> {
    return await this.contract.symbol();
  }

  async name(): Promise<string> {
    return await this.contract.name();
  }

  async decimals(): Promise<number> {
    return await this.contract.decimals();
  }

  async balanceOf(address: string): Promise<BigNumber> {
    return await this.contract.balanceOf(address);
  }

  // call
  async approve(
    address: string,
    amount: BigNumber,
    gas: GasPrice
  ): Promise<TransactionResponse> {
    return this.call("approve", [address, amount], gas, null, null, null);
  }
}

export interface DefaultSnapshot {
    provider: string;
    sourceToken: string;
    transferId: string;
    totalFee: BigNumber;
    withdrawNonce: number;
}

export interface OppositeSnapshot {
    provider: string;
    sourceToken: string;
    transferId: string;
    depositedMargin: BigNumber;
    totalFee: BigNumber;
}

export class LnBridgeSourceContract extends EthereumContract {
    private bridgeType: string;
    constructor(address: string, signer: Wallet | providers.Provider, bridgeType: string) {
      if (bridgeType === 'default') {
        super(address, lnDefaultSourceBridge, signer);
      } else {
        super(address, lnOppositeSourceBridge, signer);
      }
      this.bridgeType = bridgeType;
    }

    async transferAndLockMargin(
        snapshot: DefaultSnapshot | OppositeSnapshot,
        amount: BigNumber,
        receiver: string,
        gas: GasPrice,
        gasLimit: BigNumber | null = null,
        value: BigNumber = BigNumber.from(0)
    ) {
        if (this.bridgeType === 'default') {
            const defaultSnapshot = snapshot as DefaultSnapshot;
            return await this.call(
                "transferAndLockMargin",
                [
                    [
                       defaultSnapshot.provider,
                       defaultSnapshot.sourceToken,
                       defaultSnapshot.transferId,
                       defaultSnapshot.totalFee,
                       defaultSnapshot.withdrawNonce
                    ],
                    amount,
                    receiver,
                ],
                gas,
                value,
                null,
                gasLimit
            )
        } else {
            const oppositeSnapshot = snapshot as OppositeSnapshot;
            return await this.call(
                "transferAndLockMargin",
                [
                    [
                       oppositeSnapshot.provider,
                       oppositeSnapshot.sourceToken,
                       oppositeSnapshot.transferId,
                       oppositeSnapshot.depositedMargin,
                       oppositeSnapshot.totalFee
                    ],
                    amount,
                    receiver,
                ],
                gas,
                value,
                null,
                gasLimit
            );
        }
    }
}

