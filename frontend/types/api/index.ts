// Backend response interfaces

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ResponseMeta {
  timestamp: string;
  path: string;
  method: string;
  statusCode: number;
}

export interface SuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
  meta?: ResponseMeta;
  pagination?: PaginationMeta;
}

export interface ErrorResponse {
  success: false;
  error: string;
  statusCode?: number;
  context?: Record<string, unknown>;
  stack?: string;
}

export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

// Custom error class for API errors.
// Note: `stack` here is intentionally overridden with the backend's
// reported stack trace (if provided), not the JS runtime's captured trace.
export class ApiError extends Error {
  public statusCode?: number;
  public context?: Record<string, unknown>;
  public override stack?: string;

  constructor(
    message: string,
    statusCode?: number,
    context?: Record<string, unknown>,
    stack?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.context = context;
    this.stack = stack;
  }
}
