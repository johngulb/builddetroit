import React from "react";
import {
  DPoPEventCheckIn,
  DPoPEventComment,
  Contact,
  getCheckIn,
  getContact,
  getContent,
  getEvent,
  submitEventCheckIn,
} from "../../../dpop";
import styled from "@emotion/styled";
import { ContactBox } from "../../../components/ContactBox";
import { EventInfo } from "../../../components/Events/EventInfo";
import { NextSeo } from "next-seo";
import { stripHtml } from "string-strip-html";
import { ChatRoom } from "../../../components/Chat/ChatRoom";
import { ButtonLink } from "../../../components/ButtonLink";
import { EventList } from "../../../components/Events/EventList";
import { Social } from "../../../components/Social";
import { CheckInQRCode } from "../../../components/CheckInQRCode";
import { RaffleNumber } from "../../../components/Raffle";
import { CenteredContainer, SectionSubtitle, SectionTitle } from "../../../components/Styled";

const ProfileWrapper = styled.div`
  margin-bottom: 12px;
`;

const Image = styled.img`
  width: 100px;
`;

const Name = styled.div`
  font-weight: bold;
`;

const Bio = styled.div`
  font-size: 0.8rem;
`;

const Profile = ({ name, image, bio }) => {
  return (
    <ProfileWrapper>
      <Image src={image} alt={name} />
      <Name>{name}</Name>
      <Bio>{bio}</Bio>
    </ProfileWrapper>
  );
};

const PageWrapper = styled.div`
  background-color: #fafafa;
  max-width: 700px;
  margin: auto;
  img {
    margin-top: 1rem;
    max-width: 100%;
  }
`;

const PageContainer = styled.div`
  padding: 1rem;
  .rsvp-button {
    width: 100%;
  }
`;

const EventPage = ({ attestator_cid, event, events }) => {
  const [checkIn, setCheckIn] = React.useState<DPoPEventCheckIn>(null);

  const openGraph =
    event.image || event.venue?.image
      ? {
          images: [
            {
              url: event.image ?? event.venue?.image,
              alt: event.title,
            },
          ],
        }
      : {};

  React.useEffect(() => {
    const checkIn = getCheckIn(event.cid);
    setCheckIn(checkIn);
  }, [event.cid]);

  const handleCheckIn = React.useCallback(
    (contact: Contact) => {
      submitEventCheckIn(event.slug, contact, attestator_cid).then(
        (checkIn) => {
          setCheckIn(checkIn);
        }
      );
    },
    [attestator_cid, event.slug]
  );

  React.useEffect(() => {
    const contact = getContact();
    if (contact) {
      handleCheckIn(contact);
    }
  }, [handleCheckIn]);

  return (
    <PageWrapper>
      <NextSeo
        title={`Check In at ${event.title} | Detroit Art Events`}
        description={
          event.content
            ? `${stripHtml(event.content)
                .result.replaceAll("\n", " ")
                .replaceAll("  ", " ")
                .slice(0, 180)}...`
            : ""
        }
        openGraph={openGraph}
        canonical={`https://builddetroit.xyz/event/${event.slug}/check-in`}
      />
      <PageContainer>
        <EventInfo event={event} linkLocation={true} variant="compact" />
        {checkIn ? (
          <div style={{ marginTop: 16 }}>
            <CenteredContainer>
              <SectionTitle>You are checked in!</SectionTitle>
              <RaffleNumber checkIn={checkIn} />
            </CenteredContainer>

            <CheckInQRCode event={event} checkIn={checkIn} />

            <Social />

            <ChatRoom attestator_cid={attestator_cid} event={event} initialMessages={event.comments} checkIn={checkIn} />

            {event.content && (
              <>
                <SectionSubtitle>Event Details</SectionSubtitle>
                <div dangerouslySetInnerHTML={{ __html: event.content }} />
              </>
            )}
            {events && (
              <>
                <SectionSubtitle>Other Events</SectionSubtitle>
                <EventList events={events} variant="compact" />
                <ButtonLink href="/events">See All Events</ButtonLink>
              </>
            )}
          </div>
        ) : (
          <ContactBox
            bodyContent=""
            titleText=""
            buttonText="Check In"
            onSubmit={handleCheckIn}
          />
        )}
      </PageContainer>
    </PageWrapper>
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

  const eventsRes = await fetch("https://api.dpop.tech/api/events");
  const fetchedEvents = await eventsRes.json();
  const events = fetchedEvents.data?.filter((e) => e.id !== event.id).slice(0, 3);
  // console.log('event: ', event);
  return {
    props: {
      attestator,
      attestator_cid: query.attestator,
      event,
      events,
    },
  };
};

export default EventPage;
