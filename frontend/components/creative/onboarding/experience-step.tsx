'use client';

import ExperienceFormSection from '@/components/creative/profile/experience-form-section';
import { Experience } from '@/validations/creative/experience';

interface ExperienceStepProps {
  experiences: Experience[];
  onExperienceChange: (experiences: Experience[]) => void;
}

export default function ExperienceStep({
  experiences,
  onExperienceChange,
}: ExperienceStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-10 space-y-2">
        <h3 className="font-display text-4xl text-foreground leading-none tracking-normal">
          Add Your Experience
        </h3>
        <p className="font-editorial text-lg text-foreground opacity-70">
          Show clients the work history behind your craft
        </p>
      </div>

      <ExperienceFormSection
        experiences={experiences}
        onChange={onExperienceChange}
      />
    </div>
  );
}
