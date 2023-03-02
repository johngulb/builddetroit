import React from "react";
import {
  DPoPEventCheckIn,
  Contact,
  getCheckIn,
  getContact,
  getContent,
  getEvent,
  submitEventCheckIn,
} from "../../../dpop";
import styled from "@emotion/styled";
import { EventInfo } from "../../../components/Events/EventInfo";
import { NextSeo } from "next-seo";
import { stripHtml } from "string-strip-html";
import { ButtonLink } from "../../../components/ButtonLink";

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
  .last-winner {
    text-align: center;
    font-size: 2rem;
  }
  .winner-id {
    font-weight: bold;
    font-size: 8rem;
  }
`;

export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const EventPage = ({ event }) => {
  //   const [checkIn, setCheckIn] = React.useState<DPoPEventCheckIn>(null);
  const [lastWinner, setLastWinner] = React.useState<DPoPEventCheckIn>();
  const [winners, setWinners] = React.useState<DPoPEventCheckIn[]>([]);

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

  const handleSelectWinner = React.useCallback(() => {
    const winner_user_cids = winners.map((winner) => winner.user_cid);
    const options = event.check_ins.filter((check_in) => {
      return !winner_user_cids.includes(check_in.user_cid);
    });
    if (options.length) {
        shuffleArray(options);
        const winner = options.pop();
        const updatedWinners = [winner].concat(winners);
        console.log(updatedWinners)
        setLastWinner(winner);
        setWinners(updatedWinners);
    }
  }, [event.check_ins, winners]);

  return (
    <PageWrapper>
      <NextSeo
        title={`Event Raffle | ${event.title} | DPoP Events`}
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
        <div>
          {event.check_ins?.length > 0 && (
            <div style={{ paddingTop: 16 }}>
              <h2>Event Raffle</h2>
              <p style={{ fontSize: 14 }}>
                Participants are the people who have checked into this event.
              </p>
              <h3>Participants ({event.check_ins.length})</h3>
              <ButtonLink
                className="rsvp-button"
                id="rsvp"
                onClick={handleSelectWinner}
              >
                Select Winner
              </ButtonLink>
            </div>
          )}
        </div>
        <div>
          {winners?.length > 0 && (
            <>
              {lastWinner && (
                <div className="last-winner">
                  <div className="winner-id"># {lastWinner.user?.id}</div>
                  {lastWinner.user?.name && <small>({lastWinner.user.name})</small>}
                </div>
              )}
              <h3>Winners ({winners.length})</h3>
              <ul>
                {winners.map((winner, i) => {
                  const name = winner.user?.name ? `#${winner.user?.id} (${winner.user?.name})` : `#${winner.user?.id}`;
                  return <li key={i}>{name}</li>;
                })}
              </ul>
            </>
          )}
        </div>
      </PageContainer>
    </PageWrapper>
  );
};

export const getServerSideProps = async ({ query, res }) => {
  const event = await getEvent(query.event);
  return {
    props: {
      event,
    },
  };
};

export default EventPage;
