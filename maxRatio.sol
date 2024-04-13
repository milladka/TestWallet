// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CheckTimeRatio {
    uint256 startTime;
    uint256 expirationTime;
    uint256 maxRatio = 2;
    address public owner;
    mapping(address => uint256) public balances;

    constructor(uint256 _duration) {
        // Set the start time to the current block timestamp
        startTime = block.timestamp;
        owner = msg.sender;
        // Calculate the expiration time based on the duration
        expirationTime = startTime + _duration;
    }

    function isOperationValid() public view returns (bool) {
        // Check if the current time is within the valid time window
        return
            block.timestamp >= startTime && block.timestamp <= expirationTime;
    }

    function getCurrentDateTime() public view returns (uint256) {
        return block.timestamp;
    }

    function transferTokens(address to, uint256 amount) public {
        // Check conditions before allowing the transfer
        require(msg.sender == owner, "Only the owner can initiate transfers");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(to != address(0), "Invalid recipient address");
        // Your additional conditions go here...
        // For example, you can check if the amount is within a certain limit.
        // If all conditions are met, proceed with the transfer
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function performOperation() public view {
        // Check if the current time ratio exceeds the maximum allowed ratio
        require(getCurrentTimeRatio() <= maxRatio, "MaxRatio exceeded");
        // Your logic for the operation if the condition is met
        // If the condition is not met, the require statement above will revert the transaction
    }

    function getCurrentTimeRatio() public view returns (uint256) {
        // Calculate the current time ratio
        return (block.timestamp - startTime) / (expirationTime - startTime);
    }
}

// Truffle, Hardhat, and Remix are popular development tools for Solidity.