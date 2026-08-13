import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DEMO_PROPERTIES, STUDENT_PROPERTIES } from '../data/properties';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const allProperties = [...DEMO_PROPERTIES, ...STUDENT_PROPERTIES];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // In a real app we'd dispatch an event, but here we assume the parent handles it 
          // or we handle state locally if it was fully decoupled.
          // Since the parent manages `isOpen`, we just handle Esc here.
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm('');
    }
  }, [isOpen]);

  const results = searchTerm
    ? allProperties.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.type?.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const handleSelect = (slug: string) => {
    onClose();
    navigate(`/properties/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          paddingTop: '10vh'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          style={{
            width: '90%', maxWidth: '640px',
            background: 'var(--color-surface)',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            display: 'flex', flexDirection: 'column'
          }}
        >
          {/* Search Input Area */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '1.4rem', color: '#4C57F4', marginRight: '1rem' }}>🔍</span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search properties, areas, or keywords..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                color: 'var(--color-text)', fontSize: '1.2rem', fontFamily: "'Inter', sans-serif"
              }}
            />
            <button
              onClick={onClose}
              style={{
                background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '6px',
                padding: '0.2rem 0.5rem', fontSize: '0.7rem', color: 'var(--color-text-muted)', cursor: 'pointer',
                fontFamily: "'Inter', sans-serif", fontWeight: 600
              }}
            >
              ESC
            </button>
          </div>

          {/* Results Area */}
          <div style={{ padding: '1rem', maxHeight: '50vh', overflowY: 'auto' }}>
            {!searchTerm && (
              <div style={{ padding: '1rem', color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif" }}>
                <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', fontWeight: 600 }}>Quick Links</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button onClick={() => { onClose(); navigate('/students'); }} style={quickLinkStyle}>🎓 Student Homes</button>
                  <button onClick={() => { onClose(); navigate('/areas'); }} style={quickLinkStyle}>🗺️ Area Guides</button>
                  <button onClick={() => { onClose(); navigate('/properties'); }} style={quickLinkStyle}>🏠 All Properties</button>
                  <button onClick={() => { onClose(); navigate('/maintenance'); }} style={quickLinkStyle}>🔧 Report Issue</button>
                </div>
              </div>
            )}

            {searchTerm && results.length === 0 && (
              <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif" }}>
                <p>No results found for "{searchTerm}"</p>
              </div>
            )}

            {searchTerm && results.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', padding: '0 0.5rem', color: 'var(--color-text-muted)', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Properties</p>
                {results.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect(p.slug)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem',
                      borderRadius: '10px', cursor: 'pointer', transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src={p.featuredImage?.node.sourceUrl} alt={p.title} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: 'var(--color-text)', fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', margin: '0 0 0.2rem 0' }}>{p.title}</h4>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: 0, fontFamily: "'Inter', sans-serif" }}>{p.type || 'Property'} • {p.bedrooms} Beds</p>
                    </div>
                    <div style={{ color: '#4C57F4', fontWeight: 600, fontFamily: "'Inter', sans-serif", fontSize: '0.9rem' }}>
                      {p.price}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const quickLinkStyle: React.CSSProperties = {
  background: 'var(--color-bg)',
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  padding: '0.5rem 1rem',
  color: 'var(--color-text)',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
};
