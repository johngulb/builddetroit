import React from "react";
import { getConnections } from "../dpop";

export const useConnections = () => {
  const [connections, setConnections] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const loadConnections = React.useCallback(async () => {
    setIsLoading(true);
    const result = await getConnections();
    setConnections(result);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    loadConnections();
  }, [loadConnections]);

  return {
    connections,
    isLoading,
    loadConnections,
  };
};
