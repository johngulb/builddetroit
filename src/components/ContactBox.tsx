import React from "react";
import styled from "@emotion/styled";
import LazyLoad from "react-lazy-load";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MuiTelInput } from "mui-tel-input";

import { VerifyPhoneNumber } from "./VerifyPhoneNumber";

import { getContact, saveContact } from "../dpop";

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

export const ContactBoxModal = ({
  show,
  setShow,
  onSubmit,
  onConfirmation,
  titleText,
  bodyContent,
  buttonText,
}) => {
  return (
    <LazyLoad>
      <ContactModalWrapper>
        <Modal open={show} onClose={() => setShow(false)}>
          <Box sx={style}>
            <ContactBox
              bodyContent={bodyContent}
              titleText={titleText}
              buttonText={buttonText}
              onConfirmation={onConfirmation}
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

export const ContactBox = ({
  onConfirmation,
  onSubmit,
  bodyContent,
  buttonText = "Submit",
  titleText,
}) => {
  const [name, setName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [publicName, setPublicName] = React.useState<string>();
  const [organization, setOrganization] = React.useState<string>();
  const [phone, setPhone] = React.useState<string>();

  React.useEffect(() => {
    const contact = getContact();
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
      setPublicName(contact.public_name);
      setOrganization(contact.organization);
    }
  }, []);

  const handleNameChange = React.useCallback((e) => {
    setName(e.target.value);
  }, []);

  const handleEmailChange = React.useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handlePhoneChange = React.useCallback((value) => {
    if (!value.match(/^\+?1/)) {
      value = `+1${value.replace("+", "")}`;
    }
    setPhone(value);
  }, []);

  const handlePublicNameChange = React.useCallback((e) => {
    setPublicName(e.target.value);
  }, []);

  const handleOrganizationChange = React.useCallback((e) => {
    setOrganization(e.target.value);
  }, []);

  const handleSubmit = React.useCallback(() => {
    saveContact({
      name,
      email,
      phone,
      public_name: publicName,
      organization,
    });
    onSubmit({
      name,
      email,
      phone,
      public_name: publicName,
      organization,
    });
  }, [name, email, phone, publicName, organization, onSubmit]);

  const handlePhoneConfirmation = React.useCallback((phone, user_cid) => {
    setPhone(phone);
    onConfirmation(user_cid);
  }, []);

  if (!phone) {
    return (
      <ContactBoxWrapper>
        <VerifyPhoneNumber onConfirmation={handlePhoneConfirmation} />
      </ContactBoxWrapper>
    );
  }

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
        <TextField
          value={name}
          label="Name"
          id="name"
          name="name"
          type="text"
          // feedback="Please enter your name."
          variant="filled"
          required
          onChange={handleNameChange}
        />
        <TextField
          value={email}
          label="Email"
          id="email"
          name="email"
          type="email"
          required
          // feedback="Please enter your email."
          variant="filled"
          onChange={handleEmailChange}
        />
        <MuiTelInput
          disableDropdown={true}
          defaultCountry={"US"}
          id="phone"
          label="Phone"
          name="phone"
          onChange={handlePhoneChange}
          value={phone}
          variant="filled"
        />
        <TextField
          value={publicName}
          label="Public Display Name (optional)"
          id="public_name"
          name="public_name"
          // feedback="Please enter your number."
          variant="filled"
          onChange={handlePublicNameChange}
        />
        <TextField
          value={organization}
          label="Organization (optional)"
          id="organization"
          name="organization"
          type="organization"
          // feedback="Please enter your number."
          variant="filled"
          onChange={handleOrganizationChange}
        />
      </Box>
      <Button
        className="button"
        type="submit"
        onClick={handleSubmit}
        variant="contained"
      >
        {buttonText}
      </Button>
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
