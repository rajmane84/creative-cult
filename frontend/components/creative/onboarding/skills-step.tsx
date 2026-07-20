'use client';

import SkillsSection from './skills-section';
import { Skill } from '@/validations/creative/onboarding';

interface SkillsStepProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
}

export default function SkillsStep({
  skills,
  onSkillsChange,
}: SkillsStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-10 space-y-2">
        <h3 className="font-display text-4xl text-foreground leading-none tracking-normal">
          Add Your Skills
        </h3>
        <p className="font-editorial text-lg text-foreground opacity-70">
          Showcase your expertise to help clients find the right match
        </p>
      </div>

      <SkillsSection skills={skills} onChange={onSkillsChange} />
    </div>
  );
}
