import type { SkillCategory } from '../../data/skills';
import { SkillItem } from './SkillItem';

interface SkillsCategoryProps {
  category: SkillCategory;
}

export function SkillsCategory({ category }: SkillsCategoryProps) {
  return (
    <div>
      <h3 className="font-mono text-sm uppercase tracking-wide text-accent">{category.title}</h3>
      <div className="mt-3 h-px w-full bg-border" />

      <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-6">
        {category.keys.map((key) => (
          <SkillItem key={key} techKey={key} />
        ))}
      </div>
    </div>
  );
}
