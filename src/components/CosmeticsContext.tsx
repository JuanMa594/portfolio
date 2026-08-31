'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { LogoFontMode } from './logoAssets';

export type AccentVariant = 'default' | 'ice' | 'royal' | 'midnight';

const ACCENT_CYCLE: AccentVariant[] = ['default', 'ice', 'royal', 'midnight'];

interface CosmeticsContextType {
  logoFontMode: LogoFontMode;
  setLogoFontMode: (mode: LogoFontMode) => void;
  accentVariant: AccentVariant;
  cycleAccent: () => AccentVariant;
  reset: () => void;
}

const CosmeticsContext = createContext<CosmeticsContextType | undefined>(undefined);

function applyLogoFontMode(mode: LogoFontMode) {
  document.documentElement.classList.remove('pixel-mode', 'serif-mode');
  if (mode === 'pixel') document.documentElement.classList.add('pixel-mode');
  if (mode === 'serif') document.documentElement.classList.add('serif-mode');
}

function applyAccentVariant(variant: AccentVariant) {
  document.documentElement.classList.remove('accent-ice', 'accent-royal', 'accent-midnight');
  if (variant !== 'default') document.documentElement.classList.add(`accent-${variant}`);
}

export function CosmeticsProvider({ children }: { children: React.ReactNode }) {
  const [logoFontMode, setLogoFontModeState] = useState<LogoFontMode>('normal');
  const [accentVariant, setAccentVariantState] = useState<AccentVariant>('default');

  useEffect(() => {
    const savedMode = localStorage.getItem('cosmetics-mode') as LogoFontMode | null;
    const savedAccent = localStorage.getItem('cosmetics-accent') as AccentVariant | null;

    // localStorage is only reachable client-side, so the persisted state can only be applied post-mount.
    if (savedMode) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLogoFontModeState(savedMode);
      applyLogoFontMode(savedMode);
    }
    if (savedAccent) {
      setAccentVariantState(savedAccent);
      applyAccentVariant(savedAccent);
    }
  }, []);

  const setLogoFontMode = (mode: LogoFontMode) => {
    localStorage.setItem('cosmetics-mode', mode);
    applyLogoFontMode(mode);
    setLogoFontModeState(mode);
  };

  const cycleAccent = () => {
    const next = ACCENT_CYCLE[(ACCENT_CYCLE.indexOf(accentVariant) + 1) % ACCENT_CYCLE.length];
    localStorage.setItem('cosmetics-accent', next);
    applyAccentVariant(next);
    setAccentVariantState(next);
    return next;
  };

  const reset = () => {
    setLogoFontMode('normal');
    localStorage.setItem('cosmetics-accent', 'default');
    applyAccentVariant('default');
    setAccentVariantState('default');
  };

  return (
    <CosmeticsContext.Provider
      value={{ logoFontMode, setLogoFontMode, accentVariant, cycleAccent, reset }}
    >
      {children}
    </CosmeticsContext.Provider>
  );
}

export function useCosmetics() {
  const context = useContext(CosmeticsContext);
  if (context === undefined) {
    throw new Error('useCosmetics must be used within a CosmeticsProvider');
  }
  return context;
}
