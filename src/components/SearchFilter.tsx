import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { motion } from 'framer-motion';

interface SearchFilterProps {
  onSearch: (term: string) => void;
}

export default function SearchFilter({ onSearch }: SearchFilterProps) {
  const [term, setTerm] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);
    onSearch(value);
  };

  const handleClear = () => { setTerm(''); onSearch(''); };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}
    >
      <div style={{ position: 'relative', flex: 1, maxWidth: '480px' }}>
        <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.25rem', pointerEvents: 'none', opacity: 0.5 }}>🔍</span>
        <input
          type="text"
          placeholder="Search by area, type, keyword…"
          value={term}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '1rem 1.25rem 1rem 3.2rem',
            fontSize: '1.05rem',
            fontFamily: "'Inter', sans-serif",
            border: '2px solid rgba(76,87,244,0.15)',
            borderRadius: '12px',
            background: 'var(--color-bg)',
            color: 'var(--color-text)',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
          aria-label="Search properties"
        />
      </div>
      {term && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClear}
          style={{
            padding: '0.85rem 1.5rem',
            background: 'rgba(76,87,244,0.1)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '0.95rem',
            color: '#4C57F4',
          }}
        >
          Clear
        </motion.button>
      )}
    </motion.div>
  );
}
