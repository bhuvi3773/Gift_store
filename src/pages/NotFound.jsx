import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';
import Button from '../components/Button.jsx';
import { ArrowRight, Gift, Sparkle } from '../components/Icons.jsx';

export default function NotFound() {
  usePageTitle('Page not found');

  return (
    <main className="page not-found-page">
      <div className="not-found__wash" aria-hidden="true" />
      <div className="container not-found">
        <p className="eyebrow"><Sparkle size={14} /> A wrong turn</p>
        <div className="not-found__number" aria-hidden="true">
          4<span>0</span>4
        </div>
        <span className="not-found__gift" aria-hidden="true">
          <Gift size={30} />
        </span>
        <h1>This page has been wrapped and put away.</h1>
        <p>
          We looked everywhere — the ribbon drawer, the tissue paper, even behind the studio
          shelves. The page you are after is not here.
        </p>
        <div className="not-found__actions">
          <Button to="/" size="lg">
            Back home <ArrowRight size={17} />
          </Button>
          <Button to="/shop" variant="soft" size="lg">
            Shop all gifts
          </Button>
        </div>
        <p className="not-found__links">
          Or try a little of <Link to="/shop?occasion=birthday">birthday</Link>,{' '}
          <Link to="/shop?category=gift-hampers">hampers</Link>, or{' '}
          <Link to="/contact">asking our studio</Link>.
        </p>
      </div>
    </main>
  );
}
