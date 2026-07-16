'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const loginMutation = async (data: LoginFormData) => {
  const response = await authClient.signIn.email({
    email: data.email,
    password: data.password,
  });
  return response;
};

const googleLoginMutation = async () => {
  const response = await authClient.signIn.social({
    provider: 'google',
    callbackURL: window.location.href,
  });
  return response;
};

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginMutation,
    onSuccess: (response) => {
      if (response.error) {
        toast.error(response.error.message || 'Login failed');
        setIsLoading(false);
      } else {
        toast.success('Login successful!');
        setIsLoading(false);
        // Check if user has a role
        const user = response.data?.user;
        if (user?.role) {
          // User has a role, redirect to appropriate dashboard
          if (user.role === 'CLIENT') {
            router.push('/dashboard/client');
          } else if (user.role === 'CREATIVE') {
            router.push('/dashboard/creative');
          } else if (user.role === 'ADMIN') {
            router.push('/dashboard/admin');
          } else {
            router.push('/');
          }
        } else {
          // User doesn't have a role, show role selection modal
          setShowRoleModal(true);
        }
      }
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed';
      toast.error(errorMessage);
      setIsLoading(false);
    },
  });

  const googleMutation = useMutation({
    mutationFn: googleLoginMutation,
    onSuccess: (response) => {
      if (response.error) {
        toast.error(response.error.message || 'Google login failed');
        setIsGoogleLoading(false);
      } else if ('url' in response.data && response.data.url) {
        // Redirect to Google OAuth URL
        window.location.href = response.data.url;
      } else if ('user' in response.data && response.data.user) {
        toast.success('Google login successful!');
        setIsGoogleLoading(false);
        // Check if user has a role
        const user = response.data.user;
        if (user.role) {
          // User has a role, redirect to appropriate dashboard
          if (user.role === 'CLIENT') {
            router.push('/dashboard/client');
          } else if (user.role === 'CREATIVE') {
            router.push('/dashboard/creative');
          } else if (user.role === 'ADMIN') {
            router.push('/dashboard/admin');
          } else {
            router.push('/');
          }
        } else {
          // User doesn't have a role, show role selection modal
          setShowRoleModal(true);
        }
      }
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Google login failed';
      toast.error(errorMessage);
      setIsGoogleLoading(false);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    mutation.mutate(data);
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    googleMutation.mutate();
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
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
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isGoogleLoading}
              onClick={handleGoogleLogin}
            >
              {isGoogleLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting to Google...
                </>
              ) : (
                <>
                  <Image
                    width={100}
                    height={100}
                    src="/icons/google-icon.png"
                    alt="google-icon"
                    className="size-5"
                  />
                  Continue with Google
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
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
