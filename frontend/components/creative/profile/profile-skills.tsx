'use client';

import { useState } from 'react';
import { Sparkles, Edit2, Plus, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SkillExpertiseLevel } from '@/types';
import { useUpdateSkills } from '@/hooks/creative/profile';
import { handleApiError } from '@/lib/handle-error';

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

const EXPERTISE_STYLES: Record<string, string> = {
  BEGINNER: 'bg-transparent text-muted-foreground border-border',
  INTERMEDIATE: 'bg-primary/10 text-foreground border-primary/30',
  EXPERT: 'bg-primary text-primary-foreground border-primary',
};

export default function ProfileSkills({ skills }: ProfileSkillsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [selectedExpertise, setSelectedExpertise] =
    useState<SkillExpertiseLevel>(SkillExpertiseLevel.INTERMEDIATE);
  const [isAdding, setIsAdding] = useState(false);
  const { updateSkillsMutation } = useUpdateSkills();

  const localSkills = skills.map((s) => ({
    name: s.name,
    expertise:
      (s.level as SkillExpertiseLevel) || SkillExpertiseLevel.INTERMEDIATE,
  }));

  const handleAddSkill = () => {
    if (skillName.trim().length < 2) return;

    const newSkills = [
      ...localSkills,
      { name: skillName.trim(), expertise: selectedExpertise },
    ];

    updateSkillsMutation.mutate(
      { skills: newSkills },
      {
        onSuccess: () => {
          setSkillName('');
          setSelectedExpertise(SkillExpertiseLevel.INTERMEDIATE);
          setIsAdding(false);
        },
        onError: (error) => {
          handleApiError(error, 'Failed to add skill');
        },
      }
    );
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = localSkills.filter((_, i) => i !== index);
    updateSkillsMutation.mutate(
      { skills: newSkills },
      {
        onError: (error) => {
          handleApiError(error, 'Failed to remove skill');
        },
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

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
              onClick={() => {
                setIsEditing(!isEditing);
                setIsAdding(false);
              }}
              className="h-7 gap-1.5 -mr-2 transition-all duration-200 ease-out hover:bg-muted/80 motion-reduce:transition-none"
            >
              {isEditing ? (
                <>Done</>
              ) : skills.length > 0 ? (
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
          {isEditing ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="skills"
                  className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
                >
                  Skills
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAdding(!isAdding)}
                  className="h-8 gap-1.5 transition-colors duration-200 hover:bg-muted/80 motion-reduce:transition-none"
                >
                  {isAdding ? (
                    <>Cancel</>
                  ) : (
                    <>
                      <Plus className="size-3.5" />
                      Add Skill
                    </>
                  )}
                </Button>
              </div>

              {isAdding && (
                <div
                  className={cn(
                    'space-y-4 p-6 rounded-none border border-border bg-background',
                    'animate-in fade-in slide-in-from-top-4 duration-300 ease-out',
                    'transition-all duration-300 ease-out',
                    'motion-reduce:animate-none motion-reduce:transition-none'
                  )}
                >
                  <div className="space-y-4">
                    <Label
                      htmlFor="skill-name"
                      className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
                    >
                      Skill Name
                    </Label>
                    <Input
                      id="skill-name"
                      type="text"
                      placeholder="e.g., React, Figma, Motion Design"
                      value={skillName}
                      onChange={(e) => setSkillName(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 ease-out"
                      autoFocus
                    />
                  </div>

                  <div className="space-y-4 pt-2">
                    <Label
                      htmlFor="expertise"
                      className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
                    >
                      Expertise Level
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(SkillExpertiseLevel).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setSelectedExpertise(level)}
                          className={cn(
                            'px-4 py-2 rounded-none font-mono text-[10px] uppercase tracking-widest border transition-all duration-200 ease-out',
                            'focus-visible:border-primary focus-visible:ring-0 outline-none cursor-pointer',
                            'motion-reduce:transition-none',
                            selectedExpertise === level
                              ? EXPERTISE_COLORS[level]
                              : 'bg-background text-foreground border-border hover:bg-muted/80'
                          )}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="button"
                      onClick={handleAddSkill}
                      disabled={
                        skillName.trim().length < 2 ||
                        updateSkillsMutation.isPending
                      }
                      className="w-full h-10 gap-1.5 transition-all duration-200 ease-out hover:bg-primary/90 motion-reduce:transition-none"
                      size="sm"
                    >
                      {updateSkillsMutation.isPending ? (
                        <>
                          <Loader2 className="size-3.5 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Plus className="size-3.5" />
                          Add Skill
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {localSkills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {localSkills.map((skill, index) => (
                    <div
                      key={index}
                      className={cn(
                        'group inline-flex items-center gap-2 px-4 py-2 rounded-none font-mono text-[10px] uppercase tracking-widest border border-border',
                        'animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out',
                        'transition-all duration-200 ease-out hover:scale-105 hover:shadow-sm',
                        'motion-reduce:animate-none motion-reduce:transition-none',
                        EXPERTISE_COLORS[skill.expertise]
                      )}
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="size-3 opacity-60" />
                        {skill.name}
                      </span>
                      <span className="opacity-60">·</span>
                      <span className="opacity-80">{skill.expertise}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className={cn(
                          'ml-2 p-1 opacity-50 hover:opacity-100 cursor-pointer',
                          'transition-all duration-200 ease-out hover:scale-110'
                        )}
                        disabled={updateSkillsMutation.isPending}
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {localSkills.length === 0 && !isAdding && (
                <div
                  className={cn(
                    'text-center py-12 px-4 rounded-none border border-dashed border-border',
                    'font-editorial text-lg text-foreground opacity-50',
                    'animate-in fade-in duration-500 ease-out',
                    'transition-colors duration-200 ease-out',
                    'motion-reduce:animate-none motion-reduce:transition-none'
                  )}
                >
                  <Sparkles className="size-6 mx-auto mb-3 opacity-40" />
                  Add your skills to showcase your expertise
                </div>
              )}
            </div>
          ) : skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <div
                  key={skill.id}
                  className={cn(
                    'group inline-flex items-center gap-2 px-4 py-2 rounded-none font-mono text-[10px] uppercase tracking-widest border transition-all duration-200 ease-out hover:scale-105 hover:shadow-sm',
                    'animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out',
                    'motion-reduce:animate-none motion-reduce:transition-none',
                    EXPERTISE_STYLES[skill.level || 'INTERMEDIATE'] ||
                      EXPERTISE_STYLES['INTERMEDIATE']
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
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
            <div className="text-center py-12 px-4 rounded-none border border-dashed border-border font-editorial text-lg text-foreground opacity-50 animate-in fade-in duration-500 ease-out motion-reduce:animate-none">
              <Sparkles className="size-6 mx-auto mb-3 opacity-40" />
              Add your skills to showcase your expertise
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
