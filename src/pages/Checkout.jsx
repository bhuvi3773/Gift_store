import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Button from '../components/Button.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Field from '../components/Field.jsx';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Gift,
  Lock,
  Mail,
  Package,
  Shield,
  Sparkle,
  Truck,
} from '../components/Icons.jsx';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  apartment: '',
  city: '',
  state: '',
  pincode: '',
  giftMessage: '',
  notes: '',
};

const fieldIds = {
  fullName: 'checkout-fullName',
  email: 'checkout-email',
  phone: 'checkout-phone',
  address: 'checkout-address',
  city: 'checkout-city',
  state: 'checkout-state',
  pincode: 'checkout-pincode',
};

const validate = (values) => {
  const errors = {};
  if (values.fullName.trim().length < 2) errors.fullName = 'Please enter the recipient’s full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  const digits = values.phone.replace(/\D/g, '');
  const localPhone = digits.startsWith('91') && digits.length > 10 ? digits.slice(-10) : digits;
  if (localPhone.length !== 10) errors.phone = 'Please enter a valid 10-digit mobile number.';
  if (values.address.trim().length < 5) errors.address = 'Please enter your delivery address.';
  if (!values.city.trim()) errors.city = 'Please enter your city.';
  if (!values.state.trim()) errors.state = 'Please enter your state.';
  if (!/^\d{6}$/.test(values.pincode.trim())) errors.pincode = 'Please enter a valid 6-digit PIN code.';
  if (values.giftMessage.length > 240) errors.giftMessage = 'Please keep your note under 240 characters.';
  return errors;
};

