'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const Page = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  const user = session?.user;

  // Redirect based on user role
  useEffect(() => {
    if (!isPending && session) {
      if (!user?.role) {
        router.push('/select-role');
      } else if (user.role === 'CLIENT') {
        router.push('/client');
      } else if (user.role === 'CREATIVE') {
        router.push('/creative');
      } else if (user.role === 'ADMIN') {
        router.push('/admin');
      }
    }
  }, [session, isPending, user?.role, router]);

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

  // Show loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">
          {user?.role
            ? 'Redirecting to your dashboard...'
            : 'Setting up your profile...'}
        </p>
      </div>
    </div>
  );
};

export default Page;
