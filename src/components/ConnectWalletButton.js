import styles from "../styles/ConnectWallet.module.css";

const ConnectWalletButton = ({
  onPressLogout,
  onPressConnect,
  loading,
  address,
}) => {
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
    <div>
      <button onClick={onPressLogout} className={styles["connect-wallet"]}>
        Disconnect
      </button>
    </div>
  }

  return (
    <div>
      <button onClick={onPressConnect} className={styles["connect-wallet"]}>
        Connect Wallet
      </button>
    </div>
  );
};

export default ConnectWalletButton;