import React from "react";
import styled from '@emotion/styled'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { login } from "../../dpop";

export const Login = ({ onLogin }) => {
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();

  const handleEmailChange = React.useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = React.useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = React.useCallback(() => {
    login(email, password).then((res) => {
      onLogin(res?.user);
    });
  }, [email, onLogin, password]);

  return (
    <LoginWrapper>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { marginBottom: 2, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={email}
          label="Email"
          id="email"
          name="email"
          type="email"
          required
          variant="filled"
          // feedback="Please enter your email."
          onChange={handleEmailChange}
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
      </Box>
      <Button
        className="button"
        type="submit"
        onClick={handleSubmit}
        variant="contained"
      >
        Login
      </Button>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
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
