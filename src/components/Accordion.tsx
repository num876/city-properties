import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItem {
  question: string;
  answer: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            border: '1px solid rgba(76,87,244,0.15)',
            borderRadius: '10px',
            overflow: 'hidden',
            background: 'var(--color-surface)',
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '1rem 1.25rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--color-text)',
            }}
          >
            {item.question}
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: '1.4rem', lineHeight: 1, color: '#4C57F4' }}
            >
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  style={{
                    padding: '0 1.25rem 1rem',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.7,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
