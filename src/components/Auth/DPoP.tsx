import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LazyLoad from "react-lazy-load";
import { getUserCID, saveContact, saveUserCID } from "../../dpop";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: 'white',
  border: "1px solid #ddd",
  borderRadius: "4px",
};

export const DPoP = ({ onLoad }) => {
  const [isReady, setIsReady] = React.useState<boolean>(false);
  const [requestedContactCID, setRequestedContactCID] = React.useState<
    string | null
  >(null);
  const [show, setShow] = React.useState<boolean>(false);

  React.useEffect(() => {
    const receiveMessage = (event) => {
      // Make sure the message is from a trusted source
      // if (event.origin !== "https://builddetroit.xyz") return;
      if (!event.data || typeof event.data !== "string") return;

      // Display the message from the iframe
      console.log(
        "Received message from iframe: " + JSON.stringify(event.data)
      );
      
      try {
        const data = JSON.parse(event.data);
        if (typeof data === "object") {
          // console.log("CHECK CONTACT: ", data, requestedContactCID);
          saveUserCID(requestedContactCID);
          saveContact(data);
          setShow(false);
        }
        return;
      } catch (error) {
        
      }

      if (typeof event.data === "string") {
        const cid = getUserCID();
        if (cid !== event.data) {
          // console.log('setRequestedContactCID(event.data);: ', event.data);
          setRequestedContactCID(event.data);
          setShow(true);
        }
      }
    };

    // Bind the event listener
    window.addEventListener("message", receiveMessage, false);

    setIsReady(true);

    return () => {
      // Unbind the event listener on clean up
      window.removeEventListener("message", receiveMessage, false);
    };
  }, [onLoad, requestedContactCID]);;

  return (
    <LazyLoad>
      <>
        {isReady && (
          <div>
            <iframe
              src="https://builddetroit.xyz/dpop"
              width={0}
              height={0}
              frameBorder="none"
            ></iframe>
          </div>
        )}
        {show && requestedContactCID && (
          <Modal open={show} onClose={() => setShow(false)}>
            <Box sx={style}>
              <iframe
                src="https://builddetroit.xyz/dpop/request"
                frameBorder="none"
                width={300}
              ></iframe>
            </Box>
          </Modal>
        )}
      </>
    </LazyLoad>
  );
};
