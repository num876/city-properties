// src/pages/ContactPage.tsx
import { Helmet } from 'react-helmet-async';
import { colors, spacing, fonts } from '../design/tokens';

function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact – City Properties Oxford</title>
        <meta name="description" content="Get in touch with City Properties for letting and management enquiries in Oxford." />
      </Helmet>
      <section style={{ padding: spacing.lg, fontFamily: fonts.body, color: colors.text }}>
        <h1 style={{ fontFamily: fonts.heading, color: colors.primary }}>Contact Us</h1>
        <p>Phone: <a href="tel:+441234567890" style={{ color: colors.secondary }}>+44 1234 567 890</a></p>
        <p>Email: <a href="mailto:info@cityproperties-oxford.co.uk" style={{ color: colors.secondary }}>info@cityproperties-oxford.co.uk</a></p>
        <p>Address: 123 High Street, Oxford OX1 1AA, United Kingdom</p>
        <p>We are happy to answer any questions you have about our services.</p>
      </section>
    </>
  );
}

export default ContactPage;
