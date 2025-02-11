import React from "react";
import styled from "@emotion/styled";
import { DPoPEvent, Venue } from "../../dpop";
import { VenueMap } from "../VenueMap";

const EventLocationContainer = styled.div`
  .venue {
    font-size: 1.1rem;
    margin-bottom: 0;
    .get-directions {
      margin-left: 0.75rem;
      color: blue;
      text-decoration: underline;
      font-size: 0.9rem;
    }
  }
  .address {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.1rem;
  }
  .get-directions {
    margin-top: -0.5rem;
  }
`;

interface EventLocationProps {
  event: DPoPEvent;
}

export const EventLocation: React.FC<EventLocationProps> = ({ event }) => {
  return (
    <>
      <EventLocationContainer id="location">
        <h3 className="section-title">Event Location</h3>
        <LocationDirections venue={event.venue}>
          <div className="venue">{event.venue.title}</div>
          <div className="address">{getLocationAddress(event.venue)}</div>
          <VenueMap venue={event.venue} />
        </LocationDirections>
      </EventLocationContainer>
    </>
  );
};

export const getLocationAddress = (venue: Venue) => {
  return `${venue.geo?.address} ${venue.geo?.city}, ${venue.geo?.state} ${venue.geo?.zipcode}`.trim();
};

export const LocationDirections: React.FC<{
  venue: Venue;
  children: React.ReactNode;
}> = ({ venue, children }) => {
  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURI(
      venue.title + " " + getLocationAddress(venue)
    )}`;
  };

  return (
    <a
      href={getDirectionsUrl()}
      className="get-directions"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};
