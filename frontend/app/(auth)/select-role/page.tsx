'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RoleSelection } from '@/components/auth/role-selection';
import { authClient } from '@/lib/auth-client';

export default function SelectRolePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    } else if (!isPending && session && session.user?.role) {
      // Redirect to appropriate dashboard based on role
      const role = session.user.role;
      if (role === 'CLIENT') {
        router.push('/dashboard/client');
      } else if (role === 'CREATIVE') {
        router.push('/dashboard/creative');
      } else if (role === 'ADMIN') {
        router.push('/dashboard/admin');
      } else {
        router.push('/');
      }
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  // Check if user already has a role
  if (session.user?.role) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Complete your profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Select your role to continue
          </p>
        </div>
        <RoleSelection />
      </div>
    </div>
  );
}
