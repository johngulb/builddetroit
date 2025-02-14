import React from "react";
import styled from '@emotion/styled'
import { EventList } from "../../components/Events/EventList";
import { NextSeo } from 'next-seo';
import { getEvents } from "../../dpop";

const PageWrapper = styled.div`
  background-color: #fafafa;
  max-width: 900px;
  margin: auto;
  img {
    margin-top: 1rem;
  }
`;

const PageContainer = styled.div`
  padding: 1rem;
  h3 {
    margin-top: 1em;
    margin-bottom: 0.25em;
    font-weight: bold;
    font-size: 1.3em;
  }
`;

const Page = ({ events }) => {
  return (
    <PageWrapper>
      <NextSeo
        title={`Find Events in Detroit | Detroit Art`}
        description='Explore the local art and tech scene in Detroit. RSVP to the next event and come out to learn about web3!'
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/events`}
      />
      <PageContainer>
        <EventList events={events} variant="compact" loadMore={true} />
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async ({ res }) => {
  const events = await getEvents({
    limit: 18,
  });
  return {
    props: {
      events,
      headerProps: {
        mainRoute: "events",
      },
    },
  };
};

export default Page;
