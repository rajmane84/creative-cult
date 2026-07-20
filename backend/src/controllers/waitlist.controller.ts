import type { Request, Response } from 'express';
import { prisma } from '../util/prisma';
import { asyncHandler } from '../middlewares/asyncHandler';
import { BadRequestError } from '../util/errors/AppError';
import { ApiResponse } from '../util/response/ApiResponse';
import { Prisma } from '@prisma/client';

export const joinWaitlist = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, joinAs } = req.body;

    try {
      await prisma.waitlist.create({
        data: { email, joinAs },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002' // unique constraint violation
      ) {
        throw new BadRequestError('You are already on the waitlist.');
      }
      throw err;
    }

    // Get position
    const count = await prisma.waitlist.count();

    return ApiResponse.created(
      res,
      { position: count, email, joinAs },
      'Joined waitlist successfully'
    );
  }
);

export const getWaitlistCount = asyncHandler(
  async (req: Request, res: Response) => {
    const count = await prisma.waitlist.count();
    return ApiResponse.success(res, { count }, 'Waitlist count retrieved');
  }
);
