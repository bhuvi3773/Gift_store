import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'ksr_cart_v1';

const isValidLine = (line) =>
  line &&
  typeof line.lineId === 'string' &&
  typeof line.id === 'string' &&
  typeof line.name === 'string' &&
  Number.isFinite(line.price) &&
  Number.isFinite(line.qty) &&
  line.qty > 0 &&
  typeof line.image === 'string';

function readStoredCart() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidLine).map((line) => ({
      ...line,
      qty: Math.min(Math.max(Math.round(line.qty), 1), 99),
      giftWrap: Boolean(line.giftWrap),
      giftMessage: typeof line.giftMessage === 'string' ? line.giftMessage : '',
    }));
  } catch {
    // A corrupt or unavailable store should never break the storefront.
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage can be unavailable in private contexts */
    }
    return [];
  }
}

function lineKey(productId, giftWrap, giftMessage) {
  const messageKey = giftWrap ? giftMessage.trim().slice(0, 160) : '';
  return `${productId}__${giftWrap ? 'wrapped' : 'plain'}__${messageKey}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // If storage is full or blocked, the cart still works for this session.
    }
  }, [items, storageReady]);

  const addItem = (product, qty = 1, options = {}) => {
    const giftWrap = Boolean(options.giftWrap);
    const giftMessage = giftWrap && options.giftMessage ? options.giftMessage.trim().slice(0, 160) : '';
    const amount = Math.min(Math.max(Math.round(Number(qty) || 1), 1), 99);
    const lineId = lineKey(product.id, giftWrap, giftMessage);

    setItems((current) => {
      const existing = current.find((line) => line.lineId === lineId);
      if (existing) {
        return current.map((line) =>
          line.lineId === lineId
            ? { ...line, qty: Math.min(line.qty + amount, 99) }
            : line
        );
      }
      return [
        ...current,
        {
          lineId,
          id: product.id,
          slug: product.slug,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.images[0],
          qty: amount,
          giftWrap,
          giftMessage,
        },
      ];
    });
  };

  const updateQty = (lineId, qty) => {
    const safeQty = Math.min(Math.max(Math.round(Number(qty) || 1), 1), 99);
    setItems((current) =>
      current.map((line) => (line.lineId === lineId ? { ...line, qty: safeQty } : line))
    );
  };

  const removeItem = (lineId) => {
    setItems((current) => current.filter((line) => line.lineId !== lineId));
  };

  const clearCart = () => setItems([]);

  const value = useMemo(() => {
    const count = items.reduce((total, line) => total + line.qty, 0);
    const subtotal = items.reduce((total, line) => total + line.price * line.qty, 0);
    const shipping = items.length === 0 || subtotal >= 999 ? 0 : 99;
    return {
      items,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      addItem,
      updateQty,
      removeItem,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
