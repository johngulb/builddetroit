import React from "react";
import moment from "moment";
import styled from "@emotion/styled";
import Place from "@mui/icons-material/Place";

const VenueName = ({ venue }) => {
  return (
    <div className="venue">
      <Place />
      {venue.title}
    </div>
  );
};

export const EventInfo = ({
  event,
  linkLocation = false,
  variant = "default",
  header = 2,
}) => {
  return (
    <EventInfoContainer className={`event-info ${variant}`}>
      <div className="date-info">
        <div className="date-info-wrapper">
          <div className="weekday">
            {moment(event.start_date).format("ddd")}
          </div>
          <div className="month">{moment(event.start_date).format("MMM")}</div>
          <div className="day">{moment(event.start_date).format("D")}</div>
        </div>
      </div>
      <div className="more-info">
        <div className="time-range">
          {`${moment(event.start_date).format("h:mm a")} - ${moment(
            event.end_date
          ).format("h:mm a")}`}
        </div>
        {header === 1 && <h1 dangerouslySetInnerHTML={{ __html: event.title }} />}
        {header === 2 && <h2 dangerouslySetInnerHTML={{ __html: event.title }} />}
        {event.venue && (
          <>
            {linkLocation ? (
              <a href="#location">
                <VenueName venue={event.venue} />
              </a>
            ) : (
              <VenueName venue={event.venue} />
            )}
          </>
        )}
      </div>
    </EventInfoContainer>
  );
};

const EventInfoContainer = styled.div`
  display: flex;
  font-size: 24px;
  &.compact {
    font-size: 18px;
  }
  &.nano {
    font-size: 12px;
  }
  h1, h2 {
    font-size: 1.8em;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }
  .time-range {
    font-size: 1.2em;
    font-weight: bold;
  }
  .venue {
    align-items: center;
    display: flex;
    svg {
      font-size: 1em;
      color: #666;
    }
  }
  .date-info {
    text-align: center;
    width: 100px;
    line-height: 1.2em;
    text-transform: uppercase;
    margin-right: 1em;
    flex: 0;
    .date-info-wrapper {
      border: solid 2px #ddd;
      border-radius: 4px;
      padding: 0.5em;
      min-width: 4.5em;
    }
    .weekday {
      font-size: 0.8em;
    }
    .month {
      font-size: 1em;
      font-weight: bold;
    }
    .day {
      margin-top: 0.25em;
      font-weight: bold;
      font-size: 2em;
      display: inline-block;
    }
  }
  @media only screen and (max-width: 822px) {
    font-size: 14px;
    &.compact {
      font-size: 12px;
      .date-info-wrapper {
        min-width: 3em;
      }
    }
  }
`;
