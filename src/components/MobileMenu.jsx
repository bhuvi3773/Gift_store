import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { occasions } from '../data/products.js';
import Logo from './Logo.jsx';
import { ArrowRight, Close, Mail, Phone, Search } from './Icons.jsx';

export default function MobileMenu({ open, onClose, onSearch }) {
  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add('is-locked');
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('is-locked');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu">
      <button type="button" className="mobile-menu__scrim" onClick={onClose} aria-label="Close menu" tabIndex={-1} />
      <div className="mobile-menu__panel">
        <div className="mobile-menu__top">
          <Logo onClick={onClose} />
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close menu">
            <Close size={21} />
          </button>
        </div>

        <button
          type="button"
          className="mobile-menu__search"
          onClick={() => {
            onClose();
            onSearch();
          }}
        >
          <Search size={18} />
          <span>Search gifts…</span>
        </button>

        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          <NavLink to="/shop" onClick={onClose}>
            Shop all gifts <ArrowRight size={18} />
          </NavLink>
          <NavLink to="/about" onClick={onClose}>
            Our story <ArrowRight size={18} />
          </NavLink>
          <NavLink to="/contact" onClick={onClose}>
            Contact <ArrowRight size={18} />
          </NavLink>
        </nav>

        <div className="mobile-menu__occasions">
          <p className="eyebrow">Shop by occasion</p>
          <div className="mobile-menu__occasion-grid">
            {occasions.map((occasion) => (
              <NavLink
                key={occasion.slug}
                to={`/shop?occasion=${occasion.slug}`}
                onClick={onClose}
              >
                <span className="mobile-menu__occasion-image">
                  <img src={occasion.image} alt="" loading="lazy" />
                </span>
                <span>{occasion.name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="mobile-menu__foot">
          <a href="mailto:hello@ksrgiftstore.example">
            <Mail size={16} /> hello@ksrgiftstore.example
          </a>
          <a href="tel:+919876543210">
            <Phone size={16} /> +91 98765 43210
          </a>
          <p>Sample contact details for demonstration.</p>
        </div>
      </div>
    </div>
  );
}
