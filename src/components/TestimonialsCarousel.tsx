import { useRef } from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    location: 'City Centre',
    role: 'Tenant',
    text: 'City Properties found us the perfect flat in just two weeks. Incredibly professional and responsive throughout the entire process.',
    stars: 5,
    initials: 'SM',
    color: '#4C57F4',
  },
  {
    name: 'James Thornton',
    location: 'Headington',
    role: 'Landlord',
    text: 'As a landlord I have trusted City Properties for 5 years. Zero vacancies and excellent tenant management. Highly recommended.',
    stars: 5,
    initials: 'JT',
    color: '#20A6E8',
  },
  {
    name: 'Priya Sharma',
    location: 'Cowley',
    role: 'Tenant',
    text: 'The team went above and beyond to help me settle into Oxford. The whole experience was seamless from viewing to signing.',
    stars: 5,
    initials: 'PS',
    color: '#7C3AED',
  },
  {
    name: 'Oliver Hughes',
    location: 'Jericho',
    role: 'Landlord',
    text: 'Switched to City Properties after years of self-management. Night and day difference. My yields are up and my stress is down.',
    stars: 5,
    initials: 'OH',
    color: '#059669',
  },
  {
    name: 'Amelia Watson',
    location: 'Summertown',
    role: 'Tenant',
    text: 'Found my dream apartment within days. The team were warm, knowledgeable, and made the whole process feel effortless.',
    stars: 5,
    initials: 'AW',
    color: '#DC2626',
  },
  {
    name: 'Daniel Osei',
    location: 'Botley',
    role: 'Landlord',
    text: 'Exceptional communication and a truly professional service. My property has been fully occupied for three consecutive years.',
    stars: 5,
    initials: 'DO',
    color: '#D97706',
  },
];

// Duplicate for seamless loop
const DOUBLED = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

function TestimonialCard({ t, index }: { t: typeof TESTIMONIALS[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div
      style={{
        width: '360px',
        flexShrink: 0,
        background: 'var(--color-card-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--color-border)',
        borderRadius: '24px',
        padding: '2.5rem 2rem 2rem',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        cursor: 'default',
        position: 'relative',
        marginTop: isEven ? '0' : '3rem',
        marginBottom: isEven ? '3rem' : '0',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = `translateY(${isEven ? '-10px' : '20px'})`;
        (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px rgba(76,87,244,0.15)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
      }}
    >
      {/* Massive Editorial Quotation Mark */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1.5rem',
        fontFamily: "'Playfair Display', serif",
        fontSize: '6rem',
        lineHeight: 1,
        color: 'var(--color-primary)',
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        "
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Stars */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '1.25rem' }}>
          {Array.from({ length: t.stars }).map((_, i) => (
            <span key={i} style={{ color: '#f59e0b', fontSize: '1.1rem' }}>★</span>
          ))}
        </div>

        {/* Quote */}
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.1rem',
          fontStyle: 'italic',
          lineHeight: 1.8,
          color: 'var(--color-text)',
          flex: 1,
          margin: '0 0 1.5rem 0',
        }}>
          "{t.text}"
        </p>

        {/* Author Block */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '50%',
            background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '0.9rem', fontFamily: "'Inter', sans-serif",
            flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            {t.initials}
          </div>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)', margin: '0 0 2px' }}>
              {t.name}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {t.role} · {t.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{
      padding: '7rem 0',
      background: 'var(--color-bg)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Decorative Background Blurs */}
      <div style={{
        position: 'absolute', top: '10%', left: '-5%', width: '500px', height: '500px',
        background: 'rgba(76,87,244,0.08)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%', width: '600px', height: '600px',
        background: 'rgba(32,166,232,0.08)', filter: 'blur(150px)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none'
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 5vw', position: 'relative', zIndex: 1 }}
      >
        <p style={{
          fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase',
          color: '#4C57F4', fontFamily: "'Inter', sans-serif", marginBottom: '0.75rem', fontWeight: 600
        }}>
          What Our Clients Say
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          color: 'var(--color-text)', margin: '0 0 1rem', lineHeight: 1.1
        }}>
          Trusted by Hundreds Across Oxford
        </h2>
        {/* Star summary row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ color: '#f59e0b', fontSize: '1.2rem' }}>★</span>
            ))}
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: 'var(--color-text-muted)', margin: 0 }}>
            <strong style={{ color: 'var(--color-text)' }}>4.9 / 5</strong> from 500+ verified reviews
          </p>
        </div>
      </motion.div>

      {/* Marquee Track Container */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Gradient fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '150px', zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '150px', zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to left, var(--color-bg) 0%, transparent 100%)',
        }} />

        {/* Scrolling Track */}
        <div
          style={{ padding: '1rem 0' }}
          onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; }}
          onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; }}
        >
          <div
            ref={trackRef}
            style={{
              display: 'flex', gap: '2rem', width: 'max-content',
              animation: 'marquee 60s linear infinite', paddingLeft: '2rem',
              alignItems: 'center', // important for the stagger to work visually
            }}
          >
            {DOUBLED.map((t, i) => (
              <TestimonialCard key={i} t={t} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
