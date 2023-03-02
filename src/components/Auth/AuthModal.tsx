import React, { useState } from "react";
import LazyLoad from "react-lazy-load";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from '@emotion/styled'

import { AuthBox } from "./AuthBox";

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

export const AuthModal = ({ show, setShow, onAuthorized, mode }) => {
  return (
    <LazyLoad>
      <AuthModalWrapper>
        <Modal open={show} onClose={() => setShow(false)}>
          <Box sx={style}>
            <AuthBox mode={mode} onAuthorized={onAuthorized} />
          </Box>
        </Modal>
      </AuthModalWrapper>
    </LazyLoad>
  );
};

const AuthModalWrapper = styled.div`
  margin: 1rem;
  .modal-content {
    border-radius: 2px;
  }
`;
