import axios from '@/lib/axios';
import type { SuccessResponse } from '@/types/api';
import type {
  ProfileData,
  UpdateProfileData,
  UpdateSkillsData,
  UpdateAvailabilityData,
  UpdateEducationData,
  UpdateExperienceData,
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

  updateAvatar: async (
    file: File
  ): Promise<SuccessResponse<ProfileData['user']>> => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await axios.patch('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data as SuccessResponse<ProfileData['user']>;
  },

  updateEducation: async (
    data: UpdateEducationData
  ): Promise<SuccessResponse<ProfileData['creativeProfile']>> => {
    const response = await axios.patch('/profile/education', data);
    return response.data as SuccessResponse<ProfileData['creativeProfile']>;
  },

  updateExperience: async (
    data: UpdateExperienceData
  ): Promise<SuccessResponse<ProfileData['creativeProfile']>> => {
    const response = await axios.patch('/profile/experience', data);
    return response.data as SuccessResponse<ProfileData['creativeProfile']>;
  },
};
