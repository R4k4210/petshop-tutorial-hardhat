// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract PetShop {
    address[16] public adopters;

    function adopt(uint256 _petId) public returns (uint256) {
        require(_petId >= 0 && _petId <= 15, "Invalid ID");

        adopters[_petId] = msg.sender;

        return _petId;
    }

    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }
}
