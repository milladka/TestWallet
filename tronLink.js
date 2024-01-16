// Example JavaScript test code using TronLink and TronIDE
const TronWeb = require('tronweb');
const contractAddress = "0xdcb30fc7c738441f946e9291cf967c23d8ccded9032141dda444b96b9e34aa01";
const contractAbi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_duration",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
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
        "name": "getCurrentDateTime",
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
        "name": "getCurrentTimeRatio",
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
        "name": "isOperationValid",
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
        "inputs": [],
        "name": "owner",
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
        "name": "performOperation",
        "outputs": [],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const tronWeb = TronWeb;

const contractInstance = tronWeb.contract(contractAbi, contractAddress);

const startTime = new tronWeb.BigNumber(1);
const expirationTime = new tronWeb.BigNumber(2);
const currentTime = new tronWeb.BigNumber(1);

// Call the CheckTimeRatio function
contractInstance.CheckTimeRatio(startTime, expirationTime, currentTime).send({
    shouldPollResponse: true,
}).then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(error);
});
