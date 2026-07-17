import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ROLE_ROUTES } from '@/constants';
import type {
  BetterAuthLoginResponse,
  BetterAuthSocialResponse,
} from '@/types/auth';

export function useLoginMutation(options?: {
  onSuccess?: () => void;
  onError?: () => void;
  onRequireRole?: () => void;
}) {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response: BetterAuthLoginResponse) => {
      if (response.error) {
        toast.error(response.error.message || 'Login failed');
        options?.onError?.();
      } else {
        toast.success('Login successful!');
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
        error instanceof Error ? error.message : 'Login failed';
      toast.error(errorMessage);
      options?.onError?.();
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: authService.googleLogin,
    onSuccess: (response: BetterAuthSocialResponse) => {
      if (response.error) {
        toast.error(response.error.message || 'Google login failed');
        options?.onError?.();
      } else if ('url' in response.data && response.data.url) {
        window.location.href = response.data.url;
      } else if ('user' in response.data && response.data.user) {
        toast.success('Google login successful!');
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
        error instanceof Error ? error.message : 'Google login failed';
      toast.error(errorMessage);
      options?.onError?.();
    },
  });

  return { loginMutation, googleLoginMutation };
}
