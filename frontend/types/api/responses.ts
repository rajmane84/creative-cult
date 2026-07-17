import { UserRole } from '..';

// User-related response types
export interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  username?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateRoleResponse = UserResponse;

export interface CheckUsernameResponse {
  available: boolean;
}

// Creative-related response types
export interface CreativeProfileResponse {
  id: string;
  userId: string;
  headline?: string;
  bio?: string;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreativeOnboardingResponse {
  user: UserResponse;
  creativeProfile: CreativeProfileResponse;
}
