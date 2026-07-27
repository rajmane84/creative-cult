export type PortfolioOwnerType = 'FREELANCER' | 'CULT';

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string | null;
  coverImageUrl?: string | null;
  mediaUrls: string[];
  tags: string[];
  projectDate?: string | null;
  ownerType: PortfolioOwnerType;
  ownerCreativeProfileId?: string | null;
  ownerCultId?: string | null;
  ownerCreativeProfile?: {
    id: string;
    user: {
      id: string;
      name: string;
      username?: string | null;
      image?: string | null;
    };
  } | null;
  ownerCult?: {
    id: string;
    name: string;
    slug: string;
    avatarUrl?: string | null;
  } | null;
  credits?: PortfolioItemCredit[];
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioItemCredit {
  id: string;
  role?: string | null;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  creativeProfileId: string;
  creativeProfile?: {
    id: string;
    user: {
      id: string;
      name: string;
      username?: string | null;
      image?: string | null;
    };
  };
  createdAt: string;
}

export interface CreatePortfolioItemData {
  title: string;
  description?: string;
  coverImageFile?: File;
  mediaUrls?: string[];
  tags?: string[];
  projectDate?: string;
  ownerType: PortfolioOwnerType;
  cultId?: string;
}

export interface UpdatePortfolioItemData {
  title?: string;
  description?: string;
  coverImageUrl?: string;
  mediaUrls?: string[];
  tags?: string[];
  projectDate?: string;
}
