import React from "react";
import styled from "@emotion/styled";
import { getUser, logout, User } from "../../dpop";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const user = getUser();
    setUser(user);
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return "";
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Format as (XXX) XXX-XXXX
    if (digits.length >= 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
        6,
        10
      )}`;
    }
    return value;
  };

  return (
    <ProfileWrapper>
      <ProfileContent>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
        >
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => router.push("/profile/edit")}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>{" "}
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
                  <div>{user.name}</div>
                </InfoField>
                {user.public_name && (
                  <InfoField>
                    <label>Public Name</label>
                    <div>{user.public_name}</div>
                  </InfoField>
                )}
                <InfoField>
                  <label>Email</label>
                  <div>{user.email}</div>
                </InfoField>
                {user.phone && (
                  <InfoField>
                    <label>Phone</label>
                    <div>{formatPhoneNumber(user.phone)}</div>
                  </InfoField>
                )}
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
      </ProfileContent>
    </ProfileWrapper>
  );
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
