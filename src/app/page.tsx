import { MainLayout } from '../components/MainLayout';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { AboutMeSection } from '../components/About/AboutMeSection';
import { ProjectsSection } from '../components/Projects/ProjectsSection';
import { SkillsSection } from '../components/Skills/SkillsSection';
import { ExperienceEducationSection } from '../components/Experience/ExperienceEducationSection';

export default function Page() {
  return (
    <MainLayout>
      <Header />
      <Hero />
      <AboutMeSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceEducationSection />
    </MainLayout>
  );
}
