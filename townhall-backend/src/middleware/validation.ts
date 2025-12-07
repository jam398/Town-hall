import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from './errorHandler';

// Validation schemas
export const registrationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  eventSlug: z.string().min(1, 'Event slug is required'),
});

export const volunteerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  interest: z.string().min(1, 'Interest area is required'),
  availability: z.string().optional(),
  experience: z.string().optional(),
  motivation: z.string().min(10, 'Please tell us why you want to volunteer'),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Middleware to validate request body
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        throw new ApiError(400, JSON.stringify(errors));
      }
      next(error);
    }
  };
};
