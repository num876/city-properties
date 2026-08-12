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
        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', pointerEvents: 'none' }}>🔍</span>
        <input
          type="text"
          placeholder="Search by area, type, keyword…"
          value={term}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.75rem 1rem 0.75rem 2.8rem',
            fontSize: '0.95rem',
            fontFamily: "'Inter', sans-serif",
            border: '1px solid rgba(76,87,244,0.25)',
            borderRadius: '10px',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(76,87,244,0.06)',
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
            padding: '0.75rem 1.25rem',
            background: '#f3f4f6',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            color: '#374151',
          }}
        >
          Clear
        </motion.button>
      )}
    </motion.div>
  );
}
