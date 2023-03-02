import React from "react";
import moment from "moment";
import LazyLoad from "react-lazy-load";
import { AddToCalendarButton } from "../AddToCalendarButton/AddToCalendarButton";
import { stripHtml } from "string-strip-html";

const eventAddress = (event) => {
  return `${event.venue.geo.address} ${event.venue.geo.city}, ${event.venue.geo.state} ${event.venue.geo.zipcode}`.trim();
};

const eventLocation = (event) => {
  return `${event.venue.title}, ${eventAddress(event)}`;
};

export const EventAddToCalendar = ({ event }) => {
  return (
    <LazyLoad>
      <AddToCalendarButton
        calendarEvent={{
          title: event.title?.replaceAll('&', 'and'),
          description: stripHtml(event.content?.replaceAll('&', 'and') ?? '').result,
          address: event.venue ? eventLocation(event)?.replaceAll('&', 'and') : '',
          startDate: moment(event.start_date).toDate(),
          endDate: moment(event.end_date).toDate(),
        }}
      />
    </LazyLoad>
  );
};
