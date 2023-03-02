import React from "react";
import { ButtonLink } from "./ButtonLink";
// import styled from '@benzinga/themetron';
import { ethers } from "ethers";

export interface Web3SigButtonProps {
  message: string;
  className: string;
  onSignature: (address: string, signature: string) => void;
  buttonText?: string;
}

export const Web3SigButton: React.FC<Web3SigButtonProps> = ({
  buttonText = "Sign Message",
  className,
  message,
  onSignature,
}) => {
  const signMessage = React.useCallback(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();
      onSignature(address, signature);
    })();
  }, [message, onSignature]);

  return (
    <ButtonLink className={className} onClick={signMessage}>
      {buttonText}
    </ButtonLink>
  );
};
