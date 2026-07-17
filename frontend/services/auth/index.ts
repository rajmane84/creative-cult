import { authClient } from '@/lib/auth-client';
import { LoginFormData, SignupFormData } from '@/lib/validations/auth';
import { CreativeOnboardingFormData } from '@/lib/validations/creative';
import { UserRole } from '@/types';
import axios from '@/lib/axios';
import type {
  SuccessResponse,
  UpdateRoleResponse,
  CreativeOnboardingResponse,
} from '@/types/api';
import type {
  BetterAuthLoginResponse,
  BetterAuthSocialResponse,
  BetterAuthSignupResponse,
} from '@/types/auth';

export const authService = {
  updateRole: async (
    role: UserRole
  ): Promise<SuccessResponse<UpdateRoleResponse>> => {
    const response = await axios.post('/user/role', { role });

    return response.data as SuccessResponse<UpdateRoleResponse>;
  },

  completeCreativeOnboarding: async (
    data: CreativeOnboardingFormData
  ): Promise<SuccessResponse<CreativeOnboardingResponse>> => {
    const response = await axios.post('/creative/onboarding', data);
    return response.data as SuccessResponse<CreativeOnboardingResponse>;
  },

  // Better auth services
  login: async (data: LoginFormData): Promise<BetterAuthLoginResponse> => {
    const response = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
    return response as BetterAuthLoginResponse;
  },

  googleLogin: async (): Promise<BetterAuthSocialResponse> => {
    const response = await authClient.signIn.social({
      provider: 'google',
      callbackURL: window.location.href,
    });
    return response as BetterAuthSocialResponse;
  },

  signUp: async (
    data: Omit<SignupFormData, 'confirmPassword'>
  ): Promise<BetterAuthSignupResponse> => {
    const response = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });
    return response as BetterAuthSignupResponse;
  },

  googleSignUp: async (): Promise<BetterAuthSocialResponse> => {
    const response = await authClient.signIn.social({
      provider: 'google',
      callbackURL: window.location.href,
    });
    return response as BetterAuthSocialResponse;
  },
};
