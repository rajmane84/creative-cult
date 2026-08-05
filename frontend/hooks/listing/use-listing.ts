import { useQuery } from '@tanstack/react-query';
import { listingService } from '@/services/listing';
import { ApiError } from '@/types/api';

export function useListing(id: string) {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: () => listingService.getListingById(id),
    enabled: !!id,
    retry: (failureCount, error) => {
      if (
        error instanceof ApiError &&
        (error.statusCode === 401 || error.statusCode === 404)
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
}
