import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

const BookmarkContext = createContext(null);
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export function BookmarkProvider({ children }) {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkIds, setBookmarkIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const isBookmarked = (storyId) => bookmarkIds.has(storyId);

  const fetchBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks([]);
      setBookmarkIds(new Set());
      return;
    }
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (user.id || user._id) params.append("userId", user.id || user._id);
      else if (user.email) params.append("email", user.email);
      const res = await fetch(`${BACKEND_URL}/api/auth/bookmarks?${params.toString()}`);
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.bookmarks)) {
        setBookmarks(data.bookmarks);
        setBookmarkIds(new Set(data.bookmarks.map((b) => b.id)));
      }
    } catch (err) {
      console.warn("Could not fetch bookmarks from DB:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const toggleBookmark = useCallback(
    async (story) => {
      if (!user || !story?.id) return;
      const alreadySaved = bookmarkIds.has(story.id);
      if (alreadySaved) {
        setBookmarks((prev) => prev.filter((b) => b.id !== story.id));
        setBookmarkIds((prev) => {
          const next = new Set(prev);
          next.delete(story.id);
          return next;
        });
      } else {
        setBookmarks((prev) => [{ ...story, savedAt: new Date().toISOString() }, ...prev]);
        setBookmarkIds((prev) => new Set([...prev, story.id]));
      }
      setIsSyncing(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/bookmarks/toggle`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id || user._id, email: user.email, story }),
        });
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.bookmarks)) {
          setBookmarks(data.bookmarks);
          setBookmarkIds(new Set(data.bookmarks.map((b) => b.id)));
        }
      } catch (err) {
        console.warn("Bookmark sync failed:", err);
        fetchBookmarks();
      } finally {
        setIsSyncing(false);
      }
    },
    [user, bookmarkIds, fetchBookmarks]
  );

  const removeBookmark = useCallback(
    async (storyId) => {
      if (!user || !storyId) return;
      setBookmarks((prev) => prev.filter((b) => b.id !== storyId));
      setBookmarkIds((prev) => {
        const next = new Set(prev);
        next.delete(storyId);
        return next;
      });
      try {
        const params = new URLSearchParams();
        if (user.id || user._id) params.append("userId", user.id || user._id);
        else if (user.email) params.append("email", user.email);
        await fetch(
          `${BACKEND_URL}/api/auth/bookmarks/${encodeURIComponent(storyId)}?${params.toString()}`,
          { method: "DELETE" }
        );
      } catch (err) {
        console.warn("Failed to remove bookmark:", err);
        fetchBookmarks();
      }
    },
    [user, fetchBookmarks]
  );

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, bookmarkIds, isBookmarked, isLoading, isSyncing, toggleBookmark, removeBookmark, fetchBookmarks }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error("useBookmarks must be used within a BookmarkProvider");
  return context;
}
