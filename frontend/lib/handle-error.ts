import { toast } from 'sonner';
import { ApiError } from '@/types/api';

interface ErrorContext {
  errors?: Record<string, string[]>;
  formErrors?: string[];
}

/**
 * Pulls the first usable message out of a Zod-style validation error context.
 * Shared by every place that needs to turn `{ errors, formErrors }` into one string.
 */
function extractValidationMessage(context?: ErrorContext): string | undefined {
  if (!context) return undefined;

  const fieldErrors = context.errors
    ? Object.values(context.errors).flat()
    : [];
  if (fieldErrors.length > 0) return fieldErrors[0];

  if (context.formErrors && context.formErrors.length > 0) {
    return context.formErrors[0];
  }

  return undefined;
}

/**
 * Parses an API error and shows a toast.
 *
 * NOTE: this assumes every request goes through `axiosInstance`, whose response
 * interceptor already normalizes every failure (network error, non-2xx, or
 * success:false payload) into an `ApiError`. If that assumption ever breaks
 * (e.g. something calls raw `axios` instead of `axiosInstance`), this will just
 * fall through to the generic Error/defaultMessage branches below rather than
 * silently failing.
 */
export function handleApiError(
  error: unknown,
  defaultMessage = 'An unexpected error occurred'
) {
  if (error instanceof ApiError) {
    if (error.statusCode === 422) {
      const message = extractValidationMessage(
        error.context as ErrorContext | undefined
      );
      if (message) {
        toast.error(message);
        return;
      }
    }

    if (error.message) {
      toast.error(error.message);
      return;
    }
  }

  // Fallback for native JS errors (offline, CORS, runtime errors, etc.)
  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  // Anything else: strings, null, undefined, non-Error throwables
  toast.error(defaultMessage);
}
