import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { client, GET_PROPERTIES } from '../api/wordpress';
import PropertyCard from './PropertyCard';
import Skeleton from './Skeleton';

interface Property {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featuredImage?: { node: { sourceUrl: string; altText: string } };
}

const DEMO_PROPERTIES: Property[] = [
  {
    id: 'demo-1',
    title: 'Luxury Apartment, Summertown',
    excerpt: '<p>A stunning two-bedroom apartment situated in the heart of Summertown, featuring modern amenities and a private balcony.</p>',
    slug: 'luxury-apartment-summertown',
    featuredImage: { node: { sourceUrl: '/images/area-centre.jpg', altText: 'Summertown Apartment' } }
  },
  {
    id: 'demo-2',
    title: 'Charming Townhouse, Jericho',
    excerpt: '<p>Beautifully restored three-bedroom Victorian townhouse located in the sought-after Jericho neighbourhood.</p>',
    slug: 'charming-townhouse-jericho',
    featuredImage: { node: { sourceUrl: '/images/area-headington.jpg', altText: 'Jericho Townhouse' } }
  },
  {
    id: 'demo-3',
    title: 'Modern Studio, Cowley',
    excerpt: '<p>Sleek and contemporary studio flat offering excellent transport links to the city centre and business parks.</p>',
    slug: 'modern-studio-cowley',
    featuredImage: { node: { sourceUrl: '/images/area-cowley.jpg', altText: 'Cowley Studio' } }
  }
];

export default function FeaturedProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.request(GET_PROPERTIES)
      .then((data) => {
        const edges = (data as any).properties?.edges || [];
        let props = edges.map((e: any) => e.node);
        // Only take the top 3 most recent properties
        props = props.slice(0, 3);
        
        if (props.length === 0) {
          props = DEMO_PROPERTIES;
        }
        
        setProperties(props);
        setLoading(false);
      })
      .catch(() => {
        setProperties(DEMO_PROPERTIES);
        setLoading(false);
      });
  }, []);

  return (
    <section style={{
      padding: '5rem 5vw',
      background: 'linear-gradient(135deg, #0a0a1e 0%, #111130 100%)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background blur */}
      <div style={{
        position: 'absolute',
        top: '-10%', left: '-10%',
        width: '400px', height: '400px',
        background: 'rgba(76,87,244,0.15)',
        filter: 'blur(100px)', borderRadius: '50%',
        zIndex: 0, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%', right: '-10%',
        width: '500px', height: '500px',
        background: 'rgba(32,166,232,0.1)',
        filter: 'blur(120px)', borderRadius: '50%',
        zIndex: 0, pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: '1.5rem', marginBottom: '3rem'
        }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p style={{
              fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase',
              color: '#20A6E8', fontFamily: "'Inter', sans-serif", marginBottom: '0.75rem'
            }}>
              Browse Our Portfolio
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#fff', margin: 0, lineHeight: 1.1
            }}>
              Featured Properties
            </h2>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(76,87,244,0.4)' }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/properties')}
            style={{
              padding: '0.9rem 2rem', background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
              border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.95rem'
            }}
          >
            View All Properties →
          </motion.button>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'
        }}>
          {loading ? (
            <>
              <Skeleton height="380px" />
              <Skeleton height="380px" />
              <Skeleton height="380px" />
            </>
          ) : properties.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0', color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif" }}>
              No featured properties available at the moment.
            </div>
          ) : (
            properties.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                // Override glass card inner styles slightly to pop against dark background
                style={{ 
                  '--color-card-bg': 'rgba(255,255,255,0.03)',
                  '--color-border': 'rgba(255,255,255,0.1)',
                  '--shadow-card': '0 8px 30px rgba(0,0,0,0.2)',
                  '--color-text': '#fff',
                  '--color-text-muted': 'rgba(255,255,255,0.7)',
                } as any}
              >
                <PropertyCard
                  title={p.title}
                  excerpt={p.excerpt}
                  slug={p.slug}
                  imageUrl={p.featuredImage?.node.sourceUrl}
                  imageAlt={p.featuredImage?.node.altText}
                />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
