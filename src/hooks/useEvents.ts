import { useEffect, useState } from 'react';

const CACHE_KEY = 'cached_events';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async (params?: URLSearchParams) => {
    try {
      setLoading(true);
      
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setEvents(data);
          setLoading(false);
          return data;
        }
      }

      // Fetch fresh data if cache missing or expired
      const url = `https://api.detroiter.network/api/events${params ? `?${params}` : ''}`;
      const response = await fetch(url);
      const result = await response.json();
      
      // Update cache
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: result.data,
        timestamp: Date.now()
      }));

      setEvents(result.data);
      return result.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return [events, loading] as const;
};
