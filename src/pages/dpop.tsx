import React from "react";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import { getContact } from "../dpop";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const PageContainer = styled.div`
  text-align: center;
  display: block;
  max-width: 700px;
  margin: auto;

  .logo {
    
  }
`;

const HomePage = () => {

  React.useEffect(() => {
    console.log("HI!");
    const contact = getContact();
    const cid = contact.cid ?? null;
    window.parent.postMessage(cid, "*");
  });

  return (
    <PageWrapper>
      <NextSeo
        title={`Build Detroit`}
        description="Our mission is to leverage open source technology to build a better
        future for Detroit. We are committed to provide educational resources that empower individuals
        and organizations to solve problems, innovate, and build the future
        they want to see."
        canonical={`https://builddetroit.xyz`}
      />
      <PageContainer>

      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      headerProps: {
        hideNavigation: true,
      },
    },
  };
};
export default HomePage;
