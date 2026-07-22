import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/creative/profile';
import { handleApiError } from '@/lib/handle-error';
import type { UpdateSkillsData } from '@/types/creative/profile';

export function useUpdateSkills(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  const updateSkillsMutation = useMutation({
    mutationFn: (data: UpdateSkillsData) => profileService.updateSkills(data),
    onSuccess: () => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to update skills');
      options?.onError?.();
    },
  });

  return { updateSkillsMutation };
}
