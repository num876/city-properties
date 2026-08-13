import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion';

const STEPS = [
  { icon: '🔍', title: 'Search', desc: 'Browse our portfolio of available properties and use filters to find your perfect match.' },
  { icon: '👁', title: 'View', desc: 'Book a viewing online or by phone. We offer evening and weekend appointments.' },
  { icon: '📝', title: 'Apply', desc: 'Submit your application online with references and proof of income.' },
  { icon: '✅', title: 'Reference Check', desc: 'We conduct professional reference and credit checks, typically within 48 hours.' },
  { icon: '✍', title: 'Sign', desc: 'Sign your tenancy agreement digitally from anywhere in the world.' },
  { icon: '🏠', title: 'Move In', desc: 'Collect your keys and start enjoying your new Oxford home.' },
];

const FAQ = [
  { question: 'How much is the holding deposit?', answer: "The holding deposit is equivalent to one week's rent, capped as per the Tenant Fees Act 2019." },
  { question: 'Do you accept DSS / Universal Credit?', answer: 'We work with a range of landlords, some of whom do accept housing benefit. Please enquire about specific properties.' },
  { question: 'How long does referencing take?', answer: 'Standard referencing typically takes 3–5 working days once all documents have been submitted.' },
  { question: 'Can I have pets?', answer: 'Some of our properties are pet-friendly. Please filter your search or contact us to discuss your requirements.' },
  { question: 'What are my maintenance responsibilities?', answer: 'Tenants are responsible for general upkeep and reporting issues promptly. Landlords are responsible for structural repairs and appliance maintenance.' },
];

const reveal = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function TenantsPage() {
  return (
    <>
      <Helmet>
        <title>Tenants Guide – City Properties Oxford</title>
        <meta name="description" content="A step-by-step guide to renting in Oxford with City Properties." />
      </Helmet>

      <section style={{ background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)', padding: '3.5rem 5vw 2.5rem', color: '#fff', textAlign: 'center' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '0.5rem' }}
        >
          Tenants Guide
        </motion.h1>
        <p style={{ fontFamily: "'Inter', sans-serif", opacity: 0.9 }}>Everything you need to know about renting with City Properties</p>
      </section>

      {/* Steps */}
      <section style={{ padding: '5rem 5vw', background: 'var(--color-bg)' }}>
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', textAlign: 'center', color: 'var(--color-text)', marginBottom: '3rem' }}
        >
          Your Journey to a New Home
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{ textAlign: 'center', padding: '2rem 1.5rem', background: 'var(--color-surface)', borderRadius: '14px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid var(--color-border)', position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '-1rem', left: '50%', transform: 'translateX(-50%)', width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #4C57F4, #20A6E8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>{i + 1}</div>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', marginTop: '0.5rem' }}>{step.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>{step.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Maintenance CTA */}
      <section style={{ padding: '4rem 5vw', background: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'linear-gradient(135deg, #4C57F4, #20A6E8)', borderRadius: '16px', padding: '3rem 2rem', color: '#fff', textAlign: 'center', boxShadow: '0 10px 40px rgba(76,87,244,0.2)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '1rem' }}>Need to report an issue?</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem' }}>
            Our intelligent maintenance portal helps diagnose common problems instantly and dispatches contractors for repairs 24/7.
          </p>
          <Link to="/maintenance" style={{ display: 'inline-block', background: '#fff', color: '#4C57F4', textDecoration: 'none', padding: '0.9rem 2.5rem', borderRadius: '10px', fontWeight: 600, fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            Report Maintenance
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '4rem 5vw 5rem', background: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', textAlign: 'center', color: 'var(--color-text)', marginBottom: '2.5rem' }}>Frequently Asked Questions</h2>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <Accordion items={FAQ} />
        </div>
      </section>
    </>
  );
}
