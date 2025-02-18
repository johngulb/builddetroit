import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { DefaultSeo } from "next-seo";
import { NextSeo, NextSeoProps } from "next-seo";
import { useUser } from "../hooks/useUser";
import { AuthButton } from "./AuthButton";
import { TabNavigation } from "./Tabs";
import Hero from "./Hero";
import { Footer } from "./Footer";
export interface HeaderProps {
  disableDPoP: boolean;
  hideFooter: boolean;
}

export interface PageProps {
  headerProps: HeaderProps;
  meta: NextSeoProps;
}

export const Page = ({ children, headerProps, meta }) => {
  const user = useUser();

  return (
    <Container>
      {!headerProps?.hideNavigation && (
        <>
          <Spacer />
          <Header>
            <HeaderContent>
              <Link href="/">
                <img
                  width="40"
                  src="https://thedetroitilove.com/wp-content/uploads/2022/08/TDIL-acid-heart-700x688.png"
                  className="custom-logo"
                  alt=""
                />
              </Link>
              <AuthButton />
            </HeaderContent>
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
      {headerProps?.mainRoute && (
        <>
          <Hero
            title={
              <>
                Welcome to the
                <br />
                Renaissance City
              </>
            }
            subtitle="Our mission is to empower creators in Detroit by deploying technology that drives positive change in our community."
            image="https://dpop.nyc3.digitaloceanspaces.com/wp-content/uploads/2025/02/10201802/penobscot-e1739236711632.jpg"
          />
          <TabNavigation tab={headerProps.mainRoute} />
        </>
      )}
      <Content>{children}</Content>
      {!headerProps?.hideFooter && <Footer />}
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

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;
