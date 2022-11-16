//import Web3 from "web3";
import { useState } from "react";
import "./App.css";
import ConnectWalletButton from "./components/ConnectWalletButton";
import ConnectMetaMaskButton from "./components/ConnectMetaMaskButton";


const App = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  return(
    <div className="app">
      <div className="login-box">
        <div className="connect-wallet-button">
          <ConnectMetaMaskButton loading={loading} setLoading={setLoading} address={address} setAddress={setAddress} />
        </div>
        <div className="connect-metamask-button">
          <ConnectWalletButton loading={loading} setLoading={setLoading} address={address} setAddress={setAddress} />
        </div>
      </div>
    </div>
  );
};

export default App;