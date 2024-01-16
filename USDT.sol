// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDTToken is ERC20 {
    address public owner;

    constructor() ERC20("USDT Token", "USDT") {
        owner = msg.sender;
        _mint(msg.sender, 1000000 * 10 ** 18); // Mint initial supply (1,000,000 USDT)
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }
}
