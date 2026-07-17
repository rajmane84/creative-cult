import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/session';
import { UserRole } from '@/types';
import { CreativeManualOnboardingForm } from '@/components/auth/creative-manual-onboarding-form';

export default async function CreativeManualOnboarding() {
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

  return <CreativeManualOnboardingForm />;
}
