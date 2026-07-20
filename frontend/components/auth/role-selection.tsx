'use client';

import { useState } from 'react';
import { UserRole } from '@/types';
import { Briefcase, Palette } from 'lucide-react';
import { useRoleMutation } from '@/hooks/auth/use-role';

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
    },
    onError: () => setIsLoading(null),
  });

  const handleRoleSelect = (role: UserRole) => {
    setIsLoading(role);
    updateRoleMutation.mutate(role);
  };

  const content = (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-1 gap-4">
        <button
          type="button"
          onClick={() => handleRoleSelect(UserRole.CLIENT)}
          disabled={isLoading !== null}
          className="group relative w-full overflow-hidden border border-border p-6 text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 translate-y-full bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />

          <div className="relative z-10 flex items-start justify-between transition-colors duration-500 group-hover:text-background">
            <div className="flex gap-4">
              <Briefcase className="w-5 h-5 mt-1 opacity-70" />
              <div>
                <div className="font-display text-2xl mb-1">Client</div>
                <div className="font-editorial text-lg opacity-70">
                  Post projects and hire creatives
                </div>
              </div>
            </div>

            {isLoading === UserRole.CLIENT && (
              <div className="font-mono text-[11px] uppercase tracking-widest animate-pulse mt-1">
                Setting...
              </div>
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleRoleSelect(UserRole.CREATIVE)}
          disabled={isLoading !== null}
          className="group relative w-full overflow-hidden border border-border p-6 text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 translate-y-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />

          <div className="relative z-10 flex items-start justify-between transition-colors duration-500 group-hover:text-primary-foreground">
            <div className="flex gap-4">
              <Palette className="w-5 h-5 mt-1 opacity-70" />
              <div>
                <div className="font-display text-2xl mb-1">Creative</div>
                <div className="font-editorial text-lg opacity-70">
                  Showcase work and find opportunities
                </div>
              </div>
            </div>

            {isLoading === UserRole.CREATIVE && (
              <div className="font-mono text-[11px] uppercase tracking-widest animate-pulse mt-1">
                Setting...
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  );

  // If open prop is provided, render as Dialog
  if (open !== undefined) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <div className="font-mono text-[11px] uppercase tracking-widest opacity-60 mb-3">
              / Identity
            </div>
            <DialogTitle>Select your role</DialogTitle>
            <DialogDescription>
              Choose how you want to use the platform.
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
        <div className="font-mono text-[11px] uppercase tracking-widest opacity-60 mb-3">
          / Identity
        </div>
        <CardTitle>Select your role</CardTitle>
        <CardDescription>
          Choose how you want to use the platform.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">{content}</CardContent>
    </Card>
  );
}
