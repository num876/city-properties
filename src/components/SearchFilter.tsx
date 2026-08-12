// src/components/SearchFilter.tsx
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { spacing, fonts, colors } from '../design/tokens';
import { motion } from 'framer-motion';

interface SearchFilterProps {
  onSearch: (term: string) => void;
}

const inputStyle: React.CSSProperties = {
  padding: spacing.sm,
  fontSize: '1rem',
  fontFamily: fonts.body,
  border: `1px solid ${colors.overlay}`,
  borderRadius: '4px',
  width: '100%',
  maxWidth: '300px',
};

function SearchFilter({ onSearch }: SearchFilterProps) {
  const [term, setTerm] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);
    onSearch(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ marginBottom: spacing.lg, display: 'flex', justifyContent: 'center' }}
    >
      <input
        type="text"
        placeholder="Search properties…"
        value={term}
        onChange={handleChange}
        style={inputStyle}
        aria-label="Search properties"
      />
    </motion.div>
  );
}

export default SearchFilter;
