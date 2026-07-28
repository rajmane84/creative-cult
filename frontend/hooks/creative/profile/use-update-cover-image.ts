import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/creative/profile';
import { handleApiError } from '@/lib/handle-error';
import { toast } from 'sonner';
import type { ProfileData } from '@/types/creative/profile';
import type { SuccessResponse } from '@/types/api';

export function useUpdateCoverImage(options?: {
  onSuccess?: (data: SuccessResponse<ProfileData['creativeProfile']>) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  const updateCoverImageMutation = useMutation({
    mutationFn: (file: File) => profileService.updateCoverImage(file),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Cover image updated');
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      handleApiError(error, 'Failed to update cover image');
      options?.onError?.(error);
    },
  });

  return { updateCoverImageMutation };
}
