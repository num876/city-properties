// src/components/PropertyCard.tsx
import { Link } from 'react-router-dom';
import GlassCard from './GlassCard';

interface PropertyCardProps {
  title: string;
  excerpt: string;
  slug: string;
  imageUrl?: string;
  imageAlt?: string;
}

const PLACEHOLDER =
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80';

export default function PropertyCard({
  title,
  excerpt,
  slug,
  imageUrl,
  imageAlt,
}: PropertyCardProps) {
  return (
    <Link to={'/properties/' + slug} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <GlassCard>
        <img
          src={imageUrl || PLACEHOLDER}
          alt={imageAlt ?? title}
          style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ padding: '1.1rem 1.25rem 1.25rem' }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#111',
              marginBottom: '0.5rem',
            }}
          >
            {title}
          </h3>
          <p
            style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.6 }}
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <div
            style={{
              marginTop: '1rem',
              color: '#4C57F4',
              fontWeight: 600,
              fontSize: '0.88rem',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            View Details →
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
