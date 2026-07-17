import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { toast } from 'sonner';
import { ApiError } from '@/types/api';
import { authClient } from '@/lib/auth-client';
import { CreativeOnboardingFormData } from '@/lib/validations/creative';

export function useCreativeOnboarding(options?: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const { refetch } = authClient.useSession();

  const onboardingMutation = useMutation({
    mutationFn: (data: CreativeOnboardingFormData) =>
      authService.completeCreativeOnboarding(data),
    onSuccess: async (response) => {
      console.log('Creative onboarding response:', response);
      // response.data now has proper typing with user and creativeProfile
      console.log('Updated user:', response.data.user);
      console.log('Creative profile:', response.data.creativeProfile);

      toast.success('Profile completed successfully!');
      await refetch();
      options?.onSuccess?.();
    },
    onError: (error: unknown) => {
      console.error('Creative onboarding error:', error);
      if (error instanceof ApiError) {
        toast.error(error.message || 'Failed to complete profile');
      } else {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to complete profile';
        toast.error(errorMessage);
      }
      options?.onError?.();
    },
  });

  return { onboardingMutation };
}
