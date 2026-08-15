import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import IconFeature from '../components/IconFeature';

const TIMELINE = [
  { year: '2009', title: 'Founded', desc: 'City Properties opens its doors in central Oxford with a mission to redefine local letting.' },
  { year: '2014', title: '100 Properties', desc: 'We reach our first milestone of 100 managed properties across Oxford, expanding our team.' },
  { year: '2019', title: 'Digital First', desc: 'Launched our digital-first approach with online viewing, signing, and proactive management.' },
  { year: '2026', title: '250+ Managed', desc: 'Today we manage over 250 properties and serve thousands of happy tenants and landlords.' },
];

const TEAM = [
  { name: 'James Whitfield', role: 'Founder & Director', img: 'https://i.pravatar.cc/150?u=james_w' },
  { name: 'Sophie Clarke', role: 'Head of Lettings', img: 'https://i.pravatar.cc/150?u=sophie_c' },
  { name: 'Marcus Okafor', role: 'Property Manager', img: 'https://i.pravatar.cc/150?u=marcus_o' },
  { name: 'Emily Chen', role: 'Client Relations', img: 'https://i.pravatar.cc/150?u=emily_c' },
];

const VALUES = [
  { icon: '🤝', title: 'Integrity', body: 'We are honest and transparent in everything we do — no hidden fees, no surprises.' },
  { icon: '🌆', title: 'Community', body: 'Oxford is our home. We invest in our community and deeply care about its residents.' },
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

      {/* Cinematic Hero Banner */}
      <section style={{ 
        position: 'relative',
        width: '100%',
        height: '45vh',
        minHeight: '350px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5vw',
        overflow: 'hidden'
      }}>
        {/* Background Image & Gradient */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img 
            src="/images/demo_victorian_townhouse.webp" 
            alt="Beautiful Oxford Victorian Townhouse"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,30,0.85) 0%, rgba(10,10,30,0.4) 100%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', marginBottom: '0.75rem', lineHeight: 1.1 }}
          >
            About City Properties
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: "'Inter', sans-serif", opacity: 0.9, fontSize: '1.15rem', color: '#fff', maxWidth: '600px' }}
          >
            Oxford's most trusted letting agency — serving landlords and tenants with unwavering integrity since 2009.
          </motion.p>
        </div>
      </section>

      {/* Editorial Story */}
      <section style={{ padding: '6rem 5vw', background: 'var(--color-bg)', position: 'relative' }}>
        {/* Subtle background decoration */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', fontSize: '20rem', opacity: 0.02, fontFamily: "'Playfair Display', serif", lineHeight: 0.8, pointerEvents: 'none' }}>
          &
        </div>
        
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          <p style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#4C57F4', fontFamily: "'Inter', sans-serif", marginBottom: '0.75rem', fontWeight: 600 }}>
            Our Story
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text)', marginBottom: '2rem', lineHeight: 1.2 }}>
            Born and Bred in Oxford
          </h2>
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <span style={{ 
              float: 'left', fontSize: '5rem', lineHeight: '0.8', 
              color: '#4C57F4', fontFamily: "'Playfair Display', serif", 
              paddingTop: '0.5rem', paddingRight: '0.5rem'
            }}>
              C
            </span>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', color: 'var(--color-text)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                ity Properties was founded in 2009 with a single, unwavering vision: to make renting in Oxford a genuinely positive experience. Over 15 years we have grown from a small family office to one of Oxford's most recognised letting agencies.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
                We manage over 250 properties across every major neighbourhood. We pride ourselves on transparency, lightning-fast responsiveness, and a deep knowledge of the local market. Whether you're a student looking for your first house share, or a portfolio landlord seeking peace of mind, you become part of the City Properties family.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Glassmorphic Timeline */}
      <section style={{ padding: '6rem 5vw', background: 'linear-gradient(135deg, #0a0a1e 0%, #1a1a3e 100%)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
        {/* Glow behind timeline */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '100%', background: 'rgba(76,87,244,0.1)', filter: 'blur(100px)', pointerEvents: 'none' }} />
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }}>Our Journey</h2>
        </motion.div>

        <div className="timeline-container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Glowing Track */}
          <div className="timeline-track" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(180deg, rgba(76,87,244,0) 0%, #20A6E8 50%, rgba(76,87,244,0) 100%)', transform: 'translateX(-50%)' }} />
          
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
              style={{ position: 'relative', marginBottom: '3rem', width: '100%' }}
            >
              <div className="timeline-content" style={{
                width: 'calc(50% - 3rem)',
                background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '16px', padding: '1.75rem',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                position: 'relative'
              }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#20A6E8', fontFamily: "'Inter', sans-serif", letterSpacing: '1px' }}>{item.year}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#fff', margin: '0.25rem 0 0.75rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '6rem 5vw', background: 'var(--color-bg)', textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} style={{ marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#4C57F4', fontFamily: "'Inter', sans-serif", marginBottom: '0.75rem', fontWeight: 600 }}>The People</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text)', margin: 0 }}>Meet the Team</h2>
        </motion.div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, boxShadow: '0 12px 40px rgba(76,87,244,0.12)' }}
              style={{ 
                background: 'var(--color-surface)', borderRadius: '20px', padding: '2.5rem 1.5rem', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid var(--color-border)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <div style={{ 
                width: '90px', height: '90px', margin: '0 auto 1.5rem',
                borderRadius: '50%', overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                border: '3px solid #fff'
              }}>
                <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: 'var(--color-text)', marginBottom: '0.35rem' }}>{member.name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#4C57F4', fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '5rem 5vw 7rem', background: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)' }}>
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text)', marginBottom: '4rem' }}>
          Our Values
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          {VALUES.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <IconFeature icon={v.icon} title={v.title} body={v.body} />
            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        .timeline-item { display: flex; }
        .timeline-item.left { justify-content: flex-start; }
        .timeline-item.right { justify-content: flex-end; }
        
        @media (max-width: 768px) {
          .timeline-track { left: 1rem !important; transform: none !important; }
          .timeline-item.left, .timeline-item.right { justify-content: flex-start; padding-left: 3rem; }
          .timeline-content { width: 100% !important; }
        }
      `}</style>
    </>
  );
}
