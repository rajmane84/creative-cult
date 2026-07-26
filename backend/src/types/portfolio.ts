import type {
  PortfolioItem,
  PortfolioItemCredit,
  PortfolioOwnerType,
  PortfolioCreditStatus,
} from '@prisma/client';

export type PortfolioItemWithDetails = PortfolioItem & {
  ownerCreativeProfile?: {
    id: string;
    user: {
      id: string;
      name: string;
      username: string | null;
      image: string | null;
    };
  } | null;
  ownerCult?: {
    id: string;
    name: string;
    slug: string;
    avatarUrl: string | null;
  } | null;
  credits?: PortfolioItemCreditWithProfile[];
};

export type PortfolioItemCreditWithProfile = PortfolioItemCredit & {
  creativeProfile: {
    id: string;
    user: {
      id: string;
      name: string;
      username: string | null;
      image: string | null;
    };
  };
};

export interface CreatePortfolioItemInput {
  title: string;
  description?: string;
  coverImageUrl?: string;
  mediaUrls?: string[];
  tags?: string[];
  projectDate?: Date;
  ownerType: PortfolioOwnerType;
  cultId?: string;
}

export interface UpdatePortfolioItemInput {
  title?: string;
  description?: string;
  coverImageUrl?: string;
  mediaUrls?: string[];
  tags?: string[];
  projectDate?: Date;
}

export interface PortfolioQueryParams {
  page?: number;
  limit?: number;
}

export interface AddPortfolioCreditInput {
  targetUsername?: string;
  targetEmailId?: string;
  role?: string;
}

export interface RespondToPortfolioCreditInput {
  status: PortfolioCreditStatus;
}
