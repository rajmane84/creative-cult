import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/creative/profile';
import { handleApiError } from '@/lib/handle-error';
import type { UpdateEducationData } from '@/types/creative/profile';

export function useUpdateEducation(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  const updateEducationMutation = useMutation({
    mutationFn: (data: UpdateEducationData) =>
      profileService.updateEducation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to update education');
      options?.onError?.();
    },
  });

  return { updateEducationMutation };
}
