"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type WishlistItem = {
  slug: string;
  name: string;
  image: string;
  priceLabel: string | null;
  href: string;
};

type WishlistContextValue = {
  items: WishlistItem[];
  count: number;
  ready: boolean;
  has: (slug: string) => boolean;
  toggle: (item: WishlistItem) => void;
  remove: (slug: string) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "obsidian-river-wishlist-v1";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WishlistItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      setItems([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const has = useCallback(
    (slug: string) => items.some((item) => item.slug === slug),
    [items],
  );

  const toggle = useCallback((item: WishlistItem) => {
    setItems((current) => {
      if (current.some((entry) => entry.slug === item.slug)) {
        return current.filter((entry) => entry.slug !== item.slug);
      }
      return [...current, item];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      ready,
      has,
      toggle,
      remove,
    }),
    [items, ready, has, toggle, remove],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
