import ProductCard from './ProductCard.jsx';
import { ProductGridSkeleton } from './LoadingSkeleton.jsx';

export default function ProductGrid({ products, loading = false, skeletonCount = 8, className = '' }) {
  if (loading) {
    return <ProductGridSkeleton count={skeletonCount} />;
  }

  return (
    <div className={`product-grid ${className}`.trim()}>
      {products.map((product, index) => (
        <ProductCard product={product} key={product.id} priority={index < 4} />
      ))}
    </div>
  );
}
