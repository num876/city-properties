import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function GlassCard({ children, className, style, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={className}
      onClick={onClick}
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(76,87,244,0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: 'var(--color-card-bg)',
        borderRadius: '14px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
