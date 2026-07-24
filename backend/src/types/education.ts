import type { Education, Degree } from '@prisma/client';

// Education types
export type EducationWithProfile = Education & {
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
export interface CreateEducationInput {
  country: string;
  school: string;
  degree: Degree;
  fieldOfStudy: string;
  yearOfGraduation: string;
}

export interface UpdateEducationInput {
  country?: string;
  school?: string;
  degree?: Degree;
  fieldOfStudy?: string;
  yearOfGraduation?: string;
}
