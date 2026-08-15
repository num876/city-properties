import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import { DEMO_PROPERTIES } from '../data/properties';

export default function FeaturedProperties() {
  const navigate = useNavigate();
  const properties = DEMO_PROPERTIES.slice(0, 5);
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{
      padding: '5rem 0 5rem 5vw', // left padding 5vw, right padding 0 to allow overflow visually
      background: 'var(--color-bg)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingRight: '5vw' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: '1.5rem', marginBottom: '3rem'
        }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p style={{
              fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase',
              color: '#4C57F4', fontFamily: "'Inter', sans-serif", marginBottom: '0.75rem', fontWeight: 600
            }}>
              Browse Our Portfolio
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-text)', margin: 0, lineHeight: 1.1
            }}>
              Featured Properties
            </h2>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(76,87,244,0.15)' }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/properties')}
            style={{
              padding: '0.85rem 1.75rem', background: 'var(--color-surface)',
              border: '1px solid var(--color-border)', borderRadius: '999px', color: 'var(--color-text)', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            View All →
          </motion.button>
        </div>
      </div>

      {/* Draggable Carousel */}
      <div ref={carouselRef} style={{ width: '100%', overflow: 'hidden', cursor: 'grab', position: 'relative' }}>
        <motion.div 
          drag="x" 
          dragConstraints={carouselRef}
          whileTap={{ cursor: 'grabbing' }}
          style={{ display: 'inline-flex', gap: '1.5rem', paddingRight: '5vw', paddingBottom: '2rem' }}
        >
          {properties.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ minWidth: '280px', width: '28vw', maxWidth: '380px', flexShrink: 0 }}
            >
              <PropertyCard
                title={p.title}
                excerpt={p.excerpt}
                slug={p.slug}
                imageUrl={p.featuredImage?.node.sourceUrl}
                imageAlt={p.featuredImage?.node.altText}
                price={p.price}
                bedrooms={p.bedrooms}
                bathrooms={p.bathrooms}
                type={p.type}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingRight: '5vw', display: 'flex', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>
          ← Swipe to explore →
        </p>
      </div>
    </section>
  );
}
