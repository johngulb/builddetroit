import React from "react";
import styled from '@emotion/styled'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ProfilePicture from "../ProfilePicture";

import { register, getContact } from "../../dpop";
import { stripPhoneNumber } from "../../utils/phone";

export const Register = ({ onRegister }) => {
  const [name, setName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [phone, setPhone] = React.useState<string>();
  const [publicName, setPublicName] = React.useState<string>();
  const [organization, setOrganization] = React.useState<string>();
  const [profilePicture, setProfilePicture] = React.useState<string>();

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

  const handlePasswordChange = React.useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handlePhoneChange = React.useCallback((e) => {
    setPhone(e.target.value);
  }, []);

  const handlePublicNameChange = React.useCallback((e) => {
    setPublicName(e.target.value);
  }, []);

  const handleOrganizationChange = React.useCallback((e) => {
    setOrganization(e.target.value);
  }, []);

  const handleSubmit = React.useCallback(() => {
    register({
      name,
      email,
      password,
      phone: stripPhoneNumber(phone),
      public_name: publicName,
      organization,
      profile_picture: profilePicture,
    }).then((res) => {
      onRegister(res?.user);
    });
  }, [name, email, password, phone, publicName, organization, profilePicture, onRegister]);

  return (
    <RegisterWrapper>
      <Box sx={{ mb: 3 }}>
        <ProfilePicture
          data={{ profile_picture: profilePicture }}
          updateData={(data) => setProfilePicture(data.profile_picture)}
        />
      </Box>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { marginBottom: 2, width: "100%" },
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
          variant="filled"
          onChange={handleEmailChange}
        />
        <TextField
          value={phone}
          label="Phone"
          id="phone"
          name="phone"
          type="phone"
          variant="filled"
          onChange={handlePhoneChange}
        />
        <TextField
          value={password}
          label="Password"
          id="password"
          name="password"
          type="password"
          variant="filled"
          required
          onChange={handlePasswordChange}
        />
        <TextField
          value={publicName}
          label="Public Display Name (optional)"
          id="public_name"
          name="public_name"
          variant="filled"
          onChange={handlePublicNameChange}
        />
        <TextField
          value={organization}
          label="Organization (optional)"
          id="organization"
          name="organization"
          type="organization"
          variant="filled"
          onChange={handleOrganizationChange}
        />
      </Box>
      <Button className="button" type="submit" variant="contained" onClick={handleSubmit}>
        Register
      </Button>
    </RegisterWrapper>
  );
};

const RegisterWrapper = styled.div`
  .button {
    width: 100%;
    text-transform: uppercase;
  }
  .form-outline {
    margin-bottom: 1rem;
    outline: none !important;
    .form-control:focus {
      outline: none !important;
    }
  }
`;
