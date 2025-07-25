import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function GoateElectricDashboard() {
  const [deviceId, setDeviceId] = useState("");
  const [zpeAmount, setZpeAmount] = useState("");
  const [zpwAmount, setZpwAmount] = useState("");

  const handleConsumeZPE = async () => {
    // Call consume() on Zeropoint.sol and chargeDevice() on DeviceConnect
    console.log(`Consuming ${zpeAmount} ZPE for device ${deviceId}`);
    // Call smart contracts via ethers/wagmi
  };

  const handleConsumeZPW = async () => {
    console.log(`Consuming ${zpwAmount} ZPW for internet access`);
    // Call ZeropointWifi.sol consume()
  };

  return (
    <div className="grid gap-6 p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Goate Electric</h1>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-xl font-semibold">Consume Zeropoint (ZPE)</h2>
          <Input
            placeholder="Device ID"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount of ZPE to burn"
            value={zpeAmount}
            onChange={(e) => setZpeAmount(e.target.value)}
          />
          <Button onClick={handleConsumeZPE}>Consume & Charge Device</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-xl font-semibold">Consume Zeropoint Wifi (ZPW)</h2>
          <Input
            type="number"
            placeholder="Amount of ZPW to burn"
            value={zpwAmount}
            onChange={(e) => setZpwAmount(e.target.value)}
          />
          <Button onClick={handleConsumeZPW}>Consume Wifi Credits</Button>
        </CardContent>
      </Card>
    </div>
  );
}
