export const lnv3Bridge = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "tokenInfoKey",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "FeeIncomeClaimed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "version",
          "type": "uint8"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "transferIds",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "remoteChainId",
          "type": "uint256"
        }
      ],
      "name": "LiquidityWithdrawRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32[]",
          "name": "transferIds",
          "type": "bytes32[]"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "LiquidityWithdrawn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "remoteChainId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "sourceToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "targetToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "paused",
          "type": "bool"
        }
      ],
      "name": "LnProviderPaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "remoteChainId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "sourceToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "targetToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "baseFee",
          "type": "uint112"
        },
        {
          "indexed": false,
          "internalType": "uint16",
          "name": "liquidityfeeRate",
          "type": "uint16"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "transferLimit",
          "type": "uint112"
        }
      ],
      "name": "LnProviderUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "sourceToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "updatedPanaltyReserve",
          "type": "uint256"
        }
      ],
      "name": "PenaltyReserveUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "transferId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "remoteChainId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "sourceToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "targetToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "slasher",
          "type": "address"
        }
      ],
      "name": "SlashRequest",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "tokenInfoKey",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "protocolFee",
          "type": "uint112"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "penalty",
          "type": "uint112"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "sourceDecimals",
          "type": "uint112"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "targetDecimals",
          "type": "uint112"
        }
      ],
      "name": "TokenInfoUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "remoteChainId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "provider",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "sourceToken",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "targetToken",
              "type": "address"
            },
            {
              "internalType": "uint112",
              "name": "totalFee",
              "type": "uint112"
            },
            {
              "internalType": "uint112",
              "name": "amount",
              "type": "uint112"
            },
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "indexed": false,
          "internalType": "struct LnBridgeSourceV3.TransferParams",
          "name": "params",
          "type": "tuple"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "transferId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "targetAmount",
          "type": "uint112"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "fee",
          "type": "uint112"
        }
      ],
      "name": "TokenLocked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "key",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "remoteChainId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "sourceToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "targetToken",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "protocolFee",
          "type": "uint112"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "penalty",
          "type": "uint112"
        },
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "index",
          "type": "uint32"
        }
      ],
      "name": "TokenRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "transferId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        }
      ],
      "name": "TransferFilled",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "transferId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "provider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "slasher",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "slashAmount",
          "type": "uint112"
        }
      ],
      "name": "TransferSlashed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "transferId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "UnreachableNativeTokenReceived",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "LIQUIDITY_FEE_RATE_BASE",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "LOCK_STATUS_LOCKED",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "LOCK_STATUS_SLASHED",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "LOCK_STATUS_WITHDRAWN",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "LOCK_TIME_DISTANCE",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "MAX_TRANSFER_AMOUNT",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "SLASH_EXPIRE_TIME",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "acceptOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_tokenInfoKey",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_receiver",
          "type": "address"
        }
      ],
      "name": "claimProtocolFeeIncome",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "dao",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "key",
          "type": "bytes32"
        }
      ],
      "name": "deleteTokenInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sourceToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "depositPenaltyReserve",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_transferId",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "_provider",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_slasher",
          "type": "address"
        }
      ],
      "name": "encodeSlashRequest",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "message",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "_transferIds",
          "type": "bytes32[]"
        },
        {
          "internalType": "address",
          "name": "_provider",
          "type": "address"
        }
      ],
      "name": "encodeWithdrawLiquidityRequest",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "message",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "fillTransfers",
      "outputs": [
        {
          "internalType": "uint64",
          "name": "timestamp",
          "type": "uint64"
        },
        {
          "internalType": "address",
          "name": "provider",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_remoteChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_provider",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_sourceToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_targetToken",
          "type": "address"
        }
      ],
      "name": "getProviderKey",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sourceToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "provider",
          "type": "address"
        }
      ],
      "name": "getProviderStateKey",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_remoteChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_sourceToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_targetToken",
          "type": "address"
        }
      ],
      "name": "getTokenKey",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "remoteChainId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "provider",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "sourceToken",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "targetToken",
              "type": "address"
            },
            {
              "internalType": "uint112",
              "name": "totalFee",
              "type": "uint112"
            },
            {
              "internalType": "uint112",
              "name": "amount",
              "type": "uint112"
            },
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct LnBridgeSourceV3.TransferParams",
          "name": "_params",
          "type": "tuple"
        },
        {
          "internalType": "uint112",
          "name": "_remoteAmount",
          "type": "uint112"
        }
      ],
      "name": "getTransferId",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_dao",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "remoteChainId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "provider",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "sourceToken",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "targetToken",
              "type": "address"
            },
            {
              "internalType": "uint112",
              "name": "totalFee",
              "type": "uint112"
            },
            {
              "internalType": "uint112",
              "name": "amount",
              "type": "uint112"
            },
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct LnBridgeSourceV3.TransferParams",
          "name": "_params",
          "type": "tuple"
        }
      ],
      "name": "lockAndRemoteRelease",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "lockInfos",
      "outputs": [
        {
          "internalType": "uint112",
          "name": "amountWithFeeAndPenalty",
          "type": "uint112"
        },
        {
          "internalType": "uint32",
          "name": "tokenIndex",
          "type": "uint32"
        },
        {
          "internalType": "uint8",
          "name": "status",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "messagers",
      "outputs": [
        {
          "internalType": "address",
          "name": "sendService",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiveService",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "operator",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "penaltyReserves",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pendingDao",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_remoteChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_sourceToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_targetToken",
          "type": "address"
        }
      ],
      "name": "providerPause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_remoteChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_sourceToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_targetToken",
          "type": "address"
        }
      ],
      "name": "providerUnpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_remoteChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_sourceToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_targetToken",
          "type": "address"
        },
        {
          "internalType": "uint112",
          "name": "_baseFee",
          "type": "uint112"
        },
        {
          "internalType": "uint16",
          "name": "_liquidityFeeRate",
          "type": "uint16"
        },
        {
          "internalType": "uint112",
          "name": "_transferLimit",
          "type": "uint112"
        }
      ],
      "name": "registerLnProvider",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_remoteChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_sourceToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_targetToken",
          "type": "address"
        },
        {
          "internalType": "uint112",
          "name": "_protocolFee",
          "type": "uint112"
        },
        {
          "internalType": "uint112",
          "name": "_penalty",
          "type": "uint112"
        },
        {
          "internalType": "uint8",
          "name": "_sourceDecimals",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "_targetDecimals",
          "type": "uint8"
        },
        {
          "internalType": "uint32",
          "name": "_index",
          "type": "uint32"
        }
      ],
      "name": "registerTokenInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "remoteChainId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "provider",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "sourceToken",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "targetToken",
              "type": "address"
            },
            {
              "internalType": "uint112",
              "name": "sourceAmount",
              "type": "uint112"
            },
            {
              "internalType": "uint112",
              "name": "targetAmount",
              "type": "uint112"
            },
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct LnBridgeTargetV3.RelayParams",
          "name": "_params",
          "type": "tuple"
        },
        {
          "internalType": "bytes32",
          "name": "_expectedTransferId",
          "type": "bytes32"
        },
        {
          "internalType": "bool",
          "name": "_relayBySelf",
          "type": "bool"
        }
      ],
      "name": "relay",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "remoteChainId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "provider",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "sourceToken",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "targetToken",
              "type": "address"
            },
            {
              "internalType": "uint112",
              "name": "sourceAmount",
              "type": "uint112"
            },
            {
              "internalType": "uint112",
              "name": "targetAmount",
              "type": "uint112"
            },
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct LnBridgeTargetV3.RelayParams",
          "name": "_params",
          "type": "tuple"
        },
        {
          "internalType": "bytes32",
          "name": "_expectedTransferId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "_feePrepaid",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_extParams",
          "type": "bytes"
        }
      ],
      "name": "requestSlashAndRemoteRelease",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_remoteChainId",
          "type": "uint256"
        },
        {
          "internalType": "bytes32[]",
          "name": "_transferIds",
          "type": "bytes32[]"
        },
        {
          "internalType": "address",
          "name": "_provider",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "_extParams",
          "type": "bytes"
        }
      ],
      "name": "requestWithdrawLiquidity",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "transferId",
          "type": "bytes32"
        },
        {
          "internalType": "bytes",
          "name": "_extParams",
          "type": "bytes"
        }
      ],
      "name": "retrySlash",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_operator",
          "type": "address"
        }
      ],
      "name": "setOperator",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_remoteChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_remoteBridge",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_service",
          "type": "address"
        }
      ],
      "name": "setReceiveService",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_remoteChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_remoteBridge",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_service",
          "type": "address"
        }
      ],
      "name": "setSendService",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_remoteChainId",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "_transferId",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "_lnProvider",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_slasher",
          "type": "address"
        }
      ],
      "name": "slash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "slashInfos",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "remoteChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "slasher",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "srcProviders",
      "outputs": [
        {
          "internalType": "uint112",
          "name": "baseFee",
          "type": "uint112"
        },
        {
          "internalType": "uint16",
          "name": "liquidityFeeRate",
          "type": "uint16"
        },
        {
          "internalType": "uint112",
          "name": "transferLimit",
          "type": "uint112"
        },
        {
          "internalType": "bool",
          "name": "pause",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "",
          "type": "uint32"
        }
      ],
      "name": "tokenIndexer",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "tokenInfos",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint112",
              "name": "protocolFee",
              "type": "uint112"
            },
            {
              "internalType": "uint112",
              "name": "penalty",
              "type": "uint112"
            },
            {
              "internalType": "uint8",
              "name": "sourceDecimals",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "targetDecimals",
              "type": "uint8"
            }
          ],
          "internalType": "struct LnBridgeSourceV3.TokenConfigure",
          "name": "config",
          "type": "tuple"
        },
        {
          "internalType": "uint32",
          "name": "index",
          "type": "uint32"
        },
        {
          "internalType": "address",
          "name": "sourceToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "targetToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "protocolFeeIncome",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_remoteChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_provider",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_sourceToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_targetToken",
          "type": "address"
        },
        {
          "internalType": "uint112",
          "name": "_amount",
          "type": "uint112"
        }
      ],
      "name": "totalFee",
      "outputs": [
        {
          "internalType": "uint112",
          "name": "",
          "type": "uint112"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_dao",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_remoteChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_sourceToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_targetToken",
          "type": "address"
        },
        {
          "internalType": "uint112",
          "name": "_protocolFee",
          "type": "uint112"
        },
        {
          "internalType": "uint112",
          "name": "_penalty",
          "type": "uint112"
        },
        {
          "internalType": "uint8",
          "name": "_sourceDecimals",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "_targetDecimals",
          "type": "uint8"
        }
      ],
      "name": "updateTokenInfo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "_transferIds",
          "type": "bytes32[]"
        },
        {
          "internalType": "uint256",
          "name": "_remoteChainId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_provider",
          "type": "address"
        }
      ],
      "name": "withdrawLiquidity",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_sourceToken",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawPenaltyReserve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
];
