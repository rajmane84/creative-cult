import {
  AvailabilityStatus,
  SkillLevel,
  EmploymentType,
  Degree,
} from '@prisma/client';

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

export interface CreativeProfile {
  id: string;
  headline?: string | null;
  bio?: string | null;
  location?: string | null;
  availability: AvailabilityStatus;
  onboardingCompleted: boolean;
  resumeUrl?: string | null;
  resumeFileName?: string | null;
  resumeUploadedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
}

export interface CreativeSkill {
  id: string;
  name: string;
  level?: SkillLevel | null;
  skill: Skill;
}

export interface Experience {
  id: string;
  title: string;
  employmentType: EmploymentType;
  companyName?: string | null;
  industry?: string | null;
  startDate: Date;
  endDate?: Date | null;
  currentlyWorking: boolean;
  description?: string | null;
  skills: string[];
}

export interface Education {
  id: string;
  country: string;
  school: string;
  degree: Degree;
  fieldOfStudy: string;
  yearOfGraduation: string;
}

export interface ProfileData {
  user: UserProfile;
  creativeProfile: CreativeProfile & {
    skills: CreativeSkill[];
    experiences: Experience[];
    education: Education[];
  };
}

export interface UpdateProfileData {
  headline?: string;
  bio?: string;
  availability?: AvailabilityStatus;
}

export interface UpdateSkillsData {
  skills: Array<{
    name: string;
    expertise?: SkillLevel;
  }>;
}

export interface UpdateAvailabilityData {
  availability: AvailabilityStatus;
}
