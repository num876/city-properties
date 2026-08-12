import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import IconFeature from '../components/IconFeature';

const TIMELINE = [
  { year: '2009', title: 'Founded', desc: 'City Properties opens its doors in central Oxford with a mission to redefine local letting.' },
  { year: '2014', title: '100 Properties', desc: 'We reach our first milestone of 100 managed properties across Oxford.' },
  { year: '2019', title: 'Digital First', desc: 'Launched our digital-first approach with online viewing, signing, and management.' },
  { year: '2026', title: '250+ Managed', desc: 'Today we manage over 250 properties and serve thousands of tenants and landlords.' },
];

const TEAM = [
  { name: 'James Whitfield', role: 'Founder & Director', emoji: '👨💼' },
  { name: 'Sophie Clarke', role: 'Head of Lettings', emoji: '👩💼' },
  { name: 'Marcus Okafor', role: 'Property Manager', emoji: '🧑💼' },
  { name: 'Emily Chen', role: 'Client Relations', emoji: '👩💼' },
];

const VALUES = [
  { icon: '🤝', title: 'Integrity', body: 'We are honest and transparent in everything we do — no hidden fees, no surprises.' },
  { icon: '🌆', title: 'Community', body: 'Oxford is our home. We invest in our community and care about its residents.' },
  { icon: '🏆', title: 'Excellence', body: 'We set the highest standards for service quality and continuously raise the bar.' },
];

const reveal = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About – City Properties Oxford</title>
        <meta name="description" content="Learn about City Properties, Oxford's trusted letting and property management agency since 2009." />
      </Helmet>

      {/* Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)', padding: '4rem 5vw 3rem', color: '#fff', textAlign: 'center' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginBottom: '1rem' }}
        >
          About City Properties
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}
        >
          Oxford's most trusted letting agency — serving landlords and tenants with integrity since 2009.
        </motion.p>
      </section>

      {/* Story */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}
        style={{ padding: '5rem 5vw', background: 'var(--color-bg)', maxWidth: '900px', margin: '0 auto' }}
      >
        <p style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#4C57F4', fontFamily: "'Inter', sans-serif", marginBottom: '0.75rem' }}>Our Story</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--color-text)', marginBottom: '1.25rem' }}>Born and Bred in Oxford</h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.85 }}>
          City Properties was founded in 2009 with a single vision: to make renting in Oxford a genuinely positive experience. Over 15 years we have grown from a small family office to one of Oxford's most recognised letting agencies, managing over 250 properties across every major neighbourhood.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.85, marginTop: '1rem' }}>
          We pride ourselves on transparency, responsiveness, and a deep knowledge of the local market. Every tenant and landlord we work with becomes part of the City Properties family.
        </p>
      </motion.section>

      {/* Timeline */}
      <section style={{ padding: '3rem 5vw 5rem', background: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)' }}>
        <h2 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--color-text)', marginBottom: '3rem' }}>Our Journey</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(180deg, #4C57F4, #20A6E8)', transform: 'translateX(-50%)' }} />
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                marginBottom: '2.5rem', position: 'relative',
              }}
            >
              <div style={{
                width: 'calc(50% - 2rem)',
                background: 'var(--color-surface)', borderRadius: '12px',
                padding: '1.25rem 1.5rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                border: '1px solid var(--color-border)',
              }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4C57F4', fontFamily: "'Inter', sans-serif", letterSpacing: '1px' }}>{item.year}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--color-text)', margin: '0.25rem 0 0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '5rem 5vw', background: 'var(--color-bg)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--color-text)', marginBottom: '3rem' }}>Meet the Team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{ background: 'var(--color-surface)', borderRadius: '14px', padding: '2rem 1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid var(--color-border)' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{member.emoji}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>{member.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#4C57F4', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '4rem 5vw 5rem', background: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)' }}>
        <h2 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--color-text)', marginBottom: '3rem' }}>Our Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
          {VALUES.map((v) => <IconFeature key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
        </div>
      </section>
    </>
  );
}
