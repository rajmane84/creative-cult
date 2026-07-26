import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { portfolioService } from '@/services/creative/portfolio.service';
import { handleApiError } from '@/lib/handle-error';
import type {
  CreatePortfolioItemData,
  PortfolioItem,
} from '@/types/creative/portfolio';

export function useCreatePortfolioItem(options?: {
  onSuccess?: (item: PortfolioItem) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  const createPortfolioItemMutation = useMutation({
    mutationFn: (data: CreatePortfolioItemData) =>
      portfolioService.createPortfolioItem(data),
    onSuccess: (item) => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', 'mine'] });
      toast.success('Portfolio item added successfully!');
      options?.onSuccess?.(item);
    },
    onError: (error) => {
      handleApiError(error, 'Failed to add portfolio item');
      options?.onError?.(error);
    },
  });

  return {
    createPortfolioItem: createPortfolioItemMutation.mutate,
    isCreating: createPortfolioItemMutation.isPending,
  };
}
