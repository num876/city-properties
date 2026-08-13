import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../design/theme';
import SearchModal from './SearchModal';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/students', label: 'Students' },
  { to: '/areas', label: 'Areas' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  // Detect scroll for dynamic pill sizing/opacity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modals on route change
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Global search shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Floating Pill Header Wrapper */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '15px 20px' : '25px 20px',
          transition: 'padding 0.3s ease',
          pointerEvents: 'none', // allow clicking through empty space
        }}
      >
        <header
          style={{
            pointerEvents: 'auto',
            margin: '0 auto',
            maxWidth: '1200px',
            height: '70px',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.5rem',
            background: isDark
              ? 'rgba(10,10,30,0.7)'
              : 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.5)',
            boxShadow: isDark
              ? '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
              : '0 10px 40px rgba(76,87,244,0.1), inset 0 1px 0 rgba(255,255,255,1)',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2 }}>
            <motion.img
              src="/images/logo.jpg"
              alt="City Properties"
              whileHover={{ scale: 1.05 }}
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-text)', letterSpacing: '-0.3px', display: 'none' }} className="logo-text">
              City Properties
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="desktop-nav"
            style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', position: 'relative' }}
            onMouseLeave={() => setHoveredPath(null)}
          >
            {NAV_LINKS.map(({ to, label }) => {
              const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
              return (
                <Link
                  key={to}
                  to={to}
                  onMouseEnter={() => setHoveredPath(to)}
                  style={{
                    position: 'relative',
                    textDecoration: 'none',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '100px',
                    fontSize: '0.9rem',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? (isDark ? '#fff' : '#4C57F4') : 'var(--color-text)',
                    zIndex: 2,
                    transition: 'color 0.2s',
                  }}
                >
                  {label}
                  {hoveredPath === to && (
                    <motion.div
                      layoutId="nav-pill"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(76,87,244,0.08)',
                        borderRadius: '100px',
                        zIndex: -1,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Mega Menu Trigger */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => { setHoveredPath('services'); setServicesOpen(true); }}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                style={{
                  position: 'relative',
                  background: 'transparent',
                  border: 'none',
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.9rem',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  zIndex: 2,
                }}
              >
                Services <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ fontSize: '0.7rem' }}>▼</motion.span>
                {hoveredPath === 'services' && (
                  <motion.div
                    layoutId="nav-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(76,87,244,0.08)',
                      borderRadius: '100px',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 15px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: isDark ? 'rgba(15,15,35,0.95)' : 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '20px',
                      padding: '1.5rem',
                      width: '400px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1rem',
                      zIndex: 110,
                    }}
                  >
                    {/* Column 1 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)', fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: '0.5rem' }}>For Tenants</p>
                      <MenuLink to="/tenants" icon="👥" title="Tenants Guide" />
                      <MenuLink to="/maintenance" icon="🔧" title="Report Repair" />
                      <MenuLink to="/students" icon="🎓" title="Student Hub" />
                    </div>
                    {/* Column 2 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)', fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: '0.5rem' }}>For Landlords</p>
                      <MenuLink to="/landlords" icon="🔑" title="Management" />
                      <MenuLink to="/contact" icon="📈" title="Free Valuation" />
                      <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                        <Link to="/properties" onClick={() => setServicesOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(90deg, #4C57F4, #20A6E8)', color: '#fff', textDecoration: 'none', padding: '0.5rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                          View All Lets →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 2 }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                border: '1px solid var(--color-border)',
                borderRadius: '100px',
                padding: '0.4rem 0.8rem',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem'
              }}
            >
              <span style={{ fontSize: '1rem' }}>🔍</span>
              <span className="desktop-only">Search...</span>
              <span className="desktop-only" style={{ background: 'var(--color-bg)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600, marginLeft: '0.5rem' }}>⌘K</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: 'transparent', border: 'none', color: 'var(--color-text)',
                cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              {isDark ? '☀' : '☾'}
            </motion.button>

            {/* Mobile Hamburger Trigger */}
            <motion.button
              className="hamburger"
              onClick={() => setMenuOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'none', width: '38px', height: '38px', borderRadius: '50%',
                background: 'var(--color-text)', border: 'none', color: 'var(--color-bg)',
                cursor: 'pointer', fontSize: '1.2rem', alignItems: 'center', justifyContent: 'center'
              }}
            >
              ☰
            </motion.button>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="desktop-nav">
              <Link
                to="/properties"
                style={{
                  textDecoration: 'none',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '100px',
                  fontSize: '0.9rem',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  color: '#fff',
                  background: 'linear-gradient(135deg, #4C57F4, #20A6E8)',
                  boxShadow: '0 4px 15px rgba(76,87,244,0.3)',
                  display: 'inline-block',
                }}
              >
                Book Viewing
              </Link>
            </motion.div>
          </div>
        </header>
      </div>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'var(--color-bg)',
              display: 'flex', flexDirection: 'column',
              padding: '2rem',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.5rem', color: 'var(--color-text)' }}>Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.1)', border: '1px solid var(--color-border)', color: 'var(--color-text)',
                  width: '40px', height: '40px', borderRadius: '50%', fontSize: '1.5rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              {NAV_LINKS.map(({ to, label }, i) => (
                <motion.div key={to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link to={to} onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--color-text)', fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                    {label}
                  </Link>
                </motion.div>
              ))}
              
              <div style={{ width: '100%', height: '1px', background: 'var(--color-border)', margin: '1rem 0' }} />
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                 <Link to="/tenants" onClick={() => setMenuOpen(false)} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>Tenants Guide</Link>
                 <Link to="/landlords" onClick={() => setMenuOpen(false)} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>Landlords Hub</Link>
                 <Link to="/maintenance" onClick={() => setMenuOpen(false)} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>Report Issue</Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: '2rem' }}>
              <Link to="/properties" onClick={() => setMenuOpen(false)} style={{ display: 'block', textAlign: 'center', background: '#4C57F4', color: '#fff', textDecoration: 'none', padding: '1rem', borderRadius: '12px', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1.1rem' }}>
                View All Properties
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 950px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .desktop-only { display: none !important; }
        }
        @media (min-width: 600px) {
          .logo-text { display: block !important; }
        }
      `}</style>
    </>
  );
}

function MenuLink({ to, icon, title }: { to: string, icon: string, title: string }) {
  const { isDark } = useTheme();
  return (
    <Link to={to} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem', borderRadius: '10px', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(76,87,244,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>{icon}</div>
      <span style={{ color: 'var(--color-text)', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', fontWeight: 500 }}>{title}</span>
    </Link>
  );
}
