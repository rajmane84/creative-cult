import axios from '@/lib/axios';
import type { SuccessResponse } from '@/types/api';
import type {
  Listing,
  CreateListingData,
  UpdateListingData,
  ListingQueryParams,
  ListingWithClient,
} from '@/types/listing';

export const listingService = {
  getListings: async (
    params?: ListingQueryParams
  ): Promise<SuccessResponse<Listing[]>> => {
    const response = await axios.get('/listings', { params });
    return response.data as SuccessResponse<Listing[]>;
  },

  getListingById: async (
    id: string
  ): Promise<SuccessResponse<ListingWithClient>> => {
    const response = await axios.get(`/listings/${id}`);
    return response.data as SuccessResponse<ListingWithClient>;
  },

  createListing: async (
    data: CreateListingData
  ): Promise<SuccessResponse<Listing>> => {
    const response = await axios.post('/listings', data);
    return response.data as SuccessResponse<Listing>;
  },

  updateListing: async (
    data: UpdateListingData
  ): Promise<SuccessResponse<Listing>> => {
    const { id, ...updateData } = data;
    const response = await axios.patch(`/listings/${id}`, updateData);
    return response.data as SuccessResponse<Listing>;
  },

  deleteListing: async (id: string): Promise<SuccessResponse<void>> => {
    const response = await axios.delete(`/listings/${id}`);
    return response.data as SuccessResponse<void>;
  },

  updateListingStatus: async (
    id: string,
    status: string
  ): Promise<SuccessResponse<Listing>> => {
    const response = await axios.patch(`/listings/${id}/status`, { status });
    return response.data as SuccessResponse<Listing>;
  },
};
