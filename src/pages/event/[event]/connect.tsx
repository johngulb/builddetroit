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
} from "../../../dpop";
import styled from "@emotion/styled";
import { ContactBox } from "../../../components/ContactBox";
import { UserCard } from "../../../components/UserCard";
import { CheckInQRCode } from "../../../components/CheckInQRCode";

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
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 32px;
  margin-bottom: 3rem;
`;

const StatusMessage = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const ConnectPage = ({ attestator, attestator_cid, event, events }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [isLoadingCheckIn, setIsLoadingCheckIn] = useState(true);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    setIsLoadingCheckIn(true);
    const checkIn = getCheckIn(event.cid);
    setCheckIn(checkIn);
    setIsLoadingCheckIn(false);
  }, [event.cid]);

  const handleCheckIn = React.useCallback(
    (contact: Contact) => {
      submitEventCheckIn(event.slug, contact, attestator_cid).then(
        (checkIn) => {
          setCheckIn(checkIn);
          setIsLoadingCheckIn(false);
        }
      );
    },
    [attestator_cid, event.slug]
  );

  React.useEffect(() => {
    if (checkIn) {
      setIsLoadingCheckIn(false);
      createEventConnection(event.slug, attestator_cid).then((connection) => {
        console.log(connection);
        setConnection(connection);
      });
    }
  }, [checkIn, event.slug, attestator_cid]);

  return (
    <PageContainer>
      <PageTitle>Connect to Earn Rewards</PageTitle>

      {checkIn && (
        <StatusMessage>
          <p style={{ color: "green", fontWeight: "bold", fontSize: "1.2rem" }}>
            ✓ You&apos;re checked in
          </p>
        </StatusMessage>
      )}

      {isLoadingCheckIn && (
        <StatusMessage>
          <p style={{ fontSize: "1.1rem" }}>Loading check-in status...</p>
        </StatusMessage>
      )}

      {!checkIn && !isLoadingCheckIn && (
        <div style={{ margin: "3rem 0" }}>
          <ContactBox
            bodyContent=""
            titleText=""
            buttonText="Join the List"
            onSubmit={handleCheckIn}
          />
        </div>
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
        <div style={{ textAlign: "center", margin: "3rem 0" }}>
          <UserCard user={connection.connection} variant="vertical" />
          <h3
            style={{
              marginTop: "2rem",
              marginBottom: "1rem",
              fontSize: "1.5rem",
            }}
          >
            You are now connected!
          </h3>
        </div>
        // <div style={{marginTop: 12, fontSize: 14}}>
        //   You earned {connection.points} points!
        // </div>
      )}

      {checkIn && (
        <>
          <CheckInQRCode event={event} checkIn={checkIn} type="connect" />
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
