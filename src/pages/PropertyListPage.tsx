// src/pages/PropertyListPage.tsx
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { client, GET_PROPERTIES } from '../api/wordpress';
import PropertyCard from '../components/PropertyCard';
import SearchFilter from '../components/SearchFilter';

interface Property {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featuredImage?: { node: { sourceUrl: string; altText: string } };
}

export default function PropertyListPage() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [displayed, setDisplayed] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .request(GET_PROPERTIES)
      .then((data) => {
        const edges = (data as any).properties?.edges || [];
        const props = edges.map((e: any) => e.node);
        setAllProperties(props);
        setDisplayed(props);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = (term: string) => {
    if (!term) {
      setDisplayed(allProperties);
      return;
    }
    const low = term.toLowerCase();
    setDisplayed(
      allProperties.filter(
        (p) =>
          p.title.toLowerCase().includes(low) ||
          p.excerpt.toLowerCase().includes(low),
      ),
    );
  };

  return (
    <>
      <Helmet>
        <title>Properties - City Properties Oxford</title>
        <meta
          name="description"
          content="Browse available rental properties in Oxford managed by City Properties."
        />
      </Helmet>

      <section
        style={{
          background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)',
          padding: '3.5rem 5vw 2.5rem',
          color: '#fff',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            marginBottom: '0.5rem',
          }}
        >
          Available Properties
        </motion.h1>
        <p style={{ fontFamily: "'Inter', sans-serif", opacity: 0.85, fontSize: '1.05rem' }}>
          Hand-picked homes in Oxford's most desirable neighbourhoods
        </p>
      </section>

      <div style={{ padding: '1.5rem 5vw', background: '#f8f9ff' }}>
        <SearchFilter onSearch={handleSearch} />
      </div>

      <section style={{ padding: '2rem 5vw 4rem', background: '#f8f9ff', minHeight: '50vh' }}>
        {loading ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem',
              color: '#666',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Loading properties…
          </div>
        ) : displayed.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem',
              color: '#666',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            No properties found.
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            style={{
              display: 'grid',
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            }}
          >
            {displayed.map((p) => (
              <motion.div
                key={p.id}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              >
                <PropertyCard
                  title={p.title}
                  excerpt={p.excerpt}
                  slug={p.slug}
                  imageUrl={p.featuredImage?.node.sourceUrl}
                  imageAlt={p.featuredImage?.node.altText}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </>
  );
}
