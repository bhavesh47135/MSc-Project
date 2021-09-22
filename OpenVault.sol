//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

contract OpenVault {
    
    struct fileRecord {
        uint256 index;
        address owner;
        string hash;
        string fileName;
        uint256 timeStamp;
        string[] tags;
        bool moderated;
        uint256 removalsIndex;
    }
    
    mapping(uint256 => fileRecord) public filesList;
    uint256 public index = 0;
    mapping(address => bool) public mods;
    uint256 public modsNum = 2;
    mapping(uint256 => address) public removals;
    
    constructor() {
        mods[0xDE420E4673731887CD58a9287722b0a1F6bfdBC6] = true;
        mods[0xd470BfdA99C914dD5F205775674eC8946c4625f5] = true;
    }
    
    event result(address indexed _add, string _res);
    
    function addMod(address newMod) public payable {
        if (mods[msg.sender] == true) {
            if (msg.sender == newMod) emit result(msg.sender, "You are already a moderator.");
            else {
                if (mods[newMod] != true) {
                    mods[newMod] = true;
                    modsNum++;
                    emit result(msg.sender, "New moderator added!");
                }
                else if(mods[newMod] == true) emit result(msg.sender, "This person is already a moderator.");
                else emit result(msg.sender, "There was an error.");
            }
        }
        else emit result(msg.sender, "You are not a moderator.");
    }
    
    function rmFile(uint256 fileNum) public payable {
        if (mods[msg.sender] == true) {
            if (filesList[fileNum-1].moderated == false) {
                if (removals[fileNum-1] == msg.sender) emit result(msg.sender,"You have already requested to remove this file.");
                else {
                    removals[fileNum-1] = msg.sender;
                    filesList[fileNum-1].removalsIndex++;
                    if (filesList[fileNum-1].removalsIndex > (modsNum / 2)) {
                        filesList[fileNum-1].moderated = true;
                        emit result(msg.sender, "This file has been removed.");
                    }
                    else emit result(msg.sender, "You have been added to list of signed moderators for this file's pending removal.");
                }
            }
            else if (filesList[fileNum-1].moderated == true) emit result(msg.sender, "This file has already been removed.");
            else emit result(msg.sender, "There was an error, or this file does not exist.");
        }
        else emit result(msg.sender, "You are not a moderator.");
    }
    
    function setData(string memory ipfsHash, string memory fileName, string[] memory tags) public payable {
        if (bytes(ipfsHash).length == 46) {
            fileRecord memory record = fileRecord(index+1, msg.sender, ipfsHash, fileName, block.timestamp, tags, false, 0);
            filesList[index++] = record;
            emit result(msg.sender, "File Successfully Uploaded!");
        }
        else emit result(msg.sender, "There was an error. Please check that your IPFS Hash is valid.");
    }
    
    function getData() public view returns(fileRecord[] memory) {
        fileRecord[] memory ret = new fileRecord[](index);
        for (uint i = 0; i < index; i++) {
            ret[i] = filesList[i];
        }
        return ret;
    }
}