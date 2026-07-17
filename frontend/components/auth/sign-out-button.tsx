'use client';

import { Button } from '@/components/ui/button';
import { useSignOut } from '@/hooks/auth/use-sign-out';

interface SignOutButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
  children?: React.ReactNode;
  className?: string;
}

export function SignOutButton({
  variant = 'default',
  size = 'default',
  children,
  className,
}: SignOutButtonProps) {
  const handleSignOut = useSignOut();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSignOut}
      className={className}
    >
      {children || 'Sign Out'}
    </Button>
  );
}
