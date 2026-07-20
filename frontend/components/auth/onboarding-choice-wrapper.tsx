'use client';

import { useRouter } from 'next/navigation';
import { FileText, User } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
              className="group relative w-full overflow-hidden p-6 md:p-8 text-left transition-colors cursor-pointer"
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
        </CardContent>
      </Card>
    </div>
  );
}
