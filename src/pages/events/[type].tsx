import React from "react";
import styled from '@emotion/styled'
import { EventList } from "../../components/Events/EventList";
import { NextSeo } from 'next-seo';

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
        title={`DPoP Labs presents a Holiday Raffle in Detroit | Detroit Art`}
        description='Check in at participating events Detroit Red Wings vs. Los Angeles Kings'
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/events`}
      />
      <PageContainer>
        <EventList events={events} variant="compact" />
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async ({ query }) => {
  const type = query.type;
  console.log(`https://api.dpop.tech/api/events?type=${type}`);
  const eventsRes = await fetch(`https://api.dpop.tech/api/events?type=${type}`);
  const fetchedEvents = await eventsRes.json();
  const events = fetchedEvents.data;
  return {
    props: {
      events,
      type,
    },
  };
};

export default Page;
