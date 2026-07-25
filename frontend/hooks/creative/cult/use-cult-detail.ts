import { useQuery } from '@tanstack/react-query';
import { cultService } from '@/services/creative/cult.service';

export function useCultDetail(slug: string) {
  const query = useQuery({
    queryKey: ['creative-cult', slug],
    queryFn: () => cultService.getCultBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  return {
    cult: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
