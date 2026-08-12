// Design tokens
export const colors = {
  primary: '#4C57F4',
  secondary: '#20A6E8',
  background: '#F8F9FF',
  surface: '#FFFFFF',
  text: '#1a1a2e',
  textMuted: '#6b7280',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.4)',
  accentLight: '#6A8DFF',
  accentDark: '#2A34B2',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

export const spacing = {
  xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px', '3xl': '64px',
};

export const fonts = {
  heading: "'Playfair Display', serif",
  body: "'Inter', sans-serif",
};

export const shadows = {
  subtle: '0 2px 8px rgba(0,0,0,0.06)',
  card: '0 4px 20px rgba(0,0,0,0.08)',
  elevated: '0 8px 40px rgba(76,87,244,0.15)',
  glow: '0 0 0 3px rgba(76,87,244,0.2)',
};

export const radius = {
  sm: '6px', md: '10px', lg: '14px', xl: '20px', pill: '999px',
};

export const gradients = {
  brand: 'linear-gradient(135deg, #4C57F4 0%, #20A6E8 100%)',
  brandHoriz: 'linear-gradient(90deg, #4C57F4, #20A6E8)',
  hero: 'linear-gradient(90deg, rgba(10,10,30,0.88) 0%, rgba(10,10,30,0.45) 55%, transparent 100%)',
  subtle: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%)',
  dark: 'linear-gradient(135deg, #0a0a1e 0%, #1a1a3e 100%)',
};

export const transitions = {
  fast: 'all 0.15s ease',
  base: 'all 0.25s ease',
  slow: 'all 0.4s ease',
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};
