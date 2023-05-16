import "../styles/globals.css";
import React from "react";
import { Page } from "../components/Page";
import Head from "next/head";
import { AppProps } from "next/app";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import Script from "next/script";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51N1IRSJuhSW8YwTngfTsCvmHMPtquZYLkoYhBCsr2Aap3D8KegOFsLt9wGDjSL9AmOJvNc4DgnLaCj2Y2qG44t5n00xEsKGL02"
);

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  // React.useEffect(() => {
  //   const receiveMessage = (event) => {
  //     console.log("Received event: ", event);

  //     // Make sure the message is from a trusted source
  //     if (event.origin !== "https://builddetroit.xyz") return;

  //     // Display the message from the iframe
  //     console.log("Received message from iframe: ", event.data);
  //   };
  //   window.addEventListener("message", receiveMessage, false);
  // });

  return (
    <Page {...pageProps}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="https://detroitartdao.com/wp-content/uploads/2022/08/cropped-Screen-Shot-2022-08-14-at-2.10.22-AM-32x32.png"
          sizes="32x32"
        ></link>
        <link
          rel="icon"
          href="https://detroitartdao.com/wp-content/uploads/2022/08/cropped-Screen-Shot-2022-08-14-at-2.10.22-AM-192x192.png"
          sizes="192x192"
        ></link>
        <link
          rel="apple-touch-icon"
          href="https://detroitartdao.com/wp-content/uploads/2022/08/cropped-Screen-Shot-2022-08-14-at-2.10.22-AM-180x180.png"
        ></link>
      </Head>
      <Script src="https://js.pusher.com/7.2/pusher.min.js" />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={theme}>
          <Elements stripe={stripePromise}>
            <CssBaseline />
            {/* <iframe src="https://dpop.tech/dpop"></iframe> */}
            <Component {...pageProps} />
          </Elements>
        </ThemeProvider>
      </LocalizationProvider>
    </Page>
  );
}

export default MyApp;
