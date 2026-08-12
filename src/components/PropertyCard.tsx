// src/components/PropertyCard.tsx
import { Link } from 'react-router-dom';
import { colors, spacing, fonts } from '../design/tokens';

interface PropertyCardProps {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  imageUrl?: string;
  imageAlt?: string;
}

const cardStyle: React.CSSProperties = {
  backgroundColor: colors.white,
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  overflow: 'hidden',
  textAlign: 'center',
  fontFamily: fonts.body,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '180px',
  objectFit: 'cover',
};

const contentStyle: React.CSSProperties = {
  padding: spacing.sm,
};

function PropertyCard({ id, title, excerpt, slug, imageUrl, imageAlt }: PropertyCardProps) {
  return (
    <Link to={`/properties/${slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={cardStyle}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'none';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        }}
      >
        {imageUrl && <img src={imageUrl} alt={imageAlt ?? ''} style={imageStyle} />}
        <div style={contentStyle}>
          <h3 style={{ margin: spacing.sm }}>{title}</h3>
          <p style={{ fontSize: '0.9rem' }} dangerouslySetInnerHTML={{ __html: excerpt }} />
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;
