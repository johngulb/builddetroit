import React from "react";
import { DPoPEvent } from "../../dpop";
import { Share } from "../Share";

interface EventShareProps {
  event: DPoPEvent;
}

export const EventShare: React.FC<React.PropsWithChildren<EventShareProps>> = ({
  event,
}) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/event/${event.slug}`;
  const shareText = `Check out ${event.title}`;
  return <Share url={shareUrl} title={shareText} />;
};
