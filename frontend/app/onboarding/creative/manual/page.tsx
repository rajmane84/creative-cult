'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authClient } from '@/lib/auth-client';
import Loader from '@/components/loader';
import { UserRole } from '@/types';
import {
  creativeOnboardingSchema,
  CreativeOnboardingFormData,
  Skill,
} from '@/validations/creative/onboarding';
import { useUsernameCheck } from '@/hooks/auth/use-username-check';
import { useCreativeOnboarding } from '@/hooks/auth/use-creative-onboarding';
import MultiStepOnboarding from '@/components/creative/onboarding/multi-step-onboarding';
import BasicInfoStep from '@/components/creative/onboarding/basic-info-step';
import SkillsStep from '@/components/creative/onboarding/skills-step';
import StepNavigation from '@/components/creative/onboarding/step-navigation';

const CreativeManualOnboarding = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [usernameInput, setUsernameInput] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<CreativeOnboardingFormData>({
    resolver: zodResolver(creativeOnboardingSchema),
    defaultValues: {
      skills: [],
    },
    mode: 'onChange', // Validate on change for real-time feedback
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = methods;

  const { isUsernameAvailable } = useUsernameCheck();
  const usernameValue = watch('username');

  const { onboardingMutation } = useCreativeOnboarding({
    onSuccess: () => {
      router.push('/dashboard/creative');
    },
  });

  // Check if current step is valid for enabling next button
  const isStepValid = () => {
    if (currentStep === 0) {
      // Step 1: Username must be filled and valid
      const isUsernameValid =
        usernameValue && usernameValue.length >= 3 && !errors.username;

      // Allow proceeding if username is valid and either available or not yet checked
      // This prevents getting stuck if availability check is slow
      return isUsernameValid && isUsernameAvailable !== false;
    }
    // Step 2: Skills are optional, always valid
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
  ];

  // Sync skills with form value
  useEffect(() => {
    setValue('skills', skills);
  }, [skills, setValue]);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    } else if (!isPending && session && session.user?.role !== 'CREATIVE') {
      router.push('/dashboard');
    } else if (
      !isPending &&
      session &&
      session.user?.role === 'CREATIVE' &&
      session.user?.creativeProfile?.onboardingCompleted
    ) {
      router.push('/dashboard/creative');
    }
  }, [session, isPending, router]);

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
    onboardingMutation.mutate(data);
  };

  if (isPending) {
    return <Loader />;
  }

  if (!session || session.user?.role !== UserRole.CREATIVE) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full animate-in fade-in slide-in-from-bottom-4 duration-500 motion-reduce:animate-none motion-reduce:transition-none">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-wrap-balance">
            Set Up Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your profile in just 2 steps
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <MultiStepOnboarding currentStep={currentStep} steps={steps}>
              {currentStep === 0 && (
                <BasicInfoStep
                  usernameInput={usernameInput}
                  onUsernameChange={setUsernameInput}
                />
              )}
              {currentStep === 1 && (
                <SkillsStep skills={skills} onSkillsChange={setSkills} />
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
                currentStep === 0 ? 'Continue to Skills' : 'Complete Profile'
              }
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreativeManualOnboarding;
