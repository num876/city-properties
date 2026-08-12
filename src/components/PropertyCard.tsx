import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import GlassCard from './GlassCard';
import Badge from './Badge';

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

export default function PropertyCard({ title, excerpt, slug, imageUrl, imageAlt, price, bedrooms, bathrooms, type }: PropertyCardProps) {
  const [hearted, setHearted] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <Link to={'/properties/' + slug} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <GlassCard>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={imageUrl || PLACEHOLDER}
              alt={imageAlt ?? title}
              loading="lazy"
              style={{ width: '100%', height: '210px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
            />
            {price && (
              <Badge>
                {price}
              </Badge>
            )}
            {price && (
              <span style={{
                position: 'absolute', top: '0.75rem', left: '0.75rem',
                background: 'linear-gradient(90deg,#4C57F4,#20A6E8)',
                color: '#fff', padding: '4px 10px', borderRadius: '999px',
                fontSize: '0.78rem', fontWeight: 600, fontFamily: "'Inter', sans-serif",
              }}>
                {price}
              </span>
            )}
            {type && (
              <span style={{
                position: 'absolute', top: '0.75rem', right: '3rem',
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
                color: '#fff', padding: '4px 10px', borderRadius: '999px',
                fontSize: '0.75rem', fontFamily: "'Inter', sans-serif",
              }}>
                {type}
              </span>
            )}
          </div>
          <div style={{ padding: '1.1rem 1.25rem 1.25rem' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.35rem' }}>
              {title}
            </h3>
            {(bedrooms || bathrooms) && (
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', fontSize: '0.82rem', color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif" }}>
                {bedrooms && <span>🛏 {bedrooms} bed</span>}
                {bathrooms && <span>🚿 {bathrooms} bath</span>}
              </div>
            )}
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: excerpt }} />
            <div style={{ marginTop: '1rem', color: '#4C57F4', fontWeight: 600, fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>
              View Details →
            </div>
          </div>
        </GlassCard>
      </Link>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => setHearted((h) => !h)}
        aria-label={hearted ? 'Remove from favourites' : 'Add to favourites'}
        style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
          border: 'none', borderRadius: '50%',
          width: '32px', height: '32px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.9rem',
          zIndex: 10,
        }}
      >
        {hearted ? '❤️' : '🤍'}
      </motion.button>
    </div>
  );
}
