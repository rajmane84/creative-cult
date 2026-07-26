import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { portfolioService } from '@/services/creative/portfolio.service';
import { handleApiError } from '@/lib/handle-error';

export function useDeletePortfolioItem(options?: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  const deletePortfolioItemMutation = useMutation({
    mutationFn: (id: string) => portfolioService.deletePortfolioItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', 'mine'] });
      toast.success('Portfolio item removed');
      options?.onSuccess?.();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to remove portfolio item');
      options?.onError?.(error);
    },
  });

  return {
    deletePortfolioItem: deletePortfolioItemMutation.mutate,
    isDeleting: deletePortfolioItemMutation.isPending,
  };
}
