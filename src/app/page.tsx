import { MainLayout } from '../components/MainLayout';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { AboutMeSection } from '../components/About/AboutMeSection';
import { ProjectsSection } from '../components/Projects/ProjectsSection';
import { SkillsSection } from '../components/Skills/SkillsSection';
import { ExperienceDraft } from '../components/ExperienceDraft';

export default function Page() {
  return (
    <MainLayout>
      <Header />
      <Hero />
      <AboutMeSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceDraft />
    </MainLayout>
  );
}
