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
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Add Your Skills
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showcase your expertise to help clients find the right match
        </p>
      </div>

      <SkillsSection skills={skills} onChange={onSkillsChange} />
    </div>
  );
}
