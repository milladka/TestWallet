// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract AssemblyError {
    function yul_revert(uint x) public pure {
        assembly {
            if gt(x, 10) {
                revert(0, 0)
            }
        }
    }
}
