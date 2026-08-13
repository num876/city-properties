import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AREAS = [
  {
    name: 'City Centre',
    slug: 'city-centre',
    avg: '£1,600 pcm',
    img: '/images/area-centre.jpg',
    tag: 'Most Popular',
    tagColor: '#4C57F4',
    properties: '80+',
    desc: 'World-class universities, vibrant restaurants, and Oxford\'s most iconic streets — all on your doorstep.',
  },
  {
    name: 'Headington',
    slug: 'headington',
    avg: '£1,200 pcm',
    img: '/images/area-headington.jpg',
    tag: 'Family Favourite',
    tagColor: '#059669',
    properties: '60+',
    desc: 'Excellent schools, the John Radcliffe Hospital, and a charming high street in a peaceful suburban setting.',
  },
  {
    name: 'Cowley',
    slug: 'cowley',
    avg: '£950 pcm',
    img: '/images/area-cowley.jpg',
    tag: 'Best Value',
    tagColor: '#D97706',
    properties: '110+',
    desc: 'Oxford\'s most diverse and lively neighbourhood — great transport links and a thriving creative scene.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 28 } },
};

export default function AreasSection() {
  const navigate = useNavigate();

  return (
    <section style={{ padding: '6rem 5vw', background: 'var(--color-bg)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '3.5rem' }}
      >
        <p style={{
          fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase',
          color: '#4C57F4', fontFamily: "'Inter', sans-serif", marginBottom: '0.75rem',
        }}>
          Explore Oxford
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--color-text)',
          margin: '0 0 1rem',
        }}>
          Find Your Neighbourhood
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '1.05rem',
          color: 'var(--color-text-muted)',
          maxWidth: '520px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Every part of Oxford has its own character. Let us help you discover the one that feels like home.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem',
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
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              cursor: 'pointer',
              height: '420px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
            whileHover="hover"
          >
            {/* Background image */}
            <motion.img
              src={area.img}
              alt={area.name}
              loading="lazy"
              variants={{ hover: { scale: 1.08 } }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            {/* Always-on gradient overlay (bottom) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)',
              zIndex: 1,
            }} />

            {/* Hover tint overlay */}
            <motion.div
              variants={{ hover: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(76,87,244,0.25) 0%, rgba(32,166,232,0.15) 100%)',
                zIndex: 1,
              }}
            />

            {/* Top badges */}
            <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', right: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
              <span style={{
                background: area.tagColor,
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '0.72rem',
                letterSpacing: '0.5px',
                padding: '5px 12px',
                borderRadius: '999px',
              }}>
                {area.tag}
              </span>
              <span style={{
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.78rem',
                padding: '5px 12px',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
                {area.properties} listings
              </span>
            </div>

            {/* Bottom content */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem', zIndex: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ flex: 1, paddingRight: '1rem' }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.7rem',
                    color: '#fff',
                    marginBottom: '0.5rem',
                    lineHeight: 1.1,
                    textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                  }}>
                    {area.name}
                  </h3>
                  <motion.p
                    variants={{ hover: { opacity: 1, y: 0 }, default: { opacity: 0, y: 8 } }}
                    initial={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.88rem',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.6,
                      marginBottom: '1rem',
                    }}
                  >
                    {area.desc}
                  </motion.p>
                  <motion.div
                    variants={{ hover: { opacity: 1, x: 0 }, default: { opacity: 0, x: -8 } }}
                    initial={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      color: '#fff',
                    }}
                  >
                    Explore {area.name}
                    <span style={{ fontSize: '1rem' }}>→</span>
                  </motion.div>
                </div>
                <div style={{
                  textAlign: 'right',
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '14px',
                  padding: '0.75rem 1rem',
                  flexShrink: 0,
                }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>From</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: '2px 0 0', whiteSpace: 'nowrap' }}>{area.avg}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View all areas CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ textAlign: 'center', marginTop: '3rem' }}
      >
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(76,87,244,0.3)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/areas')}
          style={{
            padding: '0.9rem 2.5rem',
            background: 'transparent',
            border: '2px solid #4C57F4',
            borderRadius: '12px',
            color: '#4C57F4',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = '#4C57F4';
            (e.currentTarget as HTMLElement).style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color = '#4C57F4';
          }}
        >
          View All Areas →
        </motion.button>
      </motion.div>
    </section>
  );
}
