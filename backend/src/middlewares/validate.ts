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

    // Safely overwrite target with parsed data even if req[target] is a read-only property
    try {
      req[target] = parsed.data;
    } catch {
      try {
        Object.defineProperty(req, target, {
          value: parsed.data,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      } catch {
        if (req[target] && typeof req[target] === 'object') {
          Object.assign(req[target], parsed.data);
        }
      }
    }

    next();
  };
};
