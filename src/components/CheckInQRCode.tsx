import React from "react";
import styled from "@emotion/styled";
import { DPoPEvent, DPoPEventCheckIn } from "../dpop";
import QRCode from "react-qr-code";
import { ButtonLink } from "./ButtonLink";

interface RaffleNumberProps {
  checkIn: DPoPEventCheckIn;
  event: DPoPEvent;
  type?: "check-in" | "connect";
}

export const CheckInQRCode: React.FC<
  React.PropsWithChildren<RaffleNumberProps>
> = ({ checkIn, event, type = "check-in" }) => {
  return (
    <CheckInQRCodeWrapper>
      <p style={{ fontSize: 14 }}>
        <b>Share this QR code to connect.</b>
      </p>
      <div style={{ marginTop: 16 }}>
        <QRCode
          value={`${process.env.NEXT_PUBLIC_SITE_URL}/event/${event.slug}/${type}?attestator=${checkIn.user_cid}`}
        />
      </div>
    </CheckInQRCodeWrapper>
  );
};

const CheckInQRCodeWrapper = styled.div`
  padding: 1rem;
  text-align: center;
`;
