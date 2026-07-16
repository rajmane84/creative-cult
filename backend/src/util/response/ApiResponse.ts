import type { Response } from 'express';

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

/**
 * Standard API response utility for consistent response structure
 */
export class ApiResponse {
  /**
   * Send a success response with data
   */
  static success<T>(
    res: Response,
    data: T,
    message?: string,
    statusCode: number = 200
  ): Response {
    const response: SuccessResponse<T> = {
      success: true,
      data,
      ...(message && { message }),
      meta: this.getMeta(res, statusCode),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Send a created response (201)
   */
  static created<T>(
    res: Response,
    data: T,
    message: string = 'Resource created successfully'
  ): Response {
    return this.success(res, data, message, 201);
  }

  /**
   * Send a no content response (204)
   */
  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  /**
   * Send a paginated response
   */
  static paginated<T>(
    res: Response,
    data: T[],
    pagination: PaginationMeta,
    message?: string
  ): Response {
    const response: SuccessResponse<T[]> = {
      success: true,
      data,
      ...(message && { message }),
      meta: this.getMeta(res, 200),
      pagination,
    };

    return res.status(200).json(response);
  }

  /**
   * Send an error response (useful for manual error responses)
   */
  static error(
    res: Response,
    message: string,
    statusCode: number = 500,
    context?: Record<string, unknown>
  ): Response {
    const response: ErrorResponse = {
      success: false,
      error: message,
      statusCode,
      ...(context && { context }),
    };

    return res.status(statusCode).json(response);
  }

  /**
   * Generate response metadata
   */
  private static getMeta(res: Response, statusCode: number): ResponseMeta {
    return {
      timestamp: new Date().toISOString(),
      path: res.req.path,
      method: res.req.method,
      statusCode,
    };
  }

  /**
   * Calculate pagination metadata
   */
  static calculatePagination(
    page: number,
    limit: number,
    total: number
  ): PaginationMeta {
    const totalPages = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }
}
