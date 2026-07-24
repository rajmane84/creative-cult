import type {
  Cult,
  CultMembership,
  CultInvite,
  CultMemberRole,
  CultMembershipStatus,
  CultInviteStatus,
} from '@prisma/client';

// Cult types
export type CultWithCreator = Cult & {
  createdBy: {
    id: string;
    name: string;
    username: string | null;
    image: string | null;
  };
  _count?: {
    memberships: number;
  };
};

export type CultWithDetails = Cult & {
  createdBy: {
    id: string;
    name: string;
    username: string | null;
    image: string | null;
  };
  memberships: (CultMembership & {
    creativeProfile: {
      id: string;
      headline: string | null;
      bio: string | null;
      location: string | null;
      availability: string;
      user: {
        id: string;
        name: string;
        username: string | null;
        image: string | null;
      };
      skills?: {
        id: string;
        name: string;
        level: string | null;
      }[];
    };
  })[];
  _count?: {
    memberships: number;
  };
};

// CultMembership types
export type CultMembershipWithDetails = CultMembership & {
  cult: Cult;
  creativeProfile: {
    id: string;
    headline: string | null;
    bio: string | null;
    location: string | null;
    availability: string;
    user: {
      id: string;
      name: string;
      username: string | null;
      image: string | null;
    };
    skills?: {
      id: string;
      name: string;
      level: string | null;
    }[];
  };
};

// CultInvite types
export type CultInviteWithDetails = CultInvite & {
  cult: Cult;
  invitedByUser: {
    id: string;
    name: string;
    username: string | null;
    image: string | null;
  };
  invitedProfile: {
    id: string;
    user: {
      id: string;
      name: string;
      username: string | null;
      image: string | null;
    };
  };
};

// Request/Response types
export interface CreateCultInput {
  name: string;
  slug?: string;
  tagline?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface UpdateCultInput {
  name?: string;
  tagline?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface CultQueryParams {
  search?: string;
  skill?: string;
  page?: number;
  limit?: number;
}

export interface UpdateMemberRoleInput {
  role: CultMemberRole;
}

export interface CreateCultInviteInput {
  cultId: string;
  invitedProfileId: string;
  message?: string;
  expiresAt?: string;
}

export interface RespondToCultInviteInput {
  status: CultInviteStatus;
}

export interface UpdateCultMembershipInput {
  role?: CultMemberRole;
  status?: CultMembershipStatus;
}

export interface CreateCultMembershipInput {
  cultId: string;
  creativeProfileId: string;
  role?: CultMemberRole;
}
