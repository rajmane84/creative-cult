import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/creative/profile';
import { handleApiError } from '@/lib/handle-error';
import type { UpdateProfileData } from '@/types/creative/profile';

export function useUpdateProfile(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateProfileData) => profileService.updateProfile(data),
    onSuccess: () => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to update profile');
      options?.onError?.();
    },
  });

  return { updateProfileMutation };
}
