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
      <div>YOUR RAFFLE NUMBER</div>
      <Number className="raffle-id"># {checkIn.user?.id}</Number>
    </RaffleWrapper>
  );
};

const RaffleWrapper = styled.div`
  text-align: center;
  font-size: 1.8rem;
`;

const Number = styled.div`
  font-weight: bold;
  font-size: 4rem;
  line-height: 4rem;
`;
