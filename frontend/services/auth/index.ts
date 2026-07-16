import { authClient } from '@/lib/auth-client';
import { LoginFormData, SignupFormData } from '@/lib/validations/auth';
import { UserRole } from '@/types';
import axios from '@/lib/axios';

export const authService = {
  updateRole: async (role: UserRole) => {
    const response = await axios.post('/user/role', { role });
    return response.data;
  },
  login: async (data: LoginFormData) => {
    const response = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
    return response;
  },

  googleLogin: async () => {
    const response = await authClient.signIn.social({
      provider: 'google',
      callbackURL: window.location.href,
    });
    return response;
  },

  signUp: async (data: Omit<SignupFormData, 'confirmPassword'>) => {
    const response = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });
    return response;
  },

  googleSignUp: async () => {
    const response = await authClient.signIn.social({
      provider: 'google',
      callbackURL: window.location.href,
    });
    return response;
  },
};
