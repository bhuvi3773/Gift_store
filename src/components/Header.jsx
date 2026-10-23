import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { occasions } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import Logo from './Logo.jsx';
import SearchOverlay from './SearchOverlay.jsx';
import MobileMenu from './MobileMenu.jsx';
import { Bag, ChevronDown, Menu, Search, Sparkle } from './Icons.jsx';

export default function Header() {
  const { count } = useCart();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [occasionOpen, setOccasionOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOccasionOpen(false);
    setSearchOpen(false);
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!occasionOpen) return undefined;
    const onPointerDown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOccasionOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOccasionOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [occasionOpen]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header__inner">
          <button
            type="button"
            className="icon-button header__menu-trigger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={22} />
          </button>

          <Logo />

          <nav className="header__nav" aria-label="Primary navigation">
            <NavLink to="/shop">Shop</NavLink>

            <div className="nav-dropdown" ref={dropdownRef}>
              <button
                type="button"
                className={`nav-dropdown__trigger ${occasionOpen ? 'is-open' : ''}`}
                aria-expanded={occasionOpen}
                aria-haspopup="true"
                onClick={() => setOccasionOpen((open) => !open)}
              >
                Occasions <ChevronDown size={14} />
              </button>
              <div className={`nav-dropdown__panel ${occasionOpen ? 'is-open' : ''}`}>
                <div className="nav-dropdown__list">
                  <p className="eyebrow">Find their moment</p>
                  <ul>
                    {occasions.map((occasion) => (
                      <li key={occasion.slug}>
                        <Link
                          to={`/shop?occasion=${occasion.slug}`}
                          onClick={() => setOccasionOpen(false)}
                        >
                          <span>{occasion.name}</span>
                          <span>{occasion.eyebrow}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/shop?category=gift-hampers"
                  className="nav-dropdown__feature"
                  onClick={() => setOccasionOpen(false)}
                >
                  <img src="/images/hero-giftbox.jpg" alt="" loading="lazy" />
                  <span className="nav-dropdown__feature-copy">
                    <span className="eyebrow">The gifting edit</span>
                    <strong>Ready to give, beautifully</strong>
                    <span className="nav-dropdown__feature-link">
                      Shop hampers <Sparkle size={14} />
                    </span>
                  </span>
                </Link>
              </div>
            </div>

            <NavLink to="/shop?category=gift-hampers">Hampers</NavLink>
            <NavLink to="/about">Our Story</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          <div className="header__actions">
            <button
              type="button"
              className="icon-button header__search"
              onClick={() => setSearchOpen(true)}
              aria-label="Search gifts"
            >
              <Search size={21} />
            </button>

            <Link to="/cart" className="cart-indicator" aria-label={`Cart with ${count} item${count === 1 ? '' : 's'}`}>
              <Bag size={22} />
              <span className="cart-indicator__label">Cart</span>
              {count > 0 ? (
                <span key={count} className="cart-indicator__badge">
                  {count > 99 ? '99+' : count}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              className="icon-button header__mobile-menu"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearch={() => setSearchOpen(true)}
      />
    </>
  );
}
