/**
 * Centralized validation utilities
 * Single source of truth for form validation logic
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validators = {
  required: (value: string, fieldName: string = 'This field'): string | null => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    return null;
  },

  email: (value: string): string | null => {
    if (!value.trim()) {
      return 'Email is required';
    }
    if (!EMAIL_REGEX.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  minLength: (value: string, min: number, fieldName: string = 'This field'): string | null => {
    if (value.trim().length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return null;
  },

  phone: (value: string): string | null => {
    if (!value.trim()) return null; // Phone is usually optional
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number';
    }
    return null;
  },
};

export type ValidationErrors = Record<string, string>;

export function validateForm<T extends Record<string, unknown>>(
  data: T,
  rules: Record<keyof T, ((value: string) => string | null)[]>
): ValidationErrors {
  const errors: ValidationErrors = {};

  for (const [field, validators] of Object.entries(rules)) {
    const value = String(data[field] || '');
    for (const validate of validators as ((value: string) => string | null)[]) {
      const error = validate(value);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }

  return errors;
}
