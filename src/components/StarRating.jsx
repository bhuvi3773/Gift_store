import { Star } from './Icons.jsx';

export default function StarRating({ rating = 5, count, size = 13 }) {
  return (
    <span className="rating" aria-label={`Rated ${rating} out of 5${count ? ` from ${count} sample reviews` : ''}`}>
      <span className="rating__stars" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} size={size} className={index < Math.round(rating) ? 'is-filled' : 'is-empty'} />
        ))}
      </span>
      <span className="rating__value">{rating.toFixed(1)}</span>
      {count ? <span className="rating__count">({count})</span> : null}
    </span>
  );
}
