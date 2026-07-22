'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/cn';
import { useState, useEffect } from 'react';
import { Check, X, Loader2 } from 'lucide-react';

interface BasicInfoStepProps {
  usernameInput: string;
  onUsernameChange: (value: string) => void;
  isCheckingUsername: boolean;
  isUsernameAvailable: boolean | null;
  checkUsername: (username: string) => void;
}

export default function BasicInfoStep({
  usernameInput,
  onUsernameChange,
  isCheckingUsername,
  isUsernameAvailable,
  checkUsername,
}: BasicInfoStepProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const [localUsername, setLocalUsername] = useState(usernameInput);

  useEffect(() => {
    setLocalUsername(usernameInput);
  }, [usernameInput]);

  useEffect(() => {
    if (localUsername && localUsername.length >= 3) {
      checkUsername(localUsername);
    }
  }, [localUsername, checkUsername]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalUsername(value);
    onUsernameChange(value);
    setValue('username', value, { shouldValidate: true });
    checkUsername(value);
  };

  return (
    <div className="space-y-8">
      <div className="mb-10 space-y-2">
        <h3 className="font-display text-4xl text-foreground leading-none tracking-normal">
          Basic Information
        </h3>
        <p className="font-editorial text-lg text-foreground opacity-70">
          Let's start with the essentials (only username is required)
        </p>
      </div>

      <div className="space-y-4">
        <Label
          htmlFor="username"
          className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
        >
          Username *
        </Label>
        <div className="relative">
          <Input
            id="username"
            type="text"
            placeholder="johndoe"
            value={localUsername}
            onChange={handleUsernameChange}
            className={cn(
              'rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors pr-10',
              errors.username
                ? 'border-red-500 focus-visible:border-red-500'
                : ''
            )}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            {isCheckingUsername && (
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            )}
            {!isCheckingUsername &&
              !errors.username &&
              localUsername.length >= 3 &&
              isUsernameAvailable !== null && (
                <>
                  {isUsernameAvailable ? (
                    <Check className="w-4 h-4 text-emerald-600 selection:text-background selection:bg-primary" />
                  ) : (
                    <X className="w-4 h-4 text-red-600" />
                  )}
                </>
              )}
          </div>
        </div>

        {errors.username && (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-red-600">
            {errors.username.message as string}
          </p>
        )}
        {!errors.username &&
          localUsername.length >= 3 &&
          !isCheckingUsername &&
          isUsernameAvailable !== null && (
            <p
              className={cn(
                'mt-2 font-mono text-[11px] uppercase tracking-widest flex items-center gap-1.5',
                isUsernameAvailable ? 'text-emerald-600' : 'text-red-600'
              )}
            >
              {isUsernameAvailable
                ? 'Username is available'
                : 'Username is already taken'}
            </p>
          )}
        {!errors.username &&
          localUsername.length >= 3 &&
          isCheckingUsername && (
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-foreground opacity-50 flex items-center gap-1.5">
              Checking username availability...
            </p>
          )}
      </div>

      <div className="space-y-4">
        <Label
          htmlFor="headline"
          className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
        >
          Headline
        </Label>
        <Input
          id="headline"
          type="text"
          placeholder="e.g., Senior Graphic Designer"
          {...register('headline')}
          className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary transition-colors"
        />
        {errors.headline && (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-red-600">
            {errors.headline.message as string}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <Label
          htmlFor="bio"
          className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2"
        >
          Bio
        </Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself and your work..."
          rows={4}
          {...register('bio')}
          className="rounded-none border-border focus-visible:ring-0 focus-visible:border-primary resize-none transition-colors"
        />
        {errors.bio && (
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-red-600">
            {errors.bio.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
