import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext.jsx';
import Logo from './Logo.jsx';
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone, Pinterest } from './Icons.jsx';

export default function Footer() {
  const { notify } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const subscribe = (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setEmail('');
    notify({
      title: 'You are on the list',
      message: 'This is a demo — no emails have been sent or stored.',
      type: 'success',
    });
  };

  return (
    <footer className="site-footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Logo />
          <p>
            Considered gifts, curated hampers and quiet keepsakes — chosen to make someone feel
            truly thought of.
          </p>
          <div className="footer__social">
            <a href="#instagram" aria-label="KSR Gift Store on Instagram (demo link)">
              <Instagram size={18} />
            </a>
            <a href="#facebook" aria-label="KSR Gift Store on Facebook (demo link)">
              <Facebook size={18} />
            </a>
            <a href="#pinterest" aria-label="KSR Gift Store on Pinterest (demo link)">
              <Pinterest size={18} />
            </a>
          </div>
        </div>

        <div className="footer__links">
          <div>
            <p className="footer__heading">Shop</p>
            <Link to="/shop">All gifts</Link>
            <Link to="/shop?category=gift-hampers">Gift hampers</Link>
            <Link to="/shop?sort=newest">New arrivals</Link>
            <Link to="/shop?category=fine-jewellery">Fine jewellery</Link>
            <Link to="/shop?category=candles-home">Candles & home</Link>
          </div>
          <div>
            <p className="footer__heading">Care</p>
            <Link to="/contact">Contact us</Link>
            <Link to="/policies/shipping-delivery">Shipping & delivery</Link>
            <Link to="/policies/returns">Returns</Link>
            <Link to="/policies/refunds">Refunds</Link>
            <Link to="/shop?occasion=corporate">Corporate gifting</Link>
          </div>
          <div>
            <p className="footer__heading">Studio</p>
            <Link to="/about">Our story</Link>
            <Link to="/policies/privacy-policy">Privacy policy</Link>
            <Link to="/policies/terms-conditions">Terms & conditions</Link>
            <Link to="/policies">All policies</Link>
          </div>
        </div>

        <div className="footer__newsletter">
          <p className="eyebrow">A note from the studio</p>
          <h3>Thoughtful things, occasionally.</h3>
          <p className="footer__newsletter-text">
            New arrivals, seasonal edits and gentle gifting inspiration. Nothing noisy.
          </p>
          <form onSubmit={subscribe} noValidate>
            <label className="visually-hidden" htmlFor="footer-email">
              Email address
            </label>
            <div className={`footer__input-wrap ${error ? 'has-error' : ''}`}>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError('');
                }}
                placeholder="Your email address"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'footer-email-error' : undefined}
              />
              <button type="submit" aria-label="Subscribe to the newsletter">
                <ArrowRight size={18} />
              </button>
            </div>
            {error ? (
              <p className="footer__error" id="footer-email-error" role="alert">
                {error}
              </p>
            ) : null}
            <p className="footer__small">Demo only. No emails are sent or stored.</p>
          </form>
        </div>
      </div>

      <div className="container footer__contact">
        <a href="mailto:hello@ksrgiftstore.example">
          <Mail size={15} /> hello@ksrgiftstore.example
        </a>
        <a href="tel:+919876543210">
          <Phone size={15} /> +91 98765 43210
        </a>
        <span>
          <MapPin size={15} /> 12 Linden Lane, Indiranagar, Bengaluru 560038
        </span>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} KSR Gift Store. Sample brand for a frontend demonstration.</p>
          <p className="footer__demo">
            Demo storefront — no real orders, payments or emails. Product photography via Unsplash.
          </p>
        </div>
      </div>
    </footer>
  );
}
