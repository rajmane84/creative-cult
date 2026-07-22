import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/creative/profile';
import { handleApiError } from '@/lib/handle-error';
import type {
  UpdateAvailabilityData,
  ProfileData,
} from '@/types/creative/profile';
import type { SuccessResponse } from '@/types/api';

export function useUpdateAvailability(options?: {
  onSuccess?: (
    data: SuccessResponse<ProfileData['creativeProfile']>,
    variables: UpdateAvailabilityData
  ) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  const updateAvailabilityMutation = useMutation({
    mutationFn: (data: UpdateAvailabilityData) =>
      profileService.updateAvailability(data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch profile query
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      options?.onSuccess?.(data, variables);
    },
    onError: (error) => {
      handleApiError(error, 'Failed to update availability status');
      options?.onError?.(error);
    },
  });

  return { updateAvailabilityMutation };
}
