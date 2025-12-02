'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'dark' }: ThemeProviderProps) {
  // initialize state with defaultTheme (so provider can be present immediately)
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Only perform DOM/localStorage operations inside effects
  useEffect(() => {
    setMounted(true);

    // safe access to localStorage
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (savedTheme) {
        setThemeState(savedTheme);
      } else if (systemPrefersDark) {
        setThemeState('dark');
      } else {
        setThemeState('light');
      }
    } catch (err) {
      // localStorage may throw in some privacy modes — silently ignore and keep default
      // console.warn('ThemeProvider: localStorage unavailable', err);
    }

    // listen for system changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // handle both modern and older API
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // only change if user hasn't set a manual preference
      if (!localStorage.getItem('theme')) {
        const matches = 'matches' in e ? e.matches : (e as MediaQueryList).matches;
        setThemeState(matches ? 'dark' : 'light');
      }
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange as EventListener);
    } else if (typeof (mediaQuery as any).addListener === 'function') {
      // fallback for older browsers
      (mediaQuery as any).addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleChange as EventListener);
      } else if (typeof (mediaQuery as any).removeListener === 'function') {
        (mediaQuery as any).removeListener(handleChange);
      }
    };
  }, []);

  // DOM updates (attribute/meta/localStorage) on theme change — only when mounted
  useEffect(() => {
    if (!mounted) return;

    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0f' : '#f8f9fa');
      }
    } catch (err) {
      // ignore DOM/localStorage errors
      // console.warn('ThemeProvider: DOM update failed', err);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme,
  };

  // Always return provider immediately (so children can safely call useTheme).
  // If you want to prevent FOUC, add CSS that hides content until the 'data-theme' attribute is set,
  // or use a small client-side loader inside children — but don't render children outside the provider.
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
