'use client';

import { useTheme } from '../ThemeContext';
import { ProfileCard } from './ProfileCard';
import { PhotoGallery } from './PhotoGallery';

export function AboutMeSection() {
  const { theme } = useTheme();

  return (
    <section
      id="about"
      className={`px-5 py-24 transition-colors ${
        theme === 'dark' ? 'bg-[#0B0F19] text-white' : 'bg-[#FFF5EB] text-[#0F172A]'
      }`}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <ProfileCard />

        <div>
          <h3 className="text-xl font-semibold">A Few Things I Love</h3>
          <p className="mt-2 text-sm opacity-60">Here are some of the things that bring me joy outside of coding.</p>
          <div className="mt-6">
            <PhotoGallery />
          </div>
        </div>
      </div>
    </section>
  );
}
