import React from "react";
import { MuiTelInput } from 'mui-tel-input'
import TextField from "@mui/material/TextField";
import { Button } from "./Styled";
import styled from "@emotion/styled";
import { requestPhoneNumberVerification, verifyPhoneNumber } from "../dpop";


export const VerifyPhoneNumber = ({ onConfirmation }) => {
  const [showVerificationInput, setShowVerificationInput] =
    React.useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [secret, setSecret] = React.useState<string>("");

  const handlePhoneChange = React.useCallback((value) => {
    if (!value.match(/^\+?1/)) {
      value = `+1${value.replace('+','')}`;
    }
    setPhoneNumber(value);
  }, []);

  const handleOnSubmit = React.useCallback((e) => {
    requestPhoneNumberVerification(phoneNumber).then((res) => {
      setSecret(res.secret);
      setShowVerificationInput(true);
    });
  }, [phoneNumber]);

  const handleVerificationInputChange = React.useCallback((e) => {
    if (e.target.value.length === 4) {
      verifyPhoneNumber(e.target.value, secret).then((res) => {
        if (res.status === 'verified') {
          onConfirmation(phoneNumber);
        }
      });
    }
  }, [onConfirmation, phoneNumber, secret]);

  return (
    <VerifyPhoneNumberWrapper>
      <p>Verify your phone number</p>
      {!showVerificationInput && (
        <>
          <MuiTelInput
            disableDropdown={true}
            defaultCountry={'US'}
            id="phone"
            label="Phone"
            name="phone"
            onChange={handlePhoneChange}
            value={phoneNumber}
            variant="filled"
          />
          <Button onClick={handleOnSubmit}>Submit</Button>
        </>
      )}
      {/* <TextField autoComplete="one-time-code" autoFocus id="token" name="token" type="tel" inputMode="numeric" onChange={handleVerificationInputChange} /> */}
      {showVerificationInput && <TextField autoComplete="one-time-code" autoFocus id="token" name="token" type="tel" inputMode="numeric" onChange={handleVerificationInputChange} />}
    </VerifyPhoneNumberWrapper>
  );
};

const VerifyPhoneNumberWrapper = styled.div`
p {
  margin-bottom: 0.5rem;
}
  .MuiTextField-root {
    width: 100%;
  }
  .MuiInputAdornment-root {
    display: none;
  }
`;
