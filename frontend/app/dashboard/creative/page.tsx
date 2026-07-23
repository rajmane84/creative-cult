import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/session';

export default async function CreativeDashboard() {
  const session = await verifySession();
  const user = session?.user;

  // Check if user has completed onboarding
  if (!user?.creativeProfile?.onboardingCompleted) {
    redirect('/onboarding/creative');
  }

  return (
    <div className="min-h-[calc(100vh-64px)]">
      This is creative dashboard page Welcome, {user?.name}
    </div>
  );
}
