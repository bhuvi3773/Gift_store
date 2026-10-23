import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { occasions } from '../data/products.js';
import { ArrowRight } from './Icons.jsx';

export default function AnnouncementBar() {
  const messages = [
    'Complimentary gift wrapping on orders above ₹999',
    'Hand-packed in our studio, tied with a burgundy ribbon',
    'Complimentary shipping across India above ₹999',
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="announcement">
      <div className="container announcement__inner">
        <Link to="/shop?category=gift-hampers" className="announcement__link">
          <span className="announcement__dot" aria-hidden="true" />
          <span className="announcement__message" key={index}>
            {messages[index]}
          </span>
          <ArrowRight size={13} className="announcement__arrow" />
        </Link>
        <div className="announcement__aside">
          <span>Thoughtful gifting, since 2018</span>
          <span aria-hidden="true" className="announcement__divider" />
          <Link to="/shop?occasion=corporate">Corporate gifting</Link>
        </div>
      </div>
      <div className="announcement__progress" aria-hidden="true">
        <span key={index} />
      </div>
    </div>
  );
}
