import { useQuery } from '@tanstack/react-query';
import { discoverService } from '@/services/discover';

export function useFreelancers() {
  return useQuery({
    queryKey: ['discover', 'freelancers'],
    queryFn: () => discoverService.getFreelancers(),
    staleTime: 60 * 1000,
  });
}