export default function Checkout() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { notify } = useToast();
  usePageTitle('Checkout');

  const [step, setStep] = useState('details');
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [agreementError, setAgreementError] = useState('');
  const [placed, setPlaced] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [snapshot, setSnapshot] = useState(null);
  const topRef = useRef(null);

  const itemCount = items.reduce((count, line) => count + line.qty, 0);

  const progress = useMemo(() => {
    if (placed) return 3;
    return step === 'review' ? 3 : 2;
  }, [placed, step]);

  const update = (field) => (event) => {
    const value = event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = validate({ ...form, [field]: value });
        return { ...current, [field]: next[field] };
      });
    }
  };

  const blur = (field) => () => {
    const next = validate(form);
    setErrors((current) => ({ ...current, [field]: next[field] }));
  };

  const goToReview = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      window.setTimeout(() => document.getElementById(fieldIds[first])?.focus(), 30);
      return;
    }
    setStep('review');
    setAgreed(false);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const placeOrder = () => {
    if (!agreed) {
      setAgreementError('Please confirm that you understand this is a demonstration.');
      return;
    }
    const reference = `KSR-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
    setSnapshot({ items: [...items], subtotal, shipping, total, name: form.fullName, email: form.email });
    setOrderRef(reference);
    setPlaced(true);
    clearCart();
    notify({
      title: 'Demonstration complete',
      message: 'No real order was created and no payment was taken.',
      type: 'success',
      duration: 5200,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!items.length && !placed) {
    return (
      <main className="page checkout-page">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]} />
          <EmptyState
            icon={<Gift size={34} />}
            eyebrow="Nothing to check out"
            title="Your gift box is still waiting."
            text="Add a gift or two first, then come back — we will keep everything here for you."
            actionLabel="Shop gifts"
            actionTo="/shop"
            secondaryLabel="Back to cart"
            secondaryTo="/cart"
          />
        </div>
      </main>
    );
  }

  if (placed && snapshot) {
    return (
      <main className="page checkout-page checkout-success">
        <div className="container checkout-success__inner">
          <span className="checkout-success__icon" aria-hidden="true">
            <Check size={32} />
          </span>
          <p className="eyebrow">Demonstration complete</p>
          <h1>Beautifully done.</h1>
          <p className="checkout-success__lead">
            Thank you, {snapshot.name.split(' ')[0] || 'friend'}. In a live store, your gift would now
            be on its way to being wrapped.
          </p>

          <div className="checkout-success__disclaimer">
            <strong>This was a frontend demonstration.</strong>
            <p>
              No real order has been created, no payment was taken, and no email or confirmation has
              been sent. Your cart has been cleared in this browser only.
            </p>
          </div>

          <div className="checkout-success__receipt" aria-label="Demo order summary">
            <div className="checkout-success__receipt-head">
              <div>
                <span>Demo reference</span>
                <strong>{orderRef}</strong>
              </div>
              <div>
                <span>Estimated total</span>
                <strong>{formatPrice(snapshot.total)}</strong>
              </div>
            </div>
            <ul>
              {snapshot.items.map((line) => (
                <li key={line.lineId}>
                  <img src={line.image} alt="" />
                  <span>
                    {line.name} <small>× {line.qty}</small>
                  </span>
                  <span>{formatPrice(line.price * line.qty)}</span>
                </li>
              ))}
            </ul>
            <p className="checkout-success__email">
              <Mail size={15} /> A confirmation would go to {snapshot.email} in a live store.
            </p>
          </div>

          <div className="checkout-success__what-next">
            <p className="eyebrow">What would happen next</p>
            <div>
              <span><Sparkle size={18} /> Hand-wrapped in our studio</span>
              <span><Truck size={18} /> Delivered to your chosen address</span>
              <span><Mail size={18} /> Tracking sent to your inbox</span>
            </div>
          </div>

          <div className="checkout-success__actions">
            <Button to="/shop" size="lg">
              Continue shopping <ArrowRight size={17} />
            </Button>
            <Button to="/" variant="ghost" size="lg">
              Back home
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page checkout-page">
      <div className="container checkout-container" ref={topRef}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />

        <div className="checkout-head">
          <div>
            <p className="eyebrow">A few last details</p>
            <h1>Checkout</h1>
          </div>
          <ol className="checkout-steps" aria-label="Checkout progress">
            <li className="is-complete">
              <Link to="/cart">
                <span className="checkout-steps__dot"><Check size={12} /></span>
                <span>Cart</span>
              </Link>
            </li>
            <li className={progress >= 2 ? 'is-complete' : ''}>
              <span className="checkout-steps__dot">{step === 'review' ? <Check size={12} /> : '2'}</span>
              <span>Details</span>
            </li>
            <li className={step === 'review' ? 'is-current' : ''}>
              <span className="checkout-steps__dot">3</span>
              <span>Review</span>
            </li>
          </ol>
        </div>

        <div className="demo-banner">
          <Lock size={18} />
          <div>
            <strong>This is a frontend demonstration.</strong>
            <p>No real order will be placed, no payment details are collected, and no email will be sent.</p>
          </div>
        </div>

        <div className="checkout-layout">
          <div className="checkout-main">
            {step === 'details' ? (
              <form className="checkout-form" onSubmit={goToReview} noValidate>
                <section className="checkout-section">
                  <div className="checkout-section__head">
                    <span className="checkout-section__number">01</span>
                    <div>
                      <h2>Contact details</h2>
                      <p>So we can keep you updated about your gift.</p>
                    </div>
                  </div>
                  <div className="form-grid">
                    <Field
                      id="checkout-fullName"
                      label="Full name"
                      value={form.fullName}
                      onChange={update('fullName')}
                      onBlur={blur('fullName')}
                      error={errors.fullName}
                      autoComplete="name"
                      required
                    />
                    <Field
                      id="checkout-email"
                      label="Email address"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      onBlur={blur('email')}
                      error={errors.email}
                      autoComplete="email"
                      required
                    />
                    <Field
                      id="checkout-phone"
                      label="Mobile number"
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      onBlur={blur('phone')}
                      error={errors.phone}
                      hint="10-digit Indian mobile number."
                      autoComplete="tel"
                      required
                    />
                  </div>
                </section>

                <section className="checkout-section">
                  <div className="checkout-section__head">
                    <span className="checkout-section__number">02</span>
                    <div>
                      <h2>Delivery address</h2>
                      <p>Where should we send this beautiful thing?</p>
                    </div>
                  </div>
                  <div className="form-grid">
                    <Field
                      id="checkout-address"
                      label="Address"
                      value={form.address}
                      onChange={update('address')}
                      onBlur={blur('address')}
                      error={errors.address}
                      autoComplete="address-line1"
                      placeholder="House or flat number, street"
                      className="form-grid__full"
                      required
                    />
                    <Field
                      id="checkout-apartment"
                      label="Apartment, landmark or area"
                      value={form.apartment}
                      onChange={update('apartment')}
                      autoComplete="address-line2"
                      placeholder="Optional, but helpful for couriers"
                      className="form-grid__full"
                    />
                    <Field
                      id="checkout-city"
                      label="City"
                      value={form.city}
                      onChange={update('city')}
                      onBlur={blur('city')}
                      error={errors.city}
                      autoComplete="address-level2"
                      required
                    />
                    <Field
                      id="checkout-state"
                      label="State"
                      value={form.state}
                      onChange={update('state')}
                      onBlur={blur('state')}
                      error={errors.state}
                      autoComplete="address-level1"
                      required
                    />
                    <Field
                      id="checkout-pincode"
                      label="PIN code"
                      inputMode="numeric"
                      value={form.pincode}
                      onChange={update('pincode')}
                      onBlur={blur('pincode')}
                      error={errors.pincode}
                      autoComplete="postal-code"
                      maxLength={6}
                      required
                    />
                    <Field
                      id="checkout-notes"
                      label="Delivery note"
                      value={form.notes}
                      onChange={update('notes')}
                      placeholder="Gate code, preferred time, or anything else"
                      as="textarea"
                      rows={2}
                      className="form-grid__full"
                    />
                  </div>
                </section>

                <section className="checkout-section">
                  <div className="checkout-section__head">
                    <span className="checkout-section__number">03</span>
                    <div>
                      <h2>A note with the gift</h2>
                      <p>Optional. We will write this by hand on our card.</p>
                    </div>
                  </div>
                  <Field
                    id="checkout-giftMessage"
                    label="Gift message"
                    value={form.giftMessage}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, giftMessage: event.target.value.slice(0, 240) }))
                    }
                    placeholder="A few words they will keep…"
                    as="textarea"
                    rows={3}
                    hint={`${form.giftMessage.length}/240 characters. Items marked hand-wrapped will include this note.`}
                  />
                </section>

                <div className="checkout-form__actions">
                  <Link to="/cart" className="text-link">
                    <ArrowLeft size={15} /> Back to cart
                  </Link>
                  <Button type="submit" size="lg">
                    Continue to review <ArrowRight size={17} />
                  </Button>
                </div>
              </form>
            ) : (
              <div className="checkout-review">
                <div className="checkout-section">
                  <div className="checkout-section__head">
                    <span className="checkout-section__number">01</span>
                    <div>
                      <h2>Contact & delivery</h2>
                      <p>Please check these details before the final step.</p>
                    </div>
                    <button type="button" className="text-link checkout-review__edit" onClick={() => setStep('details')}>
                      Edit details
                    </button>
                  </div>
                  <div className="review-block">
                    <div>
                      <span className="review-block__label">Name</span>
                      <p>{form.fullName}</p>
                    </div>
                    <div>
                      <span className="review-block__label">Email</span>
                      <p>{form.email}</p>
                    </div>
                    <div>
                      <span className="review-block__label">Mobile</span>
                      <p>{form.phone}</p>
                    </div>
                    <div className="review-block__wide">
                      <span className="review-block__label">Delivery address</span>
                      <p>
                        {form.address}
                        {form.apartment ? `, ${form.apartment}` : ''}
                        <br />
                        {form.city}, {form.state} — {form.pincode}
                      </p>
                    </div>
                    {form.notes ? (
                      <div className="review-block__wide">
                        <span className="review-block__label">Delivery note</span>
                        <p>{form.notes}</p>
                      </div>
                    ) : null}
                    {form.giftMessage ? (
                      <div className="review-block__wide">
                        <span className="review-block__label">Gift message</span>
                        <p className="review-block__quote">“{form.giftMessage}”</p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="checkout-section">
                  <div className="checkout-section__head">
                    <span className="checkout-section__number">02</span>
                    <div>
                      <h2>Your gifts</h2>
                      <p>{itemCount} pieces, ready to be wrapped.</p>
                    </div>
                    <Link to="/cart" className="text-link checkout-review__edit">
                      Edit cart
                    </Link>
                  </div>
                  <ul className="review-items">
                    {items.map((line) => (
                      <li key={line.lineId}>
                        <img src={line.image} alt="" />
                        <div>
                          <p>{line.name}</p>
                          <span>
                            {line.giftWrap ? 'Hand-wrapped' : 'Standard packaging'} · Qty {line.qty}
                          </span>
                          {line.giftMessage ? <em>“{line.giftMessage}”</em> : null}
                        </div>
                        <strong>{formatPrice(line.price * line.qty)}</strong>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="checkout-agreement">
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(event) => {
                        setAgreed(event.target.checked);
                        if (event.target.checked) setAgreementError('');
                      }}
                      aria-invalid={Boolean(agreementError)}
                      aria-describedby={agreementError ? 'agreement-error' : undefined}
                    />
                    <span className="check__box" aria-hidden="true"><Check size={12} /></span>
                    <span className="check__label">
                      I understand this is a frontend demonstration. No real order, payment or email will be created.
                    </span>
                  </label>
                  {agreementError ? (
                    <p className="field__error" id="agreement-error" role="alert">{agreementError}</p>
                  ) : null}
                </div>

                <div className="checkout-form__actions">
                  <button type="button" className="text-link" onClick={() => setStep('details')}>
                    <ArrowLeft size={15} /> Back to details
                  </button>
                  <Button size="lg" onClick={placeOrder}>
                    Place demo order <Lock size={16} />
                  </Button>
                </div>
                <p className="checkout-review__fineprint">
                  This button completes a demonstration only. No payment details are requested or stored.
                </p>
              </div>
            )}
          </div>

          <aside className="checkout-summary" aria-label="Order summary">
            <div className="checkout-summary__head">
              <div>
                <p className="eyebrow">Your order</p>
                <h2>{itemCount} {itemCount === 1 ? 'gift' : 'gifts'}</h2>
              </div>
              <Link to="/cart" className="text-link">Edit</Link>
            </div>
            <ul className="checkout-summary__items">
              {items.map((line) => (
                <li key={line.lineId}>
                  <span className="checkout-summary__thumb">
                    <img src={line.image} alt="" />
                    <span className="checkout-summary__qty">{line.qty}</span>
                  </span>
                  <span className="checkout-summary__item">
                    <span>{line.name}</span>
                    <span>{line.giftWrap ? 'Hand-wrapped' : line.category}</span>
                  </span>
                  <span className="checkout-summary__line-price">{formatPrice(line.price * line.qty)}</span>
                </li>
              ))}
            </ul>
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
            <p className="summary-tax">Inclusive of all taxes. Sample pricing only.</p>
            <div className="checkout-summary__assure">
              <span><Shield size={15} /> No payment details collected</span>
              <span><Package size={15} /> Hand-packed with care</span>
              <span><CreditCard size={15} /> Demo checkout only</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
