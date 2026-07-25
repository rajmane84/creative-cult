import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cultService } from '@/services/creative/cult.service';
import { handleApiError } from '@/lib/handle-error';
import type { CreateCultData, Cult } from '@/types/creative/cult';

export function useCreateCult(options?: {
  onSuccess?: (newCult: Cult) => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  const createCultMutation = useMutation({
    mutationFn: (data: CreateCultData) => cultService.createCult(data),
    onSuccess: (newCult) => {
      queryClient.invalidateQueries({ queryKey: ['creative-cults'] });
      toast.success(`Cult "${newCult.name}" created successfully!`);
      options?.onSuccess?.(newCult);
    },
    onError: (error) => {
      handleApiError(error, 'Failed to create cult');
      options?.onError?.(error);
    },
  });

  return {
    createCult: createCultMutation.mutate,
    isCreating: createCultMutation.isPending,
  };
}
