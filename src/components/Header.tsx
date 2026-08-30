'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeContext';
import LogoForDark from '../assets/Logos/Logo_mixed_BLACK.svg';
import LogoForLight from '../assets/Logos/Logo_mixed_WHITE.svg';

const NAV_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'About Me', href: '#about' },
  { name: 'Projects/Skills', href: '#skills' },
  { name: 'Exp.', href: '#exp' },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-6xl px-5 py-6">
      <nav className="flex items-center justify-between">
        <Link href="#home" className="flex items-center gap-2 group">
          <Image
            src={theme === 'dark' ? LogoForDark : LogoForLight}
            alt="JM"
            className="h-8 w-8 object-contain transition-transform group-hover:scale-110"
          />
          <span className="text-xl font-bold tracking-tight text-ink">
            JuanMa<span className="text-accent">.</span>
          </span>
        </Link>

        <div className="hidden gap-2 rounded-full border border-ink/10 bg-surface/70 p-1 shadow-sm backdrop-blur md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm transition ${
                  isActive
                    ? 'bg-muted/15 text-accent-light'
                    : 'text-muted hover:bg-ink/5 hover:text-ink'
                }`}
              >
                {item.name}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 rounded-full border border-ink/10 bg-surface px-3 py-2 text-sm font-medium text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-accent/40"
        >
          <span className={`h-2.5 w-2.5 rounded-full ${theme === 'dark' ? 'bg-accent' : 'bg-amber-400'}`} />
          {theme === 'dark' ? 'Dark' : 'Light'}
        </button>
      </nav>
    </header>
  );
}
