import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth';
import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';
import { ROLE_ROUTES } from '@/constants';
import type { LoginFormData } from '@/validations/auth';
import type {
  BetterAuthLoginResponse,
  BetterAuthSocialResponse,
} from '@/types/auth';

export function useLoginMutation(options?: {
  onSuccess?: () => void;
  onError?: () => void;
  onRequireRole?: () => void;
}) {
  // const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (
      data: LoginFormData
    ): Promise<BetterAuthLoginResponse> => {
      const loginPromise = (async () => {
        const response = await authService.login(data);
        if (response.error) {
          throw new Error(response.error.message || 'Login failed');
        }
        return response;
      })();

      toast.promise(loginPromise, {
        loading: 'Signing in...',
        success: 'Login successful!',
        error: (err) => (err instanceof Error ? err.message : 'Login failed'),
      });

      return loginPromise;
    },
    onSuccess: (response: BetterAuthLoginResponse) => {
      const user = response.data?.user;
      if (user?.role) {
        options?.onSuccess?.();
        window.location.href = ROLE_ROUTES[user.role] || '/';
      } else {
        options?.onRequireRole?.();
      }
    },
    onError: () => {
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
          options?.onSuccess?.();
          window.location.href = ROLE_ROUTES[user.role] || '/';
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
