// src/design/theme.ts
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { colors, spacing, fonts, shadows } from './tokens';

export const lightTheme = {
  colors: {
    background: colors.white,
    text: colors.text,
    primary: colors.primary,
    secondary: colors.secondary,
    cardBg: colors.white,
    overlay: colors.overlay,
  },
  spacing,
  fonts,
  shadows,
};

export const darkTheme = {
  colors: {
    background: '#111111',
    text: colors.white,
    primary: colors.primary,
    secondary: colors.secondary,
    cardBg: '#1e1e1e',
    overlay: colors.overlay,
  },
  spacing,
  fonts,
  shadows,
};

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ProviderProps) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('prefers-dark');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('prefers-dark', JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
