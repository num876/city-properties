// src/pages/HomePage.tsx
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>City Properties - Letting and Management in Oxford</title>
        <meta name="description" content="Premium letting and property management services in Oxford. Find your next home with City Properties." />
      </Helmet>
      <Hero />
    </>
  );
}
