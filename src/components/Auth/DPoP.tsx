import React from "react";
import LazyLoad from "react-lazy-load";

export const DPoP = ({ onLoad }) => {
  const [isReady, setIsReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    const receiveMessage = (event) => {
      // Display the message from the iframe
      console.log("Received message from iframe: " + event.data);

      // Make sure the message is from a trusted source
      if (event.origin !== "https://builddetroit.xyz") return;

      fetch(`https://api.dpop.tech/api/cid/${event.data}`, {
        headers: { "access-control": "no-cors" },
      })
        .then((res) => res.json())
        .then((res) => {
          alert(JSON.stringify(res));
          console.log(res);
          onLoad(res);
        });
    };

    // Bind the event listener
    document.addEventListener("message", receiveMessage, false);

    setTimeout(() => {
      setIsReady(true);
    }, 2000);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("message", receiveMessage, false);
    };
  }, [onLoad]);

  return (
    <LazyLoad>
      <>
        {isReady && (
          <iframe
            src="https://builddetroit.xyz/dpop"
            width={0}
            height={0}
            frameBorder="none"
          ></iframe>
        )}
      </>
    </LazyLoad>
  );
};
