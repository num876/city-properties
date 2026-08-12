import { motion } from 'framer-motion';

interface IconFeatureProps {
  icon: string;
  title: string;
  body: string;
}

export default function IconFeature({ icon, title, body }: IconFeatureProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: 'var(--color-surface)',
        borderRadius: '14px',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid var(--color-border)',
      }}
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #4C57F4, #20A6E8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.6rem',
          margin: '0 auto 1rem',
        }}
      >
        {icon}
      </motion.div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
        {body}
      </p>
    </motion.div>
  );
}
