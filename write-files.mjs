import fs from 'fs';
import path from 'path';

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

write('src/design/tokens.ts', `// Design tokens
export const colors = {
  primary: '#4C57F4',
  secondary: '#20A6E8',
  background: '#F8F9FF',
  surface: '#FFFFFF',
  text: '#1a1a2e',
  textMuted: '#6b7280',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.4)',
  accentLight: '#6A8DFF',
  accentDark: '#2A34B2',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

export const spacing = {
  xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px', '3xl': '64px',
};

export const fonts = {
  heading: "'Playfair Display', serif",
  body: "'Inter', sans-serif",
};

export const shadows = {
  subtle: '0 2px 8px rgba(0,0,0,0.06)',
  card: '0 4px 20px rgba(0,0,0,0.08)',
  elevated: '0 8px 40px rgba(76,87,244,0.15)',
  glow: '0 0 0 3px rgba(76,87,244,0.2)',
};

export const radius = {
  sm: '6px', md: '10px', lg: '14px', xl: '20px', pill: '999px',
};

export const gradients = {
  brand: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)',
  brandHoriz: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
  hero: 'linear-gradient(90deg, rgba(10,10,30,0.88) 0%, rgba(10,10,30,0.45) 55%, transparent 100%)',
  subtle: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)',
  dark: 'linear-gradient(135deg, #0a0a1e 0%, #1a1a3e 100%)',
};

export const transitions = {
  fast: 'all 0.15s ease',
  base: 'all 0.25s ease',
  slow: 'all 0.4s ease',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};
`);

write('src/index.css', `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --color-primary: #4C57F4;
  --color-secondary: #20A6E8;
  --color-bg: #F8F9FF;
  --color-surface: #FFFFFF;
  --color-text: #1a1a2e;
  --color-text-muted: #6b7280;
  --color-border: rgba(0,0,0,0.08);
  --color-card-bg: rgba(255,255,255,0.9);
  --shadow-card: 0 4px 20px rgba(0,0,0,0.08);
  --gradient-brand: linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%);
  --radius-md: 10px;
  --radius-lg: 14px;
  --transition: all 0.25s ease;
}

[data-theme='dark'] {
  --color-bg: #0a0a1e;
  --color-surface: #111130;
  --color-text: #f0f0f0;
  --color-text-muted: #9ca3af;
  --color-border: rgba(255,255,255,0.08);
  --color-card-bg: rgba(255,255,255,0.05);
  --shadow-card: 0 4px 20px rgba(0,0,0,0.4);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: smooth; }
body {
  font-family: 'Inter', sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
  transition: background 0.3s ease, color 0.3s ease;
  min-height: 100vh;
}
#root { display: flex; flex-direction: column; min-height: 100vh; width: 100%; }
main { flex: 1; }
img { display: block; max-width: 100%; }
a { transition: var(--transition); }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: var(--color-primary); border-radius: 3px; }

/* Skeleton shimmer */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}

/* Focus styles */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

/* Utility */
.visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
}
`);

write('src/design/theme.tsx', `import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ isDark: false, toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('prefers-dark');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('prefers-dark', JSON.stringify(isDark));
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev: boolean) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
`);

write('src/components/ScrollProgress.tsx', `import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        height: '3px',
        width: \`\${progress}%\`,
        background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
        transition: 'width 0.1s ease',
        pointerEvents: 'none',
      }}
    />
  );
}
`);

write('src/components/BackToTop.tsx', `import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handle = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 999,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4C57F4, #20A6E8)',
            border: 'none',
            color: '#fff',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(76,87,244,0.4)',
          }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
`);

write('src/components/Badge.tsx', `import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'neutral';
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: { background: 'linear-gradient(90deg,#4C57F4,#20A6E8)', color: '#fff' },
  success: { background: '#dcfce7', color: '#166534' },
  warning: { background: '#fef9c3', color: '#854d0e' },
  neutral: { background: '#f3f4f6', color: '#374151' },
};

export default function Badge({ children, variant = 'primary' }: BadgeProps) {
  return (
    <span
      style={{
        ...variantStyles[variant],
        padding: '3px 10px',
        borderRadius: '999px',
        fontSize: '0.78rem',
        fontWeight: 600,
        fontFamily: "'Inter', sans-serif",
        letterSpacing: '0.3px',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
}
`);

write('src/components/Skeleton.tsx', `export default function Skeleton({ height = '200px', width = '100%', borderRadius = '10px' }: { height?: string; width?: string; borderRadius?: string }) {
  return (
    <div
      className="skeleton"
      style={{ height, width, borderRadius }}
      aria-hidden="true"
    />
  );
}
`);

write('src/components/Toast.tsx', `import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  visible: boolean;
  onClose: () => void;
}

const colors: Record<string, string> = {
  success: '#10b981',
  error: '#ef4444',
  info: '#4C57F4',
};

export default function Toast({ message, type = 'success', visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onClose, 3500);
      return () => clearTimeout(t);
    }
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          style={{
            position: 'fixed',
            bottom: '5rem',
            right: '2rem',
            zIndex: 9998,
            background: colors[type],
            color: '#fff',
            padding: '0.75rem 1.25rem',
            borderRadius: '10px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '0.9rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            maxWidth: '300px',
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`);

write('src/components/Accordion.tsx', `import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItem {
  question: string;
  answer: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            border: '1px solid rgba(76,87,244,0.15)',
            borderRadius: '10px',
            overflow: 'hidden',
            background: 'var(--color-surface)',
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '1rem 1.25rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--color-text)',
            }}
          >
            {item.question}
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: '1.4rem', lineHeight: 1, color: '#4C57F4' }}
            >
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  style={{
                    padding: '0 1.25rem 1rem',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.7,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
`);

write('src/components/IconFeature.tsx', `import { motion } from 'framer-motion';

interface IconFeatureProps {
  icon: string;
  title: string;
  body: string;
}

export default function IconFeature({ icon, title, body }: IconFeatureProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: 'var(--color-surface)',
        borderRadius: '14px',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid var(--color-border)',
      }}
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #4C57F4, #20A6E8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.6rem',
          margin: '0 auto 1rem',
        }}
      >
        {icon}
      </motion.div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
        {body}
      </p>
    </motion.div>
  );
}
`);

write('src/components/StatsCounter.tsx', `import { useEffect, useRef, useState } from 'react';
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
`);

write('src/components/TestimonialsCarousel.tsx', `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  { name: 'Sarah Mitchell', location: 'City Centre, Oxford', text: 'City Properties found us the perfect flat in just two weeks. Incredibly professional and responsive throughout the entire process.', stars: 5 },
  { name: 'James Thornton', location: 'Headington, Oxford', text: 'As a landlord I have trusted City Properties for 5 years. Zero vacancies and excellent tenant management. Highly recommended.', stars: 5 },
  { name: 'Priya Sharma', location: 'Cowley, Oxford', text: 'The team went above and beyond to help me settle into Oxford. The whole experience was seamless from viewing to signing.', stars: 5 },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section
      style={{
        background: 'var(--color-surface)',
        padding: '5rem 5vw',
        textAlign: 'center',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <p style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#4C57F4', fontFamily: "'Inter', sans-serif", marginBottom: '0.5rem' }}>What Our Clients Say</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--color-text)', marginBottom: '3rem' }}>
        Trusted by hundreds across Oxford
      </h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          style={{ maxWidth: '680px', margin: '0 auto' }}
        >
          <div style={{ fontSize: '1.5rem', color: '#f59e0b', marginBottom: '1rem' }}>{'★'.repeat(t.stars)}</div>
          <blockquote
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.8,
              color: 'var(--color-text)',
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              marginBottom: '1.5rem',
            }}
          >
            "{t.text}"
          </blockquote>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: 'var(--color-text)', fontSize: '0.95rem' }}>{t.name}</p>
          <p style={{ fontFamily: "'Inter', sans-serif", color: '#4C57F4', fontSize: '0.85rem' }}>{t.location}</p>
        </motion.div>
      </AnimatePresence>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem' }}>
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={\`Testimonial \${i + 1}\`}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === current ? '#4C57F4' : '#d1d5db',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
`);

write('src/components/GlassCard.tsx', `import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function GlassCard({ children, className, style, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={className}
      onClick={onClick}
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(76,87,244,0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: 'var(--color-card-bg)',
        borderRadius: '14px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
`);

write('src/components/PropertyCard.tsx', `import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import GlassCard from './GlassCard';
import Badge from './Badge';

interface PropertyCardProps {
  title: string;
  excerpt: string;
  slug: string;
  imageUrl?: string;
  imageAlt?: string;
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80';

export default function PropertyCard({ title, excerpt, slug, imageUrl, imageAlt, price, bedrooms, bathrooms, type }: PropertyCardProps) {
  const [hearted, setHearted] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <Link to={'/properties/' + slug} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <GlassCard>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={imageUrl || PLACEHOLDER}
              alt={imageAlt ?? title}
              loading="lazy"
              style={{ width: '100%', height: '210px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
            />
            {price && (
              <Badge>
                {price}
              </Badge>
            )}
            {price && (
              <span style={{
                position: 'absolute', top: '0.75rem', left: '0.75rem',
                background: 'linear-gradient(90deg,#4C57F4,#20A6E8)',
                color: '#fff', padding: '4px 10px', borderRadius: '999px',
                fontSize: '0.78rem', fontWeight: 600, fontFamily: "'Inter', sans-serif",
              }}>
                {price}
              </span>
            )}
            {type && (
              <span style={{
                position: 'absolute', top: '0.75rem', right: '3rem',
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
                color: '#fff', padding: '4px 10px', borderRadius: '999px',
                fontSize: '0.75rem', fontFamily: "'Inter', sans-serif",
              }}>
                {type}
              </span>
            )}
          </div>
          <div style={{ padding: '1.1rem 1.25rem 1.25rem' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.35rem' }}>
              {title}
            </h3>
            {(bedrooms || bathrooms) && (
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', fontSize: '0.82rem', color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif" }}>
                {bedrooms && <span>🛏 {bedrooms} bed</span>}
                {bathrooms && <span>🚿 {bathrooms} bath</span>}
              </div>
            )}
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: excerpt }} />
            <div style={{ marginTop: '1rem', color: '#4C57F4', fontWeight: 600, fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>
              View Details →
            </div>
          </div>
        </GlassCard>
      </Link>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => setHearted((h) => !h)}
        aria-label={hearted ? 'Remove from favourites' : 'Add to favourites'}
        style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
          border: 'none', borderRadius: '50%',
          width: '32px', height: '32px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.9rem',
          zIndex: 10,
        }}
      >
        {hearted ? '❤️' : '🤍'}
      </motion.button>
    </div>
  );
}
`);

write('src/components/SearchFilter.tsx', `import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { motion } from 'framer-motion';

interface SearchFilterProps {
  onSearch: (term: string) => void;
}

export default function SearchFilter({ onSearch }: SearchFilterProps) {
  const [term, setTerm] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);
    onSearch(value);
  };

  const handleClear = () => { setTerm(''); onSearch(''); };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}
    >
      <div style={{ position: 'relative', flex: 1, maxWidth: '480px' }}>
        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', pointerEvents: 'none' }}>🔍</span>
        <input
          type="text"
          placeholder="Search by area, type, keyword…"
          value={term}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.75rem 1rem 0.75rem 2.8rem',
            fontSize: '0.95rem',
            fontFamily: "'Inter', sans-serif",
            border: '1px solid rgba(76,87,244,0.25)',
            borderRadius: '10px',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(76,87,244,0.06)',
          }}
          aria-label="Search properties"
        />
      </div>
      {term && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClear}
          style={{
            padding: '0.75rem 1.25rem',
            background: '#f3f4f6',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            color: '#374151',
          }}
        >
          Clear
        </motion.button>
      )}
    </motion.div>
  );
}
`);

write('src/components/Header.tsx', `import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design/theme';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/areas', label: 'Areas' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 5vw', height: '68px',
          background: isDark ? 'rgba(10,10,30,0.92)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--color-border)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
          transition: 'background 0.3s ease',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #4C57F4, #20A6E8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '0.78rem', fontFamily: "'Inter', sans-serif",
          }}>CP</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-text)' }}>
            City Properties
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          {NAV_LINKS.map(({ to, label }) => {
            const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                style={{
                  textDecoration: 'none', fontSize: '0.92rem',
                  fontFamily: "'Inter', sans-serif", fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#4C57F4' : 'var(--color-text-muted)',
                  position: 'relative', paddingBottom: '4px', transition: 'color 0.2s',
                }}
              >
                {label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: '2px', background: 'linear-gradient(90deg, #4C57F4, #20A6E8)', borderRadius: '2px',
                    }}
                  />
                )}
              </Link>
            );
          })}
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              padding: '0.4rem 1rem', fontSize: '0.85rem',
              fontFamily: "'Inter', sans-serif", fontWeight: 500,
              background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(76,87,244,0.06)',
              border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(76,87,244,0.2)',
              borderRadius: '20px', color: isDark ? '#fff' : '#4C57F4', cursor: 'pointer',
            }}
          >
            {isDark ? '☀' : '☾'}
          </motion.button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.5rem', color: 'var(--color-text)',
          }}
          className="hamburger"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            style={{
              position: 'fixed', top: '68px', right: 0, bottom: 0,
              width: '280px', zIndex: 99,
              background: 'var(--color-surface)',
              borderLeft: '1px solid var(--color-border)',
              padding: '2rem 1.5rem',
              display: 'flex', flexDirection: 'column', gap: '1.25rem',
              boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
            }}
          >
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: 'none', fontSize: '1.05rem',
                  fontFamily: "'Inter', sans-serif", fontWeight: 500,
                  color: location.pathname === to ? '#4C57F4' : 'var(--color-text)',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={() => { toggleTheme(); setMenuOpen(false); }}
              style={{
                marginTop: 'auto', padding: '0.75rem',
                background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
                border: 'none', borderRadius: '10px', color: '#fff',
                fontFamily: "'Inter', sans-serif", fontWeight: 600,
                fontSize: '0.9rem', cursor: 'pointer',
              }}
            >
              {isDark ? '☀ Switch to Light' : '☾ Switch to Dark'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 98,
              background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)',
            }}
          />
        )}
      </AnimatePresence>

      <style>{\`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      \`}</style>
    </>
  );
}
`);

write('src/components/Hero.tsx', `import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PHRASES = ['Find Your Home.', 'Find Your Space.', 'Find Your Future.'];

export default function Hero() {
  const navigate = useNavigate();
  const phraseRef = useRef<HTMLSpanElement>(null);
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const type = () => {
      const phrase = PHRASES[phraseIndex.current];
      if (!deleting.current) {
        charIndex.current++;
        if (phraseRef.current) phraseRef.current.textContent = phrase.slice(0, charIndex.current);
        if (charIndex.current === phrase.length) {
          deleting.current = true;
          timer = setTimeout(type, 1800);
          return;
        }
      } else {
        charIndex.current--;
        if (phraseRef.current) phraseRef.current.textContent = phrase.slice(0, charIndex.current);
        if (charIndex.current === 0) {
          deleting.current = false;
          phraseIndex.current = (phraseIndex.current + 1) % PHRASES.length;
        }
      }
      timer = setTimeout(type, deleting.current ? 50 : 90);
    };
    timer = setTimeout(type, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      style={{
        width: '100%', minHeight: '88vh', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(10,10,30,0.88) 0%, rgba(10,10,30,0.5) 55%, transparent 100%)',
        zIndex: 1,
      }} />

      <div style={{ position: 'relative', zIndex: 2, padding: '0 5vw', maxWidth: '720px' }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#20A6E8', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>
            Oxford's Premier Letting Agency
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
            lineHeight: 1.1, color: '#fff', margin: '0 0 0.5rem', fontWeight: 700,
          }}
        >
          <span ref={phraseRef} />
          <span style={{ opacity: 0.6, animation: 'blink 1s step-end infinite' }}>|</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            lineHeight: 1.75, marginBottom: '2.5rem', fontFamily: "'Inter', sans-serif", maxWidth: '520px',
          }}
        >
          Discover curated properties for modern living in the heart of Oxford.
          Expert letting and management since 2009.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(76,87,244,0.6)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/properties')}
            style={{
              padding: '0.9rem 2.25rem', fontSize: '1rem', fontWeight: 600,
              background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
              border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif", letterSpacing: '0.3px',
              boxShadow: '0 4px 20px rgba(76,87,244,0.4)',
            }}
          >
            View Properties
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.18)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/contact')}
            style={{
              padding: '0.9rem 2.25rem', fontSize: '1rem', fontWeight: 600,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.35)', borderRadius: '10px',
              color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              backdropFilter: 'blur(8px)',
            }}
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 2, color: 'rgba(255,255,255,0.5)',
          fontSize: '1.5rem', cursor: 'pointer',
        }}
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
      >
        ↓
      </motion.div>

      <style>{\`
        @keyframes blink { 0%,100%{opacity:0.6} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
      \`}</style>
    </section>
  );
}
`);

write('src/pages/HomePage.tsx', `import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import StatsCounter from '../components/StatsCounter';
import IconFeature from '../components/IconFeature';
import TestimonialsCarousel from '../components/TestimonialsCarousel';

const STATS = [
  { value: 250, suffix: '+', label: 'Properties Managed' },
  { value: 15, suffix: ' yrs', label: 'Industry Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 12, suffix: 'k+', label: 'Happy Tenants' },
];

const FEATURES = [
  { icon: '🏠', title: 'Expert Local Knowledge', body: 'Born and bred in Oxford, we know every street, postcode, and neighbourhood inside out.' },
  { icon: '🔑', title: 'Fully Managed Service', body: 'From tenant sourcing to maintenance coordination, we handle everything on your behalf.' },
  { icon: '📞', title: '24/7 Support', body: 'Our dedicated team is available around the clock for emergencies and urgent queries.' },
  { icon: '⭐', title: 'Trusted by Hundreds', body: 'Over 500 five-star reviews from landlords and tenants across Oxford since 2009.' },
];

const AREAS = [
  { name: 'City Centre', slug: 'city-centre', avg: '£1,600 pcm', img: '/images/area-centre.jpg', desc: 'The heart of Oxford with world-class universities, restaurants, and cultural venues on your doorstep.' },
  { name: 'Headington', slug: 'headington', avg: '£1,200 pcm', img: '/images/area-headington.jpg', desc: 'A charming suburb with excellent schools, the John Radcliffe Hospital, and a vibrant local high street.' },
  { name: 'Cowley', slug: 'cowley', avg: '£950 pcm', img: '/images/area-cowley.jpg', desc: "Oxford's most diverse and lively neighbourhood with great transport links and a growing creative scene." },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>City Properties – Letting & Management in Oxford</title>
        <meta name="description" content="Oxford's premier letting and property management agency. Find your perfect home with City Properties." />
        <meta property="og:title" content="City Properties – Letting & Management in Oxford" />
        <meta property="og:description" content="Oxford's premier letting and property management agency. 250+ properties, 15 years of experience." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Hero />

      <StatsCounter stats={STATS} />

      {/* Featured Properties CTA */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionReveal}
        style={{ padding: '5rem 5vw', background: 'var(--color-bg)', textAlign: 'center' }}
      >
        <p style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#4C57F4', fontFamily: "'Inter', sans-serif", marginBottom: '0.5rem' }}>Browse Our Portfolio</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--color-text)', marginBottom: '1rem' }}>
          Find Your Perfect Property
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto 2.5rem', fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
          Browse our curated selection of flats, houses, and studios across Oxford's most sought-after neighbourhoods.
        </p>
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(76,87,244,0.35)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/properties')}
          style={{
            padding: '0.9rem 2.5rem', fontSize: '1rem', fontWeight: 600,
            background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
            border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          View All Properties →
        </motion.button>
      </motion.section>

      {/* Why Choose Us */}
      <section style={{ padding: '5rem 5vw', background: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)' }}>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p variants={sectionReveal} style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#4C57F4', fontFamily: "'Inter', sans-serif", textAlign: 'center', marginBottom: '0.5rem' }}>Why City Properties</motion.p>
          <motion.h2 variants={sectionReveal} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--color-text)', textAlign: 'center', marginBottom: '3rem' }}>
            The Oxford Letting Experts
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
            {FEATURES.map((f) => (
              <motion.div key={f.title} variants={sectionReveal}>
                <IconFeature icon={f.icon} title={f.title} body={f.body} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <TestimonialsCarousel />

      {/* Area Guide Preview */}
      <section style={{ padding: '5rem 5vw', background: 'var(--color-bg)' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionReveal} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#4C57F4', fontFamily: "'Inter', sans-serif", marginBottom: '0.5rem' }}>Explore Oxford</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--color-text)' }}>Popular Areas</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          {AREAS.map((area, i) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate('/areas/' + area.slug)}
              style={{ cursor: 'pointer', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', background: 'var(--color-surface)', position: 'relative' }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                <img src={area.img} alt={area.name} loading="lazy" style={{ width: '100%', height: '200px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
                <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'linear-gradient(90deg,#4C57F4,#20A6E8)', color: '#fff', padding: '4px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                  {area.avg}
                </span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>{area.name}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>{area.desc}</p>
                <p style={{ marginTop: '0.75rem', color: '#4C57F4', fontWeight: 600, fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>Explore {area.name} →</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)',
        padding: '5rem 5vw', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 3rem)', color: '#fff', marginBottom: '1rem' }}
        >
          Ready to Find Your Next Home?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', marginBottom: '2rem', fontFamily: "'Inter', sans-serif" }}
        >
          Speak with our expert team today and start your Oxford property journey.
        </motion.p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/properties')}
            style={{ padding: '0.9rem 2.25rem', background: '#fff', color: '#4C57F4', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
          >
            Browse Properties
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/contact')}
            style={{ padding: '0.9rem 2.25rem', background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', fontFamily: "'Inter', sans-serif", backdropFilter: 'blur(8px)' }}
          >
            Get in Touch
          </motion.button>
        </div>
      </section>
    </>
  );
}
`);

write('src/pages/PropertyListPage.tsx', `import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { client, GET_PROPERTIES } from '../api/wordpress';
import PropertyCard from '../components/PropertyCard';
import SearchFilter from '../components/SearchFilter';
import Skeleton from '../components/Skeleton';

interface Property {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featuredImage?: { node: { sourceUrl: string; altText: string } };
}

export default function PropertyListPage() {
  const [all, setAll] = useState<Property[]>([]);
  const [displayed, setDisplayed] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.request(GET_PROPERTIES)
      .then((data) => {
        const edges = (data as any).properties?.edges || [];
        const props = edges.map((e: any) => e.node);
        setAll(props);
        setDisplayed(props);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = (term: string) => {
    if (!term) { setDisplayed(all); return; }
    const low = term.toLowerCase();
    setDisplayed(all.filter((p) => p.title.toLowerCase().includes(low) || p.excerpt.toLowerCase().includes(low)));
  };

  return (
    <>
      <Helmet>
        <title>Properties – City Properties Oxford</title>
        <meta name="description" content="Browse available rental properties in Oxford managed by City Properties." />
      </Helmet>

      <section style={{ background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)', padding: '3.5rem 5vw 2.5rem', color: '#fff' }}>
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '0.5rem' }}
        >
          Available Properties
        </motion.h1>
        <p style={{ fontFamily: "'Inter', sans-serif", opacity: 0.85, fontSize: '1.05rem' }}>
          Hand-picked homes across Oxford's finest neighbourhoods
        </p>
      </section>

      <div style={{ padding: '1.5rem 5vw', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
        <SearchFilter onSearch={handleSearch} />
      </div>

      <section style={{ padding: '2.5rem 5vw 4rem', background: 'var(--color-bg)', minHeight: '50vh' }}>
        {loading ? (
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} height="320px" />)}
          </div>
        ) : displayed.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '5rem 2rem' }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏚</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>No Properties Found</h3>
            <p style={{ color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif" }}>Try adjusting your search terms.</p>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
          >
            {displayed.map((p) => (
              <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}>
                <PropertyCard
                  title={p.title} excerpt={p.excerpt} slug={p.slug}
                  imageUrl={p.featuredImage?.node.sourceUrl} imageAlt={p.featuredImage?.node.altText}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </>
  );
}
`);

write('src/pages/AboutPage.tsx', `import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import IconFeature from '../components/IconFeature';

const TIMELINE = [
  { year: '2009', title: 'Founded', desc: 'City Properties opens its doors in central Oxford with a mission to redefine local letting.' },
  { year: '2014', title: '100 Properties', desc: 'We reach our first milestone of 100 managed properties across Oxford.' },
  { year: '2019', title: 'Digital First', desc: 'Launched our digital-first approach with online viewing, signing, and management.' },
  { year: '2026', title: '250+ Managed', desc: 'Today we manage over 250 properties and serve thousands of tenants and landlords.' },
];

const TEAM = [
  { name: 'James Whitfield', role: 'Founder & Director', emoji: '👨💼' },
  { name: 'Sophie Clarke', role: 'Head of Lettings', emoji: '👩💼' },
  { name: 'Marcus Okafor', role: 'Property Manager', emoji: '🧑💼' },
  { name: 'Emily Chen', role: 'Client Relations', emoji: '👩💼' },
];

const VALUES = [
  { icon: '🤝', title: 'Integrity', body: 'We are honest and transparent in everything we do — no hidden fees, no surprises.' },
  { icon: '🌆', title: 'Community', body: 'Oxford is our home. We invest in our community and care about its residents.' },
  { icon: '🏆', title: 'Excellence', body: 'We set the highest standards for service quality and continuously raise the bar.' },
];

const reveal = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About – City Properties Oxford</title>
        <meta name="description" content="Learn about City Properties, Oxford's trusted letting and property management agency since 2009." />
      </Helmet>

      {/* Hero Banner */}
      <section style={{ background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)', padding: '4rem 5vw 3rem', color: '#fff', textAlign: 'center' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginBottom: '1rem' }}
        >
          About City Properties
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}
        >
          Oxford's most trusted letting agency — serving landlords and tenants with integrity since 2009.
        </motion.p>
      </section>

      {/* Story */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}
        style={{ padding: '5rem 5vw', background: 'var(--color-bg)', maxWidth: '900px', margin: '0 auto' }}
      >
        <p style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: '#4C57F4', fontFamily: "'Inter', sans-serif", marginBottom: '0.75rem' }}>Our Story</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--color-text)', marginBottom: '1.25rem' }}>Born and Bred in Oxford</h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.85 }}>
          City Properties was founded in 2009 with a single vision: to make renting in Oxford a genuinely positive experience. Over 15 years we have grown from a small family office to one of Oxford's most recognised letting agencies, managing over 250 properties across every major neighbourhood.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.85, marginTop: '1rem' }}>
          We pride ourselves on transparency, responsiveness, and a deep knowledge of the local market. Every tenant and landlord we work with becomes part of the City Properties family.
        </p>
      </motion.section>

      {/* Timeline */}
      <section style={{ padding: '3rem 5vw 5rem', background: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)' }}>
        <h2 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--color-text)', marginBottom: '3rem' }}>Our Journey</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(180deg, #4C57F4, #20A6E8)', transform: 'translateX(-50%)' }} />
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                marginBottom: '2.5rem', position: 'relative',
              }}
            >
              <div style={{
                width: 'calc(50% - 2rem)',
                background: 'var(--color-surface)', borderRadius: '12px',
                padding: '1.25rem 1.5rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
                border: '1px solid var(--color-border)',
              }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4C57F4', fontFamily: "'Inter', sans-serif", letterSpacing: '1px' }}>{item.year}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--color-text)', margin: '0.25rem 0 0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '5rem 5vw', background: 'var(--color-bg)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--color-text)', marginBottom: '3rem' }}>Meet the Team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{ background: 'var(--color-surface)', borderRadius: '14px', padding: '2rem 1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid var(--color-border)' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{member.emoji}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>{member.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#4C57F4', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '4rem 5vw 5rem', background: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)' }}>
        <h2 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--color-text)', marginBottom: '3rem' }}>Our Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
          {VALUES.map((v) => <IconFeature key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
        </div>
      </section>
    </>
  );
}
`);

write('src/pages/ContactPage.tsx', `import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Toast from '../components/Toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as const });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setToast({ visible: true, message: 'Message sent! We will be in touch shortly.', type: 'success' });
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem',
    fontFamily: "'Inter', sans-serif", border: '1px solid var(--color-border)',
    borderRadius: '10px', background: 'var(--color-surface)', color: 'var(--color-text)',
    outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <>
      <Helmet>
        <title>Contact – City Properties Oxford</title>
        <meta name="description" content="Get in touch with City Properties for letting and management enquiries in Oxford." />
      </Helmet>

      <section style={{ background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)', padding: '3.5rem 5vw 2.5rem', color: '#fff', textAlign: 'center' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '0.5rem' }}
        >
          Get in Touch
        </motion.h1>
        <p style={{ fontFamily: "'Inter', sans-serif", opacity: 0.9 }}>We'd love to hear from you. Our team responds within one business day.</p>
      </section>

      <section style={{ padding: '4rem 5vw', background: 'var(--color-bg)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'var(--color-text)', marginBottom: '1.5rem' }}>Send a Message</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input required name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" style={inputStyle} />
              <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address *" style={inputStyle} />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" style={inputStyle} />
              <select name="subject" value={form.subject} onChange={handleChange} style={inputStyle}>
                <option value="">Subject</option>
                <option value="letting">Letting Enquiry</option>
                <option value="management">Property Management</option>
                <option value="viewing">Book a Viewing</option>
                <option value="other">Other</option>
              </select>
              <textarea required name="message" value={form.message} onChange={handleChange} placeholder="Your message *" rows={5}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              <motion.button
                type="submit" disabled={sending}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{
                  padding: '0.9rem 2rem', fontSize: '1rem', fontWeight: 600,
                  background: sending ? '#9ca3af' : 'linear-gradient(90deg,#4C57F4,#20A6E8)',
                  border: 'none', borderRadius: '10px', color: '#fff', cursor: sending ? 'not-allowed' : 'pointer',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {sending ? 'Sending…' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'var(--color-text)', marginBottom: '1.5rem' }}>Contact Info</h2>
            {[
              { icon: '📍', label: 'Address', value: '123 High Street, Oxford OX1 1AA' },
              { icon: '📞', label: 'Phone', value: '+44 1865 000 000' },
              { icon: '✉️', label: 'Email', value: 'info@cityproperties-oxford.co.uk' },
              { icon: '🕒', label: 'Hours', value: 'Mon–Fri 9am–6pm, Sat 10am–4pm' },
            ].map((c) => (
              <div key={c.label} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <p style={{ fontWeight: 600, fontFamily: "'Inter', sans-serif", color: 'var(--color-text)', marginBottom: '0.2rem' }}>{c.label}</p>
                  <p style={{ color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.95rem' }}>{c.value}</p>
                </div>
              </div>
            ))}
            {/* Map embed */}
            <div style={{ borderRadius: '12px', overflow: 'hidden', marginTop: '1rem', border: '1px solid var(--color-border)' }}>
              <iframe
                title="City Properties Oxford location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.6!2d-1.2577!3d51.7520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c6a9f0e39a1f%3A0x4a1c1c1c1c1c1c1c!2sOxford%2C+UK!5e0!3m2!1sen!2suk!4v1234567890"
                width="100%" height="220"
                style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </>
  );
}
`);

write('src/pages/AreasPage.tsx', `import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AREAS = [
  { name: 'City Centre', slug: 'city-centre', avg: '£1,600 pcm', img: '/images/area-centre.jpg', desc: 'World-class universities, restaurants, and cultural venues on your doorstep.' },
  { name: 'Headington', slug: 'headington', avg: '£1,200 pcm', img: '/images/area-headington.jpg', desc: 'Excellent schools, the John Radcliffe Hospital, and a vibrant local high street.' },
  { name: 'Cowley', slug: 'cowley', avg: '£950 pcm', img: '/images/area-cowley.jpg', desc: "Oxford's most diverse neighbourhood with great transport links and a creative scene." },
  { name: 'Jericho', slug: 'jericho', avg: '£1,450 pcm', img: '/images/area-centre.jpg', desc: 'A bohemian enclave beloved for its independent shops, cafes, and leafy streets.' },
  { name: 'Summertown', slug: 'summertown', avg: '£1,350 pcm', img: '/images/area-headington.jpg', desc: 'An upmarket suburb with beautiful parks, artisan bakeries, and top-rated schools.' },
];

export default function AreasPage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Area Guides – City Properties Oxford</title>
        <meta name="description" content="Explore Oxford's best neighbourhoods for renting. Area guides from City Properties." />
      </Helmet>

      <section style={{ background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)', padding: '3.5rem 5vw 2.5rem', color: '#fff', textAlign: 'center' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '0.5rem' }}
        >
          Oxford Area Guides
        </motion.h1>
        <p style={{ fontFamily: "'Inter', sans-serif", opacity: 0.9 }}>Explore Oxford's most sought-after neighbourhoods</p>
      </section>

      <section style={{ padding: '3rem 5vw 5rem', background: 'var(--color-bg)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          {AREAS.map((area, i) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate('/areas/' + area.slug)}
              style={{ cursor: 'pointer', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', background: 'var(--color-surface)' }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={area.img} alt={area.name} loading="lazy" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
                <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'linear-gradient(90deg,#4C57F4,#20A6E8)', color: '#fff', padding: '4px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                  {area.avg}
                </span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>{area.name}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.65, fontFamily: "'Inter', sans-serif", marginBottom: '0.75rem' }}>{area.desc}</p>
                <p style={{ color: '#4C57F4', fontWeight: 600, fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>Explore {area.name} →</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
`);

write('src/pages/TenantsPage.tsx', `import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Accordion from '../components/Accordion';

const STEPS = [
  { icon: '🔍', title: 'Search', desc: 'Browse our portfolio of available properties and use filters to find your perfect match.' },
  { icon: '👁', title: 'View', desc: 'Book a viewing online or by phone. We offer evening and weekend appointments.' },
  { icon: '📝', title: 'Apply', desc: 'Submit your application online with references and proof of income.' },
  { icon: '✅', title: 'Reference Check', desc: 'We conduct professional reference and credit checks, typically within 48 hours.' },
  { icon: '✍', title: 'Sign', desc: 'Sign your tenancy agreement digitally from anywhere in the world.' },
  { icon: '🏠', title: 'Move In', desc: 'Collect your keys and start enjoying your new Oxford home.' },
];

const FAQ = [
  { question: 'How much is the holding deposit?', answer: "The holding deposit is equivalent to one week's rent, capped as per the Tenant Fees Act 2019." },
  { question: 'Do you accept DSS / Universal Credit?', answer: 'We work with a range of landlords, some of whom do accept housing benefit. Please enquire about specific properties.' },
  { question: 'How long does referencing take?', answer: 'Standard referencing typically takes 3–5 working days once all documents have been submitted.' },
  { question: 'Can I have pets?', answer: 'Some of our properties are pet-friendly. Please filter your search or contact us to discuss your requirements.' },
  { question: 'What are my maintenance responsibilities?', answer: 'Tenants are responsible for general upkeep and reporting issues promptly. Landlords are responsible for structural repairs and appliance maintenance.' },
];

const reveal = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function TenantsPage() {
  return (
    <>
      <Helmet>
        <title>Tenants Guide – City Properties Oxford</title>
        <meta name="description" content="A step-by-step guide to renting in Oxford with City Properties." />
      </Helmet>

      <section style={{ background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)', padding: '3.5rem 5vw 2.5rem', color: '#fff', textAlign: 'center' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '0.5rem' }}
        >
          Tenants Guide
        </motion.h1>
        <p style={{ fontFamily: "'Inter', sans-serif", opacity: 0.9 }}>Everything you need to know about renting with City Properties</p>
      </section>

      {/* Steps */}
      <section style={{ padding: '5rem 5vw', background: 'var(--color-bg)' }}>
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', textAlign: 'center', color: 'var(--color-text)', marginBottom: '3rem' }}
        >
          Your Journey to a New Home
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{ textAlign: 'center', padding: '2rem 1.5rem', background: 'var(--color-surface)', borderRadius: '14px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid var(--color-border)', position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '-1rem', left: '50%', transform: 'translateX(-50%)', width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #4C57F4, #20A6E8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>{i + 1}</div>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', marginTop: '0.5rem' }}>{step.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>{step.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '3rem 5vw 5rem', background: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', textAlign: 'center', color: 'var(--color-text)', marginBottom: '2.5rem' }}>Frequently Asked Questions</h2>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <Accordion items={FAQ} />
        </div>
      </section>
    </>
  );
}
`);

write('src/pages/LandlordsPage.tsx', `import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import IconFeature from '../components/IconFeature';
import Toast from '../components/Toast';

const BENEFITS = [
  { icon: '💷', title: 'Maximise Your Yield', body: 'Our expert team ensures your property achieves market-leading rental returns.' },
  { icon: '🛡', title: 'Fully Insured Management', body: 'All managed properties are covered by our comprehensive landlord protection scheme.' },
  { icon: '⚡', title: 'Fast Tenant Placement', body: 'On average we find quality tenants within 14 days of listing your property.' },
  { icon: '📊', title: 'Monthly Reporting', body: 'Transparent financial reporting with itemised statements delivered every month.' },
  { icon: '🔧', title: 'Maintenance Network', body: 'Access to our vetted network of local tradespeople at preferred rates.' },
  { icon: '📋', title: 'Legal Compliance', body: 'We keep your property fully compliant with all current UK letting legislation.' },
];

export default function LandlordsPage() {
  const [form, setForm] = useState({ name: '', email: '', postcode: '', message: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as const });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setToast({ visible: true, message: 'Valuation request received! We will call you within 24 hours.', type: 'success' });
    setForm({ name: '', email: '', postcode: '', message: '' });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem',
    fontFamily: "'Inter', sans-serif", border: '1px solid var(--color-border)',
    borderRadius: '10px', background: 'var(--color-surface)', color: 'var(--color-text)', outline: 'none',
  };

  return (
    <>
      <Helmet>
        <title>Landlords – City Properties Oxford</title>
        <meta name="description" content="Let and manage your Oxford property with City Properties. Free valuations available." />
      </Helmet>

      <section style={{ background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)', padding: '4rem 5vw 3rem', color: '#fff', textAlign: 'center' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1rem' }}
        >
          Landlord Services
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', opacity: 0.9, maxWidth: '560px', margin: '0 auto 2rem' }}
        >
          Let your Oxford property with confidence. Trusted management from Oxford's leading letting agency.
        </motion.p>
      </section>

      {/* Benefits */}
      <section style={{ padding: '5rem 5vw', background: 'var(--color-bg)' }}>
        <h2 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--color-text)', marginBottom: '3rem' }}>Why Let With Us</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          {BENEFITS.map((b) => <IconFeature key={b.title} icon={b.icon} title={b.title} body={b.body} />)}
        </div>
      </section>

      {/* Free Valuation */}
      <section style={{ padding: '5rem 5vw', background: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--color-text)', marginBottom: '0.75rem' }}>Request a Free Valuation</h2>
          <p style={{ color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif", fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            Find out how much your Oxford property could achieve in today's rental market.
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <input required name="name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Full Name *" style={inputStyle} />
            <input required type="email" name="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="Email Address *" style={inputStyle} />
            <input required name="postcode" value={form.postcode} onChange={(e) => setForm((f) => ({ ...f, postcode: e.target.value }))} placeholder="Property Postcode *" style={inputStyle} />
            <textarea name="message" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} placeholder="Additional notes (optional)" rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
            <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{ padding: '0.9rem 2rem', fontSize: '1rem', fontWeight: 600, background: sending ? '#9ca3af' : 'linear-gradient(90deg,#4C57F4,#20A6E8)', border: 'none', borderRadius: '10px', color: '#fff', cursor: sending ? 'not-allowed' : 'pointer', fontFamily: "'Inter', sans-serif" }}
            >
              {sending ? 'Sending…' : 'Request Free Valuation'}
            </motion.button>
          </form>
        </div>
      </section>

      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={() => setToast((t) => ({ ...t, visible: false }))} />
    </>
  );
}
`);

write('src/pages/NotFoundPage.tsx', `import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet><title>Page Not Found – City Properties Oxford</title></Helmet>
      <section style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 5vw', background: 'var(--color-bg)' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ fontSize: '6rem', marginBottom: '1rem' }}>🏚</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text)', marginBottom: '1rem' }}>Page Not Found</motion.h1>
        <p style={{ color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', marginBottom: '2rem' }}>Sorry, the page you are looking for doesn't exist or has been moved.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/')}
            style={{ padding: '0.85rem 2rem', background: 'linear-gradient(90deg,#4C57F4,#20A6E8)', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1rem' }}
          >
            Go Home
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/properties')}
            style={{ padding: '0.85rem 2rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '10px', color: 'var(--color-text)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '1rem' }}
          >
            Browse Properties
          </motion.button>
        </div>
      </section>
    </>
  );
}
`);

write('src/pages/PropertyDetailPage.tsx', `import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { client, GET_PROPERTY_BY_SLUG } from '../api/wordpress';
import Skeleton from '../components/Skeleton';

interface PropertyDetail {
  id: string;
  title: string;
  content: string;
  featuredImage?: { node: { sourceUrl: string; altText: string } };
}

const TABS = ['Overview', 'Location', 'Floorplan'];

export default function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [hearted, setHearted] = useState(false);

  useEffect(() => {
    if (!slug) return;
    client.request(GET_PROPERTY_BY_SLUG, { slug })
      .then((data) => { setProperty((data as any).propertyBy); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div style={{ padding: '3rem 5vw', background: 'var(--color-bg)' }}>
      <Skeleton height="400px" />
      <div style={{ height: '1rem' }} />
      <Skeleton height="200px" />
    </div>
  );

  if (!property) return (
    <div style={{ padding: '4rem 5vw', textAlign: 'center', background: 'var(--color-bg)' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-text)' }}>Property not found.</h2>
      <button onClick={() => navigate('/properties')} style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: 'linear-gradient(90deg,#4C57F4,#20A6E8)', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Browse Properties</button>
    </div>
  );

  const PLACEHOLDER = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80';
  const imgSrc = property.featuredImage?.node.sourceUrl || PLACEHOLDER;

  return (
    <>
      <Helmet>
        <title>{property.title} – City Properties Oxford</title>
        <meta name="description" content={property.title} />
      </Helmet>

      {/* Back button */}
      <div style={{ padding: '1rem 5vw', background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
        <button onClick={() => navigate('/properties')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4C57F4', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          ← Back to Properties
        </button>
      </div>

      {/* Hero image */}
      <div style={{ width: '100%', height: 'clamp(250px, 45vw, 480px)', overflow: 'hidden', position: 'relative' }}>
        <img src={imgSrc} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
        <h1 style={{
          position: 'absolute', bottom: '2rem', left: '5vw',
          fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.4)',
        }}>
          {property.title}
        </h1>
      </div>

      {/* Two column */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: '2rem', padding: '2.5rem 5vw', background: 'var(--color-bg)', maxWidth: '1200px', margin: '0 auto' }} className="detail-grid">
        
        {/* Left: Tabs */}
        <div>
          <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid var(--color-border)', marginBottom: '2rem' }}>
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: '0.75rem 1.5rem', background: 'none', border: 'none',
                  cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: i === activeTab ? 600 : 400,
                  color: i === activeTab ? '#4C57F4' : 'var(--color-text-muted)',
                  borderBottom: i === activeTab ? '2px solid #4C57F4' : '2px solid transparent',
                  marginBottom: '-2px', fontSize: '0.95rem',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontFamily: "'Inter', sans-serif", color: 'var(--color-text)', lineHeight: 1.9, fontSize: '1rem' }}
              dangerouslySetInnerHTML={{ __html: property.content }}
            />
          )}
          {activeTab === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <iframe
                title="Property location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.6!2d-1.2577!3d51.7520!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c6a9f0e39a1f%3A0x4a1c1c1c1c1c1c1c!2sOxford%2C+UK!5e0!3m2!1sen!2suk!4v1234567890"
                width="100%" height="400"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen loading="lazy"
              />
            </motion.div>
          )}
          {activeTab === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '3rem', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📐</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-text)', marginBottom: '0.5rem' }}>Floorplan Available on Request</h3>
              <p style={{ color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif", marginBottom: '1.5rem' }}>Contact us to receive the full floorplan for this property.</p>
              <button onClick={() => navigate('/contact')}
                style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(90deg,#4C57F4,#20A6E8)', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Request Floorplan
              </button>
            </motion.div>
          )}
        </div>

        {/* Right: Sticky sidebar */}
        <div style={{ position: 'sticky', top: '80px', alignSelf: 'start' }}>
          <div style={{ background: 'var(--color-surface)', borderRadius: '14px', padding: '1.5rem', border: '1px solid var(--color-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--color-text)', marginBottom: '1rem' }}>Enquire About This Property</h3>
            <button
              onClick={() => navigate('/contact')}
              style={{ width: '100%', padding: '0.85rem', background: 'linear-gradient(90deg,#4C57F4,#20A6E8)', border: 'none', borderRadius: '10px', color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginBottom: '0.75rem' }}
            >
              📅 Book a Viewing
            </button>
            <button
              onClick={() => setHearted((h) => !h)}
              style={{ width: '100%', padding: '0.85rem', background: hearted ? '#fef2f2' : 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '10px', color: hearted ? '#ef4444' : 'var(--color-text)', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.95rem', cursor: 'pointer' }}
            >
              {hearted ? '❤️ Saved' : '🤍 Save Property'}
            </button>
            <button
              onClick={() => { navigator.clipboard.writeText(window.location.href); }}
              style={{ width: '100%', padding: '0.85rem', background: 'none', border: 'none', color: '#4C57F4', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer', marginTop: '0.5rem' }}
            >
              🔗 Copy Link
            </button>
          </div>
        </div>
      </div>

      <style>{\`
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      \`}</style>
    </>
  );
}
`);

write('src/components/Footer.tsx', `import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a1e', color: 'rgba(255,255,255,0.7)', padding: '3.5rem 5vw 1.5rem', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: 'linear-gradient(135deg,#4C57F4,#20A6E8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.78rem' }}>CP</div>
            <span style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontWeight: 700, fontSize: '1.05rem' }}>City Properties</span>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.75, maxWidth: '220px' }}>Oxford's premier letting and property management agency since 2009.</p>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Services</h4>
          {[{ to: '/properties', label: 'Properties' }, { to: '/areas', label: 'Area Guides' }, { to: '/tenants', label: 'Tenants' }, { to: '/landlords', label: 'Landlords' }].map(({ to, label }) => (
            <div key={to} style={{ marginBottom: '0.5rem' }}><Link to={to} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.88rem' }}>{label}</Link></div>
          ))}
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Company</h4>
          {[{ to: '/about', label: 'About Us' }, { to: '/contact', label: 'Contact' }].map(({ to, label }) => (
            <div key={to} style={{ marginBottom: '0.5rem' }}><Link to={to} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.88rem' }}>{label}</Link></div>
          ))}
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Contact</h4>
          <p style={{ fontSize: '0.85rem', lineHeight: 2 }}>Oxford, United Kingdom<br /><a href="mailto:info@cityproperties-oxford.co.uk" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>info@cityproperties-oxford.co.uk</a><br /><a href="tel:+441865000000" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>+44 1865 000 000</a></p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem' }}>
        <span>© \${new Date().getFullYear()} City Properties Letting & Management. All rights reserved.</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>ARLA Registered · The Property Ombudsman</span>
      </div>
    </footer>
  );
}
`);

write('src/App.tsx', `import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './design/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Skeleton from './components/Skeleton';

const HomePage = lazy(() => import('./pages/HomePage'));
const PropertyListPage = lazy(() => import('./pages/PropertyListPage'));
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AreasPage = lazy(() => import('./pages/AreasPage'));
const TenantsPage = lazy(() => import('./pages/TenantsPage'));
const LandlordsPage = lazy(() => import('./pages/LandlordsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return <div style={{ padding: '4rem 5vw' }}><Skeleton height="400px" /></div>;
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <ScrollProgress />
          <Header />
          <main>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/properties" element={<PropertyListPage />} />
                <Route path="/properties/:slug" element={<PropertyDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/areas" element={<AreasPage />} />
                <Route path="/tenants" element={<TenantsPage />} />
                <Route path="/landlords" element={<LandlordsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <BackToTop />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
`);

write('vercel.json', `{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "src": "/assets/(.*)", "headers": { "cache-control": "public, max-age=31536000, immutable" }, "dest": "/assets/\\$1" },
    { "src": "/images/(.*)", "headers": { "cache-control": "public, max-age=604800" }, "dest": "/images/\\$1" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
`);

write('public/robots.txt', `User-agent: *
Allow: /
Sitemap: https://city-properties-theta.vercel.app/sitemap.xml
`);

write('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://city-properties-theta.vercel.app/</loc><priority>1.0</priority></url>
  <url><loc>https://city-properties-theta.vercel.app/properties</loc><priority>0.9</priority></url>
  <url><loc>https://city-properties-theta.vercel.app/areas</loc><priority>0.8</priority></url>
  <url><loc>https://city-properties-theta.vercel.app/about</loc><priority>0.7</priority></url>
  <url><loc>https://city-properties-theta.vercel.app/contact</loc><priority>0.7</priority></url>
  <url><loc>https://city-properties-theta.vercel.app/tenants</loc><priority>0.6</priority></url>
  <url><loc>https://city-properties-theta.vercel.app/landlords</loc><priority>0.6</priority></url>
</urlset>
`);
