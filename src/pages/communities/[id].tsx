import React from "react";
import styled from "@emotion/styled";
import { EventList } from "../../components/Events/EventList";
import { NextSeo } from 'next-seo';
import { Community, getCommunity, getEvents } from "../../dpop";

interface CommunityPageProps {
  community: Community;
  events: any[];
}

const CommunityPage = ({ community, events }: CommunityPageProps) => {
  return (
    <PageWrapper>
      <NextSeo
        title={`${community.name} Community | Detroit Events`}
        description={community.description}
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/communities/${community.name.toLowerCase()}`}
      />
      <PageContainer>
        <h1>{community.name}</h1>
        
        {community.image && (
          <img 
            src={community.image}
            alt={`${community.name} community`}
            className="community-image"
          />
        )}

        <div className="description">
          {community.description}
        </div>

        <h2>Upcoming Events</h2>
        <EventList events={events} variant="compact" loadMore={false} />
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    // Fetch community data
    const community = await getCommunity(params.id);

    // Fetch events for this community
    const events = await getEvents({type: community.data.type, limit: 18, offset: 0});

    return {
      props: {
        community,
        events,
      },
    };
  } catch (error) {
    console.error('Error fetching community data:', error);
    return {
      notFound: true
    };
  }
};

export default CommunityPage;


export const PageWrapper = styled.div`
  background-color: #fafafa;
  max-width: 900px;
  margin: auto;
  img {
    margin-top: 1rem;
    max-width: 100%;
  }
`;

const PageContainer = styled.div`
  padding: 1rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 2rem 0 1rem;
  }

  .description {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 2rem;
  }

  .community-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
    margin: 1rem 0 2rem;
  }
`;