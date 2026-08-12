import { useState, useEffect } from 'react';
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

const MOBILE_EXTRAS = [
  { to: '/tenants', label: 'Tenants Guide' },
  { to: '/landlords', label: 'Landlords' },
];

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to add shadow/blur boost
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 5vw',
          height: '70px',
          background: isDark
            ? scrolled ? 'rgba(8,8,24,0.97)' : 'rgba(10,10,30,0.88)'
            : scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? isDark ? '1px solid rgba(76,87,244,0.2)' : '1px solid rgba(76,87,244,0.12)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? isDark ? '0 4px 30px rgba(0,0,0,0.4)' : '0 4px 30px rgba(76,87,244,0.08)'
            : 'none',
          transition: 'all 0.35s ease',
        }}
      >
        {/* ── Logo ── */}
        <Link
          to="/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '11px' }}
        >
          <motion.div
            whileHover={{ rotate: 8, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4C57F4, #20A6E8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.78rem',
              fontFamily: "'Inter', sans-serif",
              boxShadow: '0 4px 14px rgba(76,87,244,0.4)',
              letterSpacing: '0.5px',
              flexShrink: 0,
            }}
          >
            CP
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--color-text)',
                letterSpacing: '-0.2px',
              }}
            >
              City Properties
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.65rem',
                color: '#4C57F4',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginTop: '2px',
              }}
            >
              Oxford
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav
          aria-label="Main navigation"
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          {NAV_LINKS.map(({ to, label }) => {
            const isActive =
              location.pathname === to ||
              (to !== '/' && location.pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                style={{
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '0.45rem 0.9rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: isActive ? 600 : 450,
                  color: isActive ? '#4C57F4' : 'var(--color-text-muted)',
                  background: isActive
                    ? isDark ? 'rgba(76,87,244,0.12)' : 'rgba(76,87,244,0.07)'
                    : 'transparent',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = isDark
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(76,87,244,0.05)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--color-text)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)';
                  }
                }}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#4C57F4',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Right Controls ── */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(76,87,244,0.06)',
              border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(76,87,244,0.15)',
              color: isDark ? '#fff' : '#4C57F4',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <motion.span
              key={isDark ? 'sun' : 'moon'}
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 30, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {isDark ? '☀' : '☾'}
            </motion.span>
          </motion.button>

          {/* CTA */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/properties"
              style={{
                textDecoration: 'none',
                padding: '0.5rem 1.2rem',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                color: '#fff',
                background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
                boxShadow: '0 2px 12px rgba(76,87,244,0.35)',
                letterSpacing: '0.2px',
                display: 'inline-block',
                transition: 'box-shadow 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              View Properties
            </Link>
          </motion.div>
        </div>

        {/* ── Mobile Hamburger ── */}
        <motion.button
          className="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          whileTap={{ scale: 0.9 }}
          style={{
            display: 'none',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            alignItems: 'center',
            justifyContent: 'center',
            background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(76,87,244,0.07)',
            border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(76,87,244,0.15)',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <motion.div
            animate={menuOpen ? 'open' : 'closed'}
            style={{ position: 'relative', width: '18px', height: '14px' }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                variants={{
                  closed: {
                    rotate: 0,
                    y: i === 0 ? 0 : i === 1 ? 6 : 12,
                    opacity: 1,
                    width: i === 2 ? '12px' : '18px',
                  },
                  open: {
                    rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                    y: i === 0 ? 6 : i === 1 ? 6 : 6,
                    opacity: i === 1 ? 0 : 1,
                    width: '18px',
                  },
                }}
                transition={{ duration: 0.25 }}
                style={{
                  position: 'absolute',
                  left: 0,
                  height: '2px',
                  background: isDark ? '#fff' : '#4C57F4',
                  borderRadius: '2px',
                  transformOrigin: 'center',
                  display: 'block',
                }}
              />
            ))}
          </motion.div>
        </motion.button>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            style={{
              position: 'fixed',
              top: '70px',
              right: 0,
              bottom: 0,
              width: '300px',
              zIndex: 99,
              background: isDark
                ? 'linear-gradient(160deg, #0f0f2e 0%, #1a1a3e 100%)'
                : 'linear-gradient(160deg, #fff 0%, #f8f9ff 100%)',
              borderLeft: '1px solid var(--color-border)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-12px 0 60px rgba(0,0,0,0.18)',
              overflowY: 'auto',
            }}
          >
            {/* Drawer label */}
            <p
              style={{
                fontSize: '0.7rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#4C57F4',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              Navigation
            </p>

            {/* Main links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {NAV_LINKS.map(({ to, label }, i) => {
                const isActive =
                  location.pathname === to ||
                  (to !== '/' && location.pathname.startsWith(to));
                return (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={to}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.8rem 1rem',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: isActive ? 600 : 450,
                        color: isActive ? '#4C57F4' : 'var(--color-text)',
                        background: isActive
                          ? isDark ? 'rgba(76,87,244,0.15)' : 'rgba(76,87,244,0.08)'
                          : 'transparent',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>{label}</span>
                      <span style={{ opacity: 0.4, fontSize: '0.8rem' }}>›</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Divider with label */}
            <p
              style={{
                fontSize: '0.7rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                margin: '1.25rem 0 0.75rem',
              }}
            >
              Services
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {MOBILE_EXTRAS.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (NAV_LINKS.length + i) * 0.05 }}
                >
                  <Link
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      fontSize: '0.95rem',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 450,
                      color: 'var(--color-text-muted)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>{label}</span>
                    <span style={{ opacity: 0.4, fontSize: '0.8rem' }}>›</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom actions */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
              <Link
                to="/properties"
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
                  color: '#fff',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 16px rgba(76,87,244,0.35)',
                }}
              >
                View All Properties
              </Link>
              <button
                onClick={() => { toggleTheme(); setMenuOpen(false); }}
                style={{
                  padding: '0.75rem',
                  background: 'transparent',
                  border: '1px solid var(--color-border)',
                  borderRadius: '10px',
                  color: 'var(--color-text)',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                {isDark ? '☀ Light Mode' : '☾ Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Backdrop ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 98,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
