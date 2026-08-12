// src/components/Header.tsx
import { Link } from 'react-router-dom';
import { colors, spacing, fonts } from '../design/tokens';
import { useTheme } from '../design/theme';

const headerStyle: React.CSSProperties = {
  backgroundColor: colors.primary,
  color: colors.white,
  padding: spacing.md,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontFamily: fonts.heading,
};

const navLinkStyle: React.CSSProperties = {
  color: colors.white,
  marginLeft: spacing.sm,
  textDecoration: 'none',
  fontSize: '1rem',
};

const buttonStyle: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.4)',
  color: colors.white,
  padding: `${spacing.xs} ${spacing.sm}`,
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: fonts.body,
  marginLeft: spacing.sm,
};

function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header style={headerStyle}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>City Properties</h1>
      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={navLinkStyle}>Home</Link>
        <Link to="/properties" style={navLinkStyle}>Properties</Link>
        <Link to="/about" style={navLinkStyle}>About</Link>
        <Link to="/contact" style={navLinkStyle}>Contact</Link>
        <button style={buttonStyle} onClick={toggleTheme}>
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>
    </header>
  );
}

export default Header;
