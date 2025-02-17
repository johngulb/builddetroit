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
import { AuthModal } from "../../components/Auth/AuthModal";
import { ContactBoxModal } from "../../components/ContactBox";
import { useIsAuthorized } from "../../hooks/useIsAuthorized";
import { stripHtml } from "string-strip-html";
import { getEnvironment } from "../../utils/environment";

import Pusher from "pusher-js";
import { ChatRoom } from "../../components/Chat/ChatRoom";
import { EventShare } from "../../components/Events/EventShare";
import { UserCard } from "../../components/UserCard";
import { EventLocation } from "../../components/Events/EventLocation";
import { EventBookmark } from "../../components/Events/EventBookmark";

const EventPage = ({ event, events, referral }) => {
  const [showRsvpModal, setShowRsvpModal] = React.useState<boolean>(false);
  const [showAuth, setShowAuth] = React.useState<boolean>(false);
  const [rsvps, setRsvps] = React.useState(event.rsvps ?? []);
  const [didRSVP, setDidRSVP] = React.useState<boolean>(false);
  const [rsvp, setRSVP] = React.useState<DPoPEventRsvp | null>(null);
  const [showDidRsvp, setShowDidRsvp] = React.useState<boolean>(false);
  const [showFixedRsvp, setShowFixedRsvp] = React.useState<boolean>(false);
  const isAuthorized = useIsAuthorized();
  const [isHost, setIsHost] = React.useState(false);
  const [isLive, setIsLive] = React.useState(false);
  const [checkIn, setCheckIn] = React.useState(false);
  const [rewardEarned, setRewardEarned] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowFixedRsvp(scrollPosition > windowHeight - 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const isLive = event.start_time > new Date() && event.end_time < new Date();
    // setIsLive(isLive);
    setIsLive(true);
  }, [event.start_time, event.end_time]);

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

  const handleCheckIn = React.useCallback(() => {
    setCheckIn(true);
  }, []);

  const handleClaimReward = React.useCallback(() => {
    setRewardEarned(true);
  }, []);

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
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <EventInfo event={event} variant="compact" header={2} />
              <EventBookmark eventId={event.id} />
            </div>

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
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <EventInfo event={event} linkLocation={true} header={2} />
          <EventBookmark eventId={event.id} />
        </div>

        {event.image && <img src={event.image} />}
      </PageContainer>
      <PageContainer>
        <ActionButtonsContainer>
          {isLive ? (
            <>
              <ActionButton
                className={`rsvp-button ${checkIn ? "hollow" : ""}`}
                onClick={handleCheckIn}
              >
                {checkIn ? "CHECKED IN" : "CHECK IN"}
              </ActionButton>
            </>
          ) : (
            <ActionButton className="rsvp-button hollow" onClick={handleRsvp}>
              {rsvp ? "REGISTERED" : "RSVP"}
            </ActionButton>
          )}
          <EventShare event={event} />
          <EventAddToCalendar event={event} />
        </ActionButtonsContainer>
        {checkIn ||
          (true && (
            <ActionButtonsContainer>
              <ActionButton
                className="rsvp-button hollow"
                onClick={handleClaimReward}
              >
                <i
                  className="fas fa-check-circle"
                  style={{ marginRight: "8px" }}
                ></i>
                {rewardEarned ? "REWARD CLAIMED (1 EXP)" : "CLAIM REWARD"}
              </ActionButton>
            </ActionButtonsContainer>
          ))}

        {isHost && event.host && (
          <ActionButtonsContainer>
            <ActionButton
              href={`/event/${event.slug}/check-in?attestator=${event.host.cid}`}
              className="hollow"
            >
              Start Check-In
            </ActionButton>
            <ActionButton
              href={`/event/${event.slug}/raffle`}
              className="hollow"
            >
              Start Raffle
            </ActionButton>
          </ActionButtonsContainer>
        )}
        {rsvps?.length > 0 && (
          <>
            <h3 className="section-title">RSVPs ({rsvps?.length})</h3>
            <ul className="rsvp-container">
              {publicRSVPs.map((rsvp, i) => {
                return (
                  <li key={i}>
                    <UserCard user={rsvp.user} />
                  </li>
                );
              })}
              {publicRSVPs?.length !== rsvps.length && (
                <li className="other-rsvps">
                  and {rsvps.length - publicRSVPs?.length} other(s)
                </li>
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

        <h3 className="section-title">Event Details</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: event.content }}
        />

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
      {showFixedRsvp && (
        <MobileRSVPBar>
          <ButtonLink className={`rsvp-button inverted`} onClick={handleRsvp}>
            {rsvp ? "REGISTERED" : "RSVP"}
          </ButtonLink>
        </MobileRSVPBar>
      )}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  background-color: #fafafa;
  max-width: 700px;
  margin: auto;
  padding-bottom: 80px; /* Add space for fixed mobile bar */
  img {
    margin-top: 1rem;
    max-width: 100%;
  }
`;

const PageContainer = styled.div`
  padding: 1rem;
  .rsvp-button {
    width: 100%;
    height: 55px;
  }
  .rsvp-container {
    margin-left: 0;
    li {
      list-style-type: none;
    }
    .other-rsvps {
      font-size: 0.8rem;
      color: #666;
    }
  }
  h3.section-title {
    padding-top: 1em;
    margin-bottom: 0.5em;
    font-weight: bold;
    font-size: 1em;
  }
  .content {
    font-size: 0.9rem;
    white-space: pre-line;
  }
  .share-button,
  .rsvp-button {
    margin: 0;
  }
  .share-button {
    width: 55px;
    height: 55px;
  }
  .add-to-calendar-wrapper {
    .hollow {
      width: 55px;
      height: 55px;
      font-size: 1.3rem;
      background: black;
      color: white;
    }
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

const ActionButton = styled(ButtonLink)`
  flex: 1;
  text-align: center;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const MobileRSVPBar = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: #333333;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;

    .rsvp-button {
      margin: 0;
      width: 100%;
    }
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
