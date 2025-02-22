import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

function WalletButton() {
  return (
    <ConnectButton
      showBalance={false}
      chainStatus={"none"}
      accountStatus={"address"}
    />
  );
}

export default WalletButton;
