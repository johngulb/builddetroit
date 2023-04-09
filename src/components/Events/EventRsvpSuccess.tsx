import React from "react";
import styled from "@emotion/styled";
import moment from "moment";
import LazyLoad from "react-lazy-load";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { EventInfo } from "./EventInfo";
import { EventAddToCalendar } from "./EventAddToCalendar";

import Close from "@mui/icons-material/Close";
import { ButtonLink } from "../Styled";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "85%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "2px",
  boxShadow: 24,
  //   p: 4,
};

export const EventRsvpSuccess = ({ event, show, setShow }) => {
  const [shareText, setShareText] = React.useState<string | null>(null);

  React.useEffect(() => {
    const dateString = `${moment(event.start_date).format("MMM")} ${moment(
      event.start_date
    ).format("D")} from ${moment(event.start_date).format("h:mm a")} - ${moment(
      event.end_date
    ).format("h:mm a")}`;
    setShareText(
      encodeURIComponent(
        `Join me at ${event.title} on ${dateString}\n${window.origin}/event/${event.slug}`
      )
    );
  }, [event.end_date, event.slug, event.start_date, event.title]);

  return (
    <LazyLoad>
      <ContactModalWrapper>
        <Modal open={show} onClose={() => setShow(false)}>
          <Box sx={style}>
            <ContactBoxWrapper>
              <button className="close-btn" onClick={() => setShow(false)}>
                <Close />
              </button>
              <div className="contact-title">Your RSVP is Confirmed</div>
              <EventInfo event={event} variant="compact" />
              <EventAddToCalendar event={event} />
              {shareText && (
                <ButtonLink href={`sms:&body=${shareText}`}>Share</ButtonLink>
              )}
            </ContactBoxWrapper>
          </Box>
        </Modal>
      </ContactModalWrapper>
    </LazyLoad>
  );
};

const ContactModalWrapper = styled.div`
  .modal-content {
    border-radius: 0;
  }
`;

const ContactBoxWrapper = styled.div`
  padding: 1em;
  .more-info {
    .time-range {
      font-size: 1rem;
    }
    h2 {
      font-size: 1.4rem;
    }
  }
  button.close-btn {
    position: absolute;
    left: -20px;
    top: -20px;
    border-radius: 20px;
    border: solid 1px #ddd;
    background-color: white;
    color: #666;
  }
  .contact-title {
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  .add-to-calendar-wrapper {
    text-align: center;
    width: 100%;
    display: inline-block !important;
    background-color: #28303d;
    padding: 8px;
    margin-top: 12px;
    button {
      color: white;
    }
  }
  h1 {
    max-lines: 4;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .button {
    width: 100%;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1rem;
  }
  .form-outline {
    margin-bottom: 1rem;
    outline: none !important;
    .form-control:focus {
      outline: none !important;
    }
  }
`;
