'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/cn';
import { useUsernameCheck } from '@/hooks/auth/use-username-check';
import { useState, useEffect } from 'react';

interface BasicInfoStepProps {
  usernameInput: string;
  onUsernameChange: (value: string) => void;
}

export default function BasicInfoStep({
  usernameInput,
  onUsernameChange,
}: BasicInfoStepProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const { isCheckingUsername, isUsernameAvailable, checkUsername } =
    useUsernameCheck();

  const [localUsername, setLocalUsername] = useState(usernameInput);

  useEffect(() => {
    setLocalUsername(usernameInput);
  }, [usernameInput]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalUsername(value);
    onUsernameChange(value);
    setValue('username', value, { shouldValidate: true });
    checkUsername(value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Basic Information
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Let's start with the essentials (only username is required)
        </p>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="username"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Username *
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="johndoe"
          value={localUsername}
          onChange={handleUsernameChange}
          className={cn(
            'transition-all duration-200 motion-reduce:transition-none',
            errors.username
              ? 'border-red-500 focus-visible:ring-red-500/20'
              : 'focus-visible:ring-primary/20'
          )}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600 animate-in fade-in slide-in-from-top-1 duration-200 motion-reduce:animate-none">
            {errors.username.message as string}
          </p>
        )}
        {!errors.username &&
          localUsername.length >= 3 &&
          !isCheckingUsername &&
          isUsernameAvailable !== null && (
            <p
              className={cn(
                'mt-1 text-sm animate-in fade-in slide-in-from-top-1 duration-200 motion-reduce:animate-none',
                isUsernameAvailable ? 'text-green-600' : 'text-red-600'
              )}
            >
              {isUsernameAvailable
                ? 'Username is available'
                : 'Username is already taken'}
            </p>
          )}
        {!errors.username && isCheckingUsername && (
          <p className="mt-1 text-sm text-gray-500 animate-in fade-in duration-200 motion-reduce:animate-none">
            Checking username availability...
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="headline"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Headline
        </Label>
        <Input
          id="headline"
          type="text"
          placeholder="e.g., Senior Graphic Designer"
          {...register('headline')}
          className="transition-all duration-200 focus-visible:ring-primary/20 motion-reduce:transition-none"
        />
        {errors.headline && (
          <p className="mt-1 text-sm text-red-600 animate-in fade-in slide-in-from-top-1 duration-200 motion-reduce:animate-none">
            {errors.headline.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="bio"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Bio
        </Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself and your work..."
          rows={4}
          {...register('bio')}
          className="transition-all duration-200 focus-visible:ring-primary/20 resize-none motion-reduce:transition-none"
        />
        {errors.bio && (
          <p className="mt-1 text-sm text-red-600 animate-in fade-in slide-in-from-top-1 duration-200 motion-reduce:animate-none">
            {errors.bio.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
