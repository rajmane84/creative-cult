import { useMutation, useQueryClient } from '@tanstack/react-query';
import { listingService } from '@/services/listing';
import { handleApiError } from '@/lib/handle-error';
import type { UpdateListingData } from '@/types/listing';

export function useUpdateListing(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  const updateListingMutation = useMutation({
    mutationFn: (data: UpdateListingData) => listingService.updateListing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['listing'] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to update listing');
      options?.onError?.();
    },
  });

  return { updateListingMutation };
}
