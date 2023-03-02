import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { DefaultSeo } from "next-seo";

export const Page = ({ children, headerProps }) => {
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
                src="https://detroitartdao.com/wp-content/uploads/2022/08/cropped-DETROITART-LOGO.png"
                className="custom-logo"
                alt=""
              />
            </Link>
          </Header>
        </>
      )}
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://builddetroit.xyz/",
          siteName: "Detroit Art | Community Events",
        }}
        // twitter={{
        //   handle: "@handle",
        //   site: "@site",
        //   cardType: "summary_large_image",
        // }}
      />
      <Content>{children}</Content>
      {!headerProps?.hideNavigation && (
        <Footer>
          <img
            width="60"
            src="https://detroitartdao.com/wp-content/uploads/2022/08/cropped-DETROITART-LOGO.png"
            className="custom-logo"
            alt=""
          />
        </Footer>
      )}
    </Container>
  );
};

const Container = styled.div``;

const Spacer = styled.div`
  height: 55px;
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
