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
  submitEventConfirmationCheckIn,
  getEvents,
  getUser,
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
import {
  CenteredContainer,
  SectionSubtitle,
  SectionTitle,
} from "../../../components/Styled";
import Pusher from "pusher-js";

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
  const [checkIns, setCheckIns] = React.useState<DPoPEventCheckIn[]>([]);

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

  const handleConfirmationCheckIn = React.useCallback(
    (user_cid: string) => {
      submitEventConfirmationCheckIn(event.slug, user_cid, attestator_cid).then(
        (checkIn) => {
          setCheckIn(checkIn);
        }
      );
    },
    [attestator_cid, event.slug]
  );

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
    const user = getUser();
    if (contact) {
      setTimeout(() => {
        handleCheckIn(contact);
      }, 100);
    } else if (user) {
      setTimeout(() => {
        submitEventConfirmationCheckIn(event.slug, user.cid, attestator_cid).then(
          (checkIn) => {
            setCheckIn(checkIn);
          }
        );
      }, 100);
    }
  }, [handleCheckIn, handleConfirmationCheckIn, checkIn, event.slug, attestator_cid]);

  // React.useEffect(() => {
  //   var pusher = new Pusher("833f21249be60c36277b", {
  //     cluster: "mt1",
  //   });

  //   var channel = pusher.subscribe(event.slug);
  //   channel.bind("check_in", (data) => {
  //     // alert(JSON.stringify(data));
  //     if (data.check_ins) {
  //       setCheckIns(data.check_ins);
  //     }
  //   });
  // }, [event.slug]);

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
        canonical={`${process.env.NEXT_PUBLIC_SITE_URL}/event/${event.slug}/check-in`}
      />
      <PageContainer>
        <EventInfo event={event} linkLocation={true} variant="compact" />
        {/* <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem' }}><b><i>Learn how YOU can invest in revitalization of Detroit</i></b></h2>
        </div> */}
        {checkIn ? (
          <div style={{ marginTop: 4 }}>
            <CenteredContainer>
              {/* <SectionTitle>Stay tuned, you are on this list!</SectionTitle> */}
              {/* <SectionTitle>Congrats, you are entered to win!</SectionTitle> */}
              {/* <div
                style={{
                  fontSize: 14,
                  fontStyle: "italic",
                  marginTop: 8,
                  fontWeight: "bold",
                }}
              >
                NOTE: YOU MUST BE PRESENT TO WIN
              </div> */}
              {/* <h2 style={{ fontSize: "1.7rem", marginBottom: 16 }}>
                <b>ENTERED TO WIN</b>
              </h2> */}
              {/* <h2 style={{ fontSize: '2rem' }}><b>RED WINGS vs KINGS</b></h2>
              <h2 style={{ fontSize: '1.2rem' }}><b>JANUARY 13TH</b></h2> */}
              {/* <RaffleNumber checkIn={checkIn} /> */}
            </CenteredContainer>

            <CheckInQRCode event={event} checkIn={checkIn} />

            {/* {event.slug === "women-in-web3-detroit-2" && (
              <Social
                instagram={"https://instagram.com/women.in.web3.detroit/"}
                slack={
                  "https://join.slack.com/t/detroitblockchainers/shared_invite/zt-1s3bxzfhz-kHzJfU0nwWjThM4MY2UvOQ"
                }
              />
            )} */}

            {event.image && <img src={event.image} />}

            <ChatRoom
              attestator_cid={attestator_cid}
              event={event}
              comments={event.comments}
              user={checkIn.user}
            />

            {event.content && (
              <>
                <SectionSubtitle>Details</SectionSubtitle>
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
          <div>
            <ContactBox
              bodyContent=""
              titleText=""
              buttonText="Join the List"
              onSubmit={handleCheckIn}
              onConfirmation={handleConfirmationCheckIn}
            />
            {event.content && (
              <>
                <SectionSubtitle>Details</SectionSubtitle>
                <div dangerouslySetInnerHTML={{ __html: "Tokenization of assets simplifies how communities are able to invest in their city!" }} />
                {/* <div dangerouslySetInnerHTML={{ __html: event.content }} /> */}
              </>
            )}
          </div>
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

  const fetchedEvents = await getEvents({
    type: "event",
    limit: 4,
  });

  const events = fetchedEvents.data
    ?.filter((e) => e.id !== event.id)
    .slice(0, 3);
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
