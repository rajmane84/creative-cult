export interface BetterAuthError {
  status: number;
  message: string;
  statusText?: string;
  error?: string;
}

export interface BetterAuthUser {
  id: string;
  email: string;
  name: string;
  role?: string;
  username?: string;
  creativeProfile?: unknown;
}

export interface BetterAuthSession {
  token: string;
  expiresAt: string;
  userId: string;
}

export interface BetterAuthLoginData {
  redirect: false;
  sessionToken: string;
  user: BetterAuthUser;
}

export interface BetterAuthSocialRedirectData {
  redirect: true;
  url: string;
}

export type BetterAuthLoginResponse =
  | {
      data: BetterAuthLoginData;
      error: null;
    }
  | {
      data: null;
      error: BetterAuthError;
    };

export type BetterAuthSocialResponse =
  | {
      data: BetterAuthSocialRedirectData;
      error: null;
    }
  | {
      data: BetterAuthLoginData;
      error: null;
    }
  | {
      data: null;
      error: BetterAuthError;
    };

export type BetterAuthSignupResponse = BetterAuthLoginResponse;
