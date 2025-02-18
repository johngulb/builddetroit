import React from "react";
import styled from "@emotion/styled";
import QRCode from "react-qr-code";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ButtonLink } from "./Styled";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "85%",
  bgcolor: "background.paper",
  borderRadius: "2px",
  boxShadow: 24,
};

interface ShareProps {
  url: string;
  title: string;
}

export const Share: React.FC<React.PropsWithChildren<ShareProps>> = ({
  url,
  title,
}) => {
  const [show, setShow] = React.useState<boolean>(false);

  const handleShare = React.useCallback(() => {
    setShow(true);
  }, [setShow]);

  const shareUrl = url;
  const shareText = `Check out ${title}`;

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleEmailShare = () => {
    window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <>
      <ButtonLink className="share-button" onClick={handleShare}>
        <i className="fas fa-share-alt" style={{margin: '8px 0px'}}></i>
      </ButtonLink>
      <Modal open={show} onClose={() => setShow(false)}>
        <Box sx={style}>
          <ShareQRCodeWrapper>
            <p style={{ fontSize: 18 }}>Share</p>
            <div className="social-buttons">
              <button onClick={handleFacebookShare}>
                <i className="fab fa-facebook"></i>
              </button>
              <button onClick={handleTwitterShare}>
                <i className="fab fa-twitter"></i>
              </button>
              <button onClick={handleLinkedInShare}>
                <i className="fab fa-linkedin"></i>
              </button>
              <button onClick={handleEmailShare}>
                <i className="fas fa-envelope"></i>
              </button>
            </div>
            <div style={{ marginTop: 16 }}>
              <QRCode value={shareUrl} />
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

  .social-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1rem 0;

    button {
      background: #333;
      color: white;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;

      &:hover {
        background-color: #555;
      }
    }
  }
`;
