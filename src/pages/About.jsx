import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Button from '../components/Button.jsx';
import Reveal from '../components/Reveal.jsx';
import { ArrowRight, Gift, Heart, Leaf, Package, Sparkle, Star } from '../components/Icons.jsx';

const values = [
  {
    icon: <Gift size={22} />,
    title: 'Chosen slowly',
    text: 'We add a piece to the collection only when it earns its place — because it feels good in the hand, wears well, or makes us smile.',
  },
  {
    icon: <Leaf size={22} />,
    title: 'Considered materials',
    text: 'Natural fibres, recyclable paper and reusable vessels wherever we can. Beautiful should not mean disposable.',
  },
  {
    icon: <Heart size={22} />,
    title: 'The human detail',
    text: 'A handwritten note, a ribbon tied by hand, a message passed on exactly as you wrote it. The small things are the whole point.',
  },
];

export default function About() {
  usePageTitle('Our story');

  return (
    <main className="page about-page">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Our story' }]} />
      </div>

      <section className="about-hero">
        <div className="container about-hero__grid">
          <div className="about-hero__copy">
            <p className="eyebrow"><Sparkle size={14} /> Our story</p>
            <h1>
              A small studio,
              <br />
              built on <em>noticing.</em>
            </h1>
            <p>
              KSR began with a habit: noticing the gifts people kept. Not the expensive ones, but
              the ones that had been thought about — the book someone mentioned in passing, the
              candle that smelled like a grandmother’s kitchen, the note still folded in a drawer.
            </p>
            <p>
              We built a small gifting studio around that idea. A considered collection, wrapped by
              hand, sent with care.
            </p>
            <Button to="/shop">
              Explore the collection <ArrowRight size={17} />
            </Button>
          </div>
          <div className="about-hero__visual">
            <div className="about-hero__image">
              <img src="/images/story-atelier.jpg" alt="A hand-wrapped gift in the KSR studio — sample photography" />
            </div>
            <div className="about-hero__small">
              <img src="/images/editorial-candle.jpg" alt="A hand-poured candle — sample photography" loading="lazy" />
            </div>
            <span className="about-hero__seal" aria-hidden="true">
              <Star size={13} /> Est. 2018
            </span>
          </div>
        </div>
      </section>

      <section className="section about-story">
        <div className="container about-story__grid">
          <Reveal className="about-story__images">
            <div className="about-story__image about-story__image--one">
              <img src="/images/hero-gifting.jpg" alt="Ribbon and wrapping paper on a studio table — sample photography" loading="lazy" />
            </div>
            <div className="about-story__image about-story__image--two">
              <img src="/images/flower-eternal-rose.jpg" alt="A hand-tied bouquet — sample photography" loading="lazy" />
            </div>
          </Reveal>
          <Reveal className="about-story__copy">
            <p className="eyebrow">Why we do it</p>
            <h2>
              The best gifts are
              <br />
              <em>evidence of attention.</em>
            </h2>
            <p>
              Gifting is a strange, wonderful ritual. We choose something, wrap it, hand it over, and
              hope it says what we could not. Done well, it does more than mark an occasion. It
              reminds someone that they are known.
            </p>
            <p>
              That is why we keep our collection small. It is why we write the notes ourselves and
              tie the ribbons by hand. It is why we will tell you honestly when a simpler gift is the
              better one.
            </p>
            <blockquote>
              “A gift is not a transaction. It is a sentence with the verb left out.”
            </blockquote>
            <span className="about-story__signature">— The KSR Studio</span>
          </Reveal>
        </div>
      </section>

      <section className="section section--cream about-values">
        <div className="container">
          <Reveal>
            <div className="section-heading section-heading--center">
              <p className="eyebrow">What we care about</p>
              <h2>Three quiet commitments.</h2>
            </div>
          </Reveal>
          <div className="values-grid">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 80}>
                <article className="value-card">
                  <span className="value-card__icon">{value.icon}</span>
                  <span className="value-card__number">0{index + 1}</span>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-wrap">
        <div className="container about-wrap__grid">
          <Reveal>
            <p className="eyebrow">The studio ritual</p>
            <h2>
              How a gift
              <br />
              <em>comes together.</em>
            </h2>
            <p>
              Every order passes through the same pair of hands. It is slower than it needs to be,
              and that is rather the point.
            </p>
            <Button to="/contact" variant="ghost">
              Ask us about a gift <ArrowRight size={16} />
            </Button>
          </Reveal>
          <div className="wrap-steps">
            <Reveal className="wrap-step" delay={40}>
              <span className="wrap-step__number">01</span>
              <h3>Chosen</h3>
              <p>Your gift is picked from the shelf and checked over, piece by piece.</p>
            </Reveal>
            <Reveal className="wrap-step" delay={90}>
              <span className="wrap-step__number">02</span>
              <h3>Nested</h3>
              <p>Wrapped in warm ivory tissue, protected with recyclable padding, nestled in its box.</p>
            </Reveal>
            <Reveal className="wrap-step" delay={140}>
              <span className="wrap-step__number">03</span>
              <h3>Tied</h3>
              <p>Finished with our burgundy ribbon and your handwritten note, then sent on its way.</p>
            </Reveal>
          </div>
          <Reveal className="about-wrap__image">
            <img src="/images/packaging-1.jpg" alt="Gift packaging materials arranged on a table — sample photography" loading="lazy" />
            <span><Package size={15} /> Packed with care</span>
          </Reveal>
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta__inner">
          <p className="eyebrow">Now, the lovely part</p>
          <h2>Who are you thinking of?</h2>
          <div className="about-cta__actions">
            <Button to="/shop" variant="light" size="lg">
              Shop all gifts <ArrowRight size={17} />
            </Button>
            <Button to="/contact" variant="outline-light" size="lg">
              Ask our studio
            </Button>
          </div>
        </div>
      </section>

      <div className="container about-disclaimer">
        <p>
          <strong>A note on this page:</strong> this brand story is sample copy created for a
          frontend demonstration. The KSR Gift Store identity, timeline and studio details are
          illustrative and not a real commercial history. Photography via Unsplash. Learn more in our{' '}
          <Link to="/policies/terms-conditions">demo terms</Link>.
        </p>
      </div>
    </main>
  );
}
