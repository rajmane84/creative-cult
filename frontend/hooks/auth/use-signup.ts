import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ROLE_ROUTES } from '@/constants';

export function useSignupMutation(options?: {
  onSuccess?: () => void;
  onError?: () => void;
  onRequireRole?: () => void;
}) {
  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: authService.signUp,
    onSuccess: async (response) => {
      console.log('Signup response', response);
      if (response.error) {
        toast.error(response.error.message || 'Failed to create account');
        options?.onError?.();
      } else {
        toast.success('Account created successfully!');
        const user = response.data?.user;
        if (user?.role) {
          router.push(ROLE_ROUTES[user.role] || '/');
          options?.onSuccess?.();
        } else {
          options?.onRequireRole?.();
        }
      }
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create account';
      toast.error(errorMessage);
      options?.onError?.();
    },
  });

  const googleSignupMutation = useMutation({
    mutationFn: authService.googleSignUp,
    onSuccess: (response) => {
      if (response.error) {
        toast.error(response.error.message || 'Google signup failed');
        options?.onError?.();
      } else if ('url' in response.data && response.data.url) {
        window.location.href = response.data.url as string;
      } else if ('user' in response.data && response.data.user) {
        toast.success('Google signup successful!');
        const user = response.data.user;
        if (user.role) {
          router.push(ROLE_ROUTES[user.role] || '/');
          options?.onSuccess?.();
        } else {
          options?.onRequireRole?.();
        }
      }
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Google signup failed';
      toast.error(errorMessage);
      options?.onError?.();
    },
  });

  return { signupMutation, googleSignupMutation };
}
