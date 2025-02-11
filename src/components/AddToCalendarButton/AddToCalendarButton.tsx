import React from "react";
import AddToCalendarButtonTooltip from "./Tooltip/AddToCalendarButtonTooltip";
import { CalendarEvent } from "./index";
import styled from '@emotion/styled'
import { ButtonLinkCompact } from "../../components/Styled";

interface AddToCalendarButtonProps {
  calendarEvent: CalendarEvent;
}

export const AddToCalendarButton = ({
  calendarEvent,
}: AddToCalendarButtonProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);

  return (
    <AddToCalendarButtonWrapper>
      <div className="add-to-calendar-wrapper">
        <StyledButton onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          setIsTooltipVisible(!isTooltipVisible);
        }} className="hollow">
          <i className="fas fa-calendar-plus" style={{marginBottom: '4px'}}></i>
        </StyledButton>
        {isTooltipVisible && (
          <AddToCalendarButtonTooltip calendarEvent={calendarEvent} />
        )}
      </div>
    </AddToCalendarButtonWrapper>
  );
}

const StyledButton = styled(ButtonLinkCompact)`
  padding: 0.5rem;
  margin: 0;
  svg {
    display: block;
  }
`;

const AddToCalendarButtonWrapper = styled.div`
  .add-to-calendar-wrapper {
    position: relative;
    display: inline-block;
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
