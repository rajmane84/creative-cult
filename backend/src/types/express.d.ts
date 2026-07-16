import 'express';

declare global {
  namespace Express {
    interface Request {
      session?: {
        session: {
          id: string;
          createdAt: Date;
          updatedAt: Date;
          userId: string;
          expiresAt: Date;
          token: string;
          ipAddress?: string | null | undefined;
          userAgent?: string | null | undefined;
        };
        user: {
          id: string;
          name: string;
          email: string;
          emailVerified: boolean;
          image?: string | null | undefined;
          role?: string | null | undefined;
        };
      } | null;
      user?: {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image?: string | null | undefined;
        role?: string | null | undefined;
      };
    }
  }
}
