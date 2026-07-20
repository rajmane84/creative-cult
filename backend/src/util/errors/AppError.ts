type ValidationErrorContext = {
  errors: Record<string, string[] | undefined>;
  formErrors?: string[];
};

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly context?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: Record<string, unknown>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.context = context;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

// Predefined error classes for common HTTP status codes
export class BadRequestError extends AppError {
  constructor(
    message: string = 'Bad Request',
    context?: Record<string, unknown>
  ) {
    super(message, 400, true, context);
  }
}

export class UnauthorizedError extends AppError {
  constructor(
    message: string = 'Unauthorized',
    context?: Record<string, unknown>
  ) {
    super(message, 401, true, context);
  }
}

export class ForbiddenError extends AppError {
  constructor(
    message: string = 'Forbidden',
    context?: Record<string, unknown>
  ) {
    super(message, 403, true, context);
  }
}

export class NotFoundError extends AppError {
  constructor(
    message: string = 'Resource not found',
    context?: Record<string, unknown>
  ) {
    super(message, 404, true, context);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflict', context?: Record<string, unknown>) {
    super(message, 409, true, context);
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string = 'Validation failed',
    context?: ValidationErrorContext
  ) {
    super(message, 422, true, context);
  }
}

export class InternalServerError extends AppError {
  constructor(
    message: string = 'Internal server error',
    context?: Record<string, unknown>
  ) {
    super(message, 500, false, context);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(
    message: string = 'Service unavailable',
    context?: Record<string, unknown>
  ) {
    super(message, 503, true, context);
  }
}
