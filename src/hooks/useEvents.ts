import { useEffect, useState } from 'react';
import { getEvents, DPoPEvent, EventQueryParams, hostname } from '../dpop';

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const useEvents = (params?: EventQueryParams) => {
  const [events, setEvents] = useState<DPoPEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async (params?: EventQueryParams) => {
    try {
      setLoading(true);
      
      let data: DPoPEvent[] = [];

      if (params?.ids) {
        // If specific IDs requested, check cache for each
        const requestedIds = params.ids.split(',');
        const now = Date.now();
        const uncachedIds: string[] = [];
        
        // Check cache for each requested ID
        data = requestedIds.map(id => {
          const cached = localStorage.getItem(`event-${id}`);
          if (cached) {
            const { data: eventData, timestamp } = JSON.parse(cached);
            if (now - timestamp <= CACHE_DURATION) {
              return eventData;
            }
          }
          uncachedIds.push(id);
          return null;
        }).filter((event): event is DPoPEvent => event !== null);

        if (uncachedIds.length > 0) {
          // Fetch any missing/expired events
          const freshEvents = await getEvents({ ...params, ids: uncachedIds.join(',') });
          
          // Cache each fresh event
          freshEvents.forEach(event => {
            localStorage.setItem(`event-${event.id}`, JSON.stringify({
              data: event,
              timestamp: now
            }));
          });

          data = [...data, ...freshEvents];
        }
      } else {
        // For non-ID queries, fetch fresh data
        data = await getEvents(params || {});
        
        // Cache each event individually
        const now = Date.now();
        data.forEach(event => {
          localStorage.setItem(`event-${event.id}`, JSON.stringify({
            data: event,
            timestamp: now
          }));
        });
      }

      setEvents(data);
      return data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(params);
  }, [params]);

  return [events, loading] as const;
};

export const cacheEvent = (event: DPoPEvent) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(`event-${event.id}`, JSON.stringify({
    data: event,
    timestamp: Date.now()
  }));
};

export const getEvent = async (event: string) => {
  const result = await (await fetch(`${hostname}/api/event/${event}`)).json();
  return result.data;
};

export const getEventFromCache = (event: string) => {
  if (typeof window === "undefined") return;
  const cached = localStorage.getItem(`event-${event}`);
  if (cached) {
    const { data: eventData, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp <= CACHE_DURATION) {
      return eventData;
    }
  }
  return null;
};


export const getEventsFromCache = (ids: string[]) => {
  return ids.map(id => getEventFromCache(id)).filter((event): event is DPoPEvent => event !== null);
};
