// src/components/Footer.tsx
import { colors, spacing, fonts } from '../design/tokens';

const footerStyle: React.CSSProperties = {
  backgroundColor: colors.black,
  color: colors.white,
  padding: spacing.md,
  textAlign: 'center',
  fontFamily: fonts.body,
  fontSize: '0.9rem',
};

function Footer() {
  return (
    <footer style={footerStyle}>
      © {new Date().getFullYear()} City Properties Letting & Management. All rights reserved.
    </footer>
  );
}

export default Footer;
