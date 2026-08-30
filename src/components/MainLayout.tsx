import React from 'react';
import { ThemeProvider } from './ThemeContext';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-background text-foreground">
        {children}
      </main>
    </ThemeProvider>
  );
}
