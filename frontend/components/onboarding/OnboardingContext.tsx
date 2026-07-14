'use client';

import React, { createContext, useContext, useState } from 'react';

type OnboardingContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  setTotalSteps: (total: number) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(4);

  return (
    <OnboardingContext.Provider
      value={{ currentStep, setCurrentStep, totalSteps, setTotalSteps }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
