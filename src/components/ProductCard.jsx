import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { Plus } from './Icons.jsx';

export default function ProductCard({ product, priority = false }) {
  const { addItem } = useCart();
  const { notify } = useToast();
  const soldOut = product.sampleStock <= 0;

  const handleAdd = () => {
    if (soldOut) return;
    addItem(product, 1, { giftWrap: false, giftMessage: '' });
    notify({
      title: 'Added to your gift box',
      message: product.name,
      type: 'success',
    });
  };

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <img
            src={product.images[0]}
            alt={`${product.name} — sample gift photography`}
            loading={priority ? 'eager' : 'lazy'}
            width="1000"
            height="1250"
          />
        </Link>

        <div className="product-card__badges">
          {product.isNew ? <span className="badge badge--new">New</span> : null}
          {product.isBestseller ? <span className="badge badge--bestseller">Bestseller</span> : null}
          {product.originalPrice ? (
            <span className="badge badge--sale">
              Save {formatPrice(product.originalPrice - product.price)}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          className="product-card__quick-add"
          onClick={handleAdd}
          disabled={soldOut}
          aria-label={soldOut ? `${product.name} is out of stock` : `Add ${product.name} to cart`}
        >
          <Plus size={17} />
          <span>{soldOut ? 'Sold out' : 'Add'}</span>
        </button>
      </div>

      <div className="product-card__body">
        <Link to={`/shop?category=${product.categorySlug}`} className="product-card__category">
          {product.category}
        </Link>
        <h3>
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <div className="product-card__price">
          <span className="price">{formatPrice(product.price)}</span>
          {product.originalPrice ? (
            <span className="price price--was">{formatPrice(product.originalPrice)}</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
