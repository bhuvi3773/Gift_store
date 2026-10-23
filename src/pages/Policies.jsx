import { Link, useParams } from 'react-router-dom';
import { findPolicy, policies, policyUpdated } from '../data/policies.js';
import usePageTitle from '../hooks/usePageTitle.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Button from '../components/Button.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { ArrowLeft, ArrowRight, Shield, Sparkle } from '../components/Icons.jsx';

function PolicyNav({ activeSlug }) {
  return (
    <nav className="policy-nav" aria-label="Policy pages">
      <p className="eyebrow">Policies & care</p>
      <ul>
        {policies.map((policy) => (
          <li key={policy.slug}>
            <Link
              to={`/policies/${policy.slug}`}
              className={policy.slug === activeSlug ? 'is-active' : ''}
              aria-current={policy.slug === activeSlug ? 'page' : undefined}
            >
              {policy.shortTitle}
              <ArrowRight size={14} />
            </Link>
          </li>
        ))}
      </ul>
      <div className="policy-nav__help">
        <Shield size={20} />
        <p>Still unsure about something?</p>
        <Link to="/contact">Ask our studio <ArrowRight size={14} /></Link>
      </div>
    </nav>
  );
}

function PolicyIndex() {
  usePageTitle('Policies');
  return (
    <main className="page policies-page">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Policies' }]} />
      </div>
      <section className="page-hero page-hero--policies">
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow"><Sparkle size={14} /> The fine print, made clear</p>
            <h1>Care, in writing.</h1>
            <p className="page-hero__text">
              Everything you might want to know about delivery, returns, refunds and how this demo
              storefront handles your information — written in plain language.
            </p>
          </div>
          <div className="policy-hero-note">
            <span className="policy-sample-badge">Sample policies</span>
            <p>All content on these pages is illustrative for this frontend demonstration.</p>
            <span>Last reviewed {policyUpdated}</span>
          </div>
        </div>
      </section>

      <section className="section policies-index">
        <div className="container">
          <div className="policy-card-grid">
            {policies.map((policy, index) => (
              <Link to={`/policies/${policy.slug}`} className="policy-card" key={policy.slug}>
                <span className="policy-card__number">0{index + 1}</span>
                <h2>{policy.title}</h2>
                <p>{policy.intro}</p>
                <span className="policy-card__link">
                  Read the policy <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
          <div className="policies-help">
            <div>
              <p className="eyebrow">A real person, not a template</p>
              <h2>Have a question we have not answered?</h2>
              <p>Our studio would be happy to help. In this demo, the contact form validates in the browser only.</p>
            </div>
            <Button to="/contact">Contact the studio</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function PolicyDetail({ policy }) {
  usePageTitle(policy.title);
  const index = policies.findIndex((item) => item.slug === policy.slug);
  const previous = policies[(index - 1 + policies.length) % policies.length];
  const next = policies[(index + 1) % policies.length];

  return (
    <main className="page policy-detail-page">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Policies', to: '/policies' },
            { label: policy.shortTitle },
          ]}
        />
      </div>

      <div className="page-hero page-hero--policy">
        <div className="container policy-hero">
          <div>
            <p className="eyebrow">Policies & care</p>
            <h1>{policy.title}</h1>
            <p className="page-hero__text">{policy.intro}</p>
          </div>
          <div className="policy-hero-note">
            <span className="policy-sample-badge">Sample content</span>
            <p>This policy is placeholder copy for a frontend demonstration. It is not legal advice.</p>
            <span>Last reviewed {policyUpdated}</span>
          </div>
        </div>
      </div>

      <div className="container policy-layout">
        <PolicyNav activeSlug={policy.slug} />

        <article className="policy-content">
          <div className="policy-mobile-tabs" aria-label="Policy pages">
            {policies.map((item) => (
              <Link
                key={item.slug}
                to={`/policies/${item.slug}`}
                className={item.slug === policy.slug ? 'is-active' : ''}
              >
                {item.shortTitle}
              </Link>
            ))}
          </div>

          <div className="policy-notice">
            <Shield size={19} />
            <p>
              <strong>Please note:</strong> this entire site is a frontend portfolio demonstration.
              No orders, payments, emails or legal agreements are created here.
            </p>
          </div>

          {policy.sections.map((section, sectionIndex) => (
            <section className="policy-section" key={section.heading} id={`section-${sectionIndex + 1}`}>
              <span className="policy-section__number">{String(sectionIndex + 1).padStart(2, '0')}</span>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul className="policy-section__list">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <div className="policy-footer-nav">
            <Link to={`/policies/${previous.slug}`} className="policy-footer-nav__item">
              <span><ArrowLeft size={14} /> Previous</span>
              <strong>{previous.title}</strong>
            </Link>
            <Link to={`/policies/${next.slug}`} className="policy-footer-nav__item policy-footer-nav__item--next">
              <span>Next <ArrowRight size={14} /></span>
              <strong>{next.title}</strong>
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

export default function Policies() {
  const { slug } = useParams();
  const policy = findPolicy(slug);

  if (!slug) return <PolicyIndex />;

  if (!policy) {
    return (
      <main className="page policies-page">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Policies', to: '/policies' }, { label: 'Not found' }]} />
          <EmptyState
            icon={<Shield size={34} />}
            eyebrow="Page not found"
            title="This policy has moved."
            text="We could not find that page. Browse all of our sample policies below."
            actionLabel="All policies"
            actionTo="/policies"
            secondaryLabel="Back home"
            secondaryTo="/"
          />
        </div>
      </main>
    );
  }

  return <PolicyDetail policy={policy} />;
}
