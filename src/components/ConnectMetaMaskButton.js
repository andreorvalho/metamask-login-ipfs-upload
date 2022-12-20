import { useState,  } from "react";
import Web3 from "web3";
import styles from "../styles/ConnectMetaMaskButton.module.css";

const ConnectMetaMaskButton = ({ address, setAddress }) => {
  const [loading, setLoading] = useState(false);

  const onPressConnect = async () => {
    setLoading(true);
  
    try {
      if (window?.ethereum?.isMetaMask) {
        // Desktop browser
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
  
        const account = Web3.utils.toChecksumAddress(accounts[0]);
        setAddress(account);
      }
    } catch (error) {
      console.log(error);
    }
  
    setLoading(false);
  };
  
  const onPressLogout = () => setAddress("");

  if (loading) {
    return (
      <div>
        <button
          className={`${styles["connect-wallet"]} ${styles["connect-button-loading"]}`}
          disabled
        >
          <div>Loading...</div>
        </button>
      </div>
    );
  }

  if (address) {
    return (
      <div>
        <button onClick={onPressLogout} className={styles["connect-wallet"]}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onPressConnect} className={styles["connect-wallet"]}>
        Connect with MetaMask
      </button>
    </div>
  );
};

export default ConnectMetaMaskButton;
