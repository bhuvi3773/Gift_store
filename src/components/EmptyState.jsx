import Button from './Button.jsx';
import { ArrowRight, Gift } from './Icons.jsx';

export default function EmptyState({
  icon = null,
  eyebrow = 'Nothing here yet',
  title = 'The box is waiting to be filled.',
  text = 'Explore our collection and find something worth unwrapping.',
  actionLabel = 'Shop all gifts',
  actionTo = '/shop',
  secondaryLabel,
  secondaryTo,
  children,
}) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon" aria-hidden="true">
        {icon || <Gift size={34} />}
      </span>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="empty-state__text">{text}</p>
      {children}
      <div className="empty-state__actions">
        {actionLabel ? (
          <Button to={actionTo}>
            {actionLabel} <ArrowRight size={17} />
          </Button>
        ) : null}
        {secondaryLabel ? (
          <Button to={secondaryTo} variant="ghost">
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
