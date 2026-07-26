import { useQuery } from '@tanstack/react-query';
import { portfolioService } from '@/services/creative/portfolio.service';

export function useMyPortfolio() {
  return useQuery({
    queryKey: ['portfolio', 'mine'],
    queryFn: () => portfolioService.getMyPortfolio(),
  });
}
