'use client';

import { Button } from '@/components/ui/button';

interface ListingStepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  isSubmitting?: boolean;
  isNextDisabled?: boolean;
  nextLabel?: string;
}

export default function ListingStepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isSubmitting = false,
  isNextDisabled = false,
  nextLabel = 'Continue',
}: ListingStepNavigationProps) {
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-8 pt-8 border-t border-border w-full">
      <Button
        type="button"
        variant="default"
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="w-full sm:w-auto transition-colors duration-300 motion-reduce:transition-none"
      >
        Previous
      </Button>

      <Button
        type={isLastStep ? 'submit' : 'button'}
        onClick={isLastStep ? undefined : onNext}
        disabled={isNextDisabled || isSubmitting}
        className="w-full sm:w-auto shrink-0 transition-colors duration-300 motion-reduce:transition-none"
      >
        {isSubmitting
          ? 'Saving...'
          : isLastStep
            ? 'Publish Listing'
            : nextLabel}
      </Button>
    </div>
  );
}
