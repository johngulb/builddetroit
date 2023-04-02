import React from "react";
import styled from "@emotion/styled";
import LazyLoad from "react-lazy-load";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";
import { ContactBox } from "../ContactBox";
import { ButtonLink } from "../Styled";
import CardActions from "@mui/material/CardActions";

import { getContact, saveContact } from "../../dpop";
import { Description } from "@mui/icons-material";
// import { DatePicker } from "@mui/lab";

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
  // p: 4,
};

export const EventSubmissionButton = () => {
  const [show, setShow] = React.useState(false);
  const handleButton = React.useCallback(() => {
    setShow(true);
  }, []);
  const onSubmit = React.useCallback((data) => {
    console.log("onSubmit Event: ", data);
  }, []);
  return (
    <>
      <ButtonLink className="build-btn" onClick={handleButton}>
        Create Event
      </ButtonLink>
      <EventSubmissionModal
        show={show}
        setShow={setShow}
        onSubmit={onSubmit}
        titleText="Create Event"
        bodyContent={<></>}
        buttonText="Submit"
      />
    </>
  );
};

export const EventSubmissionModal = ({
  show,
  setShow,
  onSubmit,
  titleText,
  bodyContent,
  buttonText,
}) => {
  return (
    <LazyLoad>
      <ContactModalWrapper>
        <Modal open={show} onClose={() => setShow(false)}>
          <Box sx={style}>
            <EventSubmissionBox
              bodyContent={bodyContent}
              titleText={titleText}
              buttonText={buttonText}
              onSubmit={onSubmit}
            />
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

const NextBackBar = ({
  nextStep,
  nextText = "Next",
  lastStep,
  lastText = "Back",
  setStep,
}) => {
  return (
    <CardActions>
      {lastStep && (
        <Button
          className="button"
          type="submit"
          onClick={() => setStep(lastStep)}
          size="small"
          variant="contained"
        >
          {lastText}
        </Button>
      )}
      {nextStep && (
        <Button
          className="button"
          type="submit"
          onClick={() => setStep(nextStep)}
          size="small"
          variant="contained"
        >
          {nextText}
        </Button>
      )}
    </CardActions>
  );
};

export const EventSubmissionBox = ({
  onSubmit,
  bodyContent,
  buttonText = "Submit",
  titleText,
}) => {
  const [title, setTitle] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const [startTimeChange, setStartTimeChange] = React.useState<string>();
  const [endTimeChange, setEndTimeChange] = React.useState<string>();
  const [venueName, setVenueName] = React.useState<string>();
  const [url, setUrl] = React.useState<string>();
  const [step, setStep] = React.useState<string>("url");
  //   const [phone, setPhone] = React.useState<string>();

  const handleTitleChange = React.useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleDescriptionChange = React.useCallback((e) => {
    setUrl(e.target.value);
  }, []);

  const handleStartTimeChange = React.useCallback((value) => {
    setStartTimeChange(value);
  }, []);

  const handleEndTimeChange = React.useCallback((value) => {
    setEndTimeChange(value);
  }, []);

  const handleVenueNameChange = React.useCallback((e) => {
    setVenueName(e.target.value);
  }, []);

  const handleUrlChange = React.useCallback((e) => {
    setUrl(e.target.value);
  }, []);

  const handleSubmit = React.useCallback(() => {
    onSubmit({
      title,
      startTimeChange,
      endTimeChange,
      venueName,
    });
  }, [onSubmit, title, startTimeChange, endTimeChange, venueName]);

  return (
    <ContactBoxWrapper>
      {titleText && <div className="contact-title">{titleText}</div>}
      {bodyContent}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { marginBottom: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        {step === "url" && (
          <>
            <TextField
              value={url}
              label="Url"
              id="url"
              name="url"
              // feedback="Please enter your number."
              variant="filled"
              onChange={handleUrlChange}
            />
            <NextBackBar
              nextStep="info"
              nextText={url ? "Next" : "Skip"}
              lastStep={null}
              setStep={setStep}
            />
          </>
        )}
        {step === "info" && (
          <>
            <TextField
              value={title}
              label="Title"
              id="title"
              name="title"
              type="text"
              // feedback="Please enter your name."
              variant="filled"
              required
              onChange={handleTitleChange}
            />
            <TextField
              value={description}
              label="Description"
              id="description"
              name="description"
              required
              multiline
              rows={4}
              // feedback="Please enter your number."
              variant="filled"
              onChange={handleDescriptionChange}
            />
            <TextField
              value={venueName}
              label="Venue Name"
              id="venueName"
              name="venueName"
              required
              // feedback="Please enter your number."
              variant="filled"
              onChange={handleVenueNameChange}
            />
            <NextBackBar
              nextStep="start-time"
              lastStep="url"
              setStep={setStep}
            />
          </>
        )}

        {step === "start-time" && (
          <>
            <label>Start Time</label>
            <StaticDateTimePicker
              value={startTimeChange}
              onChange={handleStartTimeChange}
            />
            <NextBackBar
              nextStep="end-time"
              lastStep="info"
              setStep={setStep}
            />
          </>
        )}

        {step === "end-time" && (
          <>
            <label>End Time</label>
            <StaticDateTimePicker
              value={endTimeChange}
              onChange={handleStartTimeChange}
            />
            <NextBackBar
              nextStep="review"
              lastStep="start-time"
              setStep={setStep}
            />
          </>
        )}

        {step === "review" && (
          <>
            <NextBackBar
              nextText="Submit"
              nextStep="submit"
              lastStep="end-time"
              setStep={setStep}
            />
            {/* <Button
              className="button"
              type="submit"
              onClick={handleSubmit}
              variant="contained"
            >
              {buttonText}
            </Button> */}
          </>
        )}
      </Box>
    </ContactBoxWrapper>
  );
};

const ContactBoxWrapper = styled.div`
  padding: 1em;
  .contact-title {
    font-weight: bold;
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
