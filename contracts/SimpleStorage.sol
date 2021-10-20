// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract SimpleStorage {
  uint storedData;

  event setEvent(uint newValue);

  function set(uint x) public {
    storedData = x;
    emit setEvent(x);
  }

  function get() public view returns (uint) {
    return storedData;
  }
}