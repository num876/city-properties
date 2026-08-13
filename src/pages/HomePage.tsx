import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import FeaturedProperties from '../components/FeaturedProperties';
import StatsCounter from '../components/StatsCounter';
import BentoFeatureGrid from '../components/BentoFeatureGrid';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import AreasSection from '../components/AreasSection';
import CTABanner from '../components/CTABanner';

const STATS = [
  { value: 250, suffix: '+', label: 'Properties Managed', icon: '🏠', description: 'Across Oxford\'s most sought-after neighbourhoods' },
  { value: 15, suffix: ' yrs', label: 'Industry Experience', icon: '🏆', description: 'Trusted letting experts since 2009' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', icon: '⭐', description: 'Based on 500+ verified client reviews' },
  { value: 12, suffix: 'k+', label: 'Happy Tenants', icon: '👥', description: 'Tenants placed in their perfect Oxford home' },
];





export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>City Properties – Letting & Management in Oxford</title>
        <meta name="description" content="Oxford's premier letting and property management agency. Find your perfect home with City Properties." />
        <meta property="og:title" content="City Properties – Letting & Management in Oxford" />
        <meta property="og:description" content="Oxford's premier letting and property management agency. 250+ properties, 15 years of experience." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Hero />

      <StatsCounter stats={STATS} />

      <FeaturedProperties />

      <BentoFeatureGrid />

      <TestimonialsCarousel />

      <AreasSection />

      <CTABanner />
    </>
  );
}
