import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { CosmeticsProvider } from './CosmeticsContext';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CosmeticsProvider>
        <main className="min-h-screen bg-background text-foreground">
          {children}
        </main>
      </CosmeticsProvider>
    </ThemeProvider>
  );
}
