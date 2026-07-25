export type CultRole = 'OWNER' | 'ADMIN' | 'MEMBER';

export type CultInviteStatus =
  'PENDING' | 'ACCEPTED' | 'DECLINED' | 'REVOKED' | 'EXPIRED';

export interface CultMember {
  id: string;
  creativeProfileId: string;
  role: CultRole;
  joinedAt: string;
  creativeProfile: {
    id: string;
    headline?: string | null;
    availability?: string | null;
    user: {
      id: string;
      name: string;
      username?: string | null;
      image?: string | null;
    };
    skills?: {
      id: string;
      skill: {
        id: string;
        name: string;
      };
    }[];
  };
}

export interface Cult {
  id: string;
  name: string;
  slug: string;
  tagline?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  userRole?: CultRole | null;
  userMembershipId?: string | null;
  memberCount: number;
  memberships?: CultMember[];
  tags?: string[];
  createdAt: string;
  createdBy?: {
    id: string;
    name: string;
    username?: string | null;
    image?: string | null;
  };
}

export interface CultInvite {
  id: string;
  cultId: string;
  cultName: string;
  cultSlug?: string;
  cultAvatarUrl?: string | null;
  inviterName: string;
  inviterAvatarUrl?: string | null;
  status: CultInviteStatus;
  message?: string | null;
  createdAt: string;
}

export interface CreateCultData {
  name: string;
  slug?: string;
  tagline?: string;
  bio?: string;
  avatarUrl?: string;
  tags?: string[];
}

export interface CreateInviteData {
  targetEmailId?: string;
  targetUsername?: string;
  message?: string;
}
