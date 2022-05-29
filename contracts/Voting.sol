//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {

    bytes32[] candidateList;
    mapping (address=>bool) voters; //Each voter vote once
    mapping (uint=>uint) votes;
    uint totalVotes;
    bool status;

    constructor(bytes32[] memory _candidateList){
        candidateList = _candidateList;
        totalVotes=0;
        status=false;
    }

    modifier checkCandidate(uint _id){
        require(_id<candidateList.length,"Invalid ID");
        _;
    }

    function vote(uint _id) external checkCandidate(_id){
        require(status,"Vote closed.");
        require(!voters[msg.sender],"You've voted");
        votes[_id]+=1;
        voters[msg.sender] = true;
        totalVotes+=1;
    }

    function getCandidateList() external view returns(bytes32[] memory){
        return candidateList;
    }
    function getCandidateVote(uint _id) external view checkCandidate(_id) returns(uint) {
        return votes[_id];
    }
    function toggleVote() onlyOwner external{
        status=!status;
    }
    function getStatus() external view returns (bool){
        return status;
    }
}
