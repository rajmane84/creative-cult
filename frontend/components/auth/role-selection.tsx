'use client';

import { useState } from 'react';
import { UserRole } from '@/types';
import { Briefcase, Palette } from 'lucide-react';
import { useRoleMutation } from '@/hooks/auth/use-role';

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

interface RoleSelectionProps {
  open?: boolean;
  onClose?: () => void;
}

export function RoleSelection({ open = true, onClose }: RoleSelectionProps) {
  const [isLoading, setIsLoading] = useState<UserRole | null>(null);

  const { updateRoleMutation } = useRoleMutation({
    onSuccess: () => {
      setIsLoading(null);
      if (onClose) onClose();
    },
    onError: () => setIsLoading(null),
  });

  const handleRoleSelect = (role: UserRole) => {
    setIsLoading(role);
    updateRoleMutation.mutate(role);
  };

  const content = (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <Button
          variant="outline"
          className="h-auto p-6 flex flex-col items-start gap-2"
          onClick={() => handleRoleSelect(UserRole.CLIENT)}
          disabled={isLoading !== null}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
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
          onClick={() => handleRoleSelect(UserRole.CREATIVE)}
          disabled={isLoading !== null}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
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
