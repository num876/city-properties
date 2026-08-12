// src/components/Footer.tsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0a0a1e',
        color: 'rgba(255,255,255,0.7)',
        padding: '3rem 5vw 1.5rem',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '0.75rem',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #4C57F4, #20A6E8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            >
              CP
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.05rem',
              }}
            >
              City Properties
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '240px' }}>
            Oxford's premier letting and property management agency.
          </p>
        </div>

        <div>
          <h4
            style={{
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Navigation
          </h4>
          {(['/', '/properties', '/about', '/contact'] as const).map((to) => (
            <div key={to} style={{ marginBottom: '0.5rem' }}>
              <Link
                to={to}
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                }}
              >
                {to === '/' ? 'Home' : to.slice(1).charAt(0).toUpperCase() + to.slice(2)}
              </Link>
            </div>
          ))}
        </div>

        <div>
          <h4
            style={{
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Contact
          </h4>
          <p style={{ fontSize: '0.88rem', lineHeight: 2 }}>
            Oxford, United Kingdom
            <br />
            <a
              href="mailto:info@cityproperties-oxford.co.uk"
              style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}
            >
              info@cityproperties-oxford.co.uk
            </a>
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.25rem',
          textAlign: 'center',
          fontSize: '0.82rem',
        }}
      >
        © {new Date().getFullYear()} City Properties Letting & Management. All rights reserved.
      </div>
    </footer>
  );
}
