import { useState } from "react";
import { DPoPEvent, getBookmarks } from "../dpop";
import { getEventsFromCache } from "./useEvents";
import React from "react";

export const useBookmarks = () => {
  const [bookmarkedEvents, setBookmarkedEvents] = useState<DPoPEvent[]>([]);
  const [bookmarkedEventIds, setBookmarkedEventIds] = useState<string[]>([]);

  const addBookmark = (eventId: string) => {
    const updated = [...bookmarkedEventIds, eventId];
    setBookmarkedEventIds(updated);
    localStorage.setItem("bookmarkedEvents", JSON.stringify(updated));
  };

  const removeBookmark = (eventId: string) => {
    const updated = bookmarkedEventIds.filter((id) => id !== eventId);
    setBookmarkedEventIds(updated);
    localStorage.setItem("bookmarkedEvents", JSON.stringify(updated));
  };

  const isBookmarked = (eventId: string) => {
    return bookmarkedEventIds.includes(eventId);
  };

  const loadCachedBookmarks = () => {
    const stored = localStorage.getItem("bookmarkedEvents");
    if (stored) {
      setBookmarkedEventIds(JSON.parse(stored));
      const events = getEventsFromCache(JSON.parse(stored));
      const sortedEvents = [...events].sort((a, b) => {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return dateA.getTime() - dateB.getTime();
      });
      setBookmarkedEvents(sortedEvents);
    }
  };

  const updateBookmarks = () => {
    // Sync with server
    getBookmarks()
      .then((serverBookmarks) => {
        const eventIds = serverBookmarks.map((bookmark) =>
          bookmark.event_id.toString()
        );
        localStorage.setItem("bookmarkedEvents", JSON.stringify(eventIds));
        const events = getEventsFromCache(eventIds);
        const sortedEvents = [...events].sort((a, b) => {
          const dateA = new Date(a.start_date);
          const dateB = new Date(b.start_date);
          return dateA.getTime() - dateB.getTime();
        });
        setBookmarkedEvents(sortedEvents);
      })
      .catch((error) => {
        console.error("Error fetching bookmarks:", error);
      });
  };

  const loadBookmarks = () => {
    loadCachedBookmarks();
    updateBookmarks();
  };

  return {
    loadBookmarks,
    bookmarkedEvents,
    addBookmark,
    removeBookmark,
    isBookmarked,
  };
};
