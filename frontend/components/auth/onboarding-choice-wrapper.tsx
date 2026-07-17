'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FileText, User } from 'lucide-react';

export function OnboardingChoiceWrapper() {
  const router = useRouter();

  const handleManualOnboarding = () => {
    router.push('/onboarding/creative/manual');
  };

  const handleResumeUpload = () => {
    alert(
      'Resume upload feature coming soon! For now, please complete onboarding manually.'
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose how you'd like to set up your creative profile
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button
            variant="outline"
            className="h-auto p-8 flex flex-col items-center gap-4 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            onClick={handleManualOnboarding}
          >
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <User className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                Manual Setup
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Fill in your profile details manually
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-8 flex flex-col items-center gap-4 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            onClick={handleResumeUpload}
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                Upload Resume
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Let us extract your details automatically
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
