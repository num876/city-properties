import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { client, GET_PROPERTY_BY_SLUG } from '../api/wordpress';
import Skeleton from '../components/Skeleton';

interface PropertyDetail {
  id: string;
  title: string;
  content: string;
  featuredImage?: { node: { sourceUrl: string; altText: string } };
}

const TABS = ['Overview', 'Location', 'Floorplan'];

export default function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [hearted, setHearted] = useState(false);

  useEffect(() => {
    if (!slug) return;
    client.request(GET_PROPERTY_BY_SLUG, { slug })
      .then((data) => { setProperty((data as any).propertyBy); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div style={{ padding: '3rem 5vw', background: 'var(--color-bg)' }}>
      <Skeleton height="400px" />
      <div style={{ height: '1rem' }} />
      <Skeleton height="200px" />
    </div>
  );

  if (!property) return (
    <div style={{ padding: '4rem 5vw', textAlign: 'center', background: 'var(--color-bg)' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-text)' }}>Property not found.</h2>
      <button onClick={() => navigate('/properties')} style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: 'linear-gradient(90deg,#4C57F4,#20A6E8)', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Browse Properties</button>
    </div>
  );

  const PLACEHOLDER = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80';
  const imgSrc = property.featuredImage?.node.sourceUrl || PLACEHOLDER;

  return (
    <>
      <Helmet>
        <title>{property.title} – City Properties Oxford</title>
        <meta name="description" content={property.title} />
      </Helmet>

      {/* Back button */}
      <div style={{ padding: '1rem 5vw', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
        <button onClick={() => navigate('/properties')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4C57F4', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          ← Back to Properties
        </button>
      </div>

      {/* Hero image */}
      <div style={{ width: '100%', height: 'clamp(250px, 45vw, 480px)', overflow: 'hidden', position: 'relative' }}>
        <img src={imgSrc} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
        <h1 style={{
          position: 'absolute', bottom: '2rem', left: '5vw',
          fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.4)',
        }}>
          {property.title}
        </h1>
      </div>

      {/* Two column */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: '2rem', padding: '2.5rem 5vw', background: 'var(--color-bg)', maxWidth: '1200px', margin: '0 auto' }} className="detail-grid">
        
        {/* Left: Tabs */}
        <div>
          <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid var(--color-border)', marginBottom: '2rem' }}>
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: '0.75rem 1.5rem', background: 'none', border: 'none',
                  cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: i === activeTab ? 600 : 400,
                  color: i === activeTab ? '#4C57F4' : 'var(--color-text-muted)',
                  borderBottom: i === activeTab ? '2px solid #4C57F4' : '2px solid transparent',
                  marginBottom: '-2px', fontSize: '0.95rem',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontFamily: "'Inter', sans-serif", color: 'var(--color-text)', lineHeight: 1.9, fontSize: '1rem' }}
              dangerouslySetInnerHTML={{ __html: property.content }}
            />
          )}
          {activeTab === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <iframe
                title="Property location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.6!2d-1.2577!3d51.7520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c6a9f0e39a1f%3A0x4a1c1c1c1c1c1c1c!2sOxford%2C+UK!5e0!3m2!1sen!2suk!4v1234567890"
                width="100%" height="400"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen loading="lazy"
              />
            </motion.div>
          )}
          {activeTab === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '3rem', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📐</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-text)', marginBottom: '0.5rem' }}>Floorplan Available on Request</h3>
              <p style={{ color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif", marginBottom: '1.5rem' }}>Contact us to receive the full floorplan for this property.</p>
              <button onClick={() => navigate('/contact')}
                style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(90deg,#4C57F4,#20A6E8)', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Request Floorplan
              </button>
            </motion.div>
          )}
        </div>

        {/* Right: Sticky sidebar */}
        <div style={{ position: 'sticky', top: '80px', alignSelf: 'start' }}>
          <div style={{ background: 'var(--color-surface)', borderRadius: '14px', padding: '1.5rem', border: '1px solid var(--color-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--color-text)', marginBottom: '1rem' }}>Enquire About This Property</h3>
            <button
              onClick={() => navigate('/contact')}
              style={{ width: '100%', padding: '0.85rem', background: 'linear-gradient(90deg,#4C57F4,#20A6E8)', border: 'none', borderRadius: '10px', color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginBottom: '0.75rem' }}
            >
              📅 Book a Viewing
            </button>
            <button
              onClick={() => setHearted((h) => !h)}
              style={{ width: '100%', padding: '0.85rem', background: hearted ? '#fef2f2' : 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '10px', color: hearted ? '#ef4444' : 'var(--color-text)', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.95rem', cursor: 'pointer' }}
            >
              {hearted ? '❤️ Saved' : '🤍 Save Property'}
            </button>
            <button
              onClick={() => { navigator.clipboard.writeText(window.location.href); }}
              style={{ width: '100%', padding: '0.85rem', background: 'none', border: 'none', color: '#4C57F4', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer', marginTop: '0.5rem' }}
            >
              🔗 Copy Link
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
