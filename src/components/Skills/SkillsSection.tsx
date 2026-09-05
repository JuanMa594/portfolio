import { SKILL_CATEGORIES } from '../../data/skills';
import { SkillsCategory } from './SkillsCategory';

export function SkillsSection() {
  return (
    <section id="skills" className="px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold sm:text-4xl">Skills</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          Languages, frameworks and tools I reach for day to day.
        </p>

        <div className="mt-14 flex flex-col gap-14">
          {SKILL_CATEGORIES.map((category) => (
            <SkillsCategory key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
