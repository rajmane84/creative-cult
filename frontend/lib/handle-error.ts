import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface ApiErrorResponse {
  success: false;
  error: string;
  statusCode: number;
  context?: {
    errors?: Record<string, string[]>;
    formErrors?: string[];
  };
  stack?: string;
}

/**
 * Parses an API error (usually from Axios) and displays a suitable toast message.
 * Extracts field-specific Zod validation errors if available.
 */
export function handleApiError(
  error: unknown,
  defaultMessage = 'An unexpected error occurred'
) {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    // Handle Zod validation errors (usually 422 Unprocessable Entity)
    if (data?.statusCode === 422 && data.context) {
      if (data.context.errors) {
        // Extract the first field error string
        const fieldErrors = Object.values(data.context.errors).flat();
        if (fieldErrors.length > 0) {
          toast.error(fieldErrors[0]);
          return;
        }
      }
      if (data.context.formErrors && data.context.formErrors.length > 0) {
        toast.error(data.context.formErrors[0]);
        return;
      }
    }

    // Handle other known API errors (e.g. 400 Bad Request, 409 Conflict)
    if (data?.error) {
      toast.error(data.error);
      return;
    }
  }

  // Fallback for native JS Errors (e.g. network down)
  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  // Absolute fallback
  toast.error(defaultMessage);
}
