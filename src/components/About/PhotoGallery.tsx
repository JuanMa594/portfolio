'use client';

import { GALLERY_ITEMS } from '../../data/about';
import { GalleryCard } from './GalleryCard';

export function PhotoGallery() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {GALLERY_ITEMS.map((item) => (
        <GalleryCard key={item.id} item={item} />
      ))}
    </div>
  );
}
