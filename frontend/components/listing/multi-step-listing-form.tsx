import { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface MultiStepListingFormProps {
  currentStep: number;
  steps: Step[];
  children: ReactNode;
  onStepClick?: (stepIndex: number) => void;
}

export default function MultiStepListingForm({
  currentStep,
  steps,
  children,
  onStepClick,
}: MultiStepListingFormProps) {
  return (
    <div className="w-full">
      {/* Step Progress Indicator */}
      <div className="mb-8">
        <div className="flex w-full">
          {steps.map((step, index) => {
            const isClickable = Boolean(onStepClick);

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onStepClick?.(index)}
                disabled={!isClickable}
                className={cn(
                  'relative flex flex-col items-center flex-1 group focus:outline-none transition-opacity',
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                )}
              >
                <div className="w-full flex items-center justify-center relative h-10">
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'absolute left-[50%] w-full top-1/2 -translate-y-1/2 h-px transition-colors duration-300',
                        index < currentStep ? 'bg-foreground' : 'bg-border'
                      )}
                    />
                  )}
                  <div
                    className={cn(
                      'relative z-10 size-10 rounded-none flex items-center justify-center font-mono text-sm transition-all duration-300 border',
                      'motion-reduce:transition-none',
                      index < currentStep
                        ? cn(
                            'bg-foreground text-background border-foreground selection:text-background selection:bg-primary',
                            isClickable &&
                              'group-hover:bg-primary group-hover:border-primary'
                          )
                        : index === currentStep
                          ? 'bg-foreground text-background border-foreground'
                          : cn(
                              'bg-background text-muted-foreground border-border',
                              isClickable &&
                                'group-hover:border-primary group-hover:text-primary'
                            )
                    )}
                  >
                    {index < currentStep ? (
                      <Check className="size-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                </div>
                <div className="mt-4 text-center px-2">
                  <p
                    className={cn(
                      'text-[11px] font-mono uppercase tracking-widest transition-colors duration-200',
                      isClickable &&
                        'group-hover:text-primary selection:text-background selection:bg-primary',
                      index === currentStep || index < currentStep
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </p>
                  <p
                    className={cn(
                      'text-sm font-editorial transition-colors duration-200 mt-2 max-w-[120px] mx-auto',
                      index === currentStep
                        ? 'text-foreground opacity-70'
                        : 'text-muted-foreground opacity-0'
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div
        className={cn(
          'animate-in fade-in duration-300',
          'motion-reduce:animate-none motion-reduce:transition-none'
        )}
        key={currentStep}
      >
        {children}
      </div>
    </div>
  );
}
