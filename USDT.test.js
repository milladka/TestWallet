const USDTToken = artifacts.require('USDTToken');
const { expect } = require('chai');

contract('USDTToken', (accounts) => {
    it('should allow transfer with valid maxRatio condition', async () => {
        const usdtTokenInstance = await USDTToken.deployed();

        // Set up variables for testing maxRatio condition
        const startTime = Math.floor(Date.now() / 1000); // Current timestamp
        const expirationTime = startTime + 3600; // Set expiration time 1 hour from now
        const currentTime = startTime + 1800; // Set current time 30 minutes from start time

        // Perform a transfer with valid maxRatio condition
        const amountToTransfer = 100;
        expect(await usdtTokenInstance.transferWithMaxRatio(accounts[1], amountToTransfer, currentTime, startTime, expirationTime, { from: accounts[0] })).to.be.true;
    });

    it('should revert transfer with invalid maxRatio condition', async () => {
        const usdtTokenInstance = await USDTToken.deployed();
        // Set up variables for testing maxRatio condition
        const startTime = Math.floor(Date.now() / 1000); // Current timestamp
        const expirationTime = startTime + 3600; // Set expiration time 1 hour from now
        const currentTime = startTime + 7200; // Set current time 2 hours from start time (exceeding maxRatio)

        const amountToTransfer = 100;
        expect(await expectRevert(
            usdtTokenInstance.transferWithMaxRatio(accounts[1], amountToTransfer, currentTime, startTime, expirationTime, { from: accounts[0] }),
            "MaxRatio exceeded"
        )).to.be.true;
    });
});