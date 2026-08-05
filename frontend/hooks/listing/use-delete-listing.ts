import { useMutation, useQueryClient } from '@tanstack/react-query';
import { listingService } from '@/services/listing';
import { handleApiError } from '@/lib/handle-error';

export function useDeleteListing(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  const deleteListingMutation = useMutation({
    mutationFn: (id: string) => listingService.deleteListing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to delete listing');
      options?.onError?.();
    },
  });

  return { deleteListingMutation };
}
