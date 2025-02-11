import React from "react";
import styled from "@emotion/styled";
import { getProfile, User } from "../../dpop";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";
import { formatPhoneNumber } from "../../utils/phone";
import CommunityCard from "../../components/CommunityCard";

interface ProfilePageProps {
  user: User;
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const router = useRouter();

  const phone = formatPhoneNumber(user.phone);

  return (
    <ProfileWrapper>
      <ProfileContent>
        <div className="profile-info">
          {user && (
            <div className="user-info">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 3,
                  position: "relative",
                  width: "100%",
                }}
              >
                <Avatar
                  src={user.profile_picture || undefined}
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
              <Box sx={{ "& > div": { marginBottom: 2 } }}>
                <InfoField>
                  <label>Name</label>
                  <div>{user.public_name || user.name}</div>
                </InfoField>
                {user.organization && (
                  <InfoField>
                    <label>Organization</label>
                    <div>{user.organization}</div>
                  </InfoField>
                )}
              </Box>
            </div>
          )}
        </div>
        {user.communities && user.communities.length > 0 && (
          <InfoField>
            <label>Communities</label>
            <div className="communities-grid">
              {user.communities.map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  variant="compact"
                />
              ))}
            </div>
          </InfoField>
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

const ProfileContent = styled.div`
  padding: 2rem;
  width: 100%;
  max-width: 600px;

  .profile-info {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h2 {
      margin-bottom: 2rem;
      color: #333;
      text-align: center;
    }

    .user-info {
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
`;

const InfoField = styled.div`
  margin-top: 1rem;
  label {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
    display: block;
  }

  div {
    font-size: 1.1rem;
    color: #333;
  }
`;

export default ProfilePage;
