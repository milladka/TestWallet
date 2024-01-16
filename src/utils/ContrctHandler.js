const { Contract } = require("web3-eth-contract");
const { apiKey, contractAddress } = require("./config");

export const contractHandler = new Contract(apiKey, contractAddress, { provider: "https://d96f2d6fea88:9443" }); 