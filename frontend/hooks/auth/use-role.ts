import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { toast } from 'sonner';
import { ApiError } from '@/types/api';
import { authClient } from '@/lib/auth-client';

export function useRoleMutation(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const { refetch } = authClient.useSession();

  const updateRoleMutation = useMutation({
    mutationFn: authService.updateRole,
    onSuccess: async (response) => {
      console.log('Update role response:', response);
      toast.success('Role selected successfully!');
      await refetch();
      options?.onSuccess?.();
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
      options?.onError?.();
    },
  });

  return { updateRoleMutation };
}
