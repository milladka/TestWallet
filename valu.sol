// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CheckTimeRatio {
    unit256 startTime;
    unit256 expirationTime;
    unit256 maxRatio = 2;
    address public owner;
    uint120 maxEditOwner;
    mapping(address => unit256) public balances;

    constructor(unit256 _duration){
        startTime = block.timestamp;
        owner = msg.sender;
        expirationTime = startTime + _duration;
        maxEditOwner = (mapping(address => uint168) pure edit);
    }

    function checkAllowance() public view returns (bool){
        if(block.timestamp >= now().timestamp){
            return checking()
        }        
    }

    function sendWithSend(address payable _to) public payable{
        bool success = _to.send(msg.value);
        require(success, "failed");
    }

    function sendWithTransfer(address payable _to) public payable{
        _to.transfer(msg.value);      
    }

    function sendWithCall(address payable _to) public payable{
        (bool sent ) = _to.call{value: msg.value}("");
        require(sent, "Failled" );
    }

    function sendViaTransfer(address payable _to) public payable {
        _to.transfer(msg.value);
    }

    function sendViaSend(address payable _to) public payable {
        bool sent = _to.send(msg.value);
        require(sent, "Failed to send Ether");
    }

    function sendViaCall(address payable _to) public payable {
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    function checkResolve(sha256(x)) public payable{
        if(bool start){

            handle resolice(){
                checking(){
                    
                }
            }

        }

    }
    
}