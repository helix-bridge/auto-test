import {
  Wallet,
  HDNodeWallet,
  Contract,
  ContractInterface,
  ethers,
  InterfaceAbi
} from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { erc20 } from "../abi/erc20";
import { lnDefaultBridge } from "../abi/lnDefaultBridge";
import { lnOppositeBridge } from "../abi/lnOppositeBridge";
import { GasPrice } from "../base/provider";

export const zeroAddress: string = "0x0000000000000000000000000000000000000000";
export const zeroTransferId: string = "0x0000000000000000000000000000000000000000000000000000000000000000";

export class EthereumContract {
  protected contract: Contract;
  public address: string;
  constructor(
    address: string,
    abi: InterfaceAbi,
    signer: Wallet | HDNodeWallet | ethers.Provider
  ) {
    this.contract = new Contract(address, abi, signer);
    this.address = address;
  }

  async call(
    method: string,
    args: any,
    gas: GasPrice,
    value: bigint | null = null,
    nonce: number | null = null,
    gasLimit: bigint | null = null
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
    value: bigint | null = null,
    gasLimit: bigint | null = null
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
  constructor(address: string, signer: Wallet | HDNodeWallet | ethers.Provider) {
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

  async balanceOf(address: string): Promise<bigint> {
    return await this.contract.balanceOf(address);
  }

  // call
  async approve(
    address: string,
    amount: bigint,
    gas: GasPrice
  ): Promise<TransactionResponse> {
    return this.call("approve", [address, amount], gas, null, null, null);
  }
}

export interface DefaultSnapshot {
    remoteChainId: number;
    provider: string;
    sourceToken: string;
    targetToken: string;
    transferId: string;
    totalFee: bigint;
    withdrawNonce: number;
}

export interface OppositeSnapshot {
    remoteChainId: number;
    provider: string;
    sourceToken: string;
    targetToken: string;
    transferId: string;
    totalFee: bigint;
    depositedMargin: bigint;
}

export class LnBridgeContract extends EthereumContract {
    private bridgeType: string;
    constructor(address: string, signer: Wallet | HDNodeWallet | ethers.Provider, bridgeType: string) {
      if (bridgeType === 'default') {
        super(address, lnDefaultBridge, signer);
      } else {
        super(address, lnOppositeBridge, signer);
      }
      this.bridgeType = bridgeType;
    }

    async transferAndLockMargin(
        snapshot: DefaultSnapshot | OppositeSnapshot,
        amount: bigint,
        receiver: string,
        gas: GasPrice,
        gasLimit: bigint | null = null,
        value: bigint = BigInt(0)
    ) {
        if (this.bridgeType === 'default') {
            const defaultSnapshot = snapshot as DefaultSnapshot;
            return await this.call(
                "transferAndLockMargin",
                [
                    [
                       defaultSnapshot.remoteChainId,
                       defaultSnapshot.provider,
                       defaultSnapshot.sourceToken,
                       defaultSnapshot.targetToken,
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
                       oppositeSnapshot.remoteChainId,
                       oppositeSnapshot.provider,
                       oppositeSnapshot.sourceToken,
                       oppositeSnapshot.targetToken,
                       oppositeSnapshot.transferId,
                       oppositeSnapshot.totalFee,
                       oppositeSnapshot.depositedMargin,
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

