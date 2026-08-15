import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { client, GET_PROPERTIES } from '../api/wordpress';
import PropertyCard from '../components/PropertyCard';
import SearchFilter from '../components/SearchFilter';
import Skeleton from '../components/Skeleton';

import { DEMO_PROPERTIES } from '../data/properties';
import type { Property } from '../data/properties';

export default function PropertyListPage() {
  const [all, setAll] = useState<Property[]>([]);
  const [displayed, setDisplayed] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.request(GET_PROPERTIES)
      .then((data) => {
        const edges = (data as any).properties?.edges || [];
        const props = edges.map((e: any) => e.node);
        if (props.length === 0) {
          setAll(DEMO_PROPERTIES);
          setDisplayed(DEMO_PROPERTIES);
        } else {
          setAll(props);
          setDisplayed(props);
        }
        setLoading(false);
      })
      .catch(() => {
        setAll(DEMO_PROPERTIES);
        setDisplayed(DEMO_PROPERTIES);
        setLoading(false);
      });
  }, []);

  const handleSearch = (term: string) => {
    if (!term) { setDisplayed(all); return; }
    const low = term.toLowerCase();
    setDisplayed(all.filter((p) => p.title.toLowerCase().includes(low) || p.excerpt.toLowerCase().includes(low)));
  };

  return (
    <>
      <Helmet>
        <title>Properties – City Properties Oxford</title>
        <meta name="description" content="Browse available rental properties in Oxford managed by City Properties." />
      </Helmet>

      {/* Cinematic Half-Screen Hero */}
      <section style={{ 
        position: 'relative',
        width: '100%',
        height: '45vh',
        minHeight: '350px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5vw',
        overflow: 'hidden'
      }}>
        {/* Background Image & Gradient */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img 
            src="/images/area-centre.webp" 
            alt="Oxford city centre"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,30,0.85) 0%, rgba(10,10,30,0.4) 100%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', paddingBottom: '3rem' }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', marginBottom: '0.75rem', lineHeight: 1.1 }}
          >
            Available Properties
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: "'Inter', sans-serif", opacity: 0.9, fontSize: '1.15rem', color: '#fff', maxWidth: '600px' }}
          >
            Hand-picked premium homes across Oxford's finest neighbourhoods. Find your perfect space today.
          </motion.p>
        </div>
      </section>

      {/* Floating Search Bar */}
      <div style={{ 
        position: 'relative', zIndex: 10, 
        marginTop: '-40px', // Overlap the hero
        padding: '0 5vw',
        marginBottom: '3rem'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            maxWidth: '1200px', margin: '0 auto',
            background: 'var(--color-surface)',
            padding: '1.5rem',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            border: '1px solid var(--color-border)',
          }}
        >
          <SearchFilter onSearch={handleSearch} />
        </motion.div>
      </div>

      {/* Property Grid */}
      <section style={{ padding: '0 5vw 6rem', background: 'var(--color-bg)', minHeight: '50vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ display: 'grid', gap: '2.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
              {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} height="420px" borderRadius="24px" />)}
            </div>
          ) : (
            <motion.div
              layout
              style={{ display: 'grid', gap: '2.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
            >
              <AnimatePresence mode="popLayout">
                {displayed.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '6rem 2rem', background: 'var(--color-surface)', borderRadius: '24px', border: '1px solid var(--color-border)' }}
                  >
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏚️</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'var(--color-text)', marginBottom: '0.75rem' }}>No Properties Found</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif", fontSize: '1.05rem' }}>We couldn't find any properties matching your search. Try adjusting your keywords.</p>
                  </motion.div>
                ) : (
                  displayed.map((p, i) => (
                    <motion.div 
                      key={p.id} 
                      layout
                      initial={{ opacity: 0, y: 30 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 25, delay: i * 0.05 }}
                    >
                      <PropertyCard
                        title={p.title} excerpt={p.excerpt} slug={p.slug}
                        imageUrl={p.featuredImage?.node.sourceUrl} imageAlt={p.featuredImage?.node.altText}
                        price={p.price} bedrooms={p.bedrooms} bathrooms={p.bathrooms} type={p.type}
                      />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
