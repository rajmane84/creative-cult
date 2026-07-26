import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/creative/profile';
import { handleApiError } from '@/lib/handle-error';
import type { UpdateExperienceData } from '@/types/creative/profile';

export function useUpdateExperience(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  const updateExperienceMutation = useMutation({
    mutationFn: (data: UpdateExperienceData) =>
      profileService.updateExperience(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to update experience');
      options?.onError?.();
    },
  });

  return { updateExperienceMutation };
}
