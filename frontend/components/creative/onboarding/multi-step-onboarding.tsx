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
        <div className="flex w-full">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative flex flex-col items-center flex-1"
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
                    'relative z-10 w-10 h-10 rounded-none flex items-center justify-center font-mono text-sm transition-all duration-300 border',
                    'motion-reduce:transition-none',
                    index < currentStep
                      ? 'bg-foreground text-background border-foreground'
                      : index === currentStep
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-background text-muted-foreground border-border'
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
              </div>
              <div className="mt-4 text-center px-2">
                <p
                  className={cn(
                    'text-[11px] font-mono uppercase tracking-widest transition-colors duration-200',
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
