import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AREAS = [
  { name: 'City Centre', slug: 'city-centre', avg: '£1,600 pcm', img: '/images/area-centre.jpg', desc: 'World-class universities, restaurants, and cultural venues on your doorstep.' },
  { name: 'Headington', slug: 'headington', avg: '£1,200 pcm', img: '/images/area-headington.jpg', desc: 'Excellent schools, the John Radcliffe Hospital, and a vibrant local high street.' },
  { name: 'Cowley', slug: 'cowley', avg: '£950 pcm', img: '/images/area-cowley.jpg', desc: "Oxford's most diverse neighbourhood with great transport links and a creative scene." },
  { name: 'Jericho', slug: 'jericho', avg: '£1,450 pcm', img: '/images/area-centre.jpg', desc: 'A bohemian enclave beloved for its independent shops, cafes, and leafy streets.' },
  { name: 'Summertown', slug: 'summertown', avg: '£1,350 pcm', img: '/images/area-headington.jpg', desc: 'An upmarket suburb with beautiful parks, artisan bakeries, and top-rated schools.' },
];

export default function AreasPage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Area Guides – City Properties Oxford</title>
        <meta name="description" content="Explore Oxford's best neighbourhoods for renting. Area guides from City Properties." />
      </Helmet>

      <section style={{ background: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)', padding: '3.5rem 5vw 2.5rem', color: '#fff', textAlign: 'center' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '0.5rem' }}
        >
          Oxford Area Guides
        </motion.h1>
        <p style={{ fontFamily: "'Inter', sans-serif", opacity: 0.9 }}>Explore Oxford's most sought-after neighbourhoods</p>
      </section>

      <section style={{ padding: '3rem 5vw 5rem', background: 'var(--color-bg)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          {AREAS.map((area, i) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => navigate('/areas/' + area.slug)}
              style={{ cursor: 'pointer', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', background: 'var(--color-surface)' }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={area.img} alt={area.name} loading="lazy" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
                <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'linear-gradient(90deg,#4C57F4,#20A6E8)', color: '#fff', padding: '4px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                  {area.avg}
                </span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: 'var(--color-text)', marginBottom: '0.5rem' }}>{area.name}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.65, fontFamily: "'Inter', sans-serif", marginBottom: '0.75rem' }}>{area.desc}</p>
                <p style={{ color: '#4C57F4', fontWeight: 600, fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>Explore {area.name} →</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
