import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AREAS = [
  {
    name: 'City Centre',
    slug: 'city-centre',
    avg: '£1,600 pcm',
    img: '/images/area-centre.webp',
    tag: 'Flagship',
    tagColor: '#4C57F4',
    properties: '80+',
    desc: 'World-class universities, vibrant restaurants, and Oxford\'s most iconic streets — all on your doorstep. Experience the heartbeat of the city.',
    isFeatured: true,
  },
  {
    name: 'Headington',
    slug: 'headington',
    avg: '£1,200 pcm',
    img: '/images/area-headington.webp',
    tag: 'Family Favourite',
    tagColor: '#059669',
    properties: '60+',
    desc: 'Excellent schools, the John Radcliffe Hospital, and a charming high street in a peaceful suburban setting.',
    isFeatured: false,
  },
  {
    name: 'Cowley',
    slug: 'cowley',
    avg: '£950 pcm',
    img: '/images/area-cowley.webp',
    tag: 'Best Value',
    tagColor: '#D97706',
    properties: '110+',
    desc: 'Oxford\'s most diverse and lively neighbourhood — great transport links and a thriving creative scene.',
    isFeatured: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 220, damping: 25 } },
};

export default function AreasSection() {
  const navigate = useNavigate();

  return (
    <section style={{ padding: '7rem 5vw', background: 'var(--color-bg)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <p style={{
          fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase',
          color: '#4C57F4', fontFamily: "'Inter', sans-serif", marginBottom: '0.75rem', fontWeight: 600
        }}>
          Explore Oxford
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
          color: 'var(--color-text)',
          margin: '0 0 1rem',
          lineHeight: 1.1
        }}>
          Find Your Neighbourhood
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '1.1rem',
          color: 'var(--color-text-muted)',
          maxWidth: '560px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Every part of Oxford has its own unique character and charm. Let us help you discover the one that feels perfectly like home.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="bento-grid-container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {AREAS.map((area) => (
          <motion.div
            key={area.slug}
            variants={cardVariants}
            onClick={() => navigate('/areas/' + area.slug)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/areas/' + area.slug)}
            className={area.isFeatured ? 'bento-featured' : 'bento-standard'}
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            }}
            whileHover="hover"
            initial="initial"
          >
            {/* Background image panning */}
            <motion.img
              src={area.img}
              alt={area.name}
              loading="lazy"
              variants={{
                initial: { scale: 1, x: 0 },
                hover: { scale: 1.08, x: -10 }
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            {/* Gradient overlays */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)',
              zIndex: 1, pointerEvents: 'none'
            }} />
            <motion.div
              variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(76,87,244,0.3) 0%, rgba(32,166,232,0.1) 100%)',
                zIndex: 1, pointerEvents: 'none'
              }}
            />

            {/* Top Badges - Glassmorphic */}
            <div style={{ 
              position: 'absolute', top: '1.5rem', left: '1.5rem', right: '1.5rem', 
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 
            }}>
              <span style={{
                background: area.tagColor,
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.5px',
                padding: '6px 14px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}>
                {area.tag}
              </span>
              <span style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.8rem',
                padding: '6px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.3)',
              }}>
                {area.properties} listings
              </span>
            </div>

            {/* Bottom Content Area */}
            <motion.div 
              variants={{
                initial: { y: 20 },
                hover: { y: 0 }
              }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.5rem', zIndex: 2 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: area.isFeatured ? 'clamp(2rem, 3vw, 2.8rem)' : '1.8rem',
                    color: '#fff',
                    marginBottom: '0.5rem',
                    lineHeight: 1.1,
                  }}>
                    {area.name}
                  </h3>
                  <motion.div
                    variants={{ initial: { opacity: 0, height: 0 }, hover: { opacity: 1, height: 'auto' } }}
                    transition={{ duration: 0.4 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.95rem',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.6,
                      marginBottom: '1rem',
                      maxWidth: area.isFeatured ? '85%' : '100%',
                    }}>
                      {area.desc}
                    </p>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: '#fff',
                    }}>
                      Explore {area.name} <span style={{ fontSize: '1.2rem' }}>→</span>
                    </div>
                  </motion.div>
                </div>

                {/* Price Badge */}
                <div style={{
                  textAlign: 'right',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '16px',
                  padding: '1rem',
                  flexShrink: 0,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
                }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px' }}>From</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: '#fff', margin: 0, whiteSpace: 'nowrap' }}>{area.avg}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
        style={{ textAlign: 'center', marginTop: '4rem' }}
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(76,87,244,0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/areas')}
          style={{
            padding: '1rem 2.5rem',
            background: 'var(--color-surface)',
            border: '2px solid rgba(76,87,244,0.4)',
            borderRadius: '999px',
            color: 'var(--color-text)',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          View All Areas →
        </motion.button>
      </motion.div>

      <style>{`
        .bento-grid-container {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: 1fr;
        }
        .bento-featured { height: 400px; }
        .bento-standard { height: 350px; }

        @media (min-width: 900px) {
          .bento-grid-container {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 300px);
          }
          .bento-featured {
            grid-column: span 2;
            grid-row: span 2;
            height: 100%;
          }
          .bento-standard {
            grid-column: span 1;
            grid-row: span 1;
            height: 100%;
          }
        }
      `}</style>
    </section>
  );
}
