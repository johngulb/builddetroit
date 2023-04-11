import React from "react";
import moment from "moment";

import { ButtonLink } from "../Styled";

export const EventInviteButton = ({ event, rsvp }) => {
  const [shareText, setShareText] = React.useState<string | null>(null);
  const [referral, setReferral] = React.useState<string | null>(null);

  React.useEffect(() => {
    const dateString = `${moment(event.start_date).format("MMM")} ${moment(
      event.start_date
    ).format("D")} from ${moment(event.start_date).format("h:mm a")} - ${moment(
      event.end_date
    ).format("h:mm a")}`;
    setShareText(
      encodeURIComponent(
        `Join me at ${event.title} on ${dateString}\n${window.origin}/event/${event.slug}` +
          (rsvp ? `?referral=${rsvp.user?.cid}` : "")
      )
    );
  }, [
    event.end_date,
    event.slug,
    event.start_date,
    event.title,
    referral,
    rsvp,
  ]);

  if (!shareText) return null;

  return (
    <ButtonLink href={`sms:&body=${shareText}`}>BRING FRIENDS!</ButtonLink>
  );
};
