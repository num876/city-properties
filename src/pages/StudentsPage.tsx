import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PropertyCard from '../components/PropertyCard';

// Extracted from the 2019-2020 (updated 2026) student properties page
import { STUDENT_PROPERTIES } from '../data/properties';

export default function StudentsPage() {
  const [filter, setFilter] = useState<'all' | 4 | 5 | 6>('all');

  const displayed = filter === 'all' ? STUDENT_PROPERTIES : STUDENT_PROPERTIES.filter(p => p.bedrooms === filter);

  return (
    <>
      <Helmet>
        <title>Student Properties – City Properties Oxford</title>
        <meta name="description" content="Premium student accommodation in Oxford. Browse our 4, 5, and 6 bedroom houses for the upcoming academic year." />
      </Helmet>

      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0a0a1e 0%, #1a1a3e 100%)', 
        padding: '5rem 5vw', 
        color: '#fff',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            style={{ 
              display: 'inline-block',
              background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
              color: '#fff',
              padding: '6px 16px',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              marginBottom: '1.5rem',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
          >
            2026 - 2027 Academic Year
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem', lineHeight: 1.1 }}
          >
            Student Accommodation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}
          >
            Secure your group's perfect Oxford home for the next academic year. Prime locations, high-spec finishes, and excellent property management.
          </motion.p>

          {/* Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}
          >
            {[
              { label: 'All Properties', val: 'all' },
              { label: '4 Bedrooms', val: 4 },
              { label: '5 Bedrooms', val: 5 },
              { label: '6 Bedrooms', val: 6 }
            ].map(f => (
              <button
                key={f.val}
                onClick={() => setFilter(f.val as any)}
                style={{
                  padding: '0.6rem 1.5rem',
                  background: filter === f.val ? '#fff' : 'rgba(255,255,255,0.1)',
                  color: filter === f.val ? '#1a1a3e' : '#fff',
                  border: filter === f.val ? '1px solid #fff' : '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '999px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Property Grid */}
      <section style={{ padding: '4rem 5vw', background: 'var(--color-bg)', minHeight: '50vh' }}>
        <motion.div
          key={filter}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', maxWidth: '1200px', margin: '0 auto' }}
        >
          {displayed.map((p) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
              <PropertyCard
                title={p.title} excerpt={p.excerpt} slug={p.slug}
                imageUrl={p.featuredImage?.node.sourceUrl} imageAlt={p.featuredImage?.node.altText}
                price={p.price} bedrooms={p.bedrooms} type={p.type}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {displayed.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem' }}>No properties found for this category.</p>
          </div>
        )}
      </section>
    </>
  );
}
