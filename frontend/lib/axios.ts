import axios, { AxiosError } from 'axios';
import { ApiError, type ApiResponse, type ErrorResponse } from '@/types/api';

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

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth headers here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const data = response.data as ApiResponse;

    // If response indicates failure, throw an error
    if (data.success === false) {
      const errorResponse = data as ErrorResponse;
      throw new ApiError(
        errorResponse.error || 'Request failed',
        errorResponse.statusCode,
        errorResponse.context,
        errorResponse.stack
      );
    }

    // Return the response with typed data
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    // Handle common error cases
    if (error.response) {
      const data = error.response.data;

      // If backend returned an error response format
      if (data && typeof data === 'object' && 'success' in data) {
        if (data.success === false) {
          throw new ApiError(
            data.error || 'Request failed',
            data.statusCode || error.response.status,
            data.context,
            data.stack
          );
        }
      }

      // Handle HTTP status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login or refresh token
          console.error('Unauthorized access');
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          break;
        case 403:
          console.error('Forbidden access');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('An error occurred:', data?.error || error.message);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('No response received:', error.message);
    } else {
      // Error in request setup
      console.error('Request setup error:', error.message);
    }

    // Reject with original error if not handled above
    return Promise.reject(error);
  }
);

export default axiosInstance;
