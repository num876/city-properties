// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import PropertyListPage from './pages/PropertyListPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './design/theme';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertyListPage />} />
              <Route path="/properties/:slug" element={<PropertyDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
