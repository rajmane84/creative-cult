import axiosInstance from '@/lib/axios';
import type {
  PortfolioItem,
  CreatePortfolioItemData,
  UpdatePortfolioItemData,
} from '@/types/creative/portfolio';
import type { SuccessResponse } from '@/types/api';

export const portfolioService = {
  async getMyPortfolio(): Promise<PortfolioItem[]> {
    const response =
      await axiosInstance.get<SuccessResponse<PortfolioItem[]>>(
        '/portfolio/mine'
      );
    return response.data.data;
  },

  async createPortfolioItem(
    data: CreatePortfolioItemData
  ): Promise<PortfolioItem> {
    const { coverImageFile, tags, ...rest } = data;

    const formData = new FormData();
    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, String(value));
    });
    tags?.forEach((tag) => formData.append('tags', tag));
    if (coverImageFile) formData.append('coverImage', coverImageFile);

    const response = await axiosInstance.post<SuccessResponse<PortfolioItem>>(
      '/portfolio',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data.data;
  },

  async updatePortfolioItem(
    id: string,
    data: UpdatePortfolioItemData
  ): Promise<PortfolioItem> {
    const response = await axiosInstance.patch<SuccessResponse<PortfolioItem>>(
      `/portfolio/${id}`,
      data
    );
    return response.data.data;
  },

  async deletePortfolioItem(id: string): Promise<void> {
    await axiosInstance.delete(`/portfolio/${id}`);
  },
};
