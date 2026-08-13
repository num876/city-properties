import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  description: string;
}

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
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsCounter({ stats }: { stats: Stat[] }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Top decorative line */}
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, #4C57F4, #20A6E8, #4C57F4)',
        backgroundSize: '200% 100%',
      }} />

      <div style={{
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        padding: '3.5rem 5vw',
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 28 } },
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '1.5rem 2rem',
                position: 'relative',
                cursor: 'default',
              }}
            >
              {/* Vertical divider between items */}
              {i < stats.length - 1 && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '15%',
                  bottom: '15%',
                  width: '1px',
                  background: 'var(--color-border)',
                }} className="stat-divider" />
              )}

              {/* Icon badge */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(76,87,244,0.1), rgba(32,166,232,0.1))',
                  border: '1px solid rgba(76,87,244,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  marginBottom: '1.25rem',
                }}
              >
                {s.icon}
              </motion.div>

              {/* Animated number */}
              <div style={{
                fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                lineHeight: 1,
                marginBottom: '0.4rem',
                background: 'linear-gradient(135deg, #4C57F4, #20A6E8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                <Counter value={s.value} suffix={s.suffix} />
              </div>

              {/* Label */}
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '0.95rem',
                color: 'var(--color-text)',
                margin: '0 0 0.3rem',
              }}>
                {s.label}
              </p>

              {/* Description */}
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.78rem',
                color: 'var(--color-text-muted)',
                margin: 0,
                lineHeight: 1.5,
              }}>
                {s.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stat-divider { display: none; }
        }
      `}</style>
    </section>
  );
}
