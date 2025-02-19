import React from "react";
import styled from "@emotion/styled";
import { getUser, logout, User, getConnections } from "../../dpop";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { EventInfo } from "../../components/Events/EventInfo";
import { EventBookmark } from "../../components/Events/EventBookmark";
import { useBookmarks } from "../../hooks/useBookmarks";
import { useRSVPs } from "../../hooks/useRSVPs";
import { useConnections } from "../../hooks/useConnections";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);
  const { bookmarkedEvents, loadBookmarks } = useBookmarks();
  const { rsvps } = useRSVPs();
  const { connections } = useConnections();
  const [activeTab, setActiveTab] = React.useState("profile");

  React.useEffect(() => {
    const user = getUser();
    setUser(user);
    if (!user) {
      window.location.href = "/login";
    }
    if (!bookmarkedEvents.length) {
      loadBookmarks();
    }
  }, []);

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
                    <div>{user.name}</div>
                  </InfoField>
                  <InfoField>
                    <div>{user.email}</div>
                  </InfoField>
                  {user.phone && (
                    <InfoField>
                      <div>{formatPhoneNumber(user.phone)}</div>
                    </InfoField>
                  )}
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

        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <TabList onChange={(e, val) => setActiveTab(val)}>
              <Tab label="RSVPs" value="profile" />
              <Tab label="Bookmarks" value="bookmarks" />
              <Tab label="Connections" value="connections" />
            </TabList>
          </Box>

          <TabPanel value="profile" sx={{ p: 0 }}>
            {rsvps && rsvps.length > 0 && (
              <div className="rsvp-events">
                <div className="events-list">
                  {rsvps.map((rsvp) => (
                    <div key={rsvp.id} className="event-list-item">
                      <a href={`/event/${rsvp.event.slug}`}>
                        <EventInfo event={rsvp.event} variant="nano" header={3} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabPanel>

          <TabPanel value="bookmarks" sx={{ p: 0 }}>
            <div className="bookmarked-events">
              {bookmarkedEvents.length > 0 ? (
                <div className="events-list">
                  {bookmarkedEvents.map((event) => (
                    <div key={event.id} className="event-list-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <a href={`/event/${event.slug}`} style={{ flex: 1 }}>
                        <EventInfo event={event} variant="nano" header={3} />
                      </a>
                      <EventBookmark event={event} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-events">No bookmarked events yet</p>
              )}
            </div>
          </TabPanel>

          <TabPanel value="connections" sx={{ p: 0 }}>
            <div className="connections">
              {connections.length > 0 ? (
                <div className="connections-list">
                  {connections.map((c) => (
                    <div key={c.id} className="connection-item">
                      <a href={`/profile/${c.connection.id}`}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar 
                            src={c.connection.profile_picture || undefined}
                            sx={{ width: 50, height: 50 }}
                          />
                          <Box>
                            <div>{c.connection.name}</div>
                            {c.connection.organization && (
                              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                                {c.connection.organization}
                              </div>
                            )}
                          </Box>
                        </Box>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-connections">No connections yet</p>
              )}
            </div>
          </TabPanel>
        </TabContext>
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

  .bookmarked-events, .rsvp-events, .connections {
    /* background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
    margin-bottom: 2rem;

    h2 {
      margin-bottom: 1rem;
      color: #333;
      font-size: 1.2rem;
    }

    .events-list, .connections-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .no-events, .no-connections {
      text-align: center;
      color: #666;
      font-style: italic;
    }

    .event-list-item a, .connection-item a {
      text-decoration: none;
      color: inherit;
    }

    .connection-item {
      padding: 1rem;
      border-radius: 4px;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f5f5f5;
      }
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
