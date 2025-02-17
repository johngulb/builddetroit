import styled from "@emotion/styled";
import Link from "next/link";
import { DPoPEvent } from "../../interfaces";

interface EventCardProps {
  event: DPoPEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <CardWrapper href={`/event/${event.slug}`}>
      <div className="event-preview">
        <img src={event.image || "/default-event.png"} alt={event.title} />
      </div>
      <div className="event-info">
        <h2>{event.title}</h2>
        <p className="date">{new Date(event.start_date).toLocaleDateString()}</p>
        {event.excerpt && <p className="description">{event.excerpt}</p>}
      </div>
    </CardWrapper>
  );
};

const CardWrapper = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: all 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.12);
  }

  .event-preview {
    aspect-ratio: 16/9;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      padding: 0;
    }
  }

  .event-info {
    padding: 0.75rem;

    h2 {
      font-size: 1rem;
      margin: 0 0 0.35rem 0;
      font-weight: 500;
    }

    .date {
      font-size: 0.8rem;
      color: #666;
      margin: 0 0 0.35rem 0;
    }

    .description {
      font-size: 0.8rem;
      color: #444;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;
