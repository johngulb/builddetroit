import React from "react";
import styled from "@emotion/styled";
import LazyLoad from "react-lazy-load";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { ButtonLink } from "../Styled";
import StripeCheckout from "react-stripe-checkout";

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

const ModalWrapper = styled.div`
  .modal-content {
    border-radius: 0;
  }
`;

export const EventCheckoutModal = ({ show, setShow, onSubmit }) => {
  const handleToken = React.useCallback(() => {}, []);

  return (
    <LazyLoad>
      <ModalWrapper>
        <Modal open={show} onClose={() => setShow(false)}>
          <Box sx={style}>
            <StripeCheckout
              token={handleToken}
              stripeKey="your_stripe_public_key"
              amount={1000}
              currency="USD"
              name="Example Company"
              description="Example purchase"
              image="https://example.com/logo.png"
            />
          </Box>
        </Modal>
      </ModalWrapper>
    </LazyLoad>
  );
};

export const EventPurchaseRaffleTicket = ({ event, rsvp }) => {
  const [showCheckout, setShowCheckout] = React.useState<boolean>(true);

  const handleGetRaffleTicket = React.useCallback(() => {
    setShowCheckout(true);
  }, []);

  const handleTicketPurchase = React.useCallback(() => {
    setShowCheckout(false);
  }, []);

  return (
    <>
      <EventCheckoutModal
        show={showCheckout}
        setShow={setShowCheckout}
        onSubmit={handleTicketPurchase}
      />
      <ButtonLink onClick={handleGetRaffleTicket}>GET RAFFLE TICKET</ButtonLink>
    </>
  );
};
