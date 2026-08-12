// src/pages/PropertyListPage.tsx
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { client, GET_PROPERTIES } from '../api/wordpress';
import { colors, spacing, fonts } from '../design/tokens';
import PropertyCard from '../components/PropertyCard';
import SearchFilter from '../components/SearchFilter';

interface Property {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

function PropertyListPage() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [displayed, setDisplayed] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.request(GET_PROPERTIES).then((data) => {
      const edges = data.properties?.edges || [];
      const props = edges.map((e: any) => e.node);
      setAllProperties(props);
      setDisplayed(props);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSearch = (term: string) => {
    if (!term) {
      setDisplayed(allProperties);
      return;
    }
    const lowered = term.toLowerCase();
    const filtered = allProperties.filter((p) =>
      p.title.toLowerCase().includes(lowered) || p.excerpt.toLowerCase().includes(lowered)
    );
    setDisplayed(filtered);
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gap: spacing.md,
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    padding: spacing.lg,
    backgroundColor: colors.background,
  };

  return (
    <>
      <Helmet>
        <title>Properties – City Properties Oxford</title>
        <meta name="description" content="Browse available rental properties in Oxford managed by City Properties." />
      </Helmet>
      <section>
        <h2 style={{ padding: spacing.lg, fontFamily: fonts.heading, color: colors.text, textAlign: 'center' }}>
          Available Properties
        </h2>
        <SearchFilter onSearch={handleSearch} />
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading properties…</p>
        ) : (
          <div style={gridStyle}>
            {displayed.map((p) => (
              <PropertyCard
                key={p.id}
                title={p.title}
                excerpt={p.excerpt}
                slug={p.slug}
                imageUrl={p.featuredImage?.node.sourceUrl}
                imageAlt={p.featuredImage?.node.altText}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default PropertyListPage;
