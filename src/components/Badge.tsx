import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'neutral';
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: { background: 'linear-gradient(90deg,#4C57F4,#20A6E8)', color: '#fff' },
  success: { background: '#dcfce7', color: '#166534' },
  warning: { background: '#fef9c3', color: '#854d0e' },
  neutral: { background: '#f3f4f6', color: '#374151' },
};

export default function Badge({ children, variant = 'primary' }: BadgeProps) {
  return (
    <span
      style={{
        ...variantStyles[variant],
        padding: '3px 10px',
        borderRadius: '999px',
        fontSize: '0.78rem',
        fontWeight: 600,
        fontFamily: "'Inter', sans-serif",
        letterSpacing: '0.3px',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
}
