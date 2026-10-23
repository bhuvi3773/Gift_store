import { Link } from 'react-router-dom';
import { Gift } from './Icons.jsx';

export default function Logo({ onClick }) {
  return (
    <Link to="/" className="brand" aria-label="KSR Gift Store home" onClick={onClick}>
      <span className="brand__mark" aria-hidden="true">
        <Gift size={18} />
      </span>
      <span className="brand__type">
        <span className="brand__name">KSR</span>
        <span className="brand__sub">Gift Store</span>
      </span>
    </Link>
  );
}
