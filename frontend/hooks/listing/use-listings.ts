import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { listingService } from '@/services/listing';
import { ApiError } from '@/types/api';
import type { ListingQueryParams } from '@/types/listing';

export function useListings(params?: ListingQueryParams) {
  return useQuery({
    queryKey: ['listings', params],
    queryFn: () => listingService.getListings(params),
    placeholderData: keepPreviousData,
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
