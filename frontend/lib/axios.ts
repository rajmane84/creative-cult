import axios, { AxiosError } from 'axios';
import { ApiError, type ErrorResponse, isSuccessResponse } from '@/types/api';

const baseURL = `${
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000'
}/api/v1`;

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies for authentication
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // If response indicates failure, throw an error
    if (!isSuccessResponse(response.data)) {
      const errorResponse = response.data as ErrorResponse;
      throw new ApiError(
        errorResponse.error || 'Request failed',
        errorResponse.statusCode,
        errorResponse.context,
        errorResponse.stack
      );
    }

    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      // Request made, and an error response received ( 4**, 5** status code response )
      const data = error.response.data;
      const status = error.response.status || data.statusCode;

      // Fallback: If backend didn't return proper error format, handle by status code
      if (!(
        data &&
        typeof data === 'object' &&
        'success' in data &&
        data.success === false
      )) {
        switch (status) {
          case 400: // BadRequestError
            console.error('Bad request:', data?.error || error.message);
            throw new ApiError(
              data?.error || 'Bad request',
              400,
              data?.context
            );
          case 401: // UnauthorizedError
            console.error('Unauthorized access');
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            throw new ApiError(
              data?.error || 'Unauthorized',
              401,
              data?.context
            );
          case 403: // ForbiddenError
            console.error('Forbidden access');
            throw new ApiError(data?.error || 'Forbidden', 403, data?.context);
          case 404: // NotFoundError
            console.error('Resource not found');
            throw new ApiError(
              data?.error || 'Resource not found',
              404,
              data?.context
            );
          case 409: // ConflictError
            console.error('Conflict:', data?.error || error.message);
            throw new ApiError(data?.error || 'Conflict', 409, data?.context);
          case 422: // ValidationError
            console.error('Validation error:', data?.error || error.message);
            throw new ApiError(
              data?.error || 'Validation failed',
              422,
              data?.context
            );
          case 500: // InternalServerError
            console.error('Server error');
            throw new ApiError(
              data?.error || 'Internal server error',
              500,
              data?.context
            );
          case 503: // ServiceUnavailableError
            console.error('Service unavailable');
            throw new ApiError(
              data?.error || 'Service unavailable',
              503,
              data?.context
            );
          default:
            console.error('An error occurred:', data?.error || error.message);
            throw new ApiError(
              data?.error || 'Request failed',
              status,
              data?.context
            );
        }
      }

      // Backend returned proper error response format - use it directly
      throw new ApiError(
        data.error || 'Request failed',
        data.statusCode || status,
        data.context,
        data.stack
      );
    } else if (error.request) {
      // Request made but no response received
      console.error('No response received:', error.message);
      throw new ApiError('Network error - no response received');
    } else {
      // Error in request setup
      console.error('Request setup error:', error.message);
      throw new ApiError('Request setup error');
    }
  }
);

export default axiosInstance;
