import React from "react";
import styled from "@emotion/styled";
import { getProfile, User } from "../../dpop";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";
import { formatPhoneNumber } from "../../utils/phone";
import CommunityCard from "../../components/CommunityCard";
import { EventInfo } from "../../components/Events/EventInfo";
import { useRSVPs } from "../../hooks/useRSVPs";

interface ProfilePageProps {
  user: User;
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const router = useRouter();
  const phone = formatPhoneNumber(user.phone);
  const { rsvps } = useRSVPs(user.id);

  return (
    <ProfileWrapper>
      <ProfileContent>
        <div className="profile-info">
          {user && (
            <div className="user-info">
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Avatar
                  src={user.profile_picture || undefined}
                  sx={{ width: 80, height: 80 }}
                />
                <Box>
                  <InfoField>
                    <div>{user.name}</div>
                  </InfoField>
                  {user.organization && (
                    <InfoField>
                      <div>{user.organization}</div>
                    </InfoField>
                  )}
                </Box>
              </Box>
            </div>
          )}
        </div>
        {user.communities && user.communities.length > 0 && (
          <>
            <label>Communities</label>
            <ScrollSection>
              <div className="communities-grid">
                {user.communities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    variant="compact"
                  />
                ))}
              </div>
            </ScrollSection>
          </>
        )}
        {rsvps && rsvps.length > 0 && (
          <>
            <label>Event RSVPs</label>
            <div className="events-grid">
              {rsvps.map((rsvp) => (
                <EventInfo
                  key={rsvp.event.id}
                  event={rsvp.event}
                  variant="nano"
                />
              ))}
            </div>
          </>
        )}
      </ProfileContent>
    </ProfileWrapper>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    const result = await getProfile(params.id);

    if (!result.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        user: result.data,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      notFound: true,
    };
  }
};

const ProfileWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ScrollSection = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  padding: 1rem 0;
  -webkit-overflow-scrolling: touch;

  .communities-grid {
    display: inline-flex;
    gap: 1rem;
  }
`;

const ProfileContent = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 1.5rem;

  .profile-info {
    margin-bottom: 2rem;

    .user-info {
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }

  .events-grid {
    display: grid;
    gap: 1rem;
    margin-top: 0.5rem;
  }
`;

const InfoField = styled.div`
  margin-top: 0.5rem;
  
  label {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.25rem;
    display: block;
  }

  div {
    font-size: 1.1rem;
    color: #333;
  }
`;

export default ProfilePage;
