import '../styles/globals.css';
import { Page } from "../components/Page";
import Head from "next/head";
import { AppProps } from "next/app";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Page>
  );
}

export default MyApp;
