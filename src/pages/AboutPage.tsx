// src/pages/AboutPage.tsx
import { Helmet } from 'react-helmet-async';
import { colors, spacing, fonts } from '../design/tokens';

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About – City Properties Oxford</title>
        <meta name="description" content="Learn more about City Properties, Oxford's trusted letting and management agency." />
      </Helmet>
      <section style={{ padding: spacing.lg, fontFamily: fonts.body, color: colors.text }}>
        <h1 style={{ fontFamily: fonts.heading, color: colors.primary }}>About Us</h1>
        <p>
          City Properties has been serving the Oxford community for over a decade, offering premium letting and property management services. Our mission is to match tenants with their ideal homes while providing landlords with peace of mind.
        </p>
        <p>
          We pride ourselves on transparency, responsiveness, and a deep knowledge of the local market.
        </p>
      </section>
    </>
  );
}

export default AboutPage;
