import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientProfileService } from '@/services/client/profile';
import { handleApiError } from '@/lib/handle-error';
import type { UpdateClientProfileData } from '@/types/client/profile';

export function useUpdateClientProfile(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateClientProfileData) =>
      clientProfileService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-profile'] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to update profile');
      options?.onError?.();
    },
  });

  return { updateProfileMutation };
}
