import { Link } from 'react-router-dom';
import { ArrowRight } from './Icons.jsx';

export default function CategoryCard({ occasion, count, large = false }) {
  return (
    <Link
      to={`/shop?occasion=${occasion.slug}`}
      className={`category-card ${large ? 'category-card--large' : ''}`}
    >
      <img src={occasion.image} alt={`${occasion.name} gifting — sample photography`} loading="lazy" />
      <span className="category-card__scrim" aria-hidden="true" />
      <span className="category-card__content">
        <span className="category-card__eyebrow">{occasion.eyebrow}</span>
        <span className="category-card__name">{occasion.name}</span>
        <span className="category-card__meta">
          {count} gifts <ArrowRight size={15} />
        </span>
      </span>
    </Link>
  );
}
