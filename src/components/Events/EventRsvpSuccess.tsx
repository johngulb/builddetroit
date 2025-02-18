import React from "react";
import styled from "@emotion/styled";
import LazyLoad from "react-lazy-load";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import { EventInfo } from "./EventInfo";
import { EventAddToCalendar } from "./EventAddToCalendar";
import { Register } from "../Auth/Register";

import Close from "@mui/icons-material/Close";
import { EventInviteButton } from "./EventInviteButton";
import { useUser } from "../../hooks/useUser";
import { ButtonLink } from "../Styled";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "85%",
  bgcolor: "background.paper",
  borderRadius: "2px",
  boxShadow: 24,
};

export const EventRsvpSuccess = ({ event, show, setShow, rsvp }) => {
  const [showRegister, setShowRegister] = React.useState(false);
  const user = useUser();

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
              <div className="action-buttons">
                <EventInviteButton event={event} rsvp={rsvp} />
                <EventAddToCalendar event={event} />
              </div>
              {!false && (
                <ButtonLink
                  className="complete-profile hollow"
                  onClick={() => setShowRegister(true)}
                >
                  Complete Your Profile
                </ButtonLink>
              )}
            </ContactBoxWrapper>
          </Box>
        </Modal>

        <Modal open={showRegister} onClose={() => setShowRegister(false)}>
          <Box sx={style}>
            <ContactBoxWrapper>
              <button
                className="close-btn"
                onClick={() => setShowRegister(false)}
              >
                <Close />
              </button>
              <Register
                onRegister={() => {
                  setShowRegister(false);
                  setShow(false);
                }}
              />
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
  .action-buttons {
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-top: 12px;
    width: 100%;

    button {
      flex: 1;
    }
    .add-to-calendar-wrapper {
      a {
        width: 60px;
        height: 48px;
        font-size: 1.2rem;
      }
    }
    .invite-button {
      width: 100%;
    }
  }
  .complete-profile {
    width: 100%;
    margin-top: 1rem;
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
