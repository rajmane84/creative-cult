'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  creativeOnboardingSchema,
  CreativeOnboardingFormData,
  Skill,
  Education,
} from '@/validations/creative/onboarding';
import { useUsernameCheck } from '@/hooks/auth/use-username-check';
import { useCreativeOnboarding } from '@/hooks/auth/use-creative-onboarding';
import MultiStepOnboarding from '@/components/creative/onboarding/multi-step-onboarding';
import BasicInfoStep from '@/components/creative/onboarding/basic-info-step';
import SkillsStep from '@/components/creative/onboarding/skills-step';
import EducationStep from '@/components/creative/onboarding/education-step';
import StepNavigation from '@/components/creative/onboarding/step-navigation';
import type { ResumeParseResponse } from '@/services/creative/resume';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function CreativeManualOnboardingForm() {
  const [usernameInput, setUsernameInput] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeParseResponse | null>(
    null
  );

  const methods = useForm<CreativeOnboardingFormData>({
    resolver: zodResolver(creativeOnboardingSchema),
    defaultValues: {
      skills: [],
      education: [],
    },
    mode: 'onChange', // Validate on change for real-time feedback
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = methods;

  const { isCheckingUsername, isUsernameAvailable, checkUsername } =
    useUsernameCheck();
  const usernameValue = watch('username');

  const { onboardingMutation } = useCreativeOnboarding({
    onSuccess: () => {
      window.location.href = '/dashboard/creative';
    },
  });

  // Check if current step is valid for enabling next button
  const isStepValid = () => {
    if (currentStep === 0) {
      // Step 1: Username must be filled and valid
      const isUsernameValid =
        usernameValue && usernameValue.length >= 3 && !errors.username;

      // Allow proceeding if username is valid and either available or not yet checked
      return isUsernameValid && isUsernameAvailable !== false;
    }
    // Step 2: Skills are optional, always valid
    // Step 3: Education is optional, always valid
    return true;
  };

  const steps = [
    {
      id: 1,
      title: 'Basic Info',
      description: 'Username, headline & bio',
    },
    {
      id: 2,
      title: 'Skills',
      description: 'Your expertise',
    },
    {
      id: 3,
      title: 'Education',
      description: 'Degrees & qualifications',
    },
  ];

  // Sync skills with form value
  useEffect(() => {
    setValue('skills', skills);
  }, [skills, setValue]);

  // Sync education with form value
  useEffect(() => {
    setValue('education', educationList);
  }, [educationList, setValue]);

  // Check for resume data from session storage (when coming from upload flow)
  useEffect(() => {
    const storedResumeData = sessionStorage.getItem('resumeParseData');
    if (storedResumeData) {
      try {
        const parsedData: ResumeParseResponse = JSON.parse(storedResumeData);
        setResumeData(parsedData);

        // Pre-fill form with parsed data if available
        if (parsedData.parsedData) {
          if (parsedData.parsedData.skills) {
            const parsedSkills = parsedData.parsedData.skills.map((skill) => ({
              name: skill,
              expertise: 'INTERMEDIATE' as const,
            }));
            setSkills(parsedSkills);
          }

          // Set resume data in form
          setValue('resumeUrl', parsedData.cloudinary.url);
          setValue('resumePublicId', parsedData.cloudinary.publicId);
        }

        // Clear the session storage after loading
        sessionStorage.removeItem('resumeParseData');
      } catch (error) {
        console.error(
          'Failed to parse resume data from session storage:',
          error
        );
      }
    }
  }, [setValue]);

  const handleNext = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: CreativeOnboardingFormData) => {
    // Final check: ensure username is available before submitting
    if (isUsernameAvailable === false) {
      return;
    }

    // Include resume data if available from upload flow
    const submissionData = {
      ...data,
      resumeUrl: data.resumeUrl || resumeData?.cloudinary.url,
      resumePublicId: data.resumePublicId || resumeData?.cloudinary.publicId,
    };

    onboardingMutation.mutate(submissionData);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-4xl p-8 md:p-16">
        <CardHeader className="border-b border-border pb-12 mb-12 space-y-4">
          <div className="font-mono text-[11px] uppercase tracking-widest opacity-60">
            /02 — Manual Setup
          </div>

          <CardTitle className="font-display text-5xl md:text-7xl leading-none tracking-normal">
            Set Up Your Profile
          </CardTitle>

          <CardDescription className="font-editorial text-xl text-foreground opacity-70 max-w-lg pt-2">
            Complete your profile in just 3 steps.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <MultiStepOnboarding currentStep={currentStep} steps={steps}>
                {currentStep === 0 && (
                  <BasicInfoStep
                    usernameInput={usernameInput}
                    onUsernameChange={setUsernameInput}
                    isCheckingUsername={isCheckingUsername}
                    isUsernameAvailable={isUsernameAvailable}
                    checkUsername={checkUsername}
                  />
                )}

                {currentStep === 1 && (
                  <SkillsStep skills={skills} onSkillsChange={setSkills} />
                )}

                {currentStep === 2 && (
                  <EducationStep
                    educationList={educationList}
                    onEducationChange={setEducationList}
                  />
                )}
              </MultiStepOnboarding>

              <StepNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                isSubmitting={isSubmitting || onboardingMutation.isPending}
                isNextDisabled={!isStepValid()}
                nextLabel={
                  currentStep === 0
                    ? 'Continue to Skills'
                    : currentStep === 1
                      ? 'Continue to Education'
                      : 'Complete Profile'
                }
              />
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
