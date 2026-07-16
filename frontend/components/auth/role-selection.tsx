'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import axios from '@/lib/axios';
import { ApiError } from '@/types/api';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type UserRole = 'CLIENT' | 'CREATIVE';

const updateRoleMutation = async (role: UserRole) => {
  const response = await axios.post('/user/role', { role });
  return response.data;
};

interface RoleSelectionProps {
  open?: boolean;
  onClose?: () => void;
}

export function RoleSelection({ open = true, onClose }: RoleSelectionProps) {
  const [isLoading, setIsLoading] = useState<UserRole | null>(null);
  const { refetch } = authClient.useSession();

  const mutation = useMutation({
    mutationFn: updateRoleMutation,
    onSuccess: async (response) => {
      console.log('Update role response:', response);
      // Response is automatically validated by axios interceptor
      // onSuccess only runs for successful responses
      toast.success('Role selected successfully!');
      setIsLoading(null);
      // Refetch session to get updated role
      await refetch();
      // Close dialog if provided
      if (onClose) {
        onClose();
      }
      // Note: Redirection is handled by the parent component's useEffect
      // that monitors the session role, avoiding double redirects
    },
    onError: (error: unknown) => {
      console.error('Update role error:', error);
      if (error instanceof ApiError) {
        toast.error(error.message || 'Failed to update role');
      } else {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to update role';
        toast.error(errorMessage);
      }
      setIsLoading(null);
    },
  });

  const handleRoleSelect = (role: UserRole) => {
    setIsLoading(role);
    mutation.mutate(role);
  };

  const content = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <Button
          variant="outline"
          className="h-auto p-6 flex flex-col items-start gap-2"
          onClick={() => handleRoleSelect('CLIENT')}
          disabled={isLoading !== null}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="text-left flex-1">
              <div className="font-semibold">Client</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Post projects and hire creatives
              </div>
            </div>
            {isLoading === 'CLIENT' && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
            )}
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto p-6 flex flex-col items-start gap-2"
          onClick={() => handleRoleSelect('CREATIVE')}
          disabled={isLoading !== null}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="text-left flex-1">
              <div className="font-semibold">Creative</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showcase work and find opportunities
              </div>
            </div>
            {isLoading === 'CREATIVE' && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
            )}
          </div>
        </Button>
      </div>
    </div>
  );

  // If open prop is provided, render as Dialog
  if (open !== undefined) {
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Select your role</DialogTitle>
            <DialogDescription>
              Choose how you want to use the platform
            </DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  // Otherwise, render as Card (backward compatibility)
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Select your role</CardTitle>
        <CardDescription>
          Choose how you want to use the platform
        </CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
