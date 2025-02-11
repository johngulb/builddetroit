import React from "react";
import styled from "@emotion/styled";
import { EventInfo } from "./EventInfo";

interface EventListProps {
  events: any[];
  variant?: string;
  category?: string;
  loadMore?: boolean;
  header?: number;
}

export const EventList = ({ events, variant = "default", category, loadMore = false, header = 2 }: EventListProps) => {
  const [eventList, setEventList] = React.useState<any[]>(events);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const loader = React.useRef(null);

  const handleObserver = React.useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading && loadMore) {
      fetchEvents();
    }
  }, [hasMore, loading, loadMore]);

  React.useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const offset = eventList.length;
      const params = new URLSearchParams({
        type: category || '',
        limit: '18',
        offset: offset.toString()
      });
      const url = `https://api.detroiter.network/api/events?${params}`;
      const response = await fetch(url);
      const result = await response.json();
      const data = result.data;
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setEventList(prev => [...prev, ...data]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setEventList(events);
    setHasMore(true);
  }, [category, events]);

  return (
    <EventListWrapper>
      {eventList?.map((event, i) => (
        <a href={`/event/${event.slug}`} key={`event-${i}`}>
          <EventInfo event={event} variant={variant} header={header} />
        </a>
      ))}
      {hasMore && loadMore && (
        <div ref={loader} style={{
          textAlign: 'center',
          padding: '20px',
          color: '#666',
          fontSize: '0.9em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <div className="loading-spinner" style={{
            width: '20px',
            height: '20px',
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #666',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          Loading more events...
        </div>
      )}
    </EventListWrapper>
  );
};

const EventListWrapper = styled.div`
  .event-info {
    text-align: left;
    margin-bottom: 1em;
    .date-info-wrapper {
      width: 4.5em;
    }
  }
`;
