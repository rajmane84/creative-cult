'use client';

import { useRouter } from 'next/navigation';
import { ResumeUpload } from '@/components/resume/resume-upload';
import type { ResumeParseResponse } from '@/services/resume';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function CreativeResumeUploadForm() {
  const router = useRouter();

  const handleResumeParseComplete = (data: ResumeParseResponse) => {
    // Store the parsed resume data in session storage
    sessionStorage.setItem('resumeParseData', JSON.stringify(data));

    // Redirect to the manual onboarding page
    router.push('/onboarding/creative/manual');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-4xl p-8 md:p-16">
        <CardHeader className="border-b border-border pb-12 mb-12 space-y-4">
          <div className="font-mono text-[11px] uppercase tracking-widest opacity-60">
            /02 — Resume Upload
          </div>

          <CardTitle className="font-display text-5xl md:text-7xl leading-none tracking-normal">
            Upload Your Resume
          </CardTitle>

          <CardDescription className="font-editorial text-xl text-foreground opacity-70 max-w-lg pt-2">
            Let us extract your details automatically.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          <ResumeUpload onParseComplete={handleResumeParseComplete} />
        </CardContent>
      </Card>
    </div>
  );
}
