import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findProduct, formatPrice, getRelatedProducts, products } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Button from '../components/Button.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Lightbox from '../components/Lightbox.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import QuantitySelector from '../components/QuantitySelector.jsx';
import Reveal from '../components/Reveal.jsx';
import StarRating from '../components/StarRating.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import {
  ArrowRight,
  Gift,
  Leaf,
  Package,
  Rotate,
  Sparkle,
  Truck,
  Zoom,
} from '../components/Icons.jsx';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = findProduct(slug);
  const { addItem } = useCart();
  const { notify } = useToast();
  const { recentIds, recordView } = useRecentlyViewed();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');

  usePageTitle(product ? product.name : 'Gift not found');

  useEffect(() => {
    if (product) recordView(product.id);
  }, [product, recordView]);

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    setGiftWrap(false);
    setGiftMessage('');
  }, [slug]);

  const related = useMemo(() => (product ? getRelatedProducts(product, 4) : []), [product]);

  const recentlyViewed = useMemo(() => {
    if (!product) return [];
    return recentIds
      .filter((id) => id !== product.id)
      .map((id) => products.find((item) => item.id === id))
      .filter(Boolean)
      .slice(0, 4);
  }, [recentIds, product]);

  if (!product) {
    return (
      <main className="page not-found-inline">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: 'Gift not found' }]} />
          <EmptyState
            icon={<Gift size={34} />}
            eyebrow="A little lost"
            title="This gift has been wrapped and moved."
            text="The product you are looking for is no longer in this edit — but there is plenty more to discover."
            actionLabel="Browse all gifts"
            actionTo="/shop"
            secondaryLabel="Back home"
            secondaryTo="/"
          />
        </div>
      </main>
    );
  }

  const addToCart = () => {
    addItem(product, quantity, { giftWrap, giftMessage });
    notify({
      title: 'Added to your gift box',
      message: giftWrap
        ? `${product.name} — finished with hand-wrapping and your note.`
        : product.name,
      type: 'success',
    });
  };

  const handleZoomMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setZoomOrigin(`${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`);
  };

  const discount = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <main className="page product-page">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Shop', to: '/shop' },
            { label: product.category, to: `/shop?category=${product.categorySlug}` },
            { label: product.name },
          ]}
        />

        <div className="pdp">
          <div className="pdp-gallery">
            <div className="pdp-gallery__thumbs" aria-label="Product images">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={index === activeImage ? 'is-active' : ''}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1} of ${product.images.length}`}
                  aria-pressed={index === activeImage}
                >
                  <img src={image} alt="" loading="lazy" />
                </button>
              ))}
            </div>

            <button
              type="button"
              className="pdp-gallery__main"
              onMouseMove={handleZoomMove}
              onClick={() => setLightboxOpen(true)}
              aria-label={`Open ${product.name} image gallery`}
            >
              <img
                src={product.images[activeImage]}
                alt={`${product.name} — sample product photography, view ${activeImage + 1}`}
                style={{ transformOrigin: zoomOrigin }}
                width="1000"
                height="1250"
              />
              <span className="pdp-gallery__zoom-hint">
                <Zoom size={15} /> Click to expand
              </span>
              {product.isBestseller ? <span className="badge badge--bestseller pdp-gallery__badge">Bestseller</span> : null}
            </button>
          </div>

          <div className="pdp-info">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <div className="pdp-info__meta">
              <StarRating rating={product.rating} count={product.reviewCount} />
              <span className="pdp-info__meta-divider" aria-hidden="true" />
              <span className={`stock ${product.sampleStock > 0 ? 'stock--in' : 'stock--out'}`}>
                <span className="stock__dot" aria-hidden="true" />
                {product.sampleStock > 0
                  ? `Sample stock: ${product.sampleStock} available`
                  : 'Sample stock: out of stock'}
              </span>
            </div>

            <div className="pdp-info__price">
              <span className="price price--large">{formatPrice(product.price)}</span>
              {product.originalPrice ? (
                <>
                  <span className="price price--was">{formatPrice(product.originalPrice)}</span>
                  <span className="pdp-info__save">Save {formatPrice(discount)}</span>
                </>
              ) : null}
            </div>
            <p className="pdp-info__tax">Inclusive of all taxes. Sample pricing for demonstration.</p>

            <p className="pdp-info__short">{product.shortDescription}</p>
            <p className="pdp-info__description">{product.description}</p>

            <div className="pdp-info__tags">
              {product.tags.slice(0, 4).map((tag) => (
                <Link key={tag} to={`/shop?q=${encodeURIComponent(tag)}`} className="tag">
                  {tag}
                </Link>
              ))}
            </div>

            <div className="pdp-buy">
              <div className="pdp-buy__row">
                <QuantitySelector value={quantity} onChange={setQuantity} max={Math.min(product.sampleStock, 99)} />
                <Button size="lg" onClick={addToCart} className="pdp-buy__button">
                  Add to cart <span className="pdp-buy__price">{formatPrice(product.price * quantity)}</span>
                </Button>
              </div>

              <div className={`gift-option ${giftWrap ? 'gift-option--active' : ''}`}>
                <label className="switch-row switch-row--wide">
                  <span>
                    <span className="switch-row__label">
                      <Gift size={16} /> Add gift wrapping
                    </span>
                    <span className="switch-row__hint">
                      Hand-tied ribbon and a handwritten note. Complimentary on orders above ₹999.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    className="switch"
                    checked={giftWrap}
                    onChange={(event) => setGiftWrap(event.target.checked)}
                  />
                </label>
                {giftWrap ? (
                  <div className="gift-option__message">
                    <label htmlFor="gift-message">Your gift message <span>(optional)</span></label>
                    <textarea
                      id="gift-message"
                      value={giftMessage}
                      onChange={(event) => setGiftMessage(event.target.value.slice(0, 160))}
                      placeholder="A few words, written by hand…"
                      rows={3}
                      maxLength={160}
                    />
                    <span className="gift-option__count">{giftMessage.length}/160</span>
                  </div>
                ) : null}
              </div>

              <div className="pdp-info__assurances">
                <span><Truck size={16} /> Complimentary shipping above ₹999</span>
                <span><Package size={16} /> Packed to arrive beautifully</span>
                <span><Rotate size={16} /> 7-day returns on eligible items</span>
              </div>
            </div>

            <div className="pdp-accordions">
              <details open>
                <summary>What is inside</summary>
                <ul>
                  {product.contents.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
              <details>
                <summary>Gift wrapping & notes</summary>
                <p>
                  Every eligible gift can be hand-wrapped in our studio, tied with a burgundy ribbon
                  and finished with a handwritten note. Wrapping is complimentary on orders above
                  ₹999. If your gift contains multiple items, we will wrap them together unless you
                  tell us otherwise.
                </p>
              </details>
              <details>
                <summary>Delivery & returns</summary>
                <p>
                  Standard delivery across India usually takes 2–7 business days. Fresh flowers and
                  desserts are scheduled for your chosen date. Unused, unopened items can be returned
                  within 7 days; personalised and perishable pieces are final sale. This is a demo
                  storefront, so no real orders or returns are processed.
                </p>
              </details>
              <details>
                <summary>About our sample data</summary>
                <p>
                  This product, its price, stock level and reviews are sample content created for
                  this frontend demonstration. Imagery is sourced from Unsplash and is illustrative
                  only.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>

      <section className="section section--cream pdp-related">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="You may also like"
              title="Beautiful things, found together."
              linkLabel="Shop all"
              linkTo="/shop"
            />
          </Reveal>
          <ProductGrid products={related} />
        </div>
      </section>

      {recentlyViewed.length ? (
        <section className="section pdp-recent">
          <div className="container">
            <SectionHeading eyebrow="Still thinking about" title="Recently viewed" />
            <ProductGrid products={recentlyViewed} />
          </div>
        </section>
      ) : null}

      <div className="mobile-buy-bar">
        <div className="mobile-buy-bar__price">
          <span>{formatPrice(product.price)}</span>
          <span>{giftWrap ? 'Gift wrapping included' : 'Taxes included'}</span>
        </div>
        <Button onClick={addToCart} className="mobile-buy-bar__button">
          Add to cart <ArrowRight size={16} />
        </Button>
      </div>

      <Lightbox
        images={product.images}
        index={activeImage}
        name={product.name}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  );
}
