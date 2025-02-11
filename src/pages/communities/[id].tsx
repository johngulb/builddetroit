import React from "react";
import styled from "@emotion/styled";
import { EventList } from "../../components/Events/EventList";
import { NextSeo } from "next-seo";
import {
  Community,
  getCommunity,
  getEvents,
  joinCommunity,
  leaveCommunity,
} from "../../dpop";
import { SectionTitle } from "../../components/Styled";
import { ButtonLink } from "../../components/Styled";
import { useCommunity } from "../../hooks/useCommunity";
import MemberCard from "../../components/MemberCard";

interface CommunityPageProps {
  community: Community;
  events: any[];
}

const CommunityPage = ({ community, events }: CommunityPageProps) => {
  const [activeTab, setActiveTab] = React.useState("events");
  const {
    community: communityDetails,
    isMember,
    toggleJoin,
  } = useCommunity(community.slug);

  return (
    <PageWrapper>
      <NextSeo
        title={`${community.name} Community | Detroit Events`}
        description={community.description}
        canonical={`${
          process.env.NEXT_PUBLIC_SITE_URL
        }/communities/${community.name.toLowerCase()}`}
      />
      <PageContainer>
        <div className="header-container">
          <h1>{community.name}</h1>
        </div>

        {community.image && (
          <img
            src={community.image}
            alt={`${community.name} community`}
            className="community-image"
          />
        )}

        <div className="description">{community.description}</div>

        <ButtonLink onClick={toggleJoin} className={isMember ? "hollow" : ""}>
          {isMember ? "Leave Community" : "Join Community"}
        </ButtonLink>

        <TabContainer>
          <TabButton
            active={activeTab === "events"}
            onClick={() => setActiveTab("events")}
          >
            Events
          </TabButton>
          <TabButton
            active={activeTab === "members"}
            onClick={() => setActiveTab("members")}
          >
            Members
          </TabButton>
        </TabContainer>

        {activeTab === "events" && (
          <>
            <SectionTitle>Upcoming Events</SectionTitle>
            <EventList
              events={events}
              variant="compact"
              loadMore={false}
              header={3}
            />
          </>
        )}

        {activeTab === "members" && (
          <div className="members-container">
            <SectionTitle>Community Members</SectionTitle>
            {communityDetails?.members &&
            communityDetails.members.length > 0 ? (
              <div className="members-grid">
                {communityDetails.members.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            ) : (
              <div>No members yet</div>
            )}
          </div>
        )}
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    // Fetch community data
    const community = await getCommunity(params.id);

    // Fetch events for this community
    const events = await getEvents({
      type: community.data.type,
      limit: 18,
      offset: 0,
    });

    return {
      props: {
        community,
        events,
      },
    };
  } catch (error) {
    console.error("Error fetching community data:", error);
    return {
      notFound: true,
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

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: ${(props) => (props.active ? "#000" : "#666")};
  border-bottom: 2px solid ${(props) => (props.active ? "#000" : "transparent")};
  transition: all 0.2s ease;

  &:hover {
    color: #000;
  }
`;

const PageContainer = styled.div`
  padding: 1rem;

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 1.8rem;
    font-weight: bold;
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

  .members-container {
    min-height: 200px;
  }
`;
