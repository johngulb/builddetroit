import React from "react";
import styled from "@emotion/styled";
import { EventInfo } from "./EventInfo";

export const EventList = ({ events, variant = "default", category }) => {
  const [eventList, setEventList] = React.useState<any[]>(events);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const loader = React.useRef(null);

  const handleObserver = React.useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      fetchEvents();
    }
  }, [hasMore, loading]);

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
      const response = await fetch(`https://api.detroiter.network/api/events?type=${category}&limit=18&offset=${offset}`);
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
          <EventInfo event={event} variant={variant} />
        </a>
      ))}
      {hasMore && <div ref={loader}>Loading...</div>}
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
