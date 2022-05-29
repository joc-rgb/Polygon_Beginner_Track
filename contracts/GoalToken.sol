//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract GoalToken is ERC721URIStorage {
    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds;

    constructor() ERC721("Goal","GOAL"){
      
    }

    function createNFT(string memory _tokenURI) external returns (uint){
        
        uint newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        //ipfs:cid
        _tokenIds.increment();
        return newItemId;
    }

}
