import React from "react";
import {
  Contact,
  inRSVPs,
  getEvent,
  submitEventRsvp,
  getUserCID,
  myRSVP,
  DPoPEventRsvp,
  submitEventConfirmationRsvp,
} from "../../dpop";
import styled from "@emotion/styled";
import { ButtonLink, ButtonLinkCompact } from "../../components/Styled";
import { EventRsvpSuccess } from "../../components/Events/EventRsvpSuccess";
import { EventAddToCalendar } from "../../components/Events/EventAddToCalendar";
import { EventInfo } from "../../components/Events/EventInfo";
import { EventList } from "../../components/Events/EventList";
import { Social } from "../../components/Social";
import { AuthModal } from "../../components/Auth/AuthModal";
import { ContactBoxModal } from "../../components/ContactBox";
import { useIsAuthorized } from "../../hooks/useIsAuthorized";
import { stripHtml } from "string-strip-html";
import { getEnvironment } from "../../utils/environment";

import Pusher from "pusher-js";
import { ChatRoom } from "../../components/Chat/ChatRoom";
import { EventInviteButton } from "../../components/Events/EventInviteButton";
import { EventShare } from "../../components/Events/EventShare";
import { UserCard } from "../../components/UserCard";

const EventLocation = ({ event }) => {
  const address =
    `${event.venue.geo?.address} ${event.venue.geo?.city}, ${event.venue.geo?.state} ${event.venue.geo?.zipcode}`.trim();
  return (
    <EventLocationContainer id="location">
      <h3 className="section-title">Event Location</h3>
      <div className="venue">
        {event.venue.title}
        <a
          className="get-directions"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(
            event.venue.title + " " + address
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          (Get Directions)
        </a>
      </div>
      <div className="address">{address}</div>
      {/* <VenueMap venue={event.venue} /> */}
    </EventLocationContainer>
  );
};

const EventPage = ({ event, events, referral }) => {
  const [showRsvpModal, setShowRsvpModal] = React.useState<boolean>(false);
  const [showAuth, setShowAuth] = React.useState<boolean>(false);
  const [rsvps, setRsvps] = React.useState(event.rsvps ?? []);
  const [didRSVP, setDidRSVP] = React.useState<boolean>(false);
  const [rsvp, setRSVP] = React.useState<DPoPEventRsvp | null>(null);
  const [showDidRsvp, setShowDidRsvp] = React.useState<boolean>(false);
  const isAuthorized = useIsAuthorized();
  const [isHost, setIsHost] = React.useState(false);

  React.useEffect(() => {
    const cid = getUserCID();
    if (cid && cid === event.host?.cid) {
      setIsHost(true);
    }
  }, [event.host?.cid]);

  React.useEffect(() => {
    const rsvp = myRSVP(rsvps);
    setRSVP(rsvp);
    setDidRSVP(inRSVPs(rsvps));
  }, [rsvps]);

  React.useEffect(() => {
    var pusher = new Pusher("833f21249be60c36277b", {
      cluster: "mt1",
    });

    var channel = pusher.subscribe(event.slug);
    channel.bind("rsvp", (data) => {
      // alert(JSON.stringify(data));
      if (data.rsvps) {
        setRsvps(data.rsvps);
      }
    });
  }, [event.slug]);

  const submitRsvp = React.useCallback(() => {
    submitEventRsvp(event.id, null, referral)
      .then((res) => {
        setShowDidRsvp(true);
        getEvent(event.id).then((res) => {
          setRsvps(res.rsvps);
          setRSVP(res.rsvp);
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, [event.id, referral]);

  const handleConfirmationRsvp = React.useCallback(
    (user_cid: string) => {
      submitEventConfirmationRsvp(event.slug, user_cid, referral).then(
        (rsvp) => {
          setShowDidRsvp(true);
          setShowRsvpModal(false);
          getEvent(event.id).then((res) => {
            setRsvps(res.rsvps);
          });
        }
      );
    },
    [event.id, event.slug, referral]
  );

  const submitEmailRsvp = (contact: Contact) => {
    submitEventRsvp(event.id, contact).then((res) => {
      setShowDidRsvp(true);
      setShowRsvpModal(false);
      getEvent(event.id).then((res) => {
        setRsvps(res.rsvps);
      });
    });
  };

  const handleRsvp = React.useCallback(() => {
    if (isAuthorized) {
      submitRsvp();
    } else {
      setShowRsvpModal(true);
    }
  }, [isAuthorized, submitRsvp]);

  const handleAuthorized = React.useCallback(() => {
    submitRsvp();
    setShowAuth(false);
  }, [submitRsvp]);

  const publicRSVPs = rsvps.filter((rsvp) => {
    return rsvp.user?.name?.length > 0;
  });

  return (
    <PageWrapper>
      <AuthModal
        show={showAuth}
        setShow={setShowAuth}
        onAuthorized={handleAuthorized}
        mode="login"
      />
      <EventRsvpSuccess
        event={event}
        show={showDidRsvp}
        setShow={() => setShowDidRsvp(false)}
        rsvp={rsvp}
      />
      <ContactBoxModal
        show={showRsvpModal}
        setShow={setShowRsvpModal}
        onSubmit={submitEmailRsvp}
        onConfirmation={handleConfirmationRsvp}
        bodyContent={
          <>
            <EventInfo event={event} variant="compact" header={2} />
            <div style={{ fontSize: 14, marginBottom: 8, marginTop: 16 }}>
              <a
                onClick={() => {
                  setShowRsvpModal(false);
                  setShowAuth(true);
                }}
                style={{ color: "blue", fontWeight: "bold" }}
              >
                Login
              </a>{" "}
              or enter your contact info below.
            </div>
          </>
        }
        titleText={
          <>
            <div style={{ marginBottom: 8, textTransform: "uppercase" }}>
              Submit your RSVP
            </div>
          </>
        }
        buttonText="RSVP"
      />
      <PageContainer>
        <EventInfo event={event} linkLocation={true} header={2} />
      </PageContainer>
      <PageContainer>
        <ButtonLink className={`rsvp-button ${rsvp ? 'hollow' : ''}`} id="rsvp" onClick={handleRsvp}>
          {rsvp ? "RSVP RECEIVED" : "RSVP"}
          </ButtonLink>
        <EventShare event={event} />
        {rsvp && <EventInviteButton event={event} rsvp={rsvp} />}
        {isHost && event.host && (
          <>
            <ButtonLink
              href={`/event/${event.slug}/check-in?attestator=${event.host.cid}`}
              className="hollow"
            >
              Start Check-In
            </ButtonLink>
            <ButtonLink href={`/event/${event.slug}/raffle`} className="hollow">
              Start Raffle
            </ButtonLink>
          </>
        )}
        <EventAddToCalendar event={event} />
        {rsvps?.length > 0 && (
          <>
            <h3 className="section-title">RSVPs ({rsvps?.length})</h3>
            <ul style={{ margin: 0 }}>
              {publicRSVPs.map((rsvp, i) => {
                return (
                  <li key={i} style={{ listStyleType: 'none' }}>
                    <UserCard user={rsvp.user} />
                  </li>
                );
              })}
              {publicRSVPs?.length !== rsvps.length && (
                <li>and {rsvps.length - publicRSVPs?.length} other(s)</li>
              )}
            </ul>
            {/* {rsvps?.length > 80 && <h3>Waitlist ({rsvps?.length - 80})</h3>} */}
            {rsvp && (
              <ChatRoom
                attestator_cid={referral}
                event={event}
                comments={event.comments}
                user={rsvp.user}
              />
            )}
          </>
        )}
        {event.venue && <EventLocation event={event} />}

        {event.image && <img src={event.image} />}

        <h3 className="section-title">Event Details</h3>
        <div className="content" dangerouslySetInnerHTML={{ __html: event.content }} />

        {event.event_categories &&
          event.event_categories.map((category) => {
            return (
              <ButtonLinkCompact
                className="compact"
                href={`/events/${category.slug}`}
                key={category.name}
              >
                {category.name}
              </ButtonLinkCompact>
            );
          })}

        {events && (
          <>
            <h3 className="section-title">Other Events</h3>
            <EventList events={events} variant="compact" loadMore={false} />
            <ButtonLink href="/events">See All Events</ButtonLink>
          </>
        )}
      </PageContainer>
    </PageWrapper>
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
  h3.section-title {
    padding-top: 2em;
    margin-bottom: 0.5em;
    font-weight: bold;
    font-size: 1.3em;
  }
  .content {
    font-size: 0.9rem;
    white-space: pre-line;
  }
`;

const EventLocationContainer = styled.div`
  .venue,
  .address {
    font-size: 1em;
    line-height: 1.2em;
    padding-bottom: 0.2em;
  }
  .venue {
    font-weight: bold;
  }
  .venue-map {
    max-height: 180px;
    margin: 0.25em 0;
  }
  .get-directions {
    margin-left: 0.25em;
    font-size: 0.8em;
    color: blue;
  }
`;

export const getServerSideProps = async ({ query, res }) => {
  const event = await getEvent(query.event);

  const env = getEnvironment();

  const eventsRes = await fetch(
    `https://api.detroiter.network/api/events?type=${env.category}&limit=6`
  );
  const fetchedEvents = await eventsRes.json();

  const events = fetchedEvents.data
    ?.filter((e) => e.id !== event.id)
    .slice(0, 5);

  const url = `${env.url}/event/${event.slug}`;

  // const image = env.image;
  const image = event.image ?? event.venue?.image ?? env.image;

  return {
    props: {
      event,
      events,
      referral: query.referral ?? null,
      meta: {
        title: `${event.title} | ${env.site_name}`,
        description: event.content
          ? `${stripHtml(event.content)
              .result.replaceAll("\n", " ")
              .replaceAll("  ", " ")
              .slice(0, 180)}...`
          : "",
        canonical: url,
        openGraph: {
          url: url,
          type: "webpage",
          images: image
            ? [
                {
                  url: image,
                  alt: event.title,
                },
              ]
            : [],
          site_name: env.site_name,
        },
      },
    },
  };
};

export default EventPage;
