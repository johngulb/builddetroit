import React from "react";
import styled from "@emotion/styled";
import { DPoPEvent } from "../../dpop";
import QRCode from "react-qr-code";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ButtonLink } from "../Styled";

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

interface EventShareProps {
  event: DPoPEvent;
}

export const EventShare: React.FC<React.PropsWithChildren<EventShareProps>> = ({
  event,
}) => {
  const [show, setShow] = React.useState<boolean>(false);

  const handleShare = React.useCallback(() => {
    setShow(true);
  }, [setShow]);

  return (
    <>
      <ButtonLink className="share-button" onClick={handleShare}>
        Share Event
      </ButtonLink>
      <Modal open={show} onClose={() => setShow(false)}>
        <Box sx={style}>
          <ShareQRCodeWrapper>
            <p style={{ fontSize: 18 }}>Share this event.</p>
            <div style={{ marginTop: 16 }}>
              <QRCode
                value={`${process.env.NEXT_PUBLIC_SITE_URL}/event/${event.slug}`}
              />
            </div>
          </ShareQRCodeWrapper>
        </Box>
      </Modal>
    </>
  );
};

const ShareQRCodeWrapper = styled.div`
  padding: 1rem;
  text-align: center;
`;
