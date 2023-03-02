import React from "react";
import {
  Contact,
  inRSVPs,
  getEvent,
  submitEventRsvp,
  submitSignedEventRsvp,
} from "../../dpop";
import styled from '@emotion/styled'
import { Web3SigButton } from "../../components/Web3SigButton";
import { ButtonLink } from "../../components/ButtonLink";
import { EventRsvpSuccess } from "../../components/Events/EventRsvpSuccess";
import { EventAddToCalendar } from "../../components/Events/EventAddToCalendar";
import { EventInfo } from "../../components/Events/EventInfo";
import { EventList } from "../../components/Events/EventList";
import { VenueMap } from "../../components/VenueMap";
import { AuthModal } from "../../components/Auth/AuthModal";
import { ContactBoxModal } from "../../components/ContactBox";
import { useHasWallet } from "../../hooks/useHasWallet";
import { useIsAuthorized } from "../../hooks/useIsAuthorized";
import { useUser } from "../../hooks/useUser";
import { generate_cid } from "../api/cid";
import { NextSeo } from 'next-seo';
// import Image from 'next/image';
import { stripHtml } from "string-strip-html";

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
  h3 {
    padding-top: 2em;
    margin-bottom: 0.5em;
    font-weight: bold;
    font-size: 1.3em;
  }
