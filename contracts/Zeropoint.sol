// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IDeviceConnect {
    function chargeDevice(address user, string calldata deviceId, uint256 chargePercent) external;
}

contract Zeropoint is ERC20, Ownable {
    address public deviceConnect;

    constructor() ERC20("Zeropoint", "ZPE") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function setDeviceConnect(address _deviceConnect) external onlyOwner {
        deviceConnect = _deviceConnect;
    }

    function consumeAndCharge(string calldata deviceId, uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient $ZPE");
        _burn(msg.sender, amount);

        uint256 chargePercent = amount / 10; // 10 ZPE = 1%
        IDeviceConnect(deviceConnect).chargeDevice(msg.sender, deviceId, chargePercent);
    }
}
