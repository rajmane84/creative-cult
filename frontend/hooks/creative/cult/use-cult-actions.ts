import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cultService } from '@/services/creative/cult.service';
import { handleApiError } from '@/lib/handle-error';
import type { CreateInviteData, CultRole } from '@/types/creative/cult';

export function useCultActions(cultId?: string, cultSlug?: string) {
  const queryClient = useQueryClient();

  const invalidateCultQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['creative-cults'] });
    if (cultSlug) {
      queryClient.invalidateQueries({ queryKey: ['creative-cult', cultSlug] });
    }
  };

  const inviteMemberMutation = useMutation({
    mutationFn: (data: CreateInviteData) => {
      if (!cultId) throw new Error('Cult ID is required');
      return cultService.inviteMember(cultId, data);
    },
    onSuccess: () => {
      toast.success('Invitation sent successfully!');
      invalidateCultQueries();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to send invite');
    },
  });

  const leaveCultMutation = useMutation({
    mutationFn: (membershipId: string) => {
      if (!cultId) throw new Error('Cult ID is required');
      return cultService.leaveCult(cultId, membershipId);
    },
    onSuccess: () => {
      toast.success('You have left the cult');
      invalidateCultQueries();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to leave cult');
    },
  });

  const removeMemberMutation = useMutation({
    mutationFn: (membershipId: string) => {
      if (!cultId) throw new Error('Cult ID is required');
      return cultService.removeMember(cultId, membershipId);
    },
    onSuccess: () => {
      toast.success('Member removed');
      invalidateCultQueries();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to remove member');
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({
      membershipId,
      role,
    }: {
      membershipId: string;
      role: CultRole;
    }) => {
      if (!cultId) throw new Error('Cult ID is required');
      return cultService.updateMemberRole(cultId, membershipId, role);
    },
    onSuccess: () => {
      toast.success('Member role updated');
      invalidateCultQueries();
    },
    onError: (error) => {
      handleApiError(error, 'Failed to update member role');
    },
  });

  const disbandCultMutation = useMutation({
    mutationFn: () => {
      if (!cultId) throw new Error('Cult ID is required');
      return cultService.disbandCult(cultId);
    },
    onSuccess: () => {
      toast.success('Cult disbanded');
      queryClient.invalidateQueries({ queryKey: ['creative-cults'] });
    },
    onError: (error) => {
      handleApiError(error, 'Failed to disband cult');
    },
  });

  return {
    inviteMember: inviteMemberMutation.mutate,
    isInviting: inviteMemberMutation.isPending,

    leaveCult: leaveCultMutation.mutate,
    isLeaving: leaveCultMutation.isPending,

    removeMember: removeMemberMutation.mutate,
    isRemoving: removeMemberMutation.isPending,

    updateMemberRole: updateRoleMutation.mutate,
    isUpdatingRole: updateRoleMutation.isPending,

    disbandCult: disbandCultMutation.mutate,
    isDisbanding: disbandCultMutation.isPending,
  };
}
