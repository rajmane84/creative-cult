import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientProfileService } from '@/services/client/profile';
import { handleApiError } from '@/lib/handle-error';
import { toast } from 'sonner';
import type { UserProfile } from '@/types/client/profile';
import type { SuccessResponse } from '@/types/api';

export function useUpdateAvatar(options?: {
  onSuccess?: (data: SuccessResponse<UserProfile>) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  const updateAvatarMutation = useMutation({
    mutationFn: (file: File) => clientProfileService.updateAvatar(file),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['client-profile'] });
      toast.success('Profile picture updated');
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      handleApiError(error, 'Failed to update profile picture');
      options?.onError?.(error);
    },
  });

  return { updateAvatarMutation };
}
