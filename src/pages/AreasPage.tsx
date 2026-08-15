import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AREAS = [
  { name: 'City Centre', slug: 'city-centre', avg: '£1,600 pcm', img: '/images/area-centre.webp', desc: 'World-class universities, restaurants, and cultural venues on your doorstep.' },
  { name: 'Headington', slug: 'headington', avg: '£1,200 pcm', img: '/images/area-headington.webp', desc: 'Excellent schools, the John Radcliffe Hospital, and a vibrant local high street.' },
  { name: 'Cowley', slug: 'cowley', avg: '£950 pcm', img: '/images/area-cowley.webp', desc: "Oxford's most diverse neighbourhood with great transport links and a creative scene." },
  { name: 'Jericho', slug: 'jericho', avg: '£1,450 pcm', img: '/images/area-centre.webp', desc: 'A bohemian enclave beloved for its independent shops, cafes, and leafy streets.' },
  { name: 'Summertown', slug: 'summertown', avg: '£1,350 pcm', img: '/images/area-headington.webp', desc: 'An upmarket suburb with beautiful parks, artisan bakeries, and top-rated schools.' },
];

export default function AreasPage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Area Guides – City Properties Oxford</title>
        <meta name="description" content="Explore Oxford's best neighbourhoods for renting. Area guides from City Properties." />
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
            src="/images/area-headington.webp" 
            alt="Oxford scenic view"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,30,0.85) 0%, rgba(10,10,30,0.4) 100%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', marginBottom: '0.75rem', lineHeight: 1.1 }}
          >
            Oxford Area Guides
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: "'Inter', sans-serif", opacity: 0.9, fontSize: '1.15rem', color: '#fff', maxWidth: '600px' }}
          >
            Every part of Oxford has its own unique character. Dive deep into our local guides to find the neighbourhood that matches your lifestyle perfectly.
          </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section style={{ padding: '5rem 5vw 7rem', background: 'var(--color-bg)', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            layout
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '2.5rem' 
            }}
          >
            <AnimatePresence mode="popLayout">
              {AREAS.map((area, i) => (
                <motion.div 
                  key={area.slug}
                  layout
                  variants={{
                    initial: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                    hover: {}
                  }}
                  initial="initial"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 25, delay: i * 0.08 }}
                  onClick={() => navigate('/areas/' + area.slug)}
                  style={{ 
                    position: 'relative',
                    cursor: 'pointer', 
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    height: '420px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                  }}
                  whileHover="hover"
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
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%', objectFit: 'cover'
                    }}
                  />

                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)',
                    pointerEvents: 'none'
                  }} />

                  {/* Glassmorphic Price Badge */}
                  <div style={{
                    position: 'absolute', top: '1.25rem', right: '1.25rem',
                    background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: '#fff', padding: '6px 14px', borderRadius: '999px',
                    fontSize: '0.8rem', fontWeight: 600, fontFamily: "'Inter', sans-serif",
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    from {area.avg}
                  </div>

                  {/* Content (Bottom) */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.5rem' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem', lineHeight: 1.1 }}>
                      {area.name}
                    </h3>
                    <motion.p 
                      variants={{
                        initial: { opacity: 0.8 },
                        hover: { opacity: 1 }
                      }}
                      style={{ 
                        fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', 
                        lineHeight: 1.6, fontFamily: "'Inter', sans-serif", marginBottom: '1rem' 
                      }}
                    >
                      {area.desc}
                    </motion.p>
                    <motion.div
                      variants={{
                        initial: { opacity: 0, x: -10 },
                        hover: { opacity: 1, x: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      Read Guide <span style={{ fontSize: '1.2rem' }}>→</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
