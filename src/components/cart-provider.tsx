"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartLine = {
  slug: string;
  name: string;
  unitPriceEur: number;
  quantity: number;
  image: string;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotalEur: number;
  addItem: (item: Omit<CartLine, "quantity">, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
  ready: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "obsidian-river-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      setLines([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const addItem = useCallback(
    (item: Omit<CartLine, "quantity">, quantity = 1) => {
      setLines((current) => {
        const existing = current.find((line) => line.slug === item.slug);
        if (existing) {
          return current.map((line) =>
            line.slug === item.slug
              ? {
                  ...line,
                  quantity: Math.min(20, line.quantity + quantity),
                }
              : line,
          );
        }
        return [...current, { ...item, quantity: Math.min(20, quantity) }];
      });
    },
    [],
  );

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setLines((current) =>
      current
        .map((line) =>
          line.slug === slug
            ? { ...line, quantity: Math.max(0, Math.min(20, quantity)) }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setLines((current) => current.filter((line) => line.slug !== slug));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotalEur = lines.reduce(
      (sum, line) => sum + line.unitPriceEur * line.quantity,
      0,
    );
    return {
      lines,
      itemCount,
      subtotalEur,
      addItem,
      setQuantity,
      removeItem,
      clear,
      ready,
    };
  }, [lines, addItem, setQuantity, removeItem, clear, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
