import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface PropertyCardProps {
  title: string;
  excerpt: string;
  slug: string;
  imageUrl?: string;
  imageAlt?: string;
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80';

export default function PropertyCard({ title, slug, imageUrl, imageAlt, price, bedrooms, bathrooms, type }: PropertyCardProps) {
  const [hearted, setHearted] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '440px', borderRadius: '24px', overflow: 'hidden' }}>
      <Link to={'/properties/' + slug} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
        <motion.div
          whileHover="hover"
          initial="initial"
          style={{ width: '100%', height: '100%', position: 'relative' }}
        >
          {/* Background Image */}
          <motion.img
            variants={{
              initial: { scale: 1 },
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            src={imageUrl || PLACEHOLDER}
            alt={imageAlt ?? title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* Gradient Overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
            pointerEvents: 'none'
          }} />

          {/* Top Badges */}
          {type && (
            <span style={{
              position: 'absolute', top: '1.25rem', left: '1.25rem',
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              color: '#fff', padding: '6px 14px', borderRadius: '999px',
              fontSize: '0.75rem', fontWeight: 600, fontFamily: "'Inter', sans-serif",
              border: '1px solid rgba(255,255,255,0.3)',
              textTransform: 'uppercase', letterSpacing: '1px'
            }}>
              {type}
            </span>
          )}

          {/* Bottom Content */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
            {price && (
              <div style={{
                color: '#fff', fontSize: '1.4rem', fontWeight: 700, fontFamily: "'Inter', sans-serif",
                marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}>
                {price}
              </div>
            )}
            <h3 style={{
              fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 600,
              color: '#fff', margin: '0 0 0.5rem 0', lineHeight: 1.3
            }}>
              {title}
            </h3>
            
            {(bedrooms || bathrooms) && (
              <div style={{
                display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)',
                fontFamily: "'Inter', sans-serif", fontWeight: 500
              }}>
                {bedrooms && <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>🛏 {bedrooms} beds</span>}
                {bathrooms && <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>🚿 {bathrooms} baths</span>}
              </div>
            )}
          </div>
        </motion.div>
      </Link>

      {/* Heart Button */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.preventDefault(); setHearted((h) => !h); }}
        aria-label={hearted ? 'Remove from favourites' : 'Add to favourites'}
        style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem',
          background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%',
          width: '38px', height: '38px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', zIndex: 10,
        }}
      >
        {hearted ? '❤️' : '🤍'}
      </motion.button>
    </div>
  );
}
