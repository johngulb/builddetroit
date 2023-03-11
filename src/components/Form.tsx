import React from "react";
import styled from "@emotion/styled";
import GravityForm from "react-gravity-form";

import { Button } from "./Styled";

const Loading = styled.div`
  color: red;
`;

const GravityFormWrapper = styled.div`
  padding: 1rem;
  margin: 1rem auto;
  max-width: 480px;
  border: solid 1px #ddd;
  border-radius: 4px;
  .form-title {
    font-size: 1.4rem;
  }
  .form-description {
    font-size: 1rem;
    margin: 0;
  }
  .form-wrapper {
    text-align: left;
  }
  label.gf-label {
    margin: 1rem 0 0.5rem 0;
    width: 100%;
    display: inline-block;
    font-style: italic;
    font-weight: bold;
  }
  textarea {
    width: 100%;
    background-color: inherit;
    color: inherit;
  }
`;

const Checkbox = styled.div`
  text-align: left;
  .checkbox {
    color-scheme: auto;
    padding: 0 0.5rem;
    cursor: pointer;
    input {
      margin-right: 0.25rem;
    }
    label {
      margin-left: 0.25rem;
      cursor: pointer;
    }
  }
`;

export const Form = ({ formID, populatedFields }) => {
  return (
    <GravityFormWrapper>
      <GravityForm
        backendUrl="https://detroitartdao.com/wp-json/glamrock/v1/gf/forms"
        formID={formID}
        // onChange={someFunction} // optional - keep all entered values as parameter
        // onSubmitSuccess={someFunction} // optional - calls after form has been submitted successfully
        // onError={handlerFunction} // optional - fires on GF error (gform_validation hook)
        styledComponents={{
          Button,
          Checkbox,
          Loading,
        }} // optional
        populatedFields={populatedFields}
        // jumpToConfirmation={false} // optional, default is equal to true
        // submitComponent={Component} // optional - pass your <Component/> (like loading, another button...) to render in front of the submit button
        // getParams={{}} // optional - pass an Object with your params to send the GF request with query string included
      />
    </GravityFormWrapper>
  );
};
