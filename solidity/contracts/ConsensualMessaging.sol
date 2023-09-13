// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ConsensualMessaging {

    bytes20 private from_key;
    bytes20 private to_key;
    bytes32 private msg_key;
    bytes32 private nonce_key;

    bytes[] public messages;

    struct Message {
        address from;
        address to;
        bytes32 message;
    }

    event MatchEvent(address from, address to, bytes32 message);
    
    constructor(bytes20 from, bytes20 to, bytes32 message, bytes32 nonce) {
        from_key = from;
        to_key = to;
        msg_key = message;
        nonce_key = nonce;
    }

    function decrypt(bytes calldata ciphertext) view public returns (Message memory decrypted){
        decrypted = Message({
            from: address(bytes20(ciphertext[32:52]) ^ from_key),
            to: address(bytes20(ciphertext[52:72]) ^ to_key),
            message: bytes32(ciphertext[72:]) ^ msg_key
        });
    }

    function encrypt(Message memory plaintext) view public returns (bytes memory ciphertext){

        bytes32 nonce = keccak256(abi.encodePacked(block.timestamp, plaintext.from, plaintext.to));

        return bytes.concat(
            nonce ^ nonce_key,
            bytes20(plaintext.from)^from_key,
            bytes20(plaintext.to)^to_key,
            plaintext.message ^ msg_key
        );
    }

    function submit(address to, bytes32 message) public returns (bool){
        address from = msg.sender;
        for (uint i = 0; i < messages.length; i++) {
            Message memory current = this.decrypt(abi.encodePacked(messages[i]));
            if(current.to == to && current.from == from) {
                revert("Already sent the message");
            } else if (current.to == from && current.from == to) {

                // Delete the old encryption
                messages[i] = messages[messages.length-1];
                messages.pop();
                emit MatchEvent(from, to, current.message);
                emit MatchEvent(to, from, current.message);
                return true;
            }
        }

        Message memory new_message = Message({
            to: to,
            from: from,
            message: message
        });

        messages.push(encrypt(new_message));

        return false;
    }
}