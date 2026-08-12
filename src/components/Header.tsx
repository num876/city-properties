import { useState } from 'react';
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

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
