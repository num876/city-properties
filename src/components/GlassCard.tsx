// src/components/GlassCard.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, className, style }: GlassCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(76,87,244,0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: 'rgba(255,255,255,0.9)',
        borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
