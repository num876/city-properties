import { writeFileSync } from 'fs';

// ── Hero.tsx ──────────────────────────────────────────────────────────────────
writeFileSync('src/components/Hero.tsx', `// src/components/Hero.tsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        width: '100%',
        minHeight: '88vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(10,10,30,0.85) 0%, rgba(10,10,30,0.4) 60%, transparent 100%)',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, padding: '0 5vw', maxWidth: '700px' }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.9rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Oxford's Premier Letting Agency
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            lineHeight: 1.15,
            color: '#fff',
            margin: '0 0 1.25rem',
            fontWeight: 700,
          }}
        >
          Find Your Home<br />In Oxford.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            marginBottom: '2rem',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Discover curated properties for modern living in the heart of the city.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/properties')}
            style={{
              padding: '0.85rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            View Properties
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/contact')}
            style={{
              padding: '0.85rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              backdropFilter: 'blur(8px)',
            }}
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
`);
console.log('✓ Hero.tsx');

// ── HomePage.tsx ──────────────────────────────────────────────────────────────
writeFileSync('src/pages/HomePage.tsx', `// src/pages/HomePage.tsx
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>City Properties - Letting and Management in Oxford</title>
        <meta name="description" content="Premium letting and property management services in Oxford. Find your next home with City Properties." />
      </Helmet>
      <Hero />
    </>
  );
}
`);
console.log('✓ HomePage.tsx');

// ── Header.tsx ────────────────────────────────────────────────────────────────
writeFileSync('src/components/Header.tsx', `// src/components/Header.tsx
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../design/theme';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5vw',
        height: '68px',
        background: isDark ? 'rgba(10,10,30,0.9)' : 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: isDark
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
        transition: 'background 0.3s ease',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #4C57F4, #20A6E8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.8rem',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          CP
        </div>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: '1.2rem',
            color: isDark ? '#fff' : '#111',
          }}
        >
          City Properties
        </span>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {NAV_LINKS.map(({ to, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              style={{
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontFamily: "'Inter', sans-serif",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#4C57F4' : isDark ? 'rgba(255,255,255,0.75)' : '#444',
                position: 'relative',
                paddingBottom: '4px',
                transition: 'color 0.2s',
              }}
            >
              {label}
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
                    borderRadius: '2px',
                  }}
                />
              )}
            </Link>
          );
        })}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          style={{
            padding: '0.4rem 1rem',
            fontSize: '0.85rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(76,87,244,0.08)',
            border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(76,87,244,0.2)',
            borderRadius: '20px',
            color: isDark ? '#fff' : '#4C57F4',
            cursor: 'pointer',
          }}
        >
          {isDark ? 'Light' : 'Dark'}
        </motion.button>
      </nav>
    </header>
  );
}
`);
console.log('✓ Header.tsx');

// ── GlassCard.tsx ─────────────────────────────────────────────────────────────
writeFileSync('src/components/GlassCard.tsx', `// src/components/GlassCard.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, className, style }: GlassCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(76,87,244,0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: 'rgba(255,255,255,0.9)',
        borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
`);
console.log('✓ GlassCard.tsx');

// ── PropertyCard.tsx ──────────────────────────────────────────────────────────
writeFileSync('src/components/PropertyCard.tsx', `// src/components/PropertyCard.tsx
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
`);
console.log('✓ PropertyCard.tsx');

// ── PropertyListPage.tsx ──────────────────────────────────────────────────────
writeFileSync('src/pages/PropertyListPage.tsx', `// src/pages/PropertyListPage.tsx
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
`);
console.log('✓ PropertyListPage.tsx');

// ── Footer.tsx ────────────────────────────────────────────────────────────────
writeFileSync('src/components/Footer.tsx', `// src/components/Footer.tsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0a0a1e',
        color: 'rgba(255,255,255,0.7)',
        padding: '3rem 5vw 1.5rem',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '0.75rem',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #4C57F4, #20A6E8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            >
              CP
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.05rem',
              }}
            >
              City Properties
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '240px' }}>
            Oxford's premier letting and property management agency.
          </p>
        </div>

        <div>
          <h4
            style={{
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Navigation
          </h4>
          {(['/', '/properties', '/about', '/contact'] as const).map((to) => (
            <div key={to} style={{ marginBottom: '0.5rem' }}>
              <Link
                to={to}
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                }}
              >
                {to === '/' ? 'Home' : to.slice(1).charAt(0).toUpperCase() + to.slice(2)}
              </Link>
            </div>
          ))}
        </div>

        <div>
          <h4
            style={{
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Contact
          </h4>
          <p style={{ fontSize: '0.88rem', lineHeight: 2 }}>
            Oxford, United Kingdom
            <br />
            <a
              href="mailto:info@cityproperties-oxford.co.uk"
              style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}
            >
              info@cityproperties-oxford.co.uk
            </a>
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.25rem',
          textAlign: 'center',
          fontSize: '0.82rem',
        }}
      >
        © {new Date().getFullYear()} City Properties Letting & Management. All rights reserved.
      </div>
    </footer>
  );
}
`);
console.log('✓ Footer.tsx');

console.log('\nAll files written successfully.');
