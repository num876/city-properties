import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string | React.ReactNode;
  description: string;
}

const Icons: Record<string, React.ReactNode> = {
  'Properties Managed': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  'Industry Experience': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7"></circle>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>
  ),
  'Client Satisfaction': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  ),
  'Happy Tenants': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
};

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const steps = 60;
          const step = value / steps;
          const interval = duration / steps;
          const timer = setInterval(() => {
            start += step;
            if (start >= value) { setCount(value); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, interval);
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsCounter({ stats }: { stats: Stat[] }) {
  return (
    <section style={{ 
      position: 'relative', 
      zIndex: 10,
      marginTop: '4rem', // Give it dedicated space below the hero
      padding: '0 5vw',
      marginBottom: '4rem'
    }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 25 } },
            }}
            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transition: 'box-shadow 0.3s ease',
            }}
            className="stat-card"
          >
            {/* Subtle Gradient Glow in background */}
            <div style={{
              position: 'absolute',
              top: '-50%', left: '-50%',
              width: '200%', height: '200%',
              background: 'radial-gradient(circle at top right, rgba(76,87,244,0.05) 0%, transparent 50%)',
              pointerEvents: 'none'
            }} />

            {/* Icon */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4C57F4, #20A6E8)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: '0 8px 16px rgba(76,87,244,0.3)',
              }}
            >
              {Icons[s.label] || s.icon}
            </div>

            {/* Value */}
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              lineHeight: 1,
              marginBottom: '0.5rem',
              color: '#1a1a2e',
            }}>
              <Counter value={s.value} suffix={s.suffix} />
            </div>

            {/* Label */}
            <h3 style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: '#1a1a2e',
              margin: '0 0 0.5rem',
              letterSpacing: '-0.3px',
            }}>
              {s.label}
            </h3>

            {/* Description */}
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              color: '#6b7280',
              margin: 0,
              lineHeight: 1.6,
            }}>
              {s.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        [data-theme="dark"] .stat-card {
          background: rgba(20, 20, 40, 0.75) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
        }
        [data-theme="dark"] .stat-card h3, [data-theme="dark"] .stat-card > div:nth-of-type(3) {
          color: #fff !important;
        }
        [data-theme="dark"] .stat-card p {
          color: #9ca3af !important;
        }
      `}</style>
    </section>
  );
}
