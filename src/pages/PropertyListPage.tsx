import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { client, GET_PROPERTIES } from '../api/wordpress';
import PropertyCard from '../components/PropertyCard';
import SearchFilter from '../components/SearchFilter';
import Skeleton from '../components/Skeleton';

interface Property {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featuredImage?: { node: { sourceUrl: string; altText: string } };
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
}

const DEMO_PROPERTIES: Property[] = [
  {
    id: 'demo-1',
    title: 'Luxury Apartment, Summertown',
    excerpt: '<p>A stunning two-bedroom apartment in the heart of Summertown with modern open-plan living and a private balcony.</p>',
    slug: 'luxury-apartment-summertown',
    featuredImage: { node: { sourceUrl: '/images/area-centre.jpg', altText: 'Summertown Apartment' } },
    price: '£1,850 pcm', bedrooms: 2, bathrooms: 2, type: 'Apartment',
  },
  {
    id: 'demo-2',
    title: 'Victorian Townhouse, Jericho',
    excerpt: '<p>Beautifully restored three-bedroom Victorian townhouse in sought-after Jericho with original features throughout.</p>',
    slug: 'victorian-townhouse-jericho',
    featuredImage: { node: { sourceUrl: '/images/area-headington.jpg', altText: 'Jericho Townhouse' } },
    price: '£2,200 pcm', bedrooms: 3, bathrooms: 2, type: 'House',
  },
  {
    id: 'demo-3',
    title: 'Modern Studio, Cowley Road',
    excerpt: '<p>Sleek and contemporary studio flat with high-spec finishes and excellent transport links to the city centre.</p>',
    slug: 'modern-studio-cowley',
    featuredImage: { node: { sourceUrl: '/images/area-cowley.jpg', altText: 'Cowley Studio' } },
    price: '£950 pcm', bedrooms: 1, bathrooms: 1, type: 'Studio',
  },
  {
    id: 'demo-4',
    title: 'Penthouse Suite, City Centre',
    excerpt: '<p>Exceptional top-floor penthouse with panoramic views over Oxford\'s dreaming spires. Concierge service included.</p>',
    slug: 'penthouse-city-centre',
    featuredImage: { node: { sourceUrl: '/images/area-centre.jpg', altText: 'Oxford Penthouse' } },
    price: '£3,500 pcm', bedrooms: 3, bathrooms: 3, type: 'Penthouse',
  },
  {
    id: 'demo-5',
    title: 'Cottage, Old Marston',
    excerpt: '<p>Charming two-bedroom period cottage with a private garden, exposed beams, and a wood-burning fireplace.</p>',
    slug: 'cottage-old-marston',
    featuredImage: { node: { sourceUrl: '/images/area-headington.jpg', altText: 'Old Marston Cottage' } },
    price: '£1,400 pcm', bedrooms: 2, bathrooms: 1, type: 'Cottage',
  },
  {
    id: 'demo-6',
    title: 'Riverside Flat, Osney',
    excerpt: '<p>Bright one-bedroom riverside flat with stunning water views, a modern kitchen, and off-street parking.</p>',
    slug: 'riverside-flat-osney',
    featuredImage: { node: { sourceUrl: '/images/area-cowley.jpg', altText: 'Osney Flat' } },
    price: '£1,300 pcm', bedrooms: 1, bathrooms: 1, type: 'Flat',
  },
  {
    id: 'demo-7',
    title: 'Executive Home, Headington',
    excerpt: '<p>Spacious four-bedroom detached executive home in Headington with a landscaped garden and double garage.</p>',
    slug: 'executive-home-headington',
    featuredImage: { node: { sourceUrl: '/images/area-headington.jpg', altText: 'Headington Home' } },
    price: '£3,200 pcm', bedrooms: 4, bathrooms: 3, type: 'House',
  },
  {
    id: 'demo-8',
    title: 'Garden Flat, Botley',
    excerpt: '<p>Light-filled two-bedroom ground floor flat with direct access to a large private garden and on-site parking.</p>',
    slug: 'garden-flat-botley',
    featuredImage: { node: { sourceUrl: '/images/area-cowley.jpg', altText: 'Botley Garden Flat' } },
    price: '£1,150 pcm', bedrooms: 2, bathrooms: 1, type: 'Flat',
  },
  {
    id: 'demo-9',
    title: 'Student House, East Oxford',
    excerpt: '<p>Well-maintained five-bedroom HMO in popular East Oxford, close to Brookes and the city centre, available September.</p>',
    slug: 'student-house-east-oxford',
    featuredImage: { node: { sourceUrl: '/images/area-centre.jpg', altText: 'East Oxford Student House' } },
    price: '£550 pppm', bedrooms: 5, bathrooms: 2, type: 'HMO',
  },
];

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
