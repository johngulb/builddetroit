import React from "react";
import styled from "@emotion/styled";
import { DPoPEventCheckIn } from "../dpop";

interface RaffleNumberProps {
  checkIn: DPoPEventCheckIn;
}

export const RaffleNumber: React.FC<
  React.PropsWithChildren<RaffleNumberProps>
> = ({ checkIn }) => {
  return (
    <RaffleWrapper>
      {/* {checkIn.rsvp && (
        <Number className="raffle-id">{`${
          checkIn.rsvp?.confirmed ? "CONFIRMATION" : ""
        } #${checkIn.rsvp?.number}`}</Number>
      )} */}
      {/* {!checkIn.rsvp && (
        <>
          <div>MISSING CONFIRMATION</div>
        </>
      )} */}
      <div>YOUR RAFFLE NUMBER</div>
      <Number className="raffle-id"># {checkIn.user?.id}</Number>
    </RaffleWrapper>
  );
};

const RaffleWrapper = styled.div`
  text-align: center;
  font-size: 1.8rem;
  padding: 1rem;
  border: solid 1px #999;
  margin-top: 24px;
`;

const Number = styled.div`
  font-weight: bold;
  font-size: 3rem;
  line-height: 3rem;
`;
