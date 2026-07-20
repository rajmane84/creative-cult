import axiosInstance from '@/lib/axios';
import type { SuccessResponse } from '@/types/api';

interface JoinWaitlistResponse {
  position: number;
  email: string;
  joinAs: string;
}

interface WaitlistCountResponse {
  count: number;
}

export const waitlistService = {
  join: async (email: string, joinAs: string) => {
    const response = await axiosInstance.post<
      SuccessResponse<JoinWaitlistResponse>
    >('/waitlist', { email, joinAs });
    return response.data.data;
  },

  getCount: async () => {
    const response =
      await axiosInstance.get<SuccessResponse<WaitlistCountResponse>>(
        '/waitlist/count'
      );
    return response.data.data;
  },
};
