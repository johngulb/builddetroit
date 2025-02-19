import React from "react";
import { getRsvps } from "../dpop";

export const useRSVPs = () => {
  const [rsvps, setRSVPs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const loadRSVPs = React.useCallback(async () => {
    setIsLoading(true);
    const result = await getRsvps();
    setRSVPs(result);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    loadRSVPs();
  }, [loadRSVPs]);

  return {
    rsvps,
    isLoading,
    loadRSVPs,
  };
};
