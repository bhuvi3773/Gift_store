export function ProductCardSkeleton() {
  return (
    <article className="product-card product-card--skeleton" aria-hidden="true">
      <div className="skeleton skeleton--media" />
      <div className="product-card__body">
        <div className="skeleton skeleton--text skeleton--short" />
        <div className="skeleton skeleton--text skeleton--title" />
        <div className="skeleton skeleton--text skeleton--price" />
      </div>
    </article>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="product-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="container page-skeleton" aria-label="Loading" role="status">
      <div className="skeleton skeleton--text skeleton--short" />
      <div className="skeleton skeleton--heading" />
      <div className="skeleton skeleton--text" />
      <div className="skeleton skeleton--hero" />
    </div>
  );
}
