// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DeviceConnect is Ownable {
    struct Device {
        string deviceId;
        bool isActive;
        uint256 batteryCapacity; // 0-100
        bool isCharging;
    }

    mapping(address => Device[]) public userDevices;
    mapping(string => bool) public deviceExists;

    event DeviceUpdated(address user, string deviceId, uint256 batteryCapacity);

    function connectDevice(string memory deviceId) external {
        require(!deviceExists[deviceId], "Already exists");
        userDevices[msg.sender].push(Device(deviceId, true, 100, false));
        deviceExists[deviceId] = true;
    }

    function chargeDevice(address user, string calldata deviceId, uint256 amount) external {
        uint256 index = findDeviceIndex(user, deviceId);
        Device storage d = userDevices[user][index];
        d.batteryCapacity = d.batteryCapacity + amount > 100 ? 100 : d.batteryCapacity + amount;
        emit DeviceUpdated(user, deviceId, d.batteryCapacity);
    }

    function findDeviceIndex(address user, string memory deviceId) internal view returns (uint256) {
        for (uint256 i = 0; i < userDevices[user].length; i++) {
            if (keccak256(bytes(userDevices[user][i].deviceId)) == keccak256(bytes(deviceId))) {
                return i;
            }
        }
        revert("Device not found");
    }
}
