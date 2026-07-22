'use client';

import { useRouter } from 'next/navigation';
import { AlertCircle, FileText, User } from 'lucide-react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function OnboardingChoiceWrapper() {
  const router = useRouter();
  const resumeUploadEnabled =
    process.env.NEXT_PUBLIC_RESUME_UPLOAD_ENABLED === 'true';

  const handleManualOnboarding = () => {
    router.push('/onboarding/creative/manual');
  };

  const handleResumeUpload = () => {
    if (!resumeUploadEnabled) {
      toast.error(
        'Resume upload feature is temporarily disabled. Please complete onboarding manually.'
      );
      return;
    }

    router.push('/onboarding/creative/upload');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-4xl p-8 md:p-16">
        <CardHeader className="border-b border-border pb-12 mb-12 space-y-4">
          <div className="font-mono text-[11px] uppercase tracking-widest opacity-60">
            /01 — Setup Profile
          </div>

          <CardTitle className="font-display text-5xl md:text-7xl leading-none tracking-normal">
            Complete Your Profile
          </CardTitle>

          <CardDescription className="font-editorial text-xl text-foreground opacity-70 max-w-lg pt-2">
            Choose how you'd like to set up your creative presence on the
            platform.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              role="button"
              tabIndex={0}
              onClick={handleManualOnboarding}
              className="group relative w-full overflow-hidden p-6 md:p-8 text-left transition-colors cursor-pointer"
            >
              <span className="absolute inset-0 translate-y-full bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />

              <div className="relative z-10 flex flex-col h-full justify-between transition-colors duration-500 group-hover:text-background gap-8">
                <User className="w-6 h-6 opacity-70" />
                <div>
                  <CardTitle className="text-3xl mb-2">Manual Setup</CardTitle>
                  <CardDescription className="group-hover:text-background/70">
                    Fill in your profile details manually
                  </CardDescription>
                </div>
              </div>
            </Card>

            <Card
              role="button"
              tabIndex={0}
              onClick={handleResumeUpload}
              className={`group relative w-full overflow-hidden p-6 md:p-8 text-left transition-colors ${
                resumeUploadEnabled
                  ? 'cursor-pointer'
                  : 'pointer-events-none opacity-60 border border-border/60'
              }`}
            >
              <span className="absolute inset-0 translate-y-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />

              <div className="relative z-10 flex flex-col h-full justify-between transition-colors duration-500 group-hover:text-primary-foreground gap-8">
                <FileText className="w-6 h-6 opacity-70" />
                <div>
                  <CardTitle className="text-3xl mb-2">Upload Resume</CardTitle>
                  <CardDescription className="group-hover:text-primary-foreground/70">
                    Let us extract your details automatically
                  </CardDescription>
                </div>
              </div>
            </Card>
          </div>

          {!resumeUploadEnabled && (
            <div className="mt-8 flex gap-4 border border-border bg-foreground/3 p-6">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 opacity-70" />
              <div className="space-y-2">
                <div className="font-mono text-[11px] uppercase tracking-widest opacity-60">
                  Temporarily unavailable
                </div>
                <p className="text-sm leading-relaxed">
                  <span className="text-foreground">
                    Resume upload is currently unavailable.
                  </span>{' '}
                  <span className="text-foreground/70">
                    Please complete your profile manually using the form option
                    above. We're working to bring this feature back soon.
                  </span>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
