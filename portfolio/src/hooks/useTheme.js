import { useState, useEffect } from 'react';

/**
 * useTheme
 * Manages light/dark mode via localStorage + class on <html>.
 * Default: 'dark' (Editorial Dark theme).
 *
 * @returns {{ theme: string, toggleTheme: function }}
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
