import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Skill {
  id: string;
  name: string;
  level: string | null | undefined;
}

interface ProfileSkillsProps {
  skills: Skill[];
}

const EXPERTISE_COLORS: Record<string, string> = {
  BEGINNER: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  INTERMEDIATE: 'bg-blue-100 text-blue-700 border-blue-200',
  EXPERT: 'bg-amber-100 text-amber-700 border-amber-200',
};

export default function ProfileSkills({ skills }: ProfileSkillsProps) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="font-mono text-xs uppercase tracking-widest opacity-60">
        / Skills & Expertise
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <div
            key={skill.id}
            className={cn(
              'group inline-flex items-center gap-2 px-4 py-2 rounded-none font-mono text-[10px] uppercase tracking-widest border transition-all duration-300',
              EXPERTISE_COLORS[skill.level || 'INTERMEDIATE'] ||
                EXPERTISE_COLORS['INTERMEDIATE']
            )}
            style={{
              animationDelay: `${index * 30}ms`,
            }}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3 opacity-60" />
              {skill.name}
            </span>
            <span className="opacity-60">·</span>
            <span className="opacity-80">{skill.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
