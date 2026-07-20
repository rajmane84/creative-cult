import type { Request, Response, NextFunction } from 'express';
import { z, ZodType } from 'zod';
import { ValidationError } from '../util/errors';

type ValidationTarget = 'body' | 'params' | 'query';

export const validate = (
  schema: ZodType,
  target: ValidationTarget = 'body'
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req[target]);

    if (!parsed.success) {
      const { fieldErrors, formErrors } = z.flattenError(parsed.error);

      return next(
        new ValidationError('Validation failed', {
          errors: fieldErrors,
          ...(formErrors.length > 0 && { formErrors }),
        })
      );
    }

    // overwrite with parsed data so downstream code gets typed/transformed values
    req[target] = parsed.data;
    next();
  };
};
