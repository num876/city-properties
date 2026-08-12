// src/pages/PropertyDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { client, GET_PROPERTY_BY_SLUG } from '../api/wordpress';
import { colors, spacing, fonts } from '../design/tokens';

interface PropertyDetail {
  id: string;
  title: string;
  content: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    client
      .request(GET_PROPERTY_BY_SLUG, { slug })
      .then((data) => {
        setProperty(data.propertyBy);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading property…</p>;
  }
  if (!property) {
    return <p style={{ textAlign: 'center' }}>Property not found.</p>;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: property.title,
    description: property.content.replace(/<[^>]+>/g, ''), // strip HTML for description
    image: property.featuredImage?.node.sourceUrl,
    url: `https://cityproperties-oxford.co.uk/properties/${slug}`,
  };

  return (
    <>
      <Helmet>
        <title>{property.title} – City Properties</title>
        <meta name="description" content={property.title} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <section style={{ padding: spacing.lg, fontFamily: fonts.body, color: colors.text }}>
        <h1 style={{ fontFamily: fonts.heading, color: colors.primary }}>{property.title}</h1>
        {property.featuredImage && (
          <img
            src={property.featuredImage.node.sourceUrl}
            alt={property.featuredImage.node.altText}
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: spacing.lg }}
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: property.content }} />
      </section>
    </>
  );
}

export default PropertyDetailPage;
