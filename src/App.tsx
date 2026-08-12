import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './design/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Skeleton from './components/Skeleton';

const HomePage = lazy(() => import('./pages/HomePage'));
const PropertyListPage = lazy(() => import('./pages/PropertyListPage'));
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AreasPage = lazy(() => import('./pages/AreasPage'));
const TenantsPage = lazy(() => import('./pages/TenantsPage'));
const LandlordsPage = lazy(() => import('./pages/LandlordsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return <div style={{ padding: '4rem 5vw' }}><Skeleton height="400px" /></div>;
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <ScrollProgress />
          <Header />
          <main>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/properties" element={<PropertyListPage />} />
                <Route path="/properties/:slug" element={<PropertyDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/areas" element={<AreasPage />} />
                <Route path="/tenants" element={<TenantsPage />} />
                <Route path="/landlords" element={<LandlordsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <BackToTop />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}
