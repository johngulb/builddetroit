import React from "react";
import AddToCalendarButtonTooltip from "./Tooltip/AddToCalendarButtonTooltip";
import { CalendarEvent } from "./index";
import styled from '@emotion/styled'

interface AddToCalendarButtonProps {
  calendarEvent: CalendarEvent;
}

export const AddToCalendarButton = ({
  calendarEvent,
}: AddToCalendarButtonProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);

  const handleClick = React.useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsTooltipVisible(!isTooltipVisible);
  }, []);

  return (
    <AddToCalendarButtonWrapper>
      <div className="add-to-calendar-wrapper">
        <button className="add-to-calendar-button" onClick={handleClick}>
          Add to Calendar
        </button>
        {isTooltipVisible && (
          <AddToCalendarButtonTooltip calendarEvent={calendarEvent} />
        )}
      </div>
    </AddToCalendarButtonWrapper>
  );
}

const AddToCalendarButtonWrapper = styled.div`
  .add-to-calendar-button {
    border: none;
    background: none;
    color: blue;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.8em;
  }
  .add-to-calendar-wrapper {
    position: relative;
    position: relative;
    display: inline;
  }

  .event-card {
    border: 1px solid #aaa;
    border-radius: 8px;
    background-color: #ddd;
    text-align: left;
    padding-left: 10px;
    h1 {
      font-size: 24px;
      margin-bottom: 3px;
    }
  }
`;
