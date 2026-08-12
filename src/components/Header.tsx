// src/components/Header.tsx
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../design/theme';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5vw',
        height: '68px',
        background: isDark ? 'rgba(10,10,30,0.9)' : 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: isDark
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
        transition: 'background 0.3s ease',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #4C57F4, #20A6E8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.8rem',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          CP
        </div>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: '1.2rem',
            color: isDark ? '#fff' : '#111',
          }}
        >
          City Properties
        </span>
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {NAV_LINKS.map(({ to, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              style={{
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontFamily: "'Inter', sans-serif",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#4C57F4' : isDark ? 'rgba(255,255,255,0.75)' : '#444',
                position: 'relative',
                paddingBottom: '4px',
                transition: 'color 0.2s',
              }}
            >
              {label}
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
                    borderRadius: '2px',
                  }}
                />
              )}
            </Link>
          );
        })}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          style={{
            padding: '0.4rem 1rem',
            fontSize: '0.85rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(76,87,244,0.08)',
            border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(76,87,244,0.2)',
            borderRadius: '20px',
            color: isDark ? '#fff' : '#4C57F4',
            cursor: 'pointer',
          }}
        >
          {isDark ? 'Light' : 'Dark'}
        </motion.button>
      </nav>
    </header>
  );
}
