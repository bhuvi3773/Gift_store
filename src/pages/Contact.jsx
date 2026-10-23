import { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';
import { useToast } from '../context/ToastContext.jsx';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Button from '../components/Button.jsx';
import Field from '../components/Field.jsx';
import {
  ArrowRight,
  Check,
  Clock,
  Mail,
  MapPin,
  Phone,
  Sparkle,
} from '../components/Icons.jsx';

const initialForm = { name: '', email: '', topic: 'A gift recommendation', message: '' };

const faqs = [
  {
    question: 'Can you help me choose a gift?',
    answer:
      'Yes — tell us a little about the person, the occasion and your budget in the form above. In a live studio, one of our team would reply within one working day. This demo form does not send anything.',
  },
  {
    question: 'Can I include a handwritten note?',
    answer:
      'Every hand-wrapped order can include a note. Add your message on the product page or at checkout. We write notes by hand in the studio.',
  },
  {
    question: 'Do you offer corporate gifting?',
    answer:
      'We have a small corporate edit and can assemble repeat orders with individual notes. The Corporate Concierge Set is a good place to start.',
  },
  {
    question: 'How quickly will my gift arrive?',
    answer:
      'Most gifts are dispatched within 1–2 business days, with delivery in 2–7 business days across India. Personalised pieces take a little longer. See our Shipping & Delivery page for sample details.',
  },
];

export default function Contact() {
  usePageTitle('Contact');
  const { notify } = useToast();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (event) => {
    const value = event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = 'A little more detail would help us help you.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      window.setTimeout(() => document.getElementById(`contact-${first}`)?.focus(), 30);
      return;
    }
    setSubmitted(true);
    notify({
      title: 'Message checked and ready',
      message: 'This is a demo — nothing was sent. No email was transmitted.',
      type: 'success',
      duration: 5200,
    });
  };

  const reset = () => {
    setForm(initialForm);
    setSubmitted(false);
    setErrors({});
  };

  return (
    <main className="page contact-page">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
      </div>

      <section className="contact-hero">
        <div className="container contact-hero__grid">
          <div>
            <p className="eyebrow"><Sparkle size={14} /> We are here to help</p>
            <h1>
              Let us help you
              <br />
              <em>find the words.</em>
            </h1>
            <p>
              A gift recommendation, a corporate order, a question about delivery — write to us and
              we will help you choose well.
            </p>
          </div>
          <div className="contact-hero__note">
            <span className="contact-hero__note-icon"><Mail size={20} /></span>
            <p>Prefer email? Write to</p>
            <a href="mailto:hello@ksrgiftstore.example">hello@ksrgiftstore.example</a>
            <span>Sample contact details for this demonstration.</span>
          </div>
        </div>
      </section>

      <section className="section contact-main">
        <div className="container contact-layout">
          <div className="contact-form-card">
            {submitted ? (
              <div className="contact-success" role="status">
                <span className="contact-success__icon"><Check size={28} /></span>
                <p className="eyebrow">All checked</p>
                <h2>Thank you, {form.name.split(' ')[0] || 'friend'}.</h2>
                <p>
                  Your message has been validated in the browser — but this is a frontend
                  demonstration, so <strong>no email was sent and nothing was stored</strong>.
                </p>
                <p className="contact-success__detail">
                  In a live store, our studio team would reply to <strong>{form.email}</strong> within
                  one working day.
                </p>
                <div className="contact-success__actions">
                  <Button variant="primary" onClick={reset}>
                    Send another note <ArrowRight size={16} />
                  </Button>
                  <Button to="/shop" variant="ghost">
                    Continue shopping
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="contact-form-card__head">
                  <p className="eyebrow">Send a note</p>
                  <h2>Tell us what you are looking for.</h2>
                  <p>Fields marked with * are required. This form does not send emails.</p>
                </div>
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-grid">
                    <Field
                      id="contact-name"
                      label="Your name"
                      value={form.name}
                      onChange={update('name')}
                      error={errors.name}
                      autoComplete="name"
                      required
                    />
                    <Field
                      id="contact-email"
                      label="Email address"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      error={errors.email}
                      autoComplete="email"
                      required
                    />
                    <Field
                      as="select"
                      id="contact-topic"
                      label="What can we help with?"
                      value={form.topic}
                      onChange={update('topic')}
                      className="form-grid__full"
                    >
                      <option>A gift recommendation</option>
                      <option>An existing (demo) order</option>
                      <option>Corporate gifting</option>
                      <option>Delivery or returns</option>
                      <option>Something else</option>
                    </Field>
                    <Field
                      as="textarea"
                      id="contact-message"
                      label="Your message"
                      value={form.message}
                      onChange={update('message')}
                      error={errors.message}
                      placeholder="Tell us about the person, the occasion and what you have in mind…"
                      rows={5}
                      className="form-grid__full"
                      required
                    />
                  </div>
                  <div className="contact-form__foot">
                    <p>
                      We reply within one working day in a live store. No data is transmitted by this
                      demo.
                    </p>
                    <Button type="submit" size="lg">
                      Send message <ArrowRight size={17} />
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>

          <aside className="contact-details">
            <p className="eyebrow">The studio</p>
            <h2>Come and say hello.</h2>
            <div className="contact-detail-list">
              <a href="mailto:hello@ksrgiftstore.example" className="contact-detail">
                <span><Mail size={18} /></span>
                <div>
                  <h3>Email</h3>
                  <p>hello@ksrgiftstore.example</p>
                </div>
              </a>
              <a href="tel:+919876543210" className="contact-detail">
                <span><Phone size={18} /></span>
                <div>
                  <h3>Phone</h3>
                  <p>+91 98765 43210</p>
                </div>
              </a>
              <div className="contact-detail">
                <span><MapPin size={18} /></span>
                <div>
                  <h3>Studio</h3>
                  <p>
                    12 Linden Lane, Indiranagar
                    <br />
                    Bengaluru 560038
                  </p>
                </div>
              </div>
              <div className="contact-detail">
                <span><Clock size={18} /></span>
                <div>
                  <h3>Hours</h3>
                  <p>
                    Monday–Saturday, 10am–6pm IST
                    <br />
                    Closed on public holidays
                  </p>
                </div>
              </div>
            </div>
            <div className="contact-details__image">
              <img src="/images/story-atelier.jpg" alt="The KSR studio table — sample photography" loading="lazy" />
            </div>
            <p className="contact-details__note">
              All contact details are placeholders for this demonstration.
            </p>
          </aside>
        </div>
      </section>

      <section className="section section--cream contact-faq">
        <div className="container contact-faq__grid">
          <div>
            <p className="eyebrow">Before you write</p>
            <h2>Questions we are often asked.</h2>
            <p className="contact-faq__text">
              A few quick answers about wrapping, delivery and corporate gifting. For anything else,
              the form above is the place to start.
            </p>
            <Link to="/policies/shipping-delivery" className="text-link">
              Read shipping & delivery <ArrowRight size={15} />
            </Link>
          </div>
          <div className="accordion-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
