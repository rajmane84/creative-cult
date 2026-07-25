import { useQuery } from '@tanstack/react-query';
import { cultService } from '@/services/creative/cult.service';

export function useCults() {
  const cultsQuery = useQuery({
    queryKey: ['creative-cults'],
    queryFn: () => cultService.getMyCults(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  const invitesQuery = useQuery({
    queryKey: ['creative-cult-invites'],
    queryFn: () => cultService.getMyInvites(),
    staleTime: 1000 * 60 * 2,
  });

  return {
    cults: cultsQuery.data ?? [],
    invites: invitesQuery.data ?? [],
    isLoadingCults: cultsQuery.isLoading,
    isLoadingInvites: invitesQuery.isLoading,
    isError: cultsQuery.isError || invitesQuery.isError,
    refetchCults: cultsQuery.refetch,
    refetchInvites: invitesQuery.refetch,
  };
}
