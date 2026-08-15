import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PropertyMatcher = lazy(() => import('./PropertyMatcher'));

const PHRASES = ['Find Your Home.', 'Find Your Space.', 'Find Your Future.'];

const HERO_IMAGES = [
  '/images/demo_luxury_apt.webp',
  '/images/demo_penthouse.webp',
  '/images/demo_modern_studio.webp',
  '/images/demo_riverside_flat.webp',
];

export default function Hero() {
  const navigate = useNavigate();
  const [isMatcherOpen, setIsMatcherOpen] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  // Pre-cache next carousel images
  useEffect(() => {
    HERO_IMAGES.forEach((src, i) => {
      if (i > 0) { // Skip first (already preloaded via <link>)
        const img = new Image();
        img.src = src;
      }
    });
  }, []);
  const phraseRef = useRef<HTMLSpanElement>(null);
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(bgTimer);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const type = () => {
      const phrase = PHRASES[phraseIndex.current];
      if (!deleting.current) {
        charIndex.current++;
        if (phraseRef.current) phraseRef.current.textContent = phrase.slice(0, charIndex.current);
        if (charIndex.current === phrase.length) {
          deleting.current = true;
          timer = setTimeout(type, 1800);
          return;
        }
      } else {
        charIndex.current--;
        if (phraseRef.current) phraseRef.current.textContent = phrase.slice(0, charIndex.current);
        if (charIndex.current === 0) {
          deleting.current = false;
          phraseIndex.current = (phraseIndex.current + 1) % PHRASES.length;
        }
      }
      timer = setTimeout(type, deleting.current ? 50 : 90);
    };
    timer = setTimeout(type, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      style={{
        width: '100%', minHeight: '88vh', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('${HERO_IMAGES[bgIndex]}')`,
            backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
          }}
        />
      </AnimatePresence>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(10,10,30,0.88) 0%, rgba(10,10,30,0.5) 55%, transparent 100%)',
        zIndex: 1,
      }} />

      <div style={{ position: 'relative', zIndex: 2, padding: '0 5vw', maxWidth: '720px' }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#20A6E8', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
            Oxford's Premier Letting Agency
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
            lineHeight: 1.1, color: '#fff', margin: '0 0 0.5rem', fontWeight: 700,
          }}
        >
          <span ref={phraseRef} />
          <span style={{ opacity: 0.6, animation: 'blink 1s step-end infinite' }}>|</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            lineHeight: 1.75, marginBottom: '2.5rem', fontFamily: "'Inter', sans-serif", maxWidth: '520px',
          }}
        >
          Discover curated properties for modern living in the heart of Oxford.
          Expert letting and management since 2009.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(76,87,244,0.6)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/properties')}
            style={{
              padding: '0.9rem 2.25rem', fontSize: '1rem', fontWeight: 600,
              background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
              border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif", letterSpacing: '0.3px',
              boxShadow: '0 4px 20px rgba(76,87,244,0.4)',
            }}
          >
            View Properties
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.18)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsMatcherOpen(true)}
            style={{
              padding: '0.9rem 2.25rem', fontSize: '1rem', fontWeight: 600,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px',
              color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: '0.5rem',
              boxShadow: '0 4px 20px rgba(255,255,255,0.1)'
            }}
          >
            ✨ Find My Perfect Home
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 2, color: 'rgba(255,255,255,0.5)',
          fontSize: '1.5rem', cursor: 'pointer',
        }}
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
      >
        ↓
      </motion.div>

      {isMatcherOpen && (
        <Suspense fallback={null}>
          <PropertyMatcher isOpen={isMatcherOpen} onClose={() => setIsMatcherOpen(false)} />
        </Suspense>
      )}
    </section>
  );
}
