import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  categories,
  formatPrice,
  occasionBySlug,
  occasions,
  products,
} from '../data/products.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Button from '../components/Button.jsx';
import EmptyState from '../components/EmptyState.jsx';
import FilterBar, { FilterChips, SortSelect } from '../components/FilterBar.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import Reveal from '../components/Reveal.jsx';
import { Close, Filter, Search, Sparkle } from '../components/Icons.jsx';

const PRICE_MIN = 0;
const PRICE_MAX = 6000;

const sortProducts = (list, sort) => {
  const sorted = [...list];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort((a, b) => b.added - a.added);
    default:
      return sorted.sort((a, b) => {
        const score = (product) => (product.isFeatured ? 2 : 0) + (product.isBestseller ? 1 : 0);
        return score(b) - score(a) || a.added - b.added;
      });
  }
};

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const query = searchParams.get('q') || '';
  const selectedCategories = searchParams.getAll('category');
  const occasionSlug = searchParams.get('occasion') || '';
  const sort = searchParams.get('sort') || 'featured';
  const giftWrapOnly = searchParams.get('wrap') === '1';
  const minPrice = Number(searchParams.get('min') ?? PRICE_MIN);
  const maxPrice = Number(searchParams.get('max') ?? PRICE_MAX);
  const occasion = occasionSlug ? occasionBySlug(occasionSlug) : null;

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 520);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!filtersOpen) return undefined;
    document.body.classList.add('is-locked');
    return () => document.body.classList.remove('is-locked');
  }, [filtersOpen]);

  const updateParams = (mutate) => {
    const next = new URLSearchParams(searchParams);
    mutate(next);
    setSearchParams(next, { replace: true });
  };

  const setQuery = (value) => {
    updateParams((next) => {
      if (value) next.set('q', value);
      else next.delete('q');
    });
  };

  const toggleCategory = (slug) => {
    updateParams((next) => {
      const current = next.getAll('category');
      next.delete('category');
      const updated = current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug];
      updated.forEach((item) => next.append('category', item));
    });
  };

  const applyPrice = (min, max) => {
    updateParams((next) => {
      if (min > PRICE_MIN) next.set('min', String(min));
      else next.delete('min');
      if (max < PRICE_MAX) next.set('max', String(max));
      else next.delete('max');
    });
  };

  const toggleGiftWrap = () => {
    updateParams((next) => {
      if (next.get('wrap') === '1') next.delete('wrap');
      else next.set('wrap', '1');
    });
  };

  const removeOccasion = () => {
    updateParams((next) => next.delete('occasion'));
  };

  const changeSort = (value) => {
    updateParams((next) => {
      if (value === 'featured') next.delete('sort');
      else next.set('sort', value);
    });
  };

  const clearAll = () => {
    const next = new URLSearchParams();
    if (sort !== 'featured') next.set('sort', sort);
    setSearchParams(next, { replace: true });
  };

  const categoryCounts = useMemo(() => {
    const counts = {};
    categories.forEach((category) => {
      counts[category.slug] = products.filter(
        (product) => product.categorySlug === category.slug
      ).length;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const haystack = [
        product.name,
        product.category,
        product.shortDescription,
        ...product.tags,
        ...product.occasion,
      ]
        .join(' ')
        .toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.categorySlug);
      const matchesOccasion = !occasionSlug || product.occasion.includes(occasionSlug);
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
      const matchesWrap = !giftWrapOnly || product.giftWrapAvailable;
      return matchesQuery && matchesCategory && matchesOccasion && matchesPrice && matchesWrap;
    });
    return sortProducts(filtered, sort);
  }, [query, selectedCategories, occasionSlug, minPrice, maxPrice, giftWrapOnly, sort]);

  const chips = [];
  if (query.trim()) {
    chips.push({
      key: 'query',
      label: `“${query.trim()}”`,
      onRemove: () => setQuery(''),
    });
  }
  if (occasion) {
    chips.push({
      key: 'occasion',
      label: occasion.name,
      onRemove: removeOccasion,
    });
  }
  selectedCategories.forEach((slug) => {
    const category = categories.find((item) => item.slug === slug);
    if (category) {
      chips.push({
        key: `category-${slug}`,
        label: category.name,
        onRemove: () => toggleCategory(slug),
      });
    }
  });
  if (minPrice > PRICE_MIN || maxPrice < PRICE_MAX) {
    chips.push({
      key: 'price',
      label: `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`,
      onRemove: () => applyPrice(PRICE_MIN, PRICE_MAX),
    });
  }
  if (giftWrapOnly) {
    chips.push({
      key: 'wrap',
      label: 'Gift wrapping',
      onRemove: toggleGiftWrap,
    });
  }

  const title = occasion ? `${occasion.name} gifts` : 'The gift edit';
  const headerText = occasion
    ? occasion.description
    : 'A small, considered collection of gifts for the moments that matter — and the ones that do not need a reason at all.';

  return (
    <main className="page shop-page">
      <div className="page-hero page-hero--shop">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Shop', to: '/shop' },
              ...(occasion ? [{ label: occasion.name }] : []),
            ]}
          />
          <div className="page-hero__grid">
            <div>
              <p className="eyebrow">
                <Sparkle size={14} /> {occasion ? occasion.eyebrow : 'Curated with intention'}
              </p>
              <h1>{title}</h1>
              <p className="page-hero__text">{headerText}</p>
            </div>
            <div className="page-hero__image">
              <img
                src={occasion ? occasion.image : '/images/hero-giftbox.jpg'}
                alt={occasion ? `${occasion.name} gifting inspiration` : 'A considered collection of gifts'}
              />
              <span className="page-hero__stamp" aria-hidden="true">
                {products.length} pieces, chosen slowly
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container shop-container">
        <div className="shop-mobile-filterbar">
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => setFiltersOpen(true)}
          >
            <Filter size={16} /> Filters {chips.length ? <span className="count-pill">{chips.length}</span> : null}
          </button>
          <SortSelect value={sort} onChange={changeSort} />
        </div>

        <div className="shop-layout">
          <FilterBar
            categories={categories}
            selectedCategories={selectedCategories}
            categoryCounts={categoryCounts}
            onToggleCategory={toggleCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceBounds={[PRICE_MIN, PRICE_MAX]}
            onApplyPrice={applyPrice}
            giftWrapOnly={giftWrapOnly}
            onToggleGiftWrap={toggleGiftWrap}
            onClear={clearAll}
            activeCount={chips.length}
            mobileOpen={filtersOpen}
            onCloseMobile={() => setFiltersOpen(false)}
          />

          {filtersOpen ? (
            <button
              type="button"
              className="filters-scrim"
              onClick={() => setFiltersOpen(false)}
              aria-label="Close filters"
              tabIndex={-1}
            />
          ) : null}

          <div className="shop-main">
            <div className="shop-toolbar">
              <div className="shop-search">
                <Search size={18} />
                <label className="visually-hidden" htmlFor="catalog-search">
                  Search gifts
                </label>
                <input
                  id="catalog-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name, category or occasion…"
                />
                {query ? (
                  <button
                    type="button"
                    className="shop-search__clear"
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                  >
                    <Close size={15} />
                  </button>
                ) : null}
              </div>
              <div className="shop-toolbar__right">
                <p className="shop-count" aria-live="polite">
                  <strong>{filteredProducts.length}</strong> of {products.length} gifts
                </p>
                <div className="shop-sort">
                  <SortSelect value={sort} onChange={changeSort} />
                </div>
              </div>
            </div>

            <FilterChips chips={chips} onClearAll={clearAll} />

            <div aria-busy={loading}>
              {!loading && filteredProducts.length === 0 ? (
                <EmptyState
                  icon={<Search size={32} />}
                  eyebrow="No gifts found"
                  title="Nothing matched this edit."
                  text="Try removing a filter, widening your price range, or simply browsing the full collection. The right thing is probably close by."
                  actionLabel="Shop all gifts"
                  actionTo="/shop"
                >
                  {chips.length ? (
                    <Button variant="soft" onClick={clearAll}>
                      Clear all filters
                    </Button>
                  ) : null}
                </EmptyState>
              ) : (
                <ProductGrid products={filteredProducts} loading={loading} skeletonCount={9} />
              )}
            </div>

            {!loading && filteredProducts.length > 0 ? (
              <div className="shop-edit-note">
                <span aria-hidden="true">✦</span>
                <p>
                  Not quite it? Explore gifts for{' '}
                  {occasions
                    .filter((item) => item.slug !== occasionSlug)
                    .slice(0, 3)
                    .map((item, index, arr) => (
                      <span key={item.slug}>
                        <button type="button" onClick={() => updateParams((next) => next.set('occasion', item.slug))}>
                          {item.name.toLowerCase()}
                        </button>
                        {index < arr.length - 1 ? ', ' : '.'}
                      </span>
                    ))}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Reveal className="container">
        <div className="shop-help">
          <div>
            <p className="eyebrow">A little help</p>
            <h2>Choosing for someone specific?</h2>
            <p>
              Tell us a little about them and we will suggest three gifts that feel considered,
              not generic.
            </p>
          </div>
          <Button to="/contact" variant="primary">
            Ask our studio
          </Button>
        </div>
      </Reveal>
    </main>
  );
}
