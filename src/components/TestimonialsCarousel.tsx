import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  { name: 'Sarah Mitchell', location: 'City Centre, Oxford', text: 'City Properties found us the perfect flat in just two weeks. Incredibly professional and responsive throughout the entire process.', stars: 5 },
  { name: 'James Thornton', location: 'Headington, Oxford', text: 'As a landlord I have trusted City Properties for 5 years. Zero vacancies and excellent tenant management. Highly recommended.', stars: 5 },
  { name: 'Priya Sharma', location: 'Cowley, Oxford', text: 'The team went above and beyond to help me settle into Oxford. The whole experience was seamless from viewing to signing.', stars: 5 },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section
      style={{
        background: 'var(--color-surface)',
        padding: '5rem 5vw',
        textAlign: 'center',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <p style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#4C57F4', fontFamily: "'Inter', sans-serif", marginBottom: '0.5rem' }}>What Our Clients Say</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--color-text)', marginBottom: '3rem' }}>
        Trusted by hundreds across Oxford
      </h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          style={{ maxWidth: '680px', margin: '0 auto' }}
        >
          <div style={{ fontSize: '1.5rem', color: '#f59e0b', marginBottom: '1rem' }}>{'★'.repeat(t.stars)}</div>
          <blockquote
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.8,
              color: 'var(--color-text)',
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              marginBottom: '1.5rem',
            }}
          >
            "{t.text}"
          </blockquote>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: 'var(--color-text)', fontSize: '0.95rem' }}>{t.name}</p>
          <p style={{ fontFamily: "'Inter', sans-serif", color: '#4C57F4', fontSize: '0.85rem' }}>{t.location}</p>
        </motion.div>
      </AnimatePresence>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem' }}>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Testimonial ${i + 1}`}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === current ? '#4C57F4' : '#d1d5db',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
