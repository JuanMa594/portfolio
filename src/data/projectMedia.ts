import type { StaticImageData } from 'next/image';

import RickYMortyLogo from '../assets/projects/RickYMorty/RickYMorty.jpg';
import RickYMortySidebar from '../assets/projects/RickYMorty/Sidebar.png';
import RickYMortyFilters from '../assets/projects/RickYMorty/Filters.png';
import RickYMortyCharactersGallery from '../assets/projects/RickYMorty/CharactersGallery.png';

import HospitalLogin from '../assets/projects/Hospital/Image1(Login).png';
import HospitalPrincipal from '../assets/projects/Hospital/Image2(Principal).png';
import HospitalInventory from '../assets/projects/Hospital/Image3(Inventory).png';
import HospitalAlerts from '../assets/projects/Hospital/Image4(Alerts).png';
import HospitalSales from '../assets/projects/Hospital/Image5(Sales).png';
import HospitalSuppliers from '../assets/projects/Hospital/Image6(Suppliers).png';

export interface GalleryImage {
  src: StaticImageData;
  caption: string;
}

export interface ProjectMedia {
  /** Small square mark shown in the card header instead of the initial-letter avatar. */
  logo?: StaticImageData;
  gallery?: GalleryImage[];
  /** Shown on the card when the repo was built together with other people. */
  collaborationNote?: string;
}

/**
 * Hand-curated media for specific repos, keyed by the GitHub repo name (FeaturedProject.slug).
 * Repos without an entry here simply render without a logo/gallery/note, as before.
 */
export const PROJECT_MEDIA: Record<string, ProjectMedia> = {
  ProyectoRickYMorty: {
    logo: RickYMortyLogo,
    gallery: [
      { src: RickYMortySidebar, caption: 'Sidebar navigation' },
      { src: RickYMortyFilters, caption: 'Character filters' },
      { src: RickYMortyCharactersGallery, caption: 'Characters gallery' },
    ],
  },
  'Hospital-JM-': {
    collaborationNote: 'Collaborative university project, built together with classmates.',
    gallery: [
      { src: HospitalLogin, caption: 'Login screen' },
      { src: HospitalPrincipal, caption: 'Main dashboard' },
      { src: HospitalInventory, caption: 'Inventory management' },
      { src: HospitalAlerts, caption: 'Stock alerts' },
      { src: HospitalSales, caption: 'Sales module' },
      { src: HospitalSuppliers, caption: 'Suppliers management' },
    ],
  },
};
