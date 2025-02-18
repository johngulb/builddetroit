import React, { useState } from 'react';
import styled from '@emotion/styled';
import moment from 'moment';

interface Event {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  slug: string;
}

interface EventCalendarProps {
  events: Event[];
}

const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px 4px 0 0;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #ddd;
  border: 1px solid #ddd;
`;

const CalendarCell = styled.div<{ isCurrentMonth: boolean; isSelected: boolean }>`
  background: ${props => props.isSelected ? '#e6f3ff' : '#fff'};
  padding: 0.5rem;
  min-height: 80px;
  opacity: ${props => props.isCurrentMonth ? 1 : 0.5};
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }

  .date {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .event-dot {
    width: 6px;
    height: 6px;
    background: #007bff;
    border-radius: 50%;
    margin: 2px 0;
  }
`;

const EventList = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;

  h3 {
    margin: 0 0 1rem 0;
  }
`;

const EventItem = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }

  a {
    color: #007bff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment());

  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = moment(currentDate).startOf('month');
  const startingDay = firstDayOfMonth.day();

  const days = [];
  let day = firstDayOfMonth.clone().subtract(startingDay, 'days');

  for (let i = 0; i < 42; i++) {
    days.push(day.clone());
    day.add(1, 'day');
  }

  const selectedDateEvents = events.filter(event => 
    moment(event.start_date).format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')
  );

  const hasEvents = (date: moment.Moment) => {
    return events.some(event => 
      moment(event.start_date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    );
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <button onClick={() => setCurrentDate(moment(currentDate).subtract(1, 'month'))}>
          Previous
        </button>
        <h2>{currentDate.format('MMMM YYYY')}</h2>
        <button onClick={() => setCurrentDate(moment(currentDate).add(1, 'month'))}>
          Next
        </button>
      </CalendarHeader>

      <CalendarGrid>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{ padding: '0.5rem', textAlign: 'center', background: '#f5f5f5' }}>
            {day}
          </div>
        ))}
        
        {days.map((date, index) => (
          <CalendarCell 
            key={index}
            isCurrentMonth={date.month() === currentDate.month()}
            isSelected={date.format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')}
            onClick={() => setSelectedDate(date)}
          >
            <div className="date">{date.date()}</div>
            {hasEvents(date) && <div className="event-dot" />}
          </CalendarCell>
        ))}
      </CalendarGrid>

      <EventList>
        <h3>Events for {selectedDate.format('MMMM D, YYYY')}</h3>
        {selectedDateEvents.length === 0 ? (
          <p>No events scheduled for this day</p>
        ) : (
          selectedDateEvents.map(event => (
            <EventItem key={event.id}>
              <a href={`/event/${event.slug}`}>
                {event.title}
              </a>
              <div style={{ fontSize: '0.9em', color: '#666' }}>
                {moment(event.start_date).format('h:mm A')}
              </div>
            </EventItem>
          ))
        )}
      </EventList>
    </CalendarWrapper>
  );
};
