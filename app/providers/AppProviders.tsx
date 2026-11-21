'use client';

import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { dictionary, Lang } from '@/app/i18n/dictionary';
import { CvViewer } from '@/app/components/CvViewer';

type Theme = 'light' | 'dark';

interface AppContextValue {
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: keyof typeof dictionary.en) => string;
  openCv: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// In-memory copy so the toggles still work when localStorage is blocked (private mode...).
const memory: Record<string, string> = {};

const readStorage = (key: string) => {
  try {
    return localStorage.getItem(key) ?? memory[key] ?? null;
  } catch {
    return memory[key] ?? null;
  }
};

const writeStorage = (key: string, value: string) => {
  memory[key] = value;
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: the in-memory value is used */
  }
};

// Preferences live in localStorage; components subscribe through useSyncExternalStore.
// The server snapshot is the default (light, English), so hydration always matches.
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener('storage', cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', cb);
  };
};
const notify = () => listeners.forEach((cb) => cb());

const getTheme = (): Theme => (readStorage('theme') === 'dark' ? 'dark' : 'light');
const getLang = (): Lang => (readStorage('lang') === 'fr' ? 'fr' : 'en');

export function AppProviders({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'light' as Theme);
  const lang = useSyncExternalStore(subscribe, getLang, () => 'en' as Lang);
  const [cvOpen, setCvOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleTheme = useCallback(() => {
    writeStorage('theme', getTheme() === 'dark' ? 'light' : 'dark');
    notify();
  }, []);

  const setLang = useCallback((next: Lang) => {
    writeStorage('lang', next);
    notify();
  }, []);

  const t = useCallback(
    (key: keyof typeof dictionary.en) => dictionary[lang][key] ?? dictionary.en[key],
    [lang]
  );

  return (
    <AppContext.Provider
      value={{ theme, toggleTheme, lang, setLang, t, openCv: () => setCvOpen(true) }}
    >
      {children}
      <CvViewer isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProviders>');
  return ctx;
};
