import { useEffect, useState } from 'react';
import { Check, Close, Filter, Sparkle } from './Icons.jsx';

const priceBands = [
  { label: 'Under ₹1,500', min: 0, max: 1500 },
  { label: '₹1,500 – ₹3,000', min: 1500, max: 3000 },
  { label: '₹3,000 & above', min: 3000, max: 6000 },
];

export function FilterChips({ chips, onClearAll }) {
  if (!chips.length) return null;
  return (
    <div className="filter-chips" aria-label="Active filters">
      <span className="filter-chips__label">Filtered by</span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          className="filter-chip"
          onClick={chip.onRemove}
          aria-label={`Remove filter: ${chip.label}`}
        >
          {chip.label} <Close size={13} />
        </button>
      ))}
      <button type="button" className="filter-chips__clear" onClick={onClearAll}>
        Clear all
      </button>
    </div>
  );
}

export function SortSelect({ value, onChange }) {
  return (
    <div className="sort-select">
      <label htmlFor="sort-products">Sort</label>
      <div className="select-wrap select-wrap--small">
        <select id="sort-products" value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
}

export default function FilterBar({
  categories,
  selectedCategories,
  categoryCounts,
  onToggleCategory,
  minPrice,
  maxPrice,
  priceBounds,
  onApplyPrice,
  giftWrapOnly,
  onToggleGiftWrap,
  onClear,
  activeCount,
  mobileOpen,
  onCloseMobile,
}) {
  const [minDraft, setMinDraft] = useState(minPrice);
  const [maxDraft, setMaxDraft] = useState(maxPrice);

  useEffect(() => setMinDraft(minPrice), [minPrice]);
  useEffect(() => setMaxDraft(maxPrice), [maxPrice]);

  const applyPrice = () => {
    const safeMin = Math.max(priceBounds[0], Math.min(Number(minDraft) || 0, Number(maxDraft) || priceBounds[1]));
    const safeMax = Math.min(priceBounds[1], Math.max(Number(maxDraft) || priceBounds[1], safeMin));
    setMinDraft(safeMin);
    setMaxDraft(safeMax);
    onApplyPrice(safeMin, safeMax);
  };

  const selectBand = (band) => {
    setMinDraft(band.min);
    setMaxDraft(band.max);
    onApplyPrice(band.min, band.max);
  };

  return (
    <aside className={`filters ${mobileOpen ? 'filters--open' : ''}`} aria-label="Product filters">
      <div className="filters__mobile-head">
        <p className="filters__title">Filters {activeCount ? <span>{activeCount}</span> : null}</p>
        <button type="button" className="icon-button" onClick={onCloseMobile} aria-label="Close filters">
          <Close size={20} />
        </button>
      </div>

      <div className="filters__section filters__section--heading">
        <p className="filters__title">
          <Filter size={15} /> Refine your edit
        </p>
        {activeCount ? (
          <button type="button" className="filters__clear" onClick={onClear}>
            Clear
          </button>
        ) : null}
      </div>

      <div className="filters__section">
        <h3>Category</h3>
        <ul className="filters__list">
          {categories.map((category) => {
            const checked = selectedCategories.includes(category.slug);
            return (
              <li key={category.slug}>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleCategory(category.slug)}
                  />
                  <span className="check__box" aria-hidden="true">
                    <Check size={12} />
                  </span>
                  <span className="check__label">{category.name}</span>
                  <span className="check__count">{categoryCounts[category.slug] || 0}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="filters__section">
        <h3>Price</h3>
        <div className="price-inputs">
          <label>
            <span>Min</span>
            <input
              type="number"
              inputMode="numeric"
              min={priceBounds[0]}
              max={priceBounds[1]}
              value={minDraft}
              onChange={(event) => setMinDraft(event.target.value)}
              onBlur={applyPrice}
              onKeyDown={(event) => {
                if (event.key === 'Enter') applyPrice();
              }}
            />
          </label>
          <span className="price-inputs__dash" aria-hidden="true">–</span>
          <label>
            <span>Max</span>
            <input
              type="number"
              inputMode="numeric"
              min={priceBounds[0]}
              max={priceBounds[1]}
              value={maxDraft}
              onChange={(event) => setMaxDraft(event.target.value)}
              onBlur={applyPrice}
              onKeyDown={(event) => {
                if (event.key === 'Enter') applyPrice();
              }}
            />
          </label>
        </div>
        <div className="price-bands">
          {priceBands.map((band) => (
            <button
              type="button"
              key={band.label}
              className={minPrice === band.min && maxPrice === band.max ? 'is-active' : ''}
              onClick={() => selectBand(band)}
            >
              {band.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filters__section">
        <h3>Gifting services</h3>
        <label className="switch-row">
          <span>
            <span className="switch-row__label">
              <Sparkle size={14} /> Gift wrapping
            </span>
            <span className="switch-row__hint">Complimentary above ₹999</span>
          </span>
          <input type="checkbox" checked={giftWrapOnly} onChange={onToggleGiftWrap} className="switch" />
        </label>
      </div>

      <div className="filters__note">
        <p>Not sure what to choose?</p>
        <span>Every gift can be hand-wrapped with a handwritten note at checkout.</span>
      </div>

      <button type="button" className="btn btn--primary filters__apply" onClick={onCloseMobile}>
        Show results
      </button>
    </aside>
  );
}
