export type CultRole = 'LEADER' | 'MEMBER';

export type CultInviteStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED';

export interface CultMember {
  id: string;
  name: string;
  avatar?: string;
  role: CultRole;
  joinedAt: string;
}

export interface Cult {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  userRole: CultRole;
  memberCount: number;
  members?: CultMember[];
  tags?: string[];
  createdAt: string;
}

export interface CultInvite {
  id: string;
  cultId: string;
  cultName: string;
  cultLogo?: string;
  inviterName: string;
  inviterAvatar?: string;
  status: CultInviteStatus;
  createdAt: string;
}

export interface CreateCultData {
  name: string;
  tagline?: string;
  description?: string;
  tags?: string[];
}
