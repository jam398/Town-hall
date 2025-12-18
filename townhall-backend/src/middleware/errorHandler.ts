import { Request, Response, NextFunction } from 'express';

export interface ValidationError {
  field: string;
  message: string;
}

export class ApiError extends Error {
  public details?: ValidationError[];
  
  constructor(
    public statusCode: number,
    public message: string,
    details?: ValidationError[]
  ) {
    super(message);
    this.name = 'ApiError';
    this.details = details;
  }

  /**
   * Create a validation error with field-level details
   */
  static validation(errors: ValidationError[]): ApiError {
    return new ApiError(400, 'Validation failed', errors);
  }
}

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err.message);

  if (err instanceof ApiError) {
    // Check if message is a JSON string (from validation middleware)
    let details = err.details;
    if (!details && err.message.startsWith('[')) {
      try {
        details = JSON.parse(err.message);
      } catch {
        // Not JSON, use message as-is
      }
    }

    return res.status(err.statusCode).json({
      success: false,
      error: details ? 'Validation failed' : err.message,
      details: details,
      code: err.statusCode === 400 ? 'VALIDATION_ERROR' : 
            err.statusCode === 429 ? 'RATE_LIMITED' :
            err.statusCode === 401 ? 'UNAUTHORIZED' : 'ERROR',
    });
  }

  // Default to 500 server error
  return res.status(500).json({
    success: false,
    error: 'Internal server error',
    code: 'SERVER_ERROR',
  });
};
