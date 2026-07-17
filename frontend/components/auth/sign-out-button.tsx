'use client';

import { Button } from '@/components/ui/button';
import { useSignOut } from '@/hooks/auth/use-sign-out';

interface SignOutButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  children?: React.ReactNode;
}

export function SignOutButton({
  variant = 'default',
  children,
}: SignOutButtonProps) {
  const handleSignOut = useSignOut();

  return (
    <Button variant={variant} onClick={handleSignOut}>
      {children || 'Sign Out'}
    </Button>
  );
}
