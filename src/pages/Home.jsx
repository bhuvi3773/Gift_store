import { Link } from 'react-router-dom';
import { collections, findProduct, formatPrice, occasions, products, testimonials } from '../data/products.js';
import Button from '../components/Button.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { ArrowRight, Gift, Leaf, Package, Quote, Sparkle, Star, Truck } from '../components/Icons.jsx';

export default function Home() {
  const featured = products.filter((product) => product.isFeatured).slice(0, 4);
  const heroProduct = findProduct('p11');

  const countForOccasion = (slug) =>
    products.filter((product) => product.occasion.includes(slug)).length;

  return (
    <main className="page home">
      <section className="hero">
        <div className="hero__wash" aria-hidden="true" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow">
              <Sparkle size={14} /> The art of thoughtful gifting
            </p>
            <h1 className="hero__title">
              Gifts that say
              <br />
              <em>what words cannot.</em>
            </h1>
            <p className="hero__text">
              Considered hampers, quiet keepsakes and beautiful little things — hand-picked to make
              someone feel truly thought of.
            </p>
            <div className="hero__actions">
              <Button to="/shop" size="lg">
                Shop gifts <ArrowRight size={18} />
              </Button>
              <Button to="/shop?category=gift-hampers" variant="soft" size="lg">
                Explore hampers
              </Button>
            </div>
            <div className="hero__assurance">
              <span>
                <Gift size={16} /> Complimentary wrapping above ₹999
              </span>
              <span className="hero__assurance-divider" aria-hidden="true" />
              <span>
                <Truck size={16} /> Shipping across India
              </span>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__frame">
              <img
                src="/images/hero-giftbox.jpg"
                alt="A collection of warmly wrapped gifts — sample brand photography"
                width="1600"
                height="1200"
                fetchPriority="high"
              />
              <div className="hero__frame-inset">
                <img
                  src="/images/hero-gifting.jpg"
                  alt="Gifts being wrapped by hand with ribbon — sample brand photography"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="hero__seal" aria-hidden="true">
              <span>Thoughtfully</span>
              <strong>hand-tied</strong>
              <span>in Bengaluru</span>
            </div>

            {heroProduct ? (
              <Link to={`/product/${heroProduct.slug}`} className="hero__product">
                <img src={heroProduct.images[0]} alt="" loading="lazy" />
                <span className="hero__product-copy">
                  <span className="hero__product-label">Most loved</span>
                  <strong>{heroProduct.name}</strong>
                  <span className="hero__product-price">{formatPrice(heroProduct.price)}</span>
                </span>
                <span className="hero__product-arrow">
                  <ArrowRight size={16} />
                </span>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="container hero__foot">
          <span>Curated in small batches</span>
          <span className="hero__foot-line" aria-hidden="true" />
          <span>Wrapped by hand</span>
          <span className="hero__foot-line" aria-hidden="true" />
          <span>Made for the moment</span>
        </div>
      </section>

      <section className="section occasions">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Shop by occasion"
              title="For every moment worth marking."
              text="From the milestone to the just-because, find a gift that feels like it was chosen only for them."
              linkLabel="Browse all gifts"
              linkTo="/shop"
            />
          </Reveal>
          <div className="occasion-grid">
            {occasions.map((occasion, index) => (
              <Reveal key={occasion.slug} delay={index * 60}>
                <CategoryCard occasion={occasion} count={countForOccasion(occasion.slug)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream featured">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="The most-gifted edit"
              title="Pieces everyone asks for."
              text="Our most-loved gifts, chosen again and again for their quiet beauty and the way they arrive."
              linkLabel="Shop all gifts"
              linkTo="/shop"
            />
          </Reveal>
          <Reveal>
            <ProductGrid products={featured} />
          </Reveal>
          <div className="featured__note">
            <p>
              <Sparkle size={15} /> Every order is hand-wrapped in our studio — with a written note if
              you would like one.
            </p>
            <Link to="/about" className="text-link">
              How we wrap <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section collections">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Curated collections"
              title="A little direction, if you need it."
              text="Three ready-made edits for the moments that matter most."
              align="center"
            />
          </Reveal>
          <div className="collection-grid">
            {collections.map((collection, index) => (
              <Reveal key={collection.slug} delay={index * 90}>
                <Link
                  to={`/shop?occasion=${collection.occasion}`}
                  className={`collection-card ${index === 0 ? 'collection-card--tall' : ''}`}
                >
                  <div className="collection-card__media">
                    <img src={collection.image} alt={`${collection.name} collection — sample photography`} loading="lazy" />
                    <span className="collection-card__index">0{index + 1}</span>
                  </div>
                  <div className="collection-card__body">
                    <span className="collection-card__eyebrow">{collection.eyebrow}</span>
                    <h3>{collection.name}</h3>
                    <p>{collection.description}</p>
                    <span className="collection-card__foot">
                      <span>From {formatPrice(collection.price)}</span>
                      <span className="collection-card__arrow">
                        <ArrowRight size={16} />
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section philosophy">
        <div className="container philosophy__grid">
          <Reveal className="philosophy__visual">
            <div className="philosophy__image philosophy__image--main">
              <img src="/images/story-atelier.jpg" alt="A glimpse of the KSR gift wrapping studio — sample photography" loading="lazy" />
            </div>
            <div className="philosophy__image philosophy__image--inset">
              <img src="/images/editorial-candle.jpg" alt="A hand-poured candle — sample photography" loading="lazy" />
            </div>
            <span className="philosophy__stamp" aria-hidden="true">
              <Star size={14} /> Small studio, big care
            </span>
          </Reveal>

          <Reveal className="philosophy__copy">
            <p className="eyebrow">Our philosophy</p>
            <h2>
              Gifting should feel like
              <br />
              <em>a held door.</em>
            </h2>
            <p className="philosophy__lead">
              We started KSR with a simple belief: the best gifts are not the biggest or the
              loudest. They are the ones that show someone you noticed.
            </p>
            <p>
              Every item in our collection is chosen slowly — for how it feels in the hand, how it
              wears with time, and whether we would be glad to receive it ourselves. Orders are
              packed in small batches, tied by hand, and finished with a note.
            </p>
            <div className="philosophy__values">
              <span>
                <Leaf size={18} /> Natural materials wherever we can
              </span>
              <span>
                <Package size={18} /> Thoughtful, protective packaging
              </span>
              <span>
                <Gift size={18} /> Finished by hand, never rushed
              </span>
            </div>
            <Button to="/about" variant="ghost">
              Read our story <ArrowRight size={16} />
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section section--cream kind-words">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Sample customer notes"
              title="Small gifts. Lasting impressions."
              align="center"
              text="A few kind words from our fictional customers — included to show how the gifting experience is designed."
            />
          </Reveal>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 70}>
                <figure className="testimonial">
                  <Quote size={24} className="testimonial__mark" />
                  <blockquote>{testimonial.quote}</blockquote>
                  <figcaption>
                    <span>{testimonial.name}</span>
                    <span>{testimonial.detail}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-strip__grid">
          <div className="trust-strip__item">
            <Gift size={24} />
            <div>
              <h3>Wrapped with care</h3>
              <p>Complimentary hand-wrapping on orders above ₹999.</p>
            </div>
          </div>
          <div className="trust-strip__item">
            <Package size={24} />
            <div>
              <h3>Packed to arrive beautifully</h3>
              <p>Protective, recyclable packaging that protects every piece.</p>
            </div>
          </div>
          <div className="trust-strip__item">
            <Sparkle size={24} />
            <div>
              <h3>Chosen with intention</h3>
              <p>A small, considered collection — nothing filler, nothing generic.</p>
            </div>
          </div>
          <div className="trust-strip__item">
            <Truck size={24} />
            <div>
              <h3>Delivered across India</h3>
              <p>Complimentary standard shipping above ₹999.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container">
          <Reveal>
            <div className="final-cta__panel">
              <span className="final-cta__ornament" aria-hidden="true">
                <Sparkle size={30} />
              </span>
              <p className="eyebrow">Someone is waiting to be thought of</p>
              <h2>
                Find the gift they will
                <br />
                <em>remember.</em>
              </h2>
              <p>
                Browse the full collection, or let us help you find something thoughtful in under
                two minutes.
              </p>
              <div className="final-cta__actions">
                <Button to="/shop" variant="light" size="lg">
                  Shop all gifts <ArrowRight size={18} />
                </Button>
                <Button to="/contact" variant="outline-light" size="lg">
                  Ask our studio
                </Button>
              </div>
              <span className="final-cta__small">Complimentary gift wrapping · Handwritten notes · Easy returns</span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
