'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { GalleryItem } from '../../data/about';

interface GalleryCardProps {
  item: GalleryItem;
}

export function GalleryCard({ item }: GalleryCardProps) {
  const [active, setActive] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setActive((prev) => !prev)}
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-accent/20 text-left transition hover:border-accent/50"
    >
      <Image
        src={item.imageSrc}
        alt={item.title}
        placeholder="blur"
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className={`object-cover transition-transform duration-300 ${
          active ? 'scale-105' : 'group-hover:scale-105'
        }`}
      />

      <div
        className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 opacity-0 transition-opacity duration-300 ${
          active ? 'opacity-100' : 'group-hover:opacity-100'
        }`}
      >
        <span className="font-mono text-xs uppercase tracking-wide text-accent-light">{item.category}</span>
        <span className="mt-1 text-sm font-semibold text-white">{item.title}</span>
        <span className="mt-1 text-xs leading-5 text-white/70">{item.description}</span>
      </div>
    </button>
  );
}
