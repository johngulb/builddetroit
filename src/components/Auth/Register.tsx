import React from "react";
import styled from '@emotion/styled'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { register } from "../../dpop";

export const Register = ({ onRegister }) => {
  const [name, setName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [phone, setPhone] = React.useState<string>();
  const [publicName, setPublicName] = React.useState<string>();
  const [organization, setOrganization] = React.useState<string>();

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
      phone,
      public_name: publicName,
      organization,
    }).then((res) => {
      onRegister();
    });
  }, [name, email, password, phone]);

  return (
    <RegisterWrapper>
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
        <TextField
          value={phone}
          label="Phone"
          id="phone"
          name="phone"
          type="phone"
          // feedback="Please enter your number."
          variant="filled"
          onChange={handlePhoneChange}
        />
        <TextField
          value={password}
          label="Password"
          id="password"
          name="password"
          type="password"
          // feedback="Please enter a password."
          variant="filled"
          required
          onChange={handlePasswordChange}
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
