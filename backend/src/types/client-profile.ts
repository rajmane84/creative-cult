import { ClientType, Industry, CompanySize } from '@prisma/client';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: string;
  username?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientProfile {
  id: string;
  clientType: ClientType;
  companyName?: string | null;
  industry?: Industry | null;
  companySize?: CompanySize | null;
  foundedYear?: string | null;
  bio?: string | null;
  website?: string | null;
  coverImage?: string | null;
  location?: string | null;
  phoneNumber?: string | null;
  phoneVerified: boolean;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileData {
  user: UserProfile;
  clientProfile: ClientProfile;
}

export interface UpdateClientProfileData {
  clientType?: ClientType;
  companyName?: string;
  industry?: Industry;
  companySize?: CompanySize;
  foundedYear?: string;
  bio?: string;
  website?: string;
  phoneNumber?: string;
  location?: string;
}
