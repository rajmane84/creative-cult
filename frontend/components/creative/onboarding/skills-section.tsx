'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Plus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Skill } from '@/validations/creative/onboarding';
import { SkillExpertiseLevel } from '@/types';

interface SkillsSectionProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
  error?: string;
}

const EXPERTISE_COLORS: Record<string, string> = {
  BEGINNER:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  INTERMEDIATE:
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  EXPERT:
    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
};

export default function SkillsSection({
  skills,
  onChange,
  error,
}: SkillsSectionProps) {
  const [skillName, setSkillName] = useState('');
  const [selectedExpertise, setSelectedExpertise] =
    useState<SkillExpertiseLevel>(SkillExpertiseLevel.INTERMEDIATE);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSkill = () => {
    if (skillName.trim().length < 2) return;

    const newSkill: Skill = {
      name: skillName.trim(),
      expertise: selectedExpertise,
    };

    onChange([...skills, newSkill]);
    setSkillName('');
    setSelectedExpertise(SkillExpertiseLevel.INTERMEDIATE);
    setIsAdding(false);
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    onChange(newSkills);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
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
            'animate-in fade-in duration-300',
            'transition-all duration-300',
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
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
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
                    'px-4 py-2 rounded-none font-mono text-[10px] uppercase tracking-widest border transition-colors duration-300',
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
              disabled={skillName.trim().length < 2}
              className="w-full h-10 gap-1.5 transition-colors duration-300 motion-reduce:transition-none"
              size="sm"
            >
              <Plus className="size-3.5" />
              Add Skill
            </Button>
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={cn(
                'group inline-flex items-center gap-2 px-4 py-2 rounded-none font-mono text-[10px] uppercase tracking-widest border border-border',
                'animate-in fade-in duration-300',
                'transition-colors duration-300',
                'motion-reduce:animate-none motion-reduce:transition-none',
                EXPERTISE_COLORS[skill.expertise]
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
              <span className="opacity-80">{skill.expertise}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className={cn(
                  'ml-2 p-1 opacity-50 hover:opacity-100 cursor-pointer',
                  'transition-opacity duration-300'
                )}
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {skills.length === 0 && !isAdding && (
        <div
          className={cn(
            'text-center py-12 px-4 rounded-none border border-dashed border-border',
            'font-editorial text-lg text-foreground opacity-50',
            'transition-colors duration-300'
          )}
        >
          <Sparkles className="size-6 mx-auto mb-3 opacity-40" />
          Add your skills to showcase your expertise
        </div>
      )}

      {error && (
        <p className="font-mono text-[11px] uppercase tracking-widest text-red-600 mt-2 animate-in fade-in duration-300 motion-reduce:animate-none">
          {error}
        </p>
      )}
    </div>
  );
}
