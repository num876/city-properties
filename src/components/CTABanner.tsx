import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TRUST_STATS = [
  { value: '250+', label: 'Properties' },
  { value: '15 yrs', label: 'Experience' },
  { value: '98%', label: 'Satisfaction' },
  { value: '500+', label: '5-Star Reviews' },
];

export default function CTABanner() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0a1e 0%, #1a1a3e 100%)',
        padding: '7rem 5vw',
      }}
    >
      {/* Animated orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-80px', left: '-80px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76,87,244,0.3) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', bottom: '-100px', right: '-80px',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(32,166,232,0.2) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />
      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}>
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p style={{
              fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase',
              color: '#20A6E8', fontFamily: "'Inter', sans-serif", marginBottom: '1rem', fontWeight: 600,
            }}>
              Start Your Journey
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}>
              Ready to Find<br />
              <span style={{
                background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Your Next Home?
              </span>
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              maxWidth: '420px',
            }}>
              Our expert Oxford team is ready to guide you every step of the way — from your first viewing to picking up the keys.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(76,87,244,0.5)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/properties')}
                style={{
                  padding: '1rem 2.25rem',
                  background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
                  border: 'none', borderRadius: '12px',
                  color: '#fff', cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700, fontSize: '1rem',
                  boxShadow: '0 4px 20px rgba(76,87,244,0.4)',
                  letterSpacing: '0.2px',
                }}
              >
                Browse Properties →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.12)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/contact')}
                style={{
                  padding: '1rem 2.25rem',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  color: '#fff', cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600, fontSize: '1rem',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  letterSpacing: '0.2px',
                  transition: 'background 0.2s ease',
                }}
              >
                Talk to an Expert
              </motion.button>
            </div>
          </motion.div>

          {/* Right: Trust card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '2.5rem',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: '0.78rem',
                letterSpacing: '2px', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem',
              }}>
                Why thousands trust us
              </p>

              {/* Stats grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem',
                marginBottom: '2rem',
              }}>
                {TRUST_STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.08 }}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '14px',
                      padding: '1.25rem 1rem',
                      textAlign: 'center',
                    }}
                  >
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '2rem', fontWeight: 700,
                      color: '#fff', margin: 0, lineHeight: 1,
                      background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      {s.value}
                    </p>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)',
                      margin: '0.35rem 0 0', letterSpacing: '0.5px',
                    }}>
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Testimonial snippet */}
              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '1.5rem',
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
              }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #4C57F4, #20A6E8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Inter', sans-serif", fontWeight: 700, color: '#fff', fontSize: '0.8rem',
                }}>
                  SM
                </div>
                <div>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic', fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.6,
                  }}>
                    "Found our perfect flat in under two weeks. The team were incredible from start to finish."
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)',
                    margin: '0.5rem 0 0',
                  }}>
                    — Sarah M., City Centre
                    <span style={{ color: '#f59e0b', marginLeft: '0.5rem' }}>★★★★★</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
