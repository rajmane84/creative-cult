'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface MultiStepOnboardingProps {
  currentStep: number;
  steps: Step[];
  children: ReactNode;
}

export default function MultiStepOnboarding({
  currentStep,
  steps,
  children,
}: MultiStepOnboardingProps) {
  return (
    <div className="w-full">
      {/* Step Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300',
                    'motion-reduce:transition-none',
                    index < currentStep
                      ? 'bg-primary text-primary-foreground'
                      : index === currentStep
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/10'
                        : 'bg-muted text-muted-foreground'
                  )}
                >
                  {index < currentStep ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      'text-xs font-medium transition-colors duration-200',
                      index === currentStep
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </p>
                  <p
                    className={cn(
                      'text-[10px] text-muted-foreground mt-0.5',
                      index === currentStep ? 'opacity-100' : 'opacity-0'
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-px mx-4 transition-colors duration-300',
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
          ))}
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
