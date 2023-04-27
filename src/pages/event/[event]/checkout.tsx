import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { getEvent } from "../../../dpop";

const EventCheckout = ({ event }) => {
  const handleToken = React.useCallback(() => {}, []);

  return (
    <StripeCheckout
      token={handleToken}
      stripeKey="your_stripe_public_key"
      amount={1000}
      currency="USD"
      name="Example Company"
      description="Example purchase"
      image="https://example.com/logo.png"
    />
  );
};

export const getServerSideProps = async ({ query, res }) => {
  const event = await getEvent(query.event);
  return {
    props: {
      event,
    },
  };
};

export default EventCheckout;