`;

// const diplayDateRange = (start_date, end_date) => {
//     const s = moment(start_date);
//     const e = moment(end_date);
//     let display = '';
//     if (s.format('YYYY MM DD') === e.format('YYYY MM DD')) {
//         display = `${s.format('ddd, MMM D h:mm a')} - ${e.format('h:mm a')}`;
//     } else {
//         display = `${s.format('ddd, MMM D h:mm a')} - ${e.format('D h:mm a')}`;
//     }
//     // display = display.replaceAll(':00','');
//     if (s.format('a') === e.format('a')) {
//         display = display.replace(e.format('a'), '');
//     }
//     return display;
// };

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

const EventLocation = ({ event }) => {
  const address =
    `${event.venue.geo.address} ${event.venue.geo.city}, ${event.venue.geo.state} ${event.venue.geo.zipcode}`.trim();
  return (
    <EventLocationContainer id="location">
      <h3>Event Location</h3>
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
      <VenueMap venue={event.venue} />
    </EventLocationContainer>
  );
};

const EventPage = ({ event, events }) => {
  const [showRsvpModal, setShowRsvpModal] = React.useState<boolean>(false);
  const [showAuth, setShowAuth] = React.useState<boolean>(false);
  const [rsvps, setRsvps] = React.useState(event.rsvps ?? []);
  const [didRSVP, setDidRSVP] = React.useState<boolean>(false);
  const [rsvpCid, setRsvpCid] = React.useState<string>();
  const [showDidRsvp, setShowDidRsvp] = React.useState<boolean>(false);
  const user = useUser();
  const hasWallet = useHasWallet();
  const isAuthorized = useIsAuthorized();

  // console.log("EVENT: ", event);

  // const dateDisplay = event.start_date && event.end_date ? diplayDateRange(event.start_date, event.end_date) : '';

  React.useEffect(() => {
    (async () => {
      if (user?.cid) {
        const rsvp_cid = await generate_cid({
          action: "rsvp",
          event_cid: event.cid,
          user_cid: user.cid,
        });
        setRsvpCid(rsvp_cid);
      }
    })();
  }, [user]);

  React.useEffect(() => {
    setDidRSVP(inRSVPs(rsvps));
  }, [rsvps]);

  const submitRsvp = () => {
    submitEventRsvp(event.id).then((res) => {
      setShowDidRsvp(true);
      getEvent(event.id).then((res) => {
        setRsvps(res.rsvps);
      });
      // window.open(event.url);
      // window.open(window.location.href, '_blank');
      // setTimeout(() => {
      //   window.location.href = event.url;
      // }, 1000);
    });
  };

  const submitEmailRsvp = (contact: Contact) => {
    submitEventRsvp(event.id, contact).then((res) => {
      setShowDidRsvp(true);
      setShowRsvpModal(false);
      getEvent(event.id).then((res) => {
        setRsvps(res.rsvps);
      });
      // window.open(event.url);
      // window.open(window.location.href, '_blank');
      //   if (event.url) {
      //       setTimeout(() => {
      //         window.location.href = event.url;
      //       }, 1000);
      //   }
    });
  };

  const handleRsvpSignature = (address, signature) => {
    submitSignedEventRsvp(event.id, {
      address,
      content_id: rsvpCid,
      signature,
    }).then((res) => {
      setShowRsvpModal(false);
      setShowDidRsvp(true);
      getEvent(event.id).then((res) => {
        setRsvps(res.rsvps);
      });
      // window.open(event.url);
      // window.open(window.location.href, '_blank');
      //   if (event.url) {
      //       setTimeout(() => {
      //         window.location.href = event.url;
      //       }, 1000);
      //   }
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

  const openGraph = event.image || event.venue?.image ? {
    images: [
      {
        url: event.image ?? event.venue?.image,
        alt: event.title,
      },
    ],
  } : {};

  const publicRSVPs = rsvps.filter((rsvp) => {
    return rsvp.user?.name?.length > 0;
  });

  return (
    <PageWrapper>
      <NextSeo
        title={`${event.title} | Detroit Art Events`}
        description={event.content ? `${stripHtml(event.content).result.replaceAll('\n',' ').replaceAll('  ',' ').slice(0, 180)}...` : ''}
        openGraph={openGraph}
        canonical={`https://app.detroitartdao.com/event/${event.slug}`}
      />
      <AuthModal
        show={showAuth}
        setShow={setShowAuth}
        onAuthorized={handleAuthorized}
        mode="login"
      />
      <EventRsvpSuccess event={event} show={showDidRsvp} setShow={() => setShowDidRsvp(false)} />
      <ContactBoxModal
        show={showRsvpModal}
        setShow={setShowRsvpModal}
        onSubmit={submitEmailRsvp}
        bodyContent={
          <>
            <EventInfo event={event} variant="compact" />
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
        <EventInfo event={event} linkLocation={true} />
      </PageContainer>
      {event.image && <img src={event.image} />}
      <PageContainer>
        {false && hasWallet && isAuthorized && rsvpCid ? (
          <Web3SigButton
            message={rsvpCid}
            className="rsvp-button"
            buttonText="RSVP"
            onSignature={handleRsvpSignature}
          />
        ) : (
          <ButtonLink className="rsvp-button" id="rsvp" onClick={handleRsvp}>
            {didRSVP ? "RSVP RECEIVED" : "RSVP"}
          </ButtonLink>
        )}
        <EventAddToCalendar event={event} />
        {rsvps?.length > 0 && (
          <>
            <h3>RSVPs ({rsvps?.length})</h3>
            <ul>
              {publicRSVPs.map((rsvp, i) => {
                return <li key={i}>
                  <span>{rsvp.user.name}</span>
                  {rsvp.user?.organization && <span style={{ fontSize: 12, marginLeft: 4, color: '#666' }}>{rsvp.user.organization}</span>}
                </li>;
              })}
              {publicRSVPs?.length !== rsvps.length && (
                <li>and {rsvps.length - publicRSVPs?.length} other(s)</li>
              )}
            </ul>
          </>
        )}
        {event.venue && <EventLocation event={event} />}
        <h3>Event Details</h3>
        <div dangerouslySetInnerHTML={{ __html: event.content }} />
        {events && (
          <>
            <h3>Other Events</h3>
            <EventList events={events} variant="compact" />
            <ButtonLink href="/events">See All Events</ButtonLink>
          </>
        )}
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async ({ query, res }) => {
  const event = await getEvent(query.event);
  const eventsRes = await fetch("https://api.dpop.tech/api/events");
  const fetchedEvents = await eventsRes.json();
  const events = fetchedEvents.data?.filter((e) => e.id !== event.id).slice(0, 3);
  return {
    props: {
      event,
      events,
    },
  };
};

export default EventPage;
