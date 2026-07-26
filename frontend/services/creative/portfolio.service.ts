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
    const response = await axiosInstance.post<SuccessResponse<PortfolioItem>>(
      '/portfolio',
      data
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
