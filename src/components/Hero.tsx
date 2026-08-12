// src/components/Hero.tsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        width: '100%',
        minHeight: '88vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(10,10,30,0.85) 0%, rgba(10,10,30,0.4) 60%, transparent 100%)',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, padding: '0 5vw', maxWidth: '700px' }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.9rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Oxford's Premier Letting Agency
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 1.15,
            color: '#fff',
            margin: '0 0 1.25rem',
            fontWeight: 700,
          }}
        >
          Find Your Home<br />In Oxford.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            marginBottom: '2rem',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Discover curated properties for modern living in the heart of the city.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/properties')}
            style={{
              padding: '0.85rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            View Properties
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/contact')}
            style={{
              padding: '0.85rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              backdropFilter: 'blur(8px)',
            }}
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
