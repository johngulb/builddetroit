import React from "react";
import { getRsvps } from "../dpop";

export const useRSVPs = (user_id: number) => {
  const [rsvps, setRSVPs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const loadRSVPs = React.useCallback(async () => {
    setIsLoading(true);
    const result = await getRsvps({ user_id: user_id });
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
