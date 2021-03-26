const contract_addr = '0x80aCD4a9043B46A29d8A7E0F13dDc11A3d0a63DE'
const contract_abi = [
  {
    "inputs": [],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "GameResult",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "FinishedGames",
    "outputs": [
      {
        "internalType": "enum SlotMachine.State",
        "name": "state",
        "type": "uint8"
      },
      {
        "internalType": "address payable",
        "name": "playerAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "playerBetAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "time",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "prizeMoney",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "result",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "closeContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fundCasino",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCasinoBalance",
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
    "name": "getContractBalance",
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
    "name": "getFinishedGames",
    "outputs": [
      {
        "components": [
          {
            "internalType": "enum SlotMachine.State",
            "name": "state",
            "type": "uint8"
          },
          {
            "internalType": "address payable",
            "name": "playerAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "playerBetAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "uint256[3][3]",
            "name": "slotsState",
            "type": "uint256[3][3]"
          },
          {
            "internalType": "uint256",
            "name": "prizeMoney",
            "type": "uint256"
          },
          {
            "internalType": "string[]",
            "name": "linesWon",
            "type": "string[]"
          },
          {
            "internalType": "string",
            "name": "result",
            "type": "string"
          }
        ],
        "internalType": "struct SlotMachine.Game[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getGames",
    "outputs": [
      {
        "components": [
          {
            "internalType": "enum SlotMachine.State",
            "name": "state",
            "type": "uint8"
          },
          {
            "internalType": "address payable",
            "name": "playerAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "playerBetAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "uint256[3][3]",
            "name": "slotsState",
            "type": "uint256[3][3]"
          },
          {
            "internalType": "uint256",
            "name": "prizeMoney",
            "type": "uint256"
          },
          {
            "internalType": "string[]",
            "name": "linesWon",
            "type": "string[]"
          },
          {
            "internalType": "string",
            "name": "result",
            "type": "string"
          }
        ],
        "internalType": "struct SlotMachine.Game[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getHistory",
    "outputs": [
      {
        "components": [
          {
            "internalType": "enum SlotMachine.State",
            "name": "state",
            "type": "uint8"
          },
          {
            "internalType": "address payable",
            "name": "playerAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "playerBetAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "uint256[3][3]",
            "name": "slotsState",
            "type": "uint256[3][3]"
          },
          {
            "internalType": "uint256",
            "name": "prizeMoney",
            "type": "uint256"
          },
          {
            "internalType": "string[]",
            "name": "linesWon",
            "type": "string[]"
          },
          {
            "internalType": "string",
            "name": "result",
            "type": "string"
          }
        ],
        "internalType": "struct SlotMachine.Game[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLinesWon",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getOwnerAddress",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPrizeMoney",
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
    "name": "getResults",
    "outputs": [
      {
        "components": [
          {
            "internalType": "enum SlotMachine.State",
            "name": "state",
            "type": "uint8"
          },
          {
            "internalType": "address payable",
            "name": "playerAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "playerBetAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "uint256[3][3]",
            "name": "slotsState",
            "type": "uint256[3][3]"
          },
          {
            "internalType": "uint256",
            "name": "prizeMoney",
            "type": "uint256"
          },
          {
            "internalType": "string[]",
            "name": "linesWon",
            "type": "string[]"
          },
          {
            "internalType": "string",
            "name": "result",
            "type": "string"
          }
        ],
        "internalType": "struct SlotMachine.Game",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRow1",
    "outputs": [
      {
        "internalType": "uint256[3]",
        "name": "",
        "type": "uint256[3]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRow2",
    "outputs": [
      {
        "internalType": "uint256[3]",
        "name": "",
        "type": "uint256[3]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRow3",
    "outputs": [
      {
        "internalType": "uint256[3]",
        "name": "",
        "type": "uint256[3]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getSlots",
    "outputs": [
      {
        "internalType": "uint256[3][3]",
        "name": "",
        "type": "uint256[3][3]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "playerBet",
    "outputs": [],
    "stateMutability": "payable",
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
    "name": "symbolWorth",
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
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawCasinoFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

module.exports = { contract_abi, contract_addr };
