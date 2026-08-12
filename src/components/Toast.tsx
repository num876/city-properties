import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  visible: boolean;
  onClose: () => void;
}

const colors: Record<string, string> = {
  success: '#10b981',
  error: '#ef4444',
  info: '#4C57F4',
};

export default function Toast({ message, type = 'success', visible, onClose }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onClose, 3500);
      return () => clearTimeout(t);
    }
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          style={{
            position: 'fixed',
            bottom: '5rem',
            right: '2rem',
            zIndex: 9998,
            background: colors[type],
            color: '#fff',
            padding: '0.75rem 1.25rem',
            borderRadius: '10px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '0.9rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            maxWidth: '300px',
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
