import { motion } from 'framer-motion';

const itemReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 25 } },
};

export default function BentoFeatureGrid() {
  return (
    <section style={{ padding: '6rem 5vw', background: 'var(--color-bg)' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.p
            variants={itemReveal}
            style={{
              fontSize: '0.8rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#4C57F4',
              fontFamily: "'Inter', sans-serif",
              marginBottom: '0.75rem',
            }}
          >
            Why City Properties
          </motion.p>
          <motion.h2
            variants={itemReveal}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--color-text)',
              margin: 0,
            }}
          >
            The Oxford Letting Experts
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div
          className="bento-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            gridAutoRows: '280px',
          }}
        >
          {/* Card 1: Local Expertise (Spans 2 cols) */}
          <motion.div
            variants={itemReveal}
            className="bento-item span-2"
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #1a1a3e 0%, #0a0a1e 100%)',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '2rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/images/area-centre.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.4,
                mixBlendMode: 'overlay',
                transition: 'transform 0.6s ease',
              }}
              className="bento-img-bg"
            />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '400px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📍</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                Deeply Rooted in Oxford
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                We navigate every postcode with the precision of a local. We know the schools, the transport links, and the hidden gems.
              </p>
            </div>
          </motion.div>

          {/* Card 2: End-to-End (1 col) */}
          <motion.div
            variants={itemReveal}
            className="bento-item"
            style={{
              borderRadius: '24px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #4C57F4, #20A6E8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: '#fff',
                marginBottom: '1.5rem',
              }}
            >
              🔄
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>
              End-to-End Management
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Zero hassle. We handle the marketing, the sourcing, the maintenance, and everything in between.
            </p>
          </motion.div>

          {/* Card 3: 24/7 (1 col) */}
          <motion.div
            variants={itemReveal}
            className="bento-item"
            style={{
              borderRadius: '24px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(32,166,232,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: '#20A6E8',
                marginBottom: '1.5rem',
              }}
            >
              🛡️
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>
              Always On Guard
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Rapid response for emergencies. Our dedicated team is available around the clock to protect your investment.
            </p>
          </motion.div>

          {/* Card 4: 98% Satisfaction (Spans 2 cols) */}
          <motion.div
            variants={itemReveal}
            className="bento-item span-2"
            style={{
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)',
              color: '#fff',
              padding: '2.5rem 3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 8px 30px rgba(76,87,244,0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '250px',
                height: '250px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                filter: 'blur(40px)',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1, flex: 1, paddingRight: '2rem' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', marginBottom: '0.75rem' }}>
                Unmatched Trust
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, maxWidth: '400px' }}>
                Relied upon by landlords and tenants alike, boasting over 500 five-star reviews since our founding in 2009.
              </p>
            </div>
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'right' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '5rem', fontWeight: 700, lineHeight: 1, display: 'block' }}>
                98<span style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.7)' }}>%</span>
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>
                Client Satisfaction
              </span>
            </div>
          </motion.div>
        </div>

      </motion.div>

      <style>{`
        .bento-item:hover {
          transform: translateY(-4px);
        }
        .bento-item:hover .bento-img-bg {
          transform: scale(1.05);
        }
        .span-2 { grid-column: span 2; }
        
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
            grid-auto-rows: auto !important;
          }
          .span-2 {
            grid-column: span 1 !important;
          }
          .bento-item {
            min-height: 280px;
          }
          .bento-item:nth-child(4) {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            padding: 2rem;
          }
          .bento-item:nth-child(4) > div:last-child {
            text-align: left !important;
            margin-top: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
