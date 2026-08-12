import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedProperties from '../components/FeaturedProperties';
import StatsCounter from '../components/StatsCounter';
import IconFeature from '../components/IconFeature';
import TestimonialsCarousel from '../components/TestimonialsCarousel';

const STATS = [
  { value: 250, suffix: '+', label: 'Properties Managed' },
  { value: 15, suffix: ' yrs', label: 'Industry Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 12, suffix: 'k+', label: 'Happy Tenants' },
];

const FEATURES = [
  { icon: '🏠', title: 'Expert Local Knowledge', body: 'Born and bred in Oxford, we know every street, postcode, and neighbourhood inside out.' },
  { icon: '🔑', title: 'Fully Managed Service', body: 'From tenant sourcing to maintenance coordination, we handle everything on your behalf.' },
  { icon: '📞', title: '24/7 Support', body: 'Our dedicated team is available around the clock for emergencies and urgent queries.' },
  { icon: '⭐', title: 'Trusted by Hundreds', body: 'Over 500 five-star reviews from landlords and tenants across Oxford since 2009.' },
];

const AREAS = [
  { name: 'City Centre', slug: 'city-centre', avg: '£1,600 pcm', img: '/images/area-centre.jpg', desc: 'The heart of Oxford with world-class universities, restaurants, and cultural venues on your doorstep.' },
  { name: 'Headington', slug: 'headington', avg: '£1,200 pcm', img: '/images/area-headington.jpg', desc: 'A charming suburb with excellent schools, the John Radcliffe Hospital, and a vibrant local high street.' },
  { name: 'Cowley', slug: 'cowley', avg: '£950 pcm', img: '/images/area-cowley.jpg', desc: "Oxford's most diverse and lively neighbourhood with great transport links and a growing creative scene." },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>City Properties – Letting & Management in Oxford</title>
        <meta name="description" content="Oxford's premier letting and property management agency. Find your perfect home with City Properties." />
        <meta property="og:title" content="City Properties – Letting & Management in Oxford" />
        <meta property="og:description" content="Oxford's premier letting and property management agency. 250+ properties, 15 years of experience." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Hero />

      <StatsCounter stats={STATS} />

      <FeaturedProperties />

      {/* Why Choose Us */}
      <section style={{ padding: '5rem 5vw', background: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)' }}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p variants={sectionReveal} style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#4C57F4', fontFamily: "'Inter', sans-serif", textAlign: 'center', marginBottom: '0.5rem' }}>Why City Properties</motion.p>
          <motion.h2 variants={sectionReveal} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--color-text)', textAlign: 'center', marginBottom: '3rem' }}>
            The Oxford Letting Experts
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
            {FEATURES.map((f) => (
              <motion.div key={f.title} variants={sectionReveal}>
                <IconFeature icon={f.icon} title={f.title} body={f.body} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <TestimonialsCarousel />

      {/* Area Guide Preview */}
      <section style={{ padding: '5rem 5vw', background: 'var(--color-bg)' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionReveal} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#4C57F4', fontFamily: "'Inter', sans-serif", marginBottom: '0.5rem' }}>Explore Oxford</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--color-text)' }}>Popular Areas</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          {AREAS.map((area, i) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate('/areas/' + area.slug)}
              style={{ cursor: 'pointer', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', background: 'var(--color-surface)', position: 'relative' }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                <img src={area.img} alt={area.name} loading="lazy" style={{ width: '100%', height: '200px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
                <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'linear-gradient(90deg,#4C57F4,#20A6E8)', color: '#fff', padding: '4px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                  {area.avg}
                </span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>{area.name}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>{area.desc}</p>
                <p style={{ marginTop: '0.75rem', color: '#4C57F4', fontWeight: 600, fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>Explore {area.name} →</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)',
        padding: '5rem 5vw', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 3rem)', color: '#fff', marginBottom: '1rem' }}
        >
          Ready to Find Your Next Home?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', marginBottom: '2rem', fontFamily: "'Inter', sans-serif" }}
        >
          Speak with our expert team today and start your Oxford property journey.
        </motion.p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/properties')}
            style={{ padding: '0.9rem 2.25rem', background: '#fff', color: '#4C57F4', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
          >
            Browse Properties
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/contact')}
            style={{ padding: '0.9rem 2.25rem', background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', fontFamily: "'Inter', sans-serif", backdropFilter: 'blur(8px)' }}
          >
            Get in Touch
          </motion.button>
        </div>
      </section>
    </>
  );
}
