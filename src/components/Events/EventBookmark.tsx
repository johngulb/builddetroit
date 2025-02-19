import React from 'react';
import styled from '@emotion/styled';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { createEventBookmark } from '../../dpop';
import { deleteEventBookmark } from '../../dpop';
import { DPoPEvent } from '../../dpop';
import { cacheEvent } from '../../hooks/useEvents';


interface EventBookmarkProps {
  event: DPoPEvent;
  className?: string;
}

export const EventBookmark: React.FC<EventBookmarkProps> = ({ event, className }) => {
  const [bookmarked, setBookmarked] = React.useState(false);

  React.useEffect(() => {
    const bookmarkedEvents = JSON.parse(localStorage.getItem('bookmarkedEvents') || '[]');
    setBookmarked(bookmarkedEvents.includes(event.id.toString()));
  }, [event.id]);

  const toggleBookmark = () => {
    const bookmarkedEvents = JSON.parse(localStorage.getItem('bookmarkedEvents') || '[]');
    cacheEvent(event);

    if (bookmarked) {
      // Remove from bookmarks
      const updatedBookmarks = bookmarkedEvents.filter(id => id !== event.id.toString());
      localStorage.setItem('bookmarkedEvents', JSON.stringify(updatedBookmarks));
      setBookmarked(false);
      deleteEventBookmark(event.id.toString());
    } else {
      // Add to bookmarks
      bookmarkedEvents.push(event.id.toString());
      localStorage.setItem('bookmarkedEvents', JSON.stringify(bookmarkedEvents));
      setBookmarked(true);
      createEventBookmark(event.id.toString());
    }
  };

  return (
    <BookmarkButton 
      onClick={toggleBookmark}
      className={`bookmark-button ${bookmarked ? 'active' : ''} ${className || ''}`}
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
    </BookmarkButton>
  );
};

const BookmarkButton = styled.button`
  background: #ffffff;
  border: 2px solid #0066cc;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: #0066cc;
  margin-left: 8px;

  &:hover {
    background-color: #e6f2ff;
    border-color: #004d99;
    color: #004d99;
  }

  &.active {
    background-color: #0066cc;
    border-color: #004d99;
    color: #ffffff;

    &:hover {
      background-color: #0052a3;
      border-color: #003366;
    }
  }
`;
