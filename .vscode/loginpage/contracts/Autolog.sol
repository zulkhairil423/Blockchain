// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract CarDataStorage{
    //buat data kereta identified by no plate
    mapping(string => string[]) public carData; 

    //input data into the plate number
    function updateCar (string memory plateNo, string memory carDetails) public {
        carData[plateNo].push(carDetails);
    }

    //print data for the plate number
    function viewCar (string memory plateNo) public view returns (string[] memory) {
        return carData[plateNo];
    }

    constructor(){



    //set some default for testing
        updateCar("TEST123", "The front part of the car is to be replaced due to severe damage.");
        updateCar("TEST123", "The engine belt was changed.");
        
        updateCar("LOOT123", "The back glass is broken, need change.");
        
        updateCar("ZUL123", "Driver door is missing, need replacement.");
    }
}