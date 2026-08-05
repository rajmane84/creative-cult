import {
  ListingStatus,
  LocationType,
  RateType,
  Discipline,
  EmploymentType,
  Currency,
} from '../index';

export interface Listing {
  id: string;
  title: string;
  description: string;
  status: ListingStatus;
  locationType: LocationType;
  location?: string | null;
  budgetMin?: number | null;
  budgetMax?: number | null;
  rateType?: RateType | null;
  currency?: Currency | null;
  discipline?: Discipline | null;
  employmentType?: EmploymentType | null;
  skills: string[];
  deadline?: string | null;
  startDate?: string | null;
  duration?: string | null;
  clientProfileId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateListingData {
  title: string;
  description: string;
  status?: ListingStatus;
  locationType?: LocationType;
  location?: string;
  budgetMin?: number;
  budgetMax?: number;
  rateType?: RateType;
  currency?: Currency;
  discipline?: Discipline;
  employmentType?: EmploymentType;
  skills?: string[];
  deadline?: string;
  startDate?: string;
  duration?: string;
}

export interface UpdateListingData extends Partial<CreateListingData> {
  id: string;
}

export interface ListingQueryParams {
  status?: ListingStatus;
  discipline?: Discipline;
  page?: number;
  limit?: number;
}

export interface ListingWithClient extends Listing {
  clientProfile: {
    id: string;
    clientType: string;
    companyName?: string | null;
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
    };
  };
}
