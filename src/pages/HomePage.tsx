import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedProperties from '../components/FeaturedProperties';
import StatsCounter from '../components/StatsCounter';
import BentoFeatureGrid from '../components/BentoFeatureGrid';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import AreasSection from '../components/AreasSection';

const STATS = [
  { value: 250, suffix: '+', label: 'Properties Managed' },
  { value: 15, suffix: ' yrs', label: 'Industry Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 12, suffix: 'k+', label: 'Happy Tenants' },
];





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

      <BentoFeatureGrid />

      <TestimonialsCarousel />

      <AreasSection />

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
