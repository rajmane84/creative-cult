import { useMutation, useQueryClient } from '@tanstack/react-query';
import { listingService } from '@/services/listing';
import { handleApiError } from '@/lib/handle-error';
import type { CreateListingData } from '@/types/listing';

export function useCreateListing(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  const createListingMutation = useMutation({
    mutationFn: (data: CreateListingData) => listingService.createListing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to create listing');
      options?.onError?.();
    },
  });

  return { createListingMutation };
}
