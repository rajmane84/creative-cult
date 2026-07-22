import axios from '@/lib/axios';
import type { SuccessResponse } from '@/types/api';
import type {
  ProfileData,
  UpdateProfileData,
  UpdateSkillsData,
  UpdateAvailabilityData,
} from '@/types/creative/profile';

export const profileService = {
  getProfile: async (): Promise<SuccessResponse<ProfileData>> => {
    const response = await axios.get('/profile');
    return response.data as SuccessResponse<ProfileData>;
  },

  updateProfile: async (
    data: UpdateProfileData
  ): Promise<SuccessResponse<ProfileData['creativeProfile']>> => {
    const response = await axios.patch('/profile', data);
    return response.data as SuccessResponse<ProfileData['creativeProfile']>;
  },

  updateSkills: async (
    data: UpdateSkillsData
  ): Promise<SuccessResponse<ProfileData['creativeProfile']>> => {
    const response = await axios.patch('/profile/skills', data);
    return response.data as SuccessResponse<ProfileData['creativeProfile']>;
  },

  updateAvailability: async (
    data: UpdateAvailabilityData
  ): Promise<SuccessResponse<ProfileData['creativeProfile']>> => {
    const response = await axios.patch('/profile/availability', data);
    return response.data as SuccessResponse<ProfileData['creativeProfile']>;
  },
};
