import axiosInstance from '@/lib/axios';
import type {
  Cult,
  CultInvite,
  CreateCultData,
  CreateInviteData,
  CultRole,
} from '@/types/creative/cult';
import type { SuccessResponse } from '@/types/api';

export const cultService = {
  async getMyCults(): Promise<Cult[]> {
    const response =
      await axiosInstance.get<SuccessResponse<Cult[]>>('/cult/my');
    return response.data.data;
  },

  async getMyInvites(): Promise<CultInvite[]> {
    const response =
      await axiosInstance.get<SuccessResponse<CultInvite[]>>(
        '/cult/invites/my'
      );
    return response.data.data;
  },

  async getCultBySlug(slug: string): Promise<Cult> {
    const response = await axiosInstance.get<SuccessResponse<Cult>>(
      `/cult/${slug}`
    );
    return response.data.data;
  },

  async createCult(data: CreateCultData): Promise<Cult> {
    const response = await axiosInstance.post<SuccessResponse<Cult>>(
      '/cult',
      data
    );
    return response.data.data;
  },

  async respondToInvite(
    inviteId: string,
    action: 'ACCEPT' | 'DECLINE'
  ): Promise<{ inviteId: string; action: string }> {
    const response = await axiosInstance.post<
      SuccessResponse<{ inviteId: string; action: string }>
    >(`/cult/invites/${inviteId}/respond`, { action });
    return response.data.data;
  },

  async inviteMember(
    cultId: string,
    data: CreateInviteData
  ): Promise<CultInvite> {
    const response = await axiosInstance.post<SuccessResponse<CultInvite>>(
      `/cult/${cultId}/invites`,
      data
    );
    return response.data.data;
  },

  async leaveCult(cultId: string, membershipId: string): Promise<void> {
    await axiosInstance.post(`/cult/${cultId}/members/${membershipId}/leave`);
  },

  async removeMember(cultId: string, membershipId: string): Promise<void> {
    await axiosInstance.delete(`/cult/${cultId}/members/${membershipId}`);
  },

  async updateMemberRole(
    cultId: string,
    membershipId: string,
    role: CultRole
  ): Promise<void> {
    await axiosInstance.patch(`/cult/${cultId}/members/${membershipId}/role`, {
      role,
    });
  },

  async disbandCult(cultId: string): Promise<void> {
    await axiosInstance.delete(`/cult/${cultId}`);
  },
};
