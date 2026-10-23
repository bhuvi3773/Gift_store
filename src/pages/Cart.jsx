import { Link } from 'react-router-dom';
import { formatPrice, products } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Button from '../components/Button.jsx';
import EmptyState from '../components/EmptyState.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import QuantitySelector from '../components/QuantitySelector.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { ArrowRight, Gift, Lock, Package, Rotate, Trash, Truck } from '../components/Icons.jsx';

const FREE_THRESHOLD = 999;

export default function Cart() {
  const { items, subtotal, shipping, total, updateQty, removeItem } = useCart();
  const { notify } = useToast();
  usePageTitle('Your gift box');

  const remaining = Math.max(0, FREE_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_THRESHOLD) * 100);

  const remove = (line) => {
    removeItem(line.lineId);
    notify({
      title: 'Removed from your gift box',
      message: line.name,
      type: 'info',
    });
  };

  const suggestions = products
    .filter((product) => product.isFeatured && !items.some((line) => line.id === product.id))
    .slice(0, 4);

  return (
    <main className="page cart-page">
      <div className="page-hero page-hero--compact">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Your gift box' }]} />
          <div className="page-hero__row">
            <div>
              <p className="eyebrow">Step one of three</p>
              <h1>Your gift box</h1>
              <p className="page-hero__text">
                {items.length
                  ? 'A lovely start. Check everything over, then we will wrap it beautifully.'
                  : 'Nothing in the box just yet — let us find something worth giving.'}
              </p>
            </div>
            {items.length ? (
              <p className="cart-count-label">
                {items.reduce((count, line) => count + line.qty, 0)} items
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="container cart-container">
        {items.length === 0 ? (
          <EmptyState
            icon={<Gift size={34} />}
            eyebrow="Your gift box is empty"
            title="Good things begin with a look around."
            text="Explore our most-loved gifts, or start with a ready-made hamper for an easy, thoughtful choice."
            actionLabel="Shop all gifts"
            actionTo="/shop"
            secondaryLabel="Browse hampers"
            secondaryTo="/shop?category=gift-hampers"
          />
        ) : (
          <div className="cart-layout">
            <div className="cart-lines">
              <div className="cart-shipping-progress">
                <div className="cart-shipping-progress__copy">
                  <span>
                    {remaining > 0 ? (
                      <>
                        Add <strong>{formatPrice(remaining)}</strong> for complimentary shipping and gift wrapping.
                      </>
                    ) : (
                      <>
                        <strong>You have unlocked complimentary shipping</strong> and gift wrapping.
                      </>
                    )}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="progress" role="progressbar" aria-valuemin="0" aria-valuemax={FREE_THRESHOLD} aria-valuenow={Math.min(subtotal, FREE_THRESHOLD)}>
                  <span style={{ width: `${progress}%` }} />
                </div>
              </div>

              <ul className="cart-list">
                {items.map((line) => (
                  <li className="cart-line" key={line.lineId}>
                    <Link to={`/product/${line.slug}`} className="cart-line__media">
                      <img src={line.image} alt={line.name} width="240" height="300" />
                    </Link>

                    <div className="cart-line__body">
                      <div className="cart-line__top">
                        <div>
                          <p className="cart-line__category">{line.category}</p>
                          <h2>
                            <Link to={`/product/${line.slug}`}>{line.name}</Link>
                          </h2>
                        </div>
                        <p className="cart-line__total">{formatPrice(line.price * line.qty)}</p>
                      </div>

                      <p className="cart-line__unit">{formatPrice(line.price)} each</p>

                      {line.giftWrap ? (
                        <div className="cart-line__gift">
                          <Gift size={14} />
                          <span>
                            Hand-wrapped
                            {line.giftMessage ? <em> — “{line.giftMessage}”</em> : ' — no message added'}
                          </span>
                        </div>
                      ) : null}

                      <div className="cart-line__bottom">
                        <QuantitySelector
                          value={line.qty}
                          onChange={(next) => updateQty(line.lineId, next)}
                          compact
                          label={`Quantity for ${line.name}`}
                        />
                        <button type="button" className="cart-line__remove" onClick={() => remove(line)}>
                          <Trash size={15} /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="cart-continue">
                <Link to="/shop" className="text-link">
                  <ArrowRight size={16} className="icon-flip" /> Continue shopping
                </Link>
                <span>Prices are sample data for this demonstration.</span>
              </div>
            </div>

            <aside className="cart-summary" aria-label="Order summary">
              <p className="eyebrow">Order summary</p>
              <h2>Ready when you are.</h2>

              <dl className="summary-list">
                <div>
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div>
                  <dt>Gift wrapping</dt>
                  <dd className="summary-list__included">Complimentary</dd>
                </div>
                <div>
                  <dt>Shipping</dt>
                  <dd>{shipping === 0 ? <span className="summary-list__included">Complimentary</span> : formatPrice(shipping)}</dd>
                </div>
              </dl>

              <div className="summary-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <p className="summary-tax">Sample pricing. No taxes or payment will be processed.</p>

              <Button to="/checkout" size="lg" className="cart-summary__cta">
                Proceed to checkout <ArrowRight size={17} />
              </Button>

              <div className="summary-assurances">
                <span><Truck size={16} /> Delivery across India</span>
                <span><Package size={16} /> Packed with care</span>
                <span><Rotate size={16} /> 7-day returns</span>
                <span><Lock size={16} /> Secure demo checkout</span>
              </div>

              <div className="demo-note">
                <strong>Demo storefront</strong>
                <p>No real order will be placed and no payment details are collected.</p>
              </div>
            </aside>
          </div>
        )}
      </div>

      {suggestions.length ? (
        <section className="section section--cream cart-suggestions">
          <div className="container">
            <SectionHeading
              eyebrow={items.length ? 'One more thing' : 'A few favourites'}
              title={items.length ? 'A little extra, perhaps.' : 'Start with something lovely.'}
              linkLabel="Shop all gifts"
              linkTo="/shop"
            />
            <ProductGrid products={suggestions} />
          </div>
        </section>
      ) : null}
    </main>
  );
}
