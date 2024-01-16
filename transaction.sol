// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./safeMath.sol";
import "./migration.sol";

contract Withdrawal {
    struct Owner {
        string ownerGuId;
        address addressOwner;
    }

    mapping(address => Owner) public userStructs;

    address[] public userAddress;

    address public owner;
    uint public last_completed_migration;
    int public amount;
    string public transaction_id;

    mapping(address => uint256) private _balances;

    constructor() {
        transaction_id = "";
    }

    function postMessage(int value) public {
        amount = value;
    }

    function getMessage() public view returns (int) {
        return amount;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }

    function setOwner(string memory id, address sendAddress) public {
        userStructs[msg.sender].ownerGuId = id;
        userStructs[msg.sender].addressOwner = sendAddress;
        userAddress.push(msg.sender);
    }

    function getResult() external view returns (address[] memory) {
        return userAddress;
    }

    function getAmountWithdraw() public view returns (string memory) {
        return transaction_id;
    }

    function setFill() public view returns (int) {
        return amount;
    }

    /**
     * @param to The address to transfer to.
     * @param value The amount to be transferred.
     */

    function transfer(address to, uint256 value) public returns (bool) {
        _transfer(msg.sender, to, value);
    }

    /**
     * @param from The address to transfer from.
     * @param to The address to transfer to.
     * @param value The amount to be transferred.
     */
    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0));
        require(from != address(0));
        transfer(to, value);
    }
}
