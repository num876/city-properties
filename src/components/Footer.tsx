import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a1e', color: 'rgba(255,255,255,0.7)', padding: '3.5rem 5vw 1.5rem', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: 'linear-gradient(135deg,#4C57F4,#20A6E8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.78rem' }}>CP</div>
            <span style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontWeight: 700, fontSize: '1.05rem' }}>City Properties</span>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.75, maxWidth: '220px' }}>Oxford's premier letting and property management agency since 2009.</p>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Services</h4>
          {[{ to: '/properties', label: 'Properties' }, { to: '/areas', label: 'Area Guides' }, { to: '/tenants', label: 'Tenants' }, { to: '/landlords', label: 'Landlords' }].map(({ to, label }) => (
            <div key={to} style={{ marginBottom: '0.5rem' }}><Link to={to} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.88rem' }}>{label}</Link></div>
          ))}
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Company</h4>
          {[{ to: '/about', label: 'About Us' }, { to: '/contact', label: 'Contact' }].map(({ to, label }) => (
            <div key={to} style={{ marginBottom: '0.5rem' }}><Link to={to} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.88rem' }}>{label}</Link></div>
          ))}
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Contact</h4>
          <p style={{ fontSize: '0.85rem', lineHeight: 2 }}>Oxford, United Kingdom<br /><a href="mailto:info@cityproperties-oxford.co.uk" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>info@cityproperties-oxford.co.uk</a><br /><a href="tel:+441865000000" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>+44 1865 000 000</a></p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem' }}>
        <span>© ${new Date().getFullYear()} City Properties Letting & Management. All rights reserved.</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>ARLA Registered · The Property Ombudsman</span>
      </div>
    </footer>
  );
}
