import { Link } from 'react-router-dom';
import { ArrowRight } from './Icons.jsx';

export default function SectionHeading({
  eyebrow,
  title,
  text,
  linkLabel,
  linkTo,
  align = 'left',
  className = '',
}) {
  return (
    <div className={`section-heading section-heading--${align} ${className}`.trim()}>
      <div className="section-heading__copy">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {text ? <p className="section-heading__text">{text}</p> : null}
      </div>
      {linkLabel && linkTo ? (
        <Link to={linkTo} className="text-link">
          {linkLabel} <ArrowRight size={16} />
        </Link>
      ) : null}
    </div>
  );
}
