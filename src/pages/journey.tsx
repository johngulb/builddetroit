import React from "react";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";

const PageWrapper = styled.div`
  background-color: #fafafa;
  margin: auto;
  background-image: url("https://detroitartdao.com/wp-content/uploads/2024/02/dark-side-of-the-moon-galaxy.png");
  height: 100vh;
  background-size: cover;
  img {
    margin-top: 1rem;
  }
`;

const PageContainer = styled.div`
  padding: 1rem;
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  h3 {
    margin-top: 1em;
    margin-bottom: 0.25em;
    font-weight: bold;
    font-size: 1.8em;
    text-align: center;
    color: white;
  }
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  .button-container {
    margin-top: 1rem;
    button {
      padding: 0.5rem 1rem;
      border: solid 1px #fff;
      margin: 0.5rem;
      font-size: 1rem;
    }
  }
`;

const Page = ({ user }) => {

  const handleButtonPress = React.useCallback((e) => {
    console.log(e.target.innerHTML, e.target.id);
  }, []);

  return (
    <PageWrapper>
      <NextSeo
        title={`A Journey to the Dark Side of the Moon | Detroit Art`}
        description=""
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/journey`}
      />
      <PageContainer>
        <Content>
          <img
            alt="cosmonaut helmet"
            width={300}
            height={300}
            src="https://dpop.nyc3.digitaloceanspaces.com/wp-content/uploads/2024/02/06231740/dark-side-of-the-moon-cosmnaut-helmet-only-1.png"
          />
          <h3>Hello fellow traveler...<br />How are you doing on your journey?</h3>
          <div className="button-container">
            <button id="know" onClick={handleButtonPress}>I know where I am headed.</button>
            <button id="find" onClick={handleButtonPress}>I am finding my way.</button>
            <button id="lost" onClick={handleButtonPress}>I am lost. :(</button>
          </div>
        </Content>
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      headerProps: {
        hideNavigation: true,
        hideFooter: true,
      },
    },
  };
};

export default Page;
