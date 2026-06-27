import { useState, useEffect } from 'react';

export type HistoryItemType = 'image' | 'text';

export interface HistoryItem {
  id: string;
  type: HistoryItemType;
  timestamp: number;
  isFavorite: boolean;
  data: string; // text or base64 image (downscaled)
  resultPreview: string; // First few lines of the result
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any; // The options used to generate it
}

const STORAGE_KEY = 'ascii-forge-history';
const MAX_HISTORY = 20;

export function useAsciiHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load ASCII history', err);
    }
    setIsLoaded(true);
  }, []);

  const saveHistory = (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (err) {
      console.error('Failed to save ASCII history', err);
      // If we hit quota exceeded, try dropping the oldest non-favorite items
      if (err instanceof DOMException && err.name === 'QuotaExceededError') {
        const safeHistory = newHistory.filter(i => i.isFavorite).slice(0, 10);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(safeHistory));
          setHistory(safeHistory);
        } catch {
            // Give up
        }
      }
    }
  };

  const addItem = (item: Omit<HistoryItem, 'id' | 'timestamp' | 'isFavorite'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      isFavorite: false,
    };

    setHistory((prev) => {
      const favorites = prev.filter(i => i.isFavorite);
      const nonFavorites = prev.filter(i => !i.isFavorite);

      let nextNonFavorites = [newItem, ...nonFavorites];
      // Keep favorites indefinitely, but cap total non-favorites to (MAX_HISTORY - favorites.length)
      const maxNonFavorites = Math.max(0, MAX_HISTORY - favorites.length);
      nextNonFavorites = nextNonFavorites.slice(0, maxNonFavorites);

      const combined = [...favorites, ...nextNonFavorites].sort((a, b) => b.timestamp - a.timestamp);
      saveHistory(combined);
      return combined;
    });
  };

  const toggleFavorite = (id: string) => {
    setHistory((prev) => {
      const next = prev.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      );
      saveHistory(next);
      return next;
    });
  };

  const removeItem = (id: string) => {
    setHistory((prev) => {
      const next = prev.filter(item => item.id !== id);
      saveHistory(next);
      return next;
    });
  };

  const clearHistory = () => {
    setHistory((prev) => {
      const favorites = prev.filter(i => i.isFavorite);
      saveHistory(favorites);
      return favorites;
    });
  };

  return {
    history,
    isLoaded,
    addItem,
    toggleFavorite,
    removeItem,
    clearHistory
  };
}
