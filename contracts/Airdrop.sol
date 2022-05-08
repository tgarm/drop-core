// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Airdrop {
  mapping (address=>uint256) recentClaims;
  mapping (address=>uint256) claimTimes;
  address _owner;
  uint256 minInterval;
  uint256 intervalIncrement;
  uint256 dropRate;
  uint256 minDrop;
  constructor() {
      _owner = msg.sender;
      minInterval = 1 hours;
      intervalIncrement = 1 hours;
      dropRate = 10000;     // each time drops: dropRate/1e6*balance
      minDrop = 1e16;       // 0.01 XVM
  }

  function needWait() public view returns (uint256) {
      uint256 interval = minInterval + claimTimes[msg.sender]*intervalIncrement;
      if(recentClaims[msg.sender]+interval<=block.timestamp){
          return 0;
      }
      return recentClaims[msg.sender]+interval - block.timestamp;
  }

  function claimable() public view returns (uint256) {
      if(address(this).balance<msg.sender.balance){
          return 0;
      }
      uint256 amount = address(this).balance*dropRate/1e6;
      if(amount<minDrop){
          return 0;
      }
      return amount;
  }

  function claim() public {
      uint256 amount = claimable();
      require(amount>0,"nothing to claim");
      address payable user = payable(msg.sender);
      user.transfer(amount);
      claimTimes[msg.sender]++;
      recentClaims[msg.sender] = block.timestamp;
  }

  function redeem() public {
    require(msg.sender==_owner,"not owner");
    address payable user = payable(msg.sender);
    user.transfer(address(this).balance);
  }
}
