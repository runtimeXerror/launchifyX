'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextValue {
  dark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default to dark (matches <html data-theme="dark">) to avoid hydration mismatch.
  const [dark, setDark] = useState(true);

  // Load the saved preference after mount.
  useEffect(() => {
    const saved = localStorage.getItem('lx-theme');
    if (saved) setDark(saved === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('lx-theme', dark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
