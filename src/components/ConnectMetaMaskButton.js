import { useState, useEffect } from "react";
import ipfs from './ipfs.js'
import { Buffer } from 'buffer';
import Web3 from "web3";
import styles from "../styles/ConnectMetaMaskButton.module.css";

const ConnectMetaMaskButton = ({
  loading,
  address,
  setLoading,
  setAddress,
}) => {
  const [file, setFile] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [imageSource, setimageSource] = useState('');

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

  useEffect(() => {
    if(ipfsHash) {
      setimageSource(`https://tryout.infura-ipfs.io/ipfs/${ipfsHash}`);
    }
  }, [ipfsHash]);

  const saveToIpfs = async (givenFile) => {
    try {
      const added = await ipfs.add(
        givenFile,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )

      console.log(added.cid.toString());
      setIpfsHash(added.cid.toString());
    } catch (err) {
      console.log(err.message);
    }
  }

  const onSubmit = (e) => { 
    e.preventDefault();
    saveToIpfs(file)
  };
  
  const captureFile = (e) => { 
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setFile(Buffer(reader.result));
      console.log('set file');
    };
  };


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
        <div className={styles["image-container"]}>
          <img className={styles["image"]} src={imageSource} alt="" />
        </div>
        
        <form onSubmit={onSubmit}>
          <input type="file" onChange={captureFile}/>
          <input type="submit" />
        </form>
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
