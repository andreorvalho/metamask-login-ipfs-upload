import { useState } from "react";
import "./App.css";
import ConnectMetaMaskButton from "./components/ConnectMetaMaskButton";
import FileUploader from "./components/FileUploader";

const App = () => {
  const [address, setAddress] = useState("");

  return(
    <div className="app">
      <div className="login-box">
        <div className="connect-wallet-button">
          <ConnectMetaMaskButton address={address} setAddress={setAddress}/>
          {address && <FileUploader />}
        </div>
      </div>
    </div>
  );
};

export default App;
