export const lnDefaultTargetBridge = [
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
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint64",
          "name": "withdrawNonce",
          "type": "uint64"
        }
      ],
      "name": "MarginUpdated",
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
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "margin",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "slasher",
          "type": "address"
        }
      ],
      "name": "Slash",
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
          "name": "token",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "SlashReserveUpdated",
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
          "internalType": "bytes32",
          "name": "transferId",
          "type": "bytes32"
        }
      ],
      "name": "TransferFilled",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "INIT_SLASH_TRANSFER_ID",
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
      "inputs": [],
      "name": "MIN_SLASH_TIMESTAMP",
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
      "inputs": [
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
          "name": "margin",
          "type": "uint256"
        }
      ],
      "name": "depositProviderMargin",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
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
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "depositSlashFundReserve",
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
      "name": "fillTransfers",
      "outputs": [
        {
          "internalType": "uint64",
          "name": "timestamp",
          "type": "uint64"
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
        }
      ],
      "name": "getDefaultProviderKey",
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
          "name": "provider",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "sourceToken",
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
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "lnProviderInfos",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "margin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "slashReserveFund",
          "type": "uint256"
        },
        {
          "internalType": "uint64",
          "name": "lastExpireFillTime",
          "type": "uint64"
        },
        {
          "internalType": "uint64",
          "name": "withdrawNonce",
          "type": "uint64"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "previousTransferId",
              "type": "bytes32"
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
              "name": "amount",
              "type": "uint112"
            },
            {
              "internalType": "uint64",
              "name": "timestamp",
              "type": "uint64"
            },
            {
              "internalType": "address",
              "name": "receiver",
              "type": "address"
            }
          ],
          "internalType": "struct LnBridgeHelper.TransferParameter",
          "name": "params",
          "type": "tuple"
        },
        {
          "internalType": "bytes32",
          "name": "expectedTransferId",
          "type": "bytes32"
        }
      ],
      "name": "transferAndReleaseMargin",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
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
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawSlashFundReserve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];
