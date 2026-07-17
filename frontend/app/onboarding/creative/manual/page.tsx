'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { authClient } from '@/lib/auth-client';
import Loader from '@/components/loader';
import { UserRole } from '@/types';
import {
  creativeOnboardingSchema,
  CreativeOnboardingFormData,
} from '@/lib/validations/creative';
import { useUsernameCheck } from '@/hooks/auth/use-username-check';
import { useCreativeOnboarding } from '@/hooks/auth/use-creative-onboarding';

const CreativeManualOnboarding = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [usernameInput, setUsernameInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreativeOnboardingFormData>({
    resolver: zodResolver(creativeOnboardingSchema),
  });

  const { isCheckingUsername, isUsernameAvailable, checkUsername } =
    useUsernameCheck();
  const { onboardingMutation } = useCreativeOnboarding({
    onSuccess: () => {
      router.push('/dashboard/creative');
    },
  });

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

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsernameInput(value);
    // Always trigger username check, but debouncing will handle the timing
    checkUsername(value);
  };

  const onSubmit = async (data: CreativeOnboardingFormData) => {
    if (!isUsernameAvailable) {
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
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Set Up Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tell us about yourself (only username is required)
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Username *
            </label>
            <Input
              id="username"
              type="text"
              placeholder="johndoe"
              {...register('username')}
              onChange={handleUsernameChange}
              className={errors.username ? 'border-red-500' : ''}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
            {!errors.username &&
              usernameInput.length >= 3 &&
              !isCheckingUsername &&
              isUsernameAvailable !== null && (
                <p
                  className={`mt-1 text-sm ${isUsernameAvailable ? 'text-green-600' : 'text-red-600'}`}
                >
                  {isUsernameAvailable
                    ? 'Username is available'
                    : 'Username is already taken'}
                </p>
              )}
            {!errors.username && isCheckingUsername && (
              <p className="mt-1 text-sm text-gray-500">
                Checking username availability...
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="headline"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Headline
            </label>
            <Input
              id="headline"
              type="text"
              placeholder="e.g., Senior Graphic Designer"
              {...register('headline')}
            />
            {errors.headline && (
              <p className="mt-1 text-sm text-red-600">
                {errors.headline.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Bio
            </label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself and your work..."
              rows={4}
              {...register('bio')}
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              isSubmitting ||
              onboardingMutation.isPending ||
              isUsernameAvailable === false
            }
          >
            {isSubmitting || onboardingMutation.isPending
              ? 'Saving...'
              : 'Complete Profile'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreativeManualOnboarding;
