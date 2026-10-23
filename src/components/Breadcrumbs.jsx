import { Link } from 'react-router-dom';
import { ChevronRight } from './Icons.jsx';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`}>
              {last || !item.to ? (
                <span aria-current={last ? 'page' : undefined}>{item.label}</span>
              ) : (
                <>
                  <Link to={item.to}>{item.label}</Link>
                  <ChevronRight size={13} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
