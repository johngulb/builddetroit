import React from "react";
import styled from "@emotion/styled";
import { ButtonLink } from "../components/ButtonLink";
import { NextSeo } from "next-seo";
import { EventList } from "../components/Events/EventList";

const PageWrapper = styled.div`
  background-color: #d1e4dd;
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const PageContainer = styled.div`
  text-align: center;
  display: block;
  max-width: 900px;
  margin: auto;
  img {
    padding: 1rem;
    margin: auto;
  }
  h1 {
    margin-bottom: 1rem;
    @media only screen and (max-width: 822px) {
      font-size: 3rem;
    }
  }
`;

// const PageWrapper = styled.div`
//   background-color: #fafafa;
//   max-width: 900px;
//   margin: auto;
//   img {
//     margin-top: 1rem;
//   }
// `;

// const PageContainer = styled.div`
//   padding: 1rem;
//   h3 {
//     margin-top: 1em;
//     margin-bottom: 0.25em;
//     font-weight: bold;
//     font-size: 1.3em;
//   }
// `;

const HomePage = ({
  events
}) => {
  return (
    <PageWrapper>
      <NextSeo
        title={`Build Detroit`}
        description="We are organizing a collective of creative people building cool things in Detroit with the plan to launch a DAO."
        canonical={`https://builddetroit.xyz`}
      />
      <PageContainer>
        {/* <img
          width="180"
          src="https://detroitartdao.com/wp-content/uploads/2022/08/cropped-DETROITART-LOGO.png"
          className="custom-logo"
          alt=""
        /> */}
        <h1>Hello Creative People of Detroit</h1>
        <p>
          We are organizing a collective of creative people building cool things in Detroit with the plan to launch a DAO.
        </p>
        <div>
          <ButtonLink
            href="https://builddetroit.zyz/join-us"
            target="_blank"
            rel="noreferrer"
          >
            BUILD WITH US
          </ButtonLink>
          <p>Find Us At Local Events</p>
          <EventList events={events} variant="compact" />
        </div>
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async () => {
  const eventsRes = await fetch('https://api.dpop.tech/api/events');
  const fetchedEvents = await eventsRes.json();
  const events = fetchedEvents.data;
  return {
    props: {
      events,
      headerProps: {
        hideNavigation: true,
      },
    },
  };
};
export default HomePage;
