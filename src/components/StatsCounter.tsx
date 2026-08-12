import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Stat {
  value: number;
  suffix: string;
  label: string;
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
          const step = Math.ceil(value / 60);
          const timer = setInterval(() => {
            start += step;
            if (start >= value) { setCount(value); clearInterval(timer); }
            else setCount(start);
          }, 25);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export default function StatsCounter({ stats }: { stats: Stat[] }) {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)',
        padding: '3rem 5vw',
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <div
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                color: '#fff',
                lineHeight: 1.1,
              }}
            >
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', marginTop: '0.5rem' }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
