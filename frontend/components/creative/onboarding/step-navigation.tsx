'use client';

import { Button } from '@/components/ui/button';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  isSubmitting?: boolean;
  isNextDisabled?: boolean;
  nextLabel?: string;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isSubmitting = false,
  isNextDisabled = false,
  nextLabel = 'Continue',
}: StepNavigationProps) {
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex items-center justify-between pt-6 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="transition-colors duration-300 motion-reduce:transition-none"
      >
        Previous
      </Button>

      <Button
        type={isLastStep ? 'submit' : 'button'}
        onClick={isLastStep ? undefined : onNext}
        disabled={isNextDisabled || isSubmitting}
        className="transition-colors duration-300 motion-reduce:transition-none"
      >
        {isSubmitting
          ? 'Saving...'
          : isLastStep
            ? 'Complete Profile'
            : nextLabel}
      </Button>
    </div>
  );
}
