import { useMutation, useQueryClient } from '@tanstack/react-query';
import { listingService } from '@/services/listing';
import { handleApiError } from '@/lib/handle-error';

export function useUpdateListingStatus(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  const updateListingStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      listingService.updateListingStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      queryClient.invalidateQueries({ queryKey: ['listing'] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to update listing status');
      options?.onError?.();
    },
  });

  return { updateListingStatusMutation };
}
