import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cultService } from '@/services/creative/cult.service';
import { handleApiError } from '@/lib/handle-error';

export function useRespondInvite(options?: {
  onSuccess?: (inviteId: string, action: 'ACCEPT' | 'DECLINE') => void;
  onError?: (error: unknown) => void;
}) {
  const queryClient = useQueryClient();

  const respondInviteMutation = useMutation({
    mutationFn: ({
      inviteId,
      action,
    }: {
      inviteId: string;
      action: 'ACCEPT' | 'DECLINE';
    }) => cultService.respondToInvite(inviteId, action),
    onSuccess: (res, variables) => {
      const { inviteId, action } = variables;
      queryClient.invalidateQueries({ queryKey: ['creative-cult-invites'] });
      queryClient.invalidateQueries({ queryKey: ['creative-cults'] });

      if (action === 'ACCEPT') {
        toast.success('Joined cult successfully!');
      } else {
        toast.info('Invitation declined.');
      }

      options?.onSuccess?.(inviteId, action);
    },
    onError: (error) => {
      handleApiError(error, 'Failed to respond to invite');
      options?.onError?.(error);
    },
  });

  return {
    respondToInvite: respondInviteMutation.mutate,
    isResponding: respondInviteMutation.isPending,
    activeInviteId: respondInviteMutation.variables?.inviteId,
    activeAction: respondInviteMutation.variables?.action,
  };
}
