import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ksr_recent_views_v1';
const MAX_RECENT = 8;

function readRecent() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function useRecentlyViewed() {
  const [recentIds, setRecentIds] = useState(readRecent);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recentIds));
    } catch {
      /* Non-critical preference; ignore blocked storage. */
    }
  }, [recentIds]);

  const recordView = useCallback((productId) => {
    setRecentIds((current) => [productId, ...current.filter((id) => id !== productId)].slice(0, MAX_RECENT));
  }, []);

  return { recentIds, recordView };
}
