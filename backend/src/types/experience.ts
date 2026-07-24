import type { Experience, EmploymentType } from '@prisma/client';

// Experience types
export type ExperienceWithProfile = Experience & {
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
export interface CreateExperienceInput {
  title: string;
  employmentType: EmploymentType;
  companyName?: string;
  industry?: string;
  startDate: string;
  endDate?: string;
  currentlyWorking?: boolean;
  description?: string;
  skills: string[];
}

export interface UpdateExperienceInput {
  title?: string;
  employmentType?: EmploymentType;
  companyName?: string;
  industry?: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking?: boolean;
  description?: string;
  skills?: string[];
}
