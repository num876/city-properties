import { useRef } from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    location: 'City Centre, Oxford',
    role: 'Tenant',
    text: 'City Properties found us the perfect flat in just two weeks. Incredibly professional and responsive throughout the entire process.',
    stars: 5,
    initials: 'SM',
    color: '#4C57F4',
  },
  {
    name: 'James Thornton',
    location: 'Headington, Oxford',
    role: 'Landlord',
    text: 'As a landlord I have trusted City Properties for 5 years. Zero vacancies and excellent tenant management. Highly recommended.',
    stars: 5,
    initials: 'JT',
    color: '#20A6E8',
  },
  {
    name: 'Priya Sharma',
    location: 'Cowley, Oxford',
    role: 'Tenant',
    text: 'The team went above and beyond to help me settle into Oxford. The whole experience was seamless from viewing to signing.',
    stars: 5,
    initials: 'PS',
    color: '#7C3AED',
  },
  {
    name: 'Oliver Hughes',
    location: 'Jericho, Oxford',
    role: 'Landlord',
    text: 'Switched to City Properties after years of self-management. Night and day difference. My yields are up and my stress is down.',
    stars: 5,
    initials: 'OH',
    color: '#059669',
  },
  {
    name: 'Amelia Watson',
    location: 'Summertown, Oxford',
    role: 'Tenant',
    text: 'Found my dream apartment within days. The team were warm, knowledgeable, and made the whole process feel effortless.',
    stars: 5,
    initials: 'AW',
    color: '#DC2626',
  },
  {
    name: 'Daniel Osei',
    location: 'Botley, Oxford',
    role: 'Landlord',
    text: 'Exceptional communication and a truly professional service. My property has been fully occupied for three consecutive years.',
    stars: 5,
    initials: 'DO',
    color: '#D97706',
  },
];

// Duplicate for seamless loop
const DOUBLED = [...TESTIMONIALS, ...TESTIMONIALS];

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div
      style={{
        width: '340px',
        flexShrink: 0,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '20px',
        padding: '1.75rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(76,87,244,0.15)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: '3px' }}>
        {Array.from({ length: t.stars }).map((_, i) => (
          <span key={i} style={{ color: '#f59e0b', fontSize: '1rem' }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1rem',
        fontStyle: 'italic',
        lineHeight: 1.75,
        color: 'var(--color-text)',
        flex: 1,
      }}>
        "{t.text}"
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: t.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.8rem',
          fontFamily: "'Inter', sans-serif",
          flexShrink: 0,
        }}>
          {t.initials}
        </div>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text)', margin: 0 }}>
            {t.name}
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0 }}>
            {t.location} · {t.role}
          </p>
        </div>
        {/* Google badge */}
        <div style={{ marginLeft: 'auto', opacity: 0.5 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{
      padding: '6rem 0',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '3.5rem', padding: '0 5vw' }}
      >
        <p style={{
          fontSize: '0.8rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#4C57F4',
          fontFamily: "'Inter', sans-serif",
          marginBottom: '0.75rem',
        }}>
          What Our Clients Say
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--color-text)',
          margin: '0 0 1rem',
        }}>
          Trusted by Hundreds Across Oxford
        </h2>
        {/* Star summary row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '3px' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ color: '#f59e0b', fontSize: '1.1rem' }}>★</span>
            ))}
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: 'var(--color-text-muted)', margin: 0 }}>
            <strong style={{ color: 'var(--color-text)' }}>4.9 / 5</strong> from 500+ verified reviews
          </p>
        </div>
      </motion.div>

      {/* Gradient fade edges */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to right, #f1f3ff 0%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to left, #eef2ff 0%, transparent 100%)',
      }} />

      {/* Marquee track */}
      <div
        ref={trackRef}
        onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; }}
        onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; }}
        style={{
          display: 'flex',
          gap: '1.5rem',
          width: 'max-content',
          animation: 'marquee 40s linear infinite',
          paddingLeft: '1.5rem',
        }}
      >
        {DOUBLED.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
