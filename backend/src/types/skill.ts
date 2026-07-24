import type { Skill, CreativeSkill, SkillLevel } from '@prisma/client';

// Skill types
export type SkillWithCount = Skill & {
  _count?: {
    creativeSkills: number;
  };
};

export type CreativeSkillWithDetails = CreativeSkill & {
  skill: Skill;
  creativeProfile: {
    id: string;
    user: {
      id: string;
      name: string;
      username: string | null;
    };
  };
};

// Request/Response types
export interface CreateSkillInput {
  name: string;
  slug: string;
}

export interface UpdateSkillInput {
  name?: string;
  slug?: string;
}

export interface AddCreativeSkillInput {
  skillId: string;
  level?: SkillLevel;
}

export interface UpdateCreativeSkillInput {
  level?: SkillLevel;
}
