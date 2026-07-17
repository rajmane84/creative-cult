import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/session';
import { UserRole } from '@/types';
import { OnboardingChoiceWrapper } from '@/components/auth/onboarding-choice-wrapper';

export default async function CreativeOnboardingChoice() {
  const session = await requireRole('CREATIVE');

  if (!session) {
    redirect('/login');
  }

  const user = session.user;

  // Check if user has completed onboarding
  if (user?.creativeProfile?.onboardingCompleted) {
    redirect('/dashboard/creative');
  }

  // Double-check role for security
  if (user.role !== UserRole.CREATIVE) {
    redirect('/dashboard');
  }

  return <OnboardingChoiceWrapper />;
}
