import React from 'react';
import styled from '@emotion/styled';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface EventBookmarkProps {
  eventId: string;
  className?: string;
}

export const EventBookmark: React.FC<EventBookmarkProps> = ({ eventId, className }) => {
  const [bookmarked, setBookmarked] = React.useState(false);

  React.useEffect(() => {
    const bookmarkedEvents = JSON.parse(localStorage.getItem('bookmarkedEvents') || '[]');
    setBookmarked(bookmarkedEvents.includes(eventId));
  }, [eventId]);

  const toggleBookmark = () => {
    const bookmarkedEvents = JSON.parse(localStorage.getItem('bookmarkedEvents') || '[]');
    
    if (bookmarked) {
      // Remove from bookmarks
      const updatedBookmarks = bookmarkedEvents.filter(id => id !== eventId);
      localStorage.setItem('bookmarkedEvents', JSON.stringify(updatedBookmarks));
      setBookmarked(false);
    } else {
      // Add to bookmarks
      bookmarkedEvents.push(eventId);
      localStorage.setItem('bookmarkedEvents', JSON.stringify(bookmarkedEvents));
      setBookmarked(true);
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
