// src/pages/HomePage.tsx
import { Helmet } from 'react-helmet-async';
import { colors, spacing, fonts } from '../design/tokens';
import heroImg from '../assets/hero.png';

const sectionStyle: React.CSSProperties = {
  backgroundImage: `url(${heroImg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '70vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.white,
  textShadow: '0 2px 4px rgba(0,0,0,0.6)',
  padding: spacing.lg,
  fontFamily: fonts.heading,
};

function HomePage() {
  return (
    <>
      <Helmet>
        <title>City Properties – Letting & Management in Oxford</title>
        <meta name="description" content="Premium letting and property management services in Oxford. Find your next home with City Properties." />
      </Helmet>
      <section style={sectionStyle}>
        <h1>Find a house, find your home.</h1>
      </section>
    </>
  );
}

export default HomePage;
