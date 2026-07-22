'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RoleSelection } from './role-selection';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

import { signupSchema, type SignupFormData } from '@/validations/auth';
import { useSignupMutation } from '@/hooks/auth/use-signup';

const ease = [0.76, 0, 0.24, 1] as const;

export function SignupForm() {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { signupMutation, googleSignupMutation } = useSignupMutation({
    onRequireRole: () => setShowRoleModal(true),
  });

  const isLoading = signupMutation.isPending;
  const isGoogleLoading = googleSignupMutation.isPending;

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  const handleGoogleSignup = () => {
    googleSignupMutation.mutate();
  };

  return (
    <>
      <div className="mb-12 border-b border-border pb-8 md:mb-16 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="font-mono text-[11px] uppercase tracking-widest opacity-70 mb-4"
        >
          / Authentication
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-display text-5xl leading-[0.85] tracking-tight md:text-7xl"
        >
          Create <br className="hidden md:block" />
          <span className="text-primary selection:text-background selection:bg-primary">
            account.
          </span>
        </motion.h2>
      </div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-8">
          <div className="space-y-3">
            <Label htmlFor="name">/01 — Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register('name')}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="font-mono text-[10px] text-destructive uppercase tracking-widest mt-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="email">/02 — Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email')}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="font-mono text-[10px] text-destructive uppercase tracking-widest mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="password">/03 — Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                onPointerDown={(e) => e.preventDefault()}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-foreground/50 hover:text-foreground transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="font-mono text-[10px] text-destructive uppercase tracking-widest mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="confirmPassword">/04 — Confirm</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('confirmPassword')}
                disabled={isLoading}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                onPointerDown={(e) => e.preventDefault()}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-foreground/50 hover:text-foreground transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="font-mono text-[10px] text-destructive uppercase tracking-widest mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Continue →'}
          </Button>

          <div className="flex items-center justify-between border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest">
            <span className="opacity-60">or continue with</span>
            <Button
              type="button"
              // variant="outline"
              size="sm"
              disabled={isGoogleLoading}
              onClick={handleGoogleSignup}
              className="hover:bg-border/5 px-5 lg:px-10"
            >
              {isGoogleLoading ? 'Connecting...' : 'Google →'}
            </Button>
          </div>

          <div className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary hover:underline transition-all selection:text-background selection:bg-primary"
            >
              Sign in
            </Link>
          </div>
        </div>
      </motion.form>

      {showRoleModal && (
        <RoleSelection
          open={showRoleModal}
          onClose={() => setShowRoleModal(false)}
        />
      )}
    </>
  );
}
