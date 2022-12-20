import { useState, useEffect } from "react";
import Ipfs from './Ipfs.js'
import { Buffer } from 'buffer';
import styles from "../styles/FileUploader.module.css";

const FileUploader = () => { 
  const [file, setFile] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [imageSource, setimageSource] = useState('');

  useEffect(() => {
    if(ipfsHash) {
      setimageSource(`https://tryout.infura-ipfs.io/ipfs/${ipfsHash}`);
    }
  }, [ipfsHash]);

  const saveToIpfs = async (givenFile) => {
    try {
      const added = await Ipfs.add(
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

  return(
    <div>
      <div className={styles["image-container"]}>
      <img className={styles["image"]} src={imageSource} alt="" />
    </div>

    <form onSubmit={onSubmit}>
      <input type="file" onChange={captureFile}/>
      <input type="submit" />
    </form>
    </div>
  );
};

export default FileUploader;
