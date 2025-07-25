import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ethers } from "ethers";

export default function GoateElectricDashboard() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();

  const [deviceId, setDeviceId] = useState("");
  const [zpeAmount, setZpeAmount] = useState("");
  const [zpwAmount, setZpwAmount] = useState("");
  const [batteryStatus, setBatteryStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleConsumeZPE = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // TODO: Call consumeEnergy + charge device logic here
      setSuccess("ZPE consumed and device charged.");
      // TODO: Fetch new battery status
      setBatteryStatus("85% (Mocked)");
    } catch (err) {
      setError("Failed to consume ZPE: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConsumeZPW = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // TODO: Call consume logic on ZeropointWifi
      setSuccess("ZPW consumed for internet.");
    } catch (err) {
      setError("Failed to consume ZPW: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyToken = async (token) => {
    setLoading(true);
    setError("");
    try {
      // TODO: Swap ETH/WBTC/USDT -> ZPE/ZPW
      setSuccess(`Purchased ${token}`);
    } catch (err) {
      setError("Purchase failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSellToken = async (token) => {
    setLoading(true);
    setError("");
    try {
      // TODO: Swap ZPE -> ETH/WBTC/USDT
      setSuccess(`Sold ZPE for ${token}`);
    } catch (err) {
      setError("Sell failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Goate Electric</h1>

      {!isConnected ? (
        <Button onClick={() => connect()}>Connect Wallet</Button>
      ) : (
        <div className="space-y-2">
          <p>Connected as {address}</p>
          <Button variant="outline" onClick={() => disconnect()}>
            Disconnect
          </Button>
        </div>
      )}

      {loading && <p className="text-yellow-500">Processing...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

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
          {batteryStatus && <p>Battery: {batteryStatus}</p>}
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

      <Card>
        <CardContent className="space-y-2 pt-6">
          <h2 className="text-xl font-semibold">Buy/Sell ZPE</h2>
          <div className="flex gap-2">
            <Button onClick={() => handleBuyToken("ZPE with ETH")}>Buy ZPE (ETH)</Button>
            <Button onClick={() => handleBuyToken("ZPE with USDT")}>Buy ZPE (USDT)</Button>
            <Button onClick={() => handleBuyToken("ZPE with WBTC")}>Buy ZPE (WBTC)</Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => handleSellToken("ETH")}>Sell ZPE (ETH)</Button>
            <Button onClick={() => handleSellToken("USDT")}>Sell ZPE (USDT)</Button>
            <Button onClick={() => handleSellToken("WBTC")}>Sell ZPE (WBTC)</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 pt-6">
          <h2 className="text-xl font-semibold">Buy ZPW</h2>
          <div className="flex gap-2">
            <Button onClick={() => handleBuyToken("ZPW with ETH")}>Buy ZPW (ETH)</Button>
            <Button onClick={() => handleBuyToken("ZPW with USDT")}>Buy ZPW (USDT)</Button>
            <Button onClick={() => handleBuyToken("ZPW with WBTC")}>Buy ZPW (WBTC)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
