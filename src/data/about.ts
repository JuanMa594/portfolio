import type { StaticImageData } from 'next/image';

import profile from '../assets/about/profile.png';
import coffee from '../assets/about/coffee.jpeg';
import diving from '../assets/about/diving.jpeg';
import fcBarcelona from '../assets/about/fc-barcelona.jpeg';
import photography from '../assets/about/photography.jpeg';
import piano from '../assets/about/piano.jpeg';
import cine from '../assets/about/cine.jpg';

export interface AboutBio {
  intro: string;
  paragraphs: string[];
}

export const ABOUT_BIO: AboutBio = {
  intro: 'Software & Automation developer passionate about Artificial Intelligence, Process Automation, Digital Transformation, and Cibersecurity',
  paragraphs: [
    'Experienced in developing intelligent applications and AI-powered assistants using Microsoft Copilot Studio, local LLMs, Python, C#, SQL, Power Automate, and Microsoft 365 technologies. I standout for my quick learning, adaptability, and teamwork, and I have a strong interest in continuing to develop technological solutions. I also have advanced English skills.',
    'My passion for technology comes from a genuine curiosity about how things work. I enjoy exploring new tools, understanding the mechanisms behind them, and staying ahead of emerging trends. What motivates me most is the ability to learn continuously and transform new ideas into practical solutions that improve the way people work and collaborate.',
  ],
};

export const PROFILE_TAGS: string[] = ['Full-Stack', 'Automation', 'Problem Solver'];

export const PROFILE_PHOTO: StaticImageData = profile;

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageSrc: StaticImageData;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'diving',
    category: 'Adventure & Exploration',
    title: 'Scuba Diving — Focus & Depth',
    description: 'Diving allows me to explore the underwater world and find peace in the tranquility of the ocean.',
    imageSrc: diving,
  },
  {
    id: 'piano',
    category: 'Music',
    title: 'Piano — Practice & Patience',
    description: 'I enjoy playing the piano and practicing new pieces. It is a great way to relax and focus.',
    imageSrc: piano,
  },
  {
    id: 'photography',
    category: 'Hobby',
    title: 'Photography — Framing the World',
    description: 'I enjoy taking photos and capturing moments that tell a story. Photography allows me to see the world from different perspectives and appreciate the beauty in everyday life.',
    imageSrc: photography,
  },
  {
    id: 'fc-barcelona',
    category: 'Fandom & Sport',
    title: 'FC Barcelona — Passion & Pride',
    description: 'I am a lifelong fan of FC Barcelona. Also, I play football and follow the sport closely.',
    imageSrc: fcBarcelona,
  },
  {
    id: 'coffee',
    category: 'Daily Ritual',
    title: 'Coffee — Fuel for the Craft',
    description: 'Capuccino, Moca, Latte, Espresso, Cold Brew... Every kind of coffee has its own story. I enjoy the ritual of brewing and savoring a good cup of coffee.',
    imageSrc: coffee,
  },
  {
    id: 'cine',
    category: 'Cinema',
    title: 'Cinema — Storytelling & Immersion',
    description: 'I love watching movies and the art of cinema. Nolan´s movies are my favorites.',
    imageSrc: cine,
  },
];
