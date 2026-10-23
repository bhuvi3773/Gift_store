import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice, products } from '../data/products.js';
import { ArrowRight, Close, Search } from './Icons.jsx';

const suggestions = ['Birthday gift', 'Luxury hamper', 'Candle', 'Wedding', 'Chocolate'];

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      setQuery('');
      return undefined;
    }

    document.body.classList.add('is-locked');
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 60);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('is-locked');
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return products
      .filter((product) => {
        const haystack = [
          product.name,
          product.category,
          product.shortDescription,
          ...product.tags,
          ...product.occasion,
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(trimmed);
      })
      .slice(0, 5);
  }, [query]);

  const submitSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onClose();
    navigate(`/shop?q=${encodeURIComponent(trimmed)}`);
  };

  if (!open) return null;

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search gifts">
      <button type="button" className="search-overlay__scrim" onClick={onClose} aria-label="Close search" tabIndex={-1} />
      <div className="search-overlay__panel">
        <div className="search-overlay__top">
          <p className="eyebrow">Find the perfect thing</p>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close search">
            <Close size={20} />
          </button>
        </div>

        <form className="search-overlay__form" onSubmit={submitSearch} role="search">
          <Search size={22} className="search-overlay__icon" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search candles, hampers, keepsakes…"
            aria-label="Search products"
          />
          <button type="submit" className="btn btn--primary btn--sm">
            Search
          </button>
        </form>

        {query.trim() ? (
          <div className="search-results" aria-live="polite">
            {results.length ? (
              <>
                <p className="search-results__label">
                  {results.length} match{results.length === 1 ? '' : 'es'} for “{query.trim()}”
                </p>
                <ul>
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link to={`/product/${product.slug}`} onClick={onClose} className="search-result">
                        <img src={product.images[0]} alt="" loading="lazy" />
                        <span className="search-result__body">
                          <span className="search-result__category">{product.category}</span>
                          <span className="search-result__name">{product.name}</span>
                        </span>
                        <span className="search-result__price">{formatPrice(product.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <button type="button" className="search-results__all" onClick={submitSearch}>
                  View all results <ArrowRight size={16} />
                </button>
              </>
            ) : (
              <div className="search-results__empty">
                <p>No gifts found for “{query.trim()}”.</p>
                <span>Try “candle”, “hamper” or “wedding”.</span>
              </div>
            )}
          </div>
        ) : (
          <div className="search-overlay__suggestions">
            <p className="search-results__label">Popular right now</p>
            <div className="chip-row">
              {suggestions.map((suggestion) => (
                <button
                  type="button"
                  className="chip"
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="search-overlay__footer">
          <span>Press Esc to close</span>
          <span>Complimentary wrapping above ₹999</span>
        </div>
      </div>
    </div>
  );
}
