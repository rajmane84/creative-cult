'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RoleSelection } from './role-selection';
import Image from 'next/image';

import { signupSchema, type SignupFormData } from '@/validations/auth';
import { useSignupMutation } from '@/hooks/auth/use-signup';
import Link from 'next/link';

export function SignupForm() {
  const [showRoleModal, setShowRoleModal] = useState(false);

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
      <Card className="w-full shadow-sm border-border/40">
        <CardHeader className="space-y-1.5 pb-6">
          <CardTitle className="text-xl font-semibold tracking-tight text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center text-[13px]">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 pb-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register('name')}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-5 pt-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isLoading ? 'Creating account...' : 'Sign up'}
            </Button>

            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/40" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-medium">
                <span className="bg-card px-3 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full bg-background hover:bg-muted/50 transition-colors"
              disabled={isGoogleLoading}
              onClick={handleGoogleSignup}
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Image
                  width={20}
                  height={20}
                  src="/icons/google-icon.png"
                  alt="Google"
                  className="mr-2 size-4 opacity-80"
                />
              )}
              {isGoogleLoading ? 'Connecting...' : 'Google'}
            </Button>

            <div className="mt-2 text-center text-[13px] text-muted-foreground">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-foreground font-medium hover:underline transition-all"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>

      {showRoleModal && (
        <RoleSelection
          open={showRoleModal}
          onClose={() => setShowRoleModal(false)}
        />
      )}
    </>
  );
}
