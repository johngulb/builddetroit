import React from "react";

export const useHasWallet = (): boolean => {
  const [hasWallet, setHasWallet] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== undefined) {
      setHasWallet(window.ethereum);
    }
  }, []);
  return hasWallet;
};
