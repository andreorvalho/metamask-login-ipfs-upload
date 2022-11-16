import styles from "../styles/ConnectWalletButton.module.css";
import QRCodeModal from "@walletconnect/qrcode-modal";
import AuthClient, { generateNonce } from "@walletconnect/auth-client";
import { useState, useCallback, useEffect } from "react";

//const projectId = "f646cb55535455948cd074bf9ffb9709"
// const authClient = await AuthClient.init({
//   projectId: projectId,
//   metadata: {
//     name: "my-auth-dapp",
//     description: "A dapp using WalletConnect AuthClient",
//     url: "my-auth-dapp.com",
//     icons: ["https://my-auth-dapp.com/icons/logo.png"],
//   },
// });

// const { uri } = await authClient.request({
//   aud: window.location.href,
//   domain:  window.location.hostname.split(".").slice(-2).join("."),
//   chainId: "eip155:1",
//   nonce: generateNonce(),
// });

const ConnectWalletButton = ({ 
  loading,
  address,
  setLoading,
  setAddress
}) => { 
  const [client, setClient] = useState(null);
  const [uri, setUri] = useState("");

  const projectId = "f646cb55535455948cd074bf9ffb9709"

  const onClick = useCallback(() => {
    if (!client) return;

    client
      .request({
        aud: window.location.href,
        domain: window.location.hostname.split(".").slice(-2).join("."),
        chainId: "eip155:1",
        type: "eip4361",
        nonce: generateNonce(),
        statement: "Sign in with wallet.",
      })
      .then(({ uri }) => setUri(uri));
  }, [client, setUri]);


  useEffect(() => {
    if (uri) {
      QRCodeModal.open(uri, () => {
        console.log("EVENT", "QR Code Modal closed");
      });
    }
  }, [uri]);


  useEffect(() => {
    setLoading(true);

    AuthClient
      .init({
        // relayUrl:
        //   process.env.NEXT_PUBLIC_RELAY_URL || "wss://relay.walletconnect.com",
        projectId: projectId,
        metadata: {
          name: "react-dapp-auth",
          description: "React Example Dapp for Auth",
          url: window.location.host,
          icons: [],
        },
      })
      .then((authClient) => {
        setClient(authClient);
      })
      .catch((error) => { 
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!client) return;
    
    client.on("auth_response", ({ params }) => {
      if ("code" in params) {
        console.error(params);
        return;
      }

      if ("error" in params) {
        console.error(params.error);
        return;
      }

      setAddress(params.result.p.iss.split(":")[4]);
    });
  }, [client]);

  if (loading) {
    return;
  }

  return (
    <div>
      <button onClick={onClick} className={styles["connect-wallet"]}>
        Connect Wallet
      </button>
    </div>
  );

};

export default ConnectWalletButton;