import React from "react";
import styled from "@emotion/styled";
import { EventList } from "../../components/Events/EventList";
import { NextSeo } from "next-seo";
import { Community, getCommunity, getEvents } from "../../dpop";
import { ButtonLink } from "../../components/Styled";
import { useCommunity } from "../../hooks/useCommunity";
import MemberCard from "../../components/MemberCard";
import { useUser } from "../../hooks/useUser";
import Link from "next/link";
import { Share } from "../../components/Share";

interface CommunityPageProps {
  community: Community;
  events: any[];
}

const CommunityPage = ({ community, events }: CommunityPageProps) => {
  const [activeTab, setActiveTab] = React.useState("events");
  const user = useUser();
  const {
    community: communityDetails,
    isMember,
    toggleJoin,
  } = useCommunity(community.slug);

  return (
    <>
      <NextSeo
        title={`${community.name} Community | Detroit Events`}
        description={community.description}
        canonical={`${
          process.env.NEXT_PUBLIC_SITE_URL
        }/communities/${community.name.toLowerCase()}`}
      />
      <PageWrapper>
        <HeroSection>
          {community.image && (
            <HeroImage
              src={community.image}
              alt={`${community.name} community`}
            />
          )}
          <HeroContent>
            <h1>{community.name}</h1>
            <div className="description">{community.description}</div>
            <div className="action-buttons">
              {user ? (
                <ButtonLink
                  onClick={toggleJoin}
                  className={isMember ? "hollow" : ""}
                >
                  {isMember ? "Leave Community" : "Join Community"}
                </ButtonLink>
              ) : (
                <Link href="/register">Create Account to Join</Link>
              )}
              <Share
                url={`${process.env.NEXT_PUBLIC_SITE_URL}/communities/${community.slug}`}
                title={`Join our community: ${community.name}`}
              />
            </div>
          </HeroContent>
        </HeroSection>

        <PageContainer>
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
              Members ({communityDetails?.members?.length})
            </TabButton>
          </TabContainer>

          {activeTab === "events" && (
            <EventList
              events={events}
              variant="compact"
              loadMore={false}
              header={3}
            />
          )}

          {activeTab === "members" && user && (
            <div className="members-container">
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

          {activeTab === "members" && !user && (
            <div className="members-container">
              <div>
                Please <Link href="/register">register</Link> or{" "}
                <Link href="/login">login</Link> to see members
              </div>
            </div>
          )}
        </PageContainer>
      </PageWrapper>
    </>
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
`;
const HeroSection = styled.div`
  position: relative;
  width: 100vw;
  height: 400px;
  margin-bottom: 2rem;
  overflow: hidden;
  background-color: #000;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1rem;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    align-items: center;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 1rem;
    justify-content: flex-start;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
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

  .members-container {
    min-height: 200px;
    a {
      color: #0082ae;
      text-decoration: underline;
    }
  }
`;
