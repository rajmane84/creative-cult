import { useQuery } from '@tanstack/react-query';
import { clientProfileService } from '@/services/client/profile';
import { ApiError } from '@/types/api';

export function useClientProfile() {
  return useQuery({
    queryKey: ['client-profile'],
    queryFn: () => clientProfileService.getProfile(),
    retry: (failureCount, error) => {
      // Don't retry on 401 (unauthorized) or 404 (not found)
      if (
        error instanceof ApiError &&
        (error.statusCode === 401 || error.statusCode === 404)
      ) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
  });
}
