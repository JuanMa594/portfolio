import { MainLayout } from '../components/MainLayout';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { AboutDraft } from '../components/AboutDraft';
import { SkillsDraft } from '../components/SkillsDraft';
import { ExperienceDraft } from '../components/ExperienceDraft';

export default function Page() {
  return (
    <MainLayout>
      <Header />
      <Hero />
      <AboutDraft />
      <SkillsDraft />
      <ExperienceDraft />
    </MainLayout>
  );
}
