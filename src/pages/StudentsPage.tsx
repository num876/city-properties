import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import { STUDENT_PROPERTIES } from '../data/properties';

export default function StudentsPage() {
  const [filter, setFilter] = useState<'all' | 4 | 5 | 6>('all');

  const displayed = useMemo(() => {
    return filter === 'all' ? STUDENT_PROPERTIES : STUDENT_PROPERTIES.filter(p => p.bedrooms === filter);
  }, [filter]);

  return (
    <>
      <Helmet>
        <title>Student Properties – City Properties Oxford</title>
        <meta name="description" content="Premium student accommodation in Oxford. Browse our 4, 5, and 6 bedroom houses for the upcoming academic year." />
      </Helmet>

      {/* Cinematic Hero Section */}
      <section style={{ 
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 5vw',
        overflow: 'hidden'
      }}>
        {/* Background Image & Gradient */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img 
            src="/images/demo_student_chester.webp" 
            alt="Students relaxing in a premium Oxford house"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Subtle gradient overlay so the image isn't too bright */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,30,0.85) 0%, rgba(10,10,30,0.5) 100%)' }} />
        </div>

        {/* Glassmorphic Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: 'relative',
            zIndex: 1,
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '24px',
            padding: '4rem 3rem',
            textAlign: 'center',
            maxWidth: '800px',
            width: '100%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          }}
        >
          {/* Floating Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <span style={{
              background: 'linear-gradient(90deg, #4C57F4, #20A6E8)', color: '#fff',
              padding: '6px 16px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700,
              fontFamily: "'Inter', sans-serif", letterSpacing: '1px', textTransform: 'uppercase',
              boxShadow: '0 4px 12px rgba(76,87,244,0.3)'
            }}>
              Available Sep 2026
            </span>
            <span style={{
              background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)',
              padding: '6px 16px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600,
              fontFamily: "'Inter', sans-serif", letterSpacing: '1px', textTransform: 'uppercase'
            }}>
              Bills Included Options
            </span>
          </div>

          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
            color: '#fff', margin: '0 0 1rem 0', lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,0.2)' 
          }}>
            Student Living, Elevated.
          </h1>
          <p style={{ 
            fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.9)', 
            fontSize: 'clamp(1rem, 2vw, 1.15rem)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 
          }}>
            Secure your group's perfect Oxford home for the next academic year. Experience prime locations, high-spec finishes, and proactive property management.
          </p>
        </motion.div>
      </section>

      {/* Property Grid & Filters */}
      <section style={{ padding: '4rem 5vw', background: 'var(--color-bg)', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Refined Tab Filter System */}
          <div style={{ 
            display: 'flex', justifyContent: 'center', marginBottom: '3rem'
          }}>
            <div style={{
              display: 'flex', gap: '0.5rem', background: 'var(--color-surface)',
              padding: '0.5rem', borderRadius: '999px', border: '1px solid var(--color-border)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)', flexWrap: 'wrap', justifyContent: 'center'
            }}>
              {[
                { label: 'All Properties', val: 'all' },
                { label: '4 Bedrooms', val: 4 },
                { label: '5 Bedrooms', val: 5 },
                { label: '6 Bedrooms', val: 6 }
              ].map(f => {
                const isActive = filter === f.val;
                return (
                  <button
                    key={f.val}
                    onClick={() => setFilter(f.val as any)}
                    style={{
                      position: 'relative',
                      padding: '0.75rem 1.5rem',
                      background: 'transparent',
                      border: 'none',
                      color: isActive ? '#fff' : 'var(--color-text)',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      zIndex: 1,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterTab"
                        style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
                          borderRadius: '999px', zIndex: -1
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Staggered Grid */}
          <motion.div
            layout
            style={{ 
              display: 'grid', gap: '2.5rem', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' 
            }}
          >
            <AnimatePresence mode="popLayout">
              {displayed.map((p, i) => (
                <motion.div 
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 25, delay: i * 0.05 }}
                >
                  <PropertyCard
                    title={p.title} excerpt={p.excerpt} slug={p.slug}
                    imageUrl={p.featuredImage?.node.sourceUrl} imageAlt={p.featuredImage?.node.altText}
                    price={p.price} bedrooms={p.bedrooms} type={p.type}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {displayed.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}
            >
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem' }}>No properties found for this size. Please try another filter.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Small Informational Section: Why Rent With Us */}
      <section style={{ 
        padding: '5rem 5vw', 
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--color-text)', marginBottom: '1rem' }}>
              Why Students Choose City Properties
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
              We take the stress out of student housing so you can focus on your studies and enjoying your time in Oxford.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🛠️', title: '24/7 Maintenance', desc: 'Our dedicated portal and AI triage system means repairs are handled faster than ever.' },
              { icon: '💸', title: 'Transparent Fees', desc: 'No hidden admin fees or surprise charges. We keep everything upfront and honest.' },
              { icon: '📍', title: 'Prime Locations', desc: 'All our properties are carefully selected in the best student areas near campus.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ 
                  background: 'var(--color-bg)', padding: '2rem', borderRadius: '16px', 
                  border: '1px solid var(--color-border)', transition: 'transform 0.3s ease'
                }}
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.15rem', color: 'var(--color-text)', marginBottom: '0.75rem' }}>{feature.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
