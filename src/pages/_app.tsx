import '../styles/globals.css';
import React from 'react';
import { Page } from "../components/Page";
import Head from "next/head";
import { AppProps } from "next/app";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";

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
        <link rel="icon" href="https://detroitartdao.com/wp-content/uploads/2022/08/cropped-Screen-Shot-2022-08-14-at-2.10.22-AM-32x32.png" sizes="32x32"></link>
        <link rel="icon" href="https://detroitartdao.com/wp-content/uploads/2022/08/cropped-Screen-Shot-2022-08-14-at-2.10.22-AM-192x192.png" sizes="192x192"></link>
        <link rel="apple-touch-icon" href="https://detroitartdao.com/wp-content/uploads/2022/08/cropped-Screen-Shot-2022-08-14-at-2.10.22-AM-180x180.png"></link>
      </Head>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <iframe src="https://dpop.tech/dpop"></iframe> */}
          <Component {...pageProps} />
        </ThemeProvider>
      </LocalizationProvider>
    </Page>
  );
}

export default MyApp;
