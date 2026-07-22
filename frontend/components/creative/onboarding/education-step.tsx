'use client';

import EducationSection from './education-section';
import { Education } from '@/validations/creative/onboarding';

interface EducationStepProps {
  educationList: Education[];
  onEducationChange: (educationList: Education[]) => void;
}

export default function EducationStep({
  educationList,
  onEducationChange,
}: EducationStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-10 space-y-2">
        <h3 className="font-display text-4xl text-foreground leading-none tracking-normal">
          Add Your Education
        </h3>
        <p className="font-editorial text-lg text-foreground opacity-70">
          Showcase your qualifications to help clients verify your background
        </p>
      </div>

      <EducationSection
        educationList={educationList}
        onChange={onEducationChange}
      />
    </div>
  );
}
