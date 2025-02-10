import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { DefaultSeo } from "next-seo";
import { Social } from "./Social";
import { DPoP } from "../components/Auth/DPoP";
import { NextSeo, NextSeoProps } from "next-seo";

export interface HeaderProps {
  disableDPoP: boolean;
  hideFooter: boolean;
};

export interface PageProps {
  headerProps: HeaderProps;
  meta: NextSeoProps;
};

export const Page = ({ children, headerProps, meta }) => {
  // React.useEffect(() => {
  //     ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
  //         console.log(accounts)
  //     })
  // }, []);
  return (
    <Container>
      {!headerProps?.hideNavigation && (
        <>
          <Spacer />
          <Header>
            <Link href="/">
              <img
                width="40"
                src="https://thedetroitilove.com/wp-content/uploads/2022/08/TDIL-acid-heart-700x688.png"
                className="custom-logo"
                alt=""
              />
            </Link>
            {/* <Link href="/going">Going</Link> */}
          </Header>
        </>
      )}
      <NextSeo {...meta} />
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_IE",
        }}
      />
      <Content>{children}</Content>
      {/* {!headerProps?.disableDPoP && <DPoP onLoad={() => {}} />} */}
      {!headerProps?.hideFooter && (
        <>
          <Footer>
            <a href="https://thedetroitilove.com/" target="_blank">
              <img
                width="80"
                src="https://thedetroitilove.com/wp-content/uploads/2022/08/TDIL-acid-heart-700x688.png"
                className="custom-logo"
                alt=""
              />
            </a>
            <div>
              <p>
                Looking for something fun to do tonight? Look no further than
                the{" "}
                <a href="https://thedetroitilove.com/" target="_blank">
                  detroitilove.com
                </a>
                .
              </p>
            </div>

            {/* <Social
              discord={"https://discord.gg/bK8wjhS2Mg"}
              instagram={"https://www.instagram.com/stucrew202/"}
            /> */}
          </Footer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div``;

const Spacer = styled.div`
  height: 68px;
`;

const Content = styled.div`
  min-height: 90vh;
`;

const Header = styled.div`
  text-align: center;
  padding: 0.5rem;
  padding-top: 0.75rem;
  background-color: #d2e4dd;
  border-bottom: solid 2px #ddd;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;

const Footer = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #d2e4dd;
  border-top: solid 2px #ddd;
`;
