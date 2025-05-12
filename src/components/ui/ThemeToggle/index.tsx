import React, { useEffect, useState } from 'react';

const THEME_KEY = 'theme-preference';

type Theme = 'light' | 'dark' | 'system';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  if (theme === 'system') {
    html.classList.remove('dark');
    if (getSystemTheme() === 'dark') html.classList.add('dark');
  } else if (theme === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

const icons = {
  light: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
  ),
  dark: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
  ),
  system: (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>
  ),
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    // On mount, set theme from localStorage or system
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      setTheme('system');
      applyTheme('system');
    }
    // Listen for system theme changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') applyTheme('system');
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  function nextTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light'));
  }

  return (
    <button
      onClick={nextTheme}
      aria-label={`Switch theme (current: ${theme})`}
      className="fixed top-4 right-4 z-[999999] bg-background border border-card-border rounded-full p-3 shadow-lg hover:scale-110 transition-transform cursor-pointer text-text-primary dark:bg-background-dark dark:text-white"
      style={{ isolation: 'isolate' }}
      type="button"
    >
      {icons[theme]}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
} 