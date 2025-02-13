import { useEffect, useState } from 'react';

export const useEvents = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async (params?: URLSearchParams) => {
    try {
      const url = `https://api.detroiter.network/api/events${params ? `?${params}` : ''}`;
      const response = await fetch(url);
      const result = await response.json();
      setEvents(result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return [events] as const;
};
