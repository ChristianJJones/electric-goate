// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ZeropointWifi is ERC20, Ownable {
    mapping(address => uint256) public wifiBalance;

    constructor(address initialOwner) ERC20("ZeropointWifi", "ZPW") Ownable(initialOwner) {
        _mint(initialOwner, 1_000_000 * 10**2); // 1M ZPW
    }

    function decimals() public view virtual override returns (uint8) {
        return 2;
    }

    function consumeForWifi(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient $ZPW");
        _burn(msg.sender, amount);
        wifiBalance[msg.sender] += amount;
    }
}
