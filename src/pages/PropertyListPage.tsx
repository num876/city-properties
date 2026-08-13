import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
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

      <section style={{ background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)', padding: '3.5rem 5vw 2.5rem', color: '#fff' }}>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '0.5rem' }}
        >
          Available Properties
        </motion.h1>
        <p style={{ fontFamily: "'Inter', sans-serif", opacity: 0.85, fontSize: '1.05rem' }}>
          Hand-picked homes across Oxford's finest neighbourhoods
        </p>
      </section>

      <div style={{ padding: '1.5rem 5vw', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
        <SearchFilter onSearch={handleSearch} />
      </div>

      <section style={{ padding: '2.5rem 5vw 4rem', background: 'var(--color-bg)', minHeight: '50vh' }}>
        {loading ? (
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} height="320px" />)}
          </div>
        ) : displayed.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '5rem 2rem' }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏚</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>No Properties Found</h3>
            <p style={{ color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif" }}>Try adjusting your search terms.</p>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
          >
            {displayed.map((p) => (
              <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}>
                <PropertyCard
                  title={p.title} excerpt={p.excerpt} slug={p.slug}
                  imageUrl={p.featuredImage?.node.sourceUrl} imageAlt={p.featuredImage?.node.altText}
                  price={p.price} bedrooms={p.bedrooms} bathrooms={p.bathrooms} type={p.type}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </>
  );
}
