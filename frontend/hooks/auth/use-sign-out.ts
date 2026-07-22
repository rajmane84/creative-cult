'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

export const useSignOut = () => {
  const router = useRouter();

  return useCallback(() => {
    const signOutPromise = async () => {
      const res = await authClient.signOut();
      if (res?.error) {
        throw new Error(res.error.message || 'Failed to sign out');
      }
      router.push('/login');
      return res;
    };

    toast.promise(signOutPromise(), {
      loading: 'Signing out...',
      success: 'Signed out successfully',
      error: (err) =>
        err instanceof Error ? err.message : 'Failed to sign out',
    });
  }, [router]);
};
