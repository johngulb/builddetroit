import React from "react";
import { useEffect, useState } from "react";
import {
  Contact,
  getCheckIn,
  getContent,
  getEvent,
  getEvents,
  submitEventCheckIn,
  createEventConnection,
  getEventConnections,
  getContact,
  getUser,
  submitEventConfirmationCheckIn,
  getRsvps,
} from "../../../dpop";
import styled from "@emotion/styled";
import { ContactBox } from "../../../components/ContactBox";
import { UserCard } from "../../../components/UserCard";
import { CheckInQRCode } from "../../../components/CheckInQRCode";
import { EventInfo } from "../../../components/Events/EventInfo";
import { Card, Link } from "@mui/material";
import { Register } from "../../../components/Auth/Register";
import { AuthModal } from "../../../components/Auth/AuthModal";
import { ButtonLink } from "../../../components/ButtonLink";

const ConnectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 0;
  gap: 1rem;
`;

const OuterCircle = styled.div`
  width: 96px;
  height: 96px;
  border: 2px solid #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MiddleCircle = styled.div`
  width: 72px;
  height: 72px;
  border: 2px solid #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.div`
  width: 48px;
  height: 48px;
  background-color: #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConnectText = styled.p`
  margin: 0;
  text-align: center;
`;

const PageContainer = styled.div`
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 0.5rem;
`;

const StatusMessage = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const ConnectionsList = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactBoxWrapper = styled.div`
  margin: 3rem 0;
`;

const StyledCard = styled(Card)`
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const CardTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const UpcomingEventsWrapper = styled.div`
  margin-top: 1rem;
  text-align: left;
`;

const UpcomingEventsTitle = styled.h4`
  margin: 1rem 0;
  font-size: 1rem;
`;

const ConnectionsTitle = styled.h3`
  margin-top: 2rem;
  font-size: 1.2rem;
`;

const StatusText = styled.p`
  font-size: 1.1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ConnectPage = ({ attestator, attestator_cid, event, events }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [isLoadingCheckIn, setIsLoadingCheckIn] = useState(true);
  const [connection, setConnection] = useState(null);
  const [connections, setConnections] = useState([]);
  const [upcomingRSVPs, setUpcomingRSVPs] = useState([]);
  const [contact, setContact] = useState(null);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  useEffect(() => {
    if (checkIn) {
      getEventConnections(event.slug).then((connections) => {
        setConnections(connections);
      });
    }
  }, [event.slug, checkIn]);

  const handleCheckIn = React.useCallback(
    (contact: Contact) => {
      submitEventCheckIn(event.slug, contact, attestator_cid).then(
        (checkIn) => {
          setCheckIn(checkIn);
          setContact(contact);
          setIsLoadingCheckIn(false);
        }
      );
    },
    [attestator_cid, event.slug]
  );

  useEffect(() => {
    setIsLoadingCheckIn(true);
    const checkIn = getCheckIn(event.cid);
    setCheckIn(checkIn);
    setIsLoadingCheckIn(false);

    const contact = getContact();
    setContact(contact);
    const user = getUser();
    setUser(user);

    if (!checkIn) {
      if (contact) {
        handleCheckIn(contact);
      } else if (user) {
          submitEventConfirmationCheckIn(
          event.slug,
          user.cid,
          attestator_cid
        ).then((checkIn) => {
          setCheckIn(checkIn);
          setIsLoadingCheckIn(false);
        });
      }
    }
  }, [attestator_cid, event.cid, event.slug, handleCheckIn]);

  React.useEffect(() => {
    if (checkIn) {
      setIsLoadingCheckIn(false);
      createEventConnection(event.slug, attestator_cid).then((connection) => {
        console.log(connection);
        setConnection(connection);
        // Refresh connections list after new connection
        getEventConnections(event.slug).then((connections) => {
          setConnections(connections);
        });
      });
    }
  }, [checkIn, event.slug, attestator_cid]);

  React.useEffect(() => {
    const upcomingRSVPs = connection?.connection?.rsvps?.filter(
      (rsvp) => rsvp.event.id !== event.id
    );
    const sortedRSVPs = upcomingRSVPs?.sort((a, b) => {
      const dateA = new Date(a.event.start_date);
      const dateB = new Date(b.event.start_date);
      return dateA.getTime() - dateB.getTime();
    });
    setUpcomingRSVPs(sortedRSVPs);
  }, [connection?.connection?.rsvps, event.id]);

  return (
    <PageContainer>
      {/* {checkIn && (
        <StatusMessage>
          <StatusText>✓ You&apos;re checked in</StatusText>
        </StatusMessage>
      )} */}

      {isLoadingCheckIn && (
        <StatusMessage>
          <StatusText>Loading check-in status...</StatusText>
        </StatusMessage>
      )}

      {!checkIn && !isLoadingCheckIn && (
        <ContactBoxWrapper>
          <ContactBox
            bodyContent=""
            titleText=""
            buttonText="Connect"
            onSubmit={handleCheckIn}
            variant="simple"
          />
        </ContactBoxWrapper>
      )}

      {checkIn && !connection && (
        <ConnectContainer>
          <OuterCircle>
            <MiddleCircle>
              <InnerCircle />
            </MiddleCircle>
          </OuterCircle>
          <ConnectText>Creating connection...</ConnectText>
        </ConnectContainer>
      )}

      {connection && (
        <StyledCard>
          <CardTitle>You are now connected!</CardTitle>
          <StyledLink href={`/profile/${connection.connection.id}`}>
            <UserCard user={connection.connection} variant="vertical" />
          </StyledLink>
          {upcomingRSVPs?.length > 0 && (
            <UpcomingEventsWrapper>
              <UpcomingEventsTitle>
                Events {connection.connection.name} is attending:
              </UpcomingEventsTitle>
              {upcomingRSVPs?.map((rsvp) => (
                <div key={rsvp.id} style={{ marginBottom: "1rem" }}>
                  <a href={`/event/${rsvp.event.slug}`}>
                    <EventInfo
                      event={rsvp.event}
                      variant="compact"
                      header={3}
                    />
                  </a>
                </div>
              ))}
            </UpcomingEventsWrapper>
          )}
        </StyledCard>
      )}

      {contact && !user && (
        <>
          <AuthModal
            show={showAuthModal}
            setShow={setShowAuthModal}
            onAuthorized={(user) => {
              setShowAuthModal(false);
              setUser(user);
            }}
            mode="register"
            canToggle={false}
          />
          <ButtonLink onClick={() => setShowAuthModal(true)}>
            Complete Your Profile
          </ButtonLink>
        </>
      )}

      {checkIn && (
        <>
          <PageTitle>Connect to Earn Rewards</PageTitle>
          <CheckInQRCode event={event} checkIn={checkIn} type="connect" />
        </>
      )}

      {connections?.length > 0 && (
        <>
          <ConnectionsTitle>
            Connections Made ({connections.length})
          </ConnectionsTitle>
          <ConnectionsList>
            {connections.map((conn) => (
              <UserCard key={conn.id} user={conn.connection} />
            ))}
          </ConnectionsList>
        </>
      )}
    </PageContainer>
  );
};

export const getServerSideProps = async ({ query, res }) => {
  const attestator = query.attestator
    ? await getContent(query.attestator)
    : null;
  const event = await getEvent(query.event);
  if (!attestator) {
    return {
      redirect: {
        destination: `/event/${query.event}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      attestator,
      attestator_cid: query.attestator,
      event,
    },
  };
};

export default ConnectPage;
