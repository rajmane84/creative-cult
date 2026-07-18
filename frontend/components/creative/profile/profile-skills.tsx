import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Skill {
  id: string;
  name: string;
  level: string;
}

interface ProfileSkillsProps {
  skills: Skill[];
}

const EXPERTISE_COLORS: Record<string, string> = {
  BEGINNER:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  INTERMEDIATE:
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  EXPERT:
    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
};

export default function ProfileSkills({ skills }: ProfileSkillsProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        Skills & Expertise
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
              EXPERTISE_COLORS[skill.level] || EXPERTISE_COLORS['INTERMEDIATE']
            )}
          >
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 opacity-70" />
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
