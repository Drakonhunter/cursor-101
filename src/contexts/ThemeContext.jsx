import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    background: '#1a1a1a',
    containerBg: '#2a2a2a',
    sidebarBg: '#333333',
    inputBg: '#2a2a2a',
    border: '#404040',
    borderHover: '#505050',
    text: '#e0e0e0',
    textSecondary: '#b0b0b0',
    textMuted: '#808080',
    hoverBg: '#3a3a3a',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
  light: {
    background: '#f5f5f5',
    containerBg: '#ffffff',
    sidebarBg: '#f8f9fa',
    inputBg: '#ffffff',
    border: '#e0e0e0',
    borderHover: '#c0c0c0',
    text: '#2a2a2a',
    textSecondary: '#606060',
    textMuted: '#909090',
    hoverBg: '#f0f0f0',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const theme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme: () => setIsDark(!isDark) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
