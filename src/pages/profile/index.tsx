import React from "react";
import styled from "@emotion/styled";
import { getUser, logout, User } from "../../dpop";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { EventInfo } from "../../components/Events/EventInfo";
import { useEvents } from "../../hooks/useEvents";
import { EventBookmark } from "../../components/Events/EventBookmark";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);
  const [bookmarkedEvents, setBookmarkedEvents] = React.useState([]);
  const [events] = useEvents();

  React.useEffect(() => {
    const user = getUser();
    setUser(user);
    if (!user) {
      window.location.href = "/login";
    }

    const bookmarkedEvents = JSON.parse(
      localStorage.getItem("bookmarkedEvents") || "[]"
    );
    const bookmarkedEventsData = events.filter((event) =>
      bookmarkedEvents.includes(event.id)
    );
    setBookmarkedEvents(bookmarkedEventsData);
  }, [events]);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return "";
    const digits = value.replace(/\D/g, "");
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
            mb: 2,
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
        </Box>

        <div className="profile-info">
          {user && (
            <div className="user-info">
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 3 }}
              >
                <Avatar
                  src={user.profile_picture || undefined}
                  sx={{ width: 80, height: 80 }}
                />
                <Box>
                  <InfoField>
                    {/* <label>Name</label> */}
                    <div>{user.name}</div>
                  </InfoField>
                  <InfoField>
                    {/* <label>Email</label> */}
                    <div>{user.email}</div>
                  </InfoField>
                  {user.phone && (
                    <InfoField>
                      {/* <label>Phone</label> */}
                      <div>{formatPhoneNumber(user.phone)}</div>
                    </InfoField>
                  )}
                  {user.organization && (
                    <InfoField>
                      {/* <label>Organization</label> */}
                      <div>{user.organization}</div>
                    </InfoField>
                  )}
                </Box>
              </Box>
              {/* <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
              >
                {user.public_name && (
                  <InfoField>
                    <label>Public Name</label>
                    <div>{user.public_name}</div>
                  </InfoField>
                )}
              </Box> */}
            </div>
          )}
        </div>

        <div className="bookmarked-events">
          <h2>Bookmarked</h2>
          {bookmarkedEvents.length > 0 ? (
            <div className="events-list">
              {bookmarkedEvents.map((event) => (
                <div key={event.id} className="event-list-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <a href={`/event/${event.slug}`} style={{ flex: 1 }}>
                    <EventInfo event={event} variant="compact" header={3} />
                  </a>
                  <EventBookmark eventId={event.id} />
                </div>
              ))}
            </div>
          ) : (
            <p className="no-events">No bookmarked events yet</p>
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
  padding: 1rem;
  width: 100%;
  max-width: 600px;

  .profile-info {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .bookmarked-events {
    h2 {
      margin-bottom: 1rem;
      color: #333;
      font-size: 1.2rem;
    }

    .events-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .no-events {
      text-align: center;
      color: #666;
      font-style: italic;
    }

    .event-list-item a {
      text-decoration: none;
      color: inherit;
    }
  }
`;

const InfoField = styled.div`
  label {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 0.15rem;
    display: block;
  }

  div {
    font-size: 1rem;
    color: #333;
  }
`;

export default ProfilePage;
