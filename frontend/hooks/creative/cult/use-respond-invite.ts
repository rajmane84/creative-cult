import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cultService } from '@/services/creative/cult.service';
import { handleApiError } from '@/lib/handle-error';
import type { Cult, CultInvite } from '@/types/creative/cult';

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

      // Remove invite from cache
      queryClient.setQueryData<CultInvite[]>(
        ['creative-cult-invites'],
        (old) => (old ? old.filter((inv) => inv.id !== inviteId) : [])
      );

      if (action === 'ACCEPT') {
        toast.success('Joined cult successfully!');

        // Add to cults list
        queryClient.setQueryData<Cult[]>(['creative-cults'], (old) => {
          const joinedCult: Cult = {
            id: `cult-joined-${Date.now()}`,
            name: 'Studio North',
            slug: 'studio-north',
            tagline: 'Premier architectural & visual creative studio',
            userRole: 'MEMBER',
            memberCount: 12,
            createdAt: new Date().toISOString(),
          };
          return old ? [...old, joinedCult] : [joinedCult];
        });
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
  };
}
