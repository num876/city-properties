import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet><title>Page Not Found – City Properties Oxford</title></Helmet>
      <section style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 5vw', background: 'var(--color-bg)' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ fontSize: '6rem', marginBottom: '1rem' }}>🏚</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text)', marginBottom: '1rem' }}>Page Not Found</motion.h1>
        <p style={{ color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', marginBottom: '2rem' }}>Sorry, the page you are looking for doesn't exist or has been moved.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/')}
            style={{ padding: '0.85rem 2rem', background: 'linear-gradient(90deg,#4C57F4,#20A6E8)', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '1rem' }}
          >
            Go Home
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/properties')}
            style={{ padding: '0.85rem 2rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '10px', color: 'var(--color-text)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '1rem' }}
          >
            Browse Properties
          </motion.button>
        </div>
      </section>
    </>
  );
}
