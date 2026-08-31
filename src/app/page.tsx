import { MainLayout } from '../components/MainLayout';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { AboutMeSection } from '../components/About/AboutMeSection';
import { SkillsDraft } from '../components/SkillsDraft';
import { ExperienceDraft } from '../components/ExperienceDraft';

export default function Page() {
  return (
    <MainLayout>
      <Header />
      <Hero />
      <AboutMeSection />
      <SkillsDraft />
      <ExperienceDraft />
    </MainLayout>
  );
}
