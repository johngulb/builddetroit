import React from "react";
import styled from "@emotion/styled";
import { EventInfo } from "./EventInfo";

export const EventList = ({ events, variant = "default" }) => {
  return (
    <EventListWrapper>
      {events?.map((event, i) => (
        <a href={`/event/${event.slug}`} key={`event-${i}`}>
          <EventInfo event={event} variant={variant} />
        </a>
      ))}
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
