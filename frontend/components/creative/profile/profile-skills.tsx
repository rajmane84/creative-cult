'use client';

import { useState } from 'react';
import { Sparkles, Edit2, Plus } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { EditSkillsDialog } from './edit-skills-dialog';
import { SkillExpertiseLevel } from '@/types';

interface Skill {
  id: string;
  name: string;
  level: string | null | undefined;
}

interface ProfileSkillsProps {
  skills: Skill[];
}

// Visual weight scales with proficiency: Beginner is the lightest touch,
// Expert is the most saturated. A single hue (the brand accent) carries the
// signal so it never reads as a traffic-light status.
const EXPERTISE_STYLES: Record<string, string> = {
  BEGINNER: 'bg-transparent text-muted-foreground border-border',
  INTERMEDIATE: 'bg-primary/10 text-foreground border-primary/30',
  EXPERT: 'bg-primary text-primary-foreground border-primary',
};

export default function ProfileSkills({ skills }: ProfileSkillsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="border-t border-border pt-12 md:pt-16">
      <div className="grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 md:col-span-4">
          <div className="flex items-center justify-between gap-4 sticky top-8">
            <div className="font-mono text-xs uppercase tracking-widest opacity-60">
              / Skills & Expertise
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsEditOpen(true)}
              className="h-7 gap-1.5 -mr-2"
            >
              {skills.length > 0 ? (
                <>
                  <Edit2 className="size-3" />
                  Edit
                </>
              ) : (
                <>
                  <Plus className="size-3" />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8">
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <div
                  key={skill.id}
                  className={cn(
                    'group inline-flex items-center gap-2 px-4 py-2 rounded-none font-mono text-[10px] uppercase tracking-widest border transition-all duration-300',
                    EXPERTISE_STYLES[skill.level || 'INTERMEDIATE'] ||
                      EXPERTISE_STYLES['INTERMEDIATE']
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
          ) : (
            <div className="text-center py-12 px-4 rounded-none border border-dashed border-border font-editorial text-lg text-foreground opacity-50">
              <Sparkles className="size-6 mx-auto mb-3 opacity-40" />
              Add your skills to showcase your expertise
            </div>
          )}
        </div>
      </div>

      <EditSkillsDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        skills={skills.map((s) => ({
          name: s.name,
          expertise:
            (s.level as SkillExpertiseLevel) ||
            SkillExpertiseLevel.INTERMEDIATE,
        }))}
      />
    </div>
  );
}
