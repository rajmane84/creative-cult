import React from 'react';
import { OnboardingProvider } from '@/components/onboarding/OnboardingContext';
import { CreativeLayoutShell } from '@/components/onboarding/CreativeLayoutShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creative Onboarding | Creative Cult',
  description: 'Set up your creative profile.',
};

export default function CreativeOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider>
      <CreativeLayoutShell>{children}</CreativeLayoutShell>
    </OnboardingProvider>
  );
}
