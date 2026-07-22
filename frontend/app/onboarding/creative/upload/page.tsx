import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/session';
import { UserRole } from '@/types';
import { CreativeResumeUploadForm } from '@/components/auth/creative-resume-upload-form';

export default async function CreativeResumeUpload() {
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

  // Check if resume upload feature is enabled
  const resumeUploadEnabled =
    process.env.NEXT_PUBLIC_RESUME_UPLOAD_ENABLED === 'true';
  if (!resumeUploadEnabled) {
    redirect('/onboarding/creative');
  }

  return <CreativeResumeUploadForm />;
}
