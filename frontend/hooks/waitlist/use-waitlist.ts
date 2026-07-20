import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { waitlistService } from '@/services/waitlist';
import { toast } from 'sonner';
import { handleApiError } from '@/lib/handle-error';
export const WAITLIST_COUNT_KEY = ['waitlist-count'];

export function useWaitlistCount() {
  return useQuery({
    queryKey: WAITLIST_COUNT_KEY,
    queryFn: async () => {
      const data = await waitlistService.getCount();
      return data.count;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useJoinWaitlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      joinAs,
    }: {
      email: string;
      joinAs: string;
    }) => {
      return waitlistService.join(email, joinAs);
    },
    onSuccess: (data) => {
      toast.success(`You're #${data.position.toLocaleString()} in line.`);
      queryClient.setQueryData(
        WAITLIST_COUNT_KEY,
        (old: { count: number } | undefined) => ({
          ...old,
          count: data.position,
        })
      );
    },
    onError: (error) => {
      handleApiError(error, 'Failed to join waitlist');
    },
  });
}
