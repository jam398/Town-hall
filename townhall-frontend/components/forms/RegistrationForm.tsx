'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { registerForEvent, ApiError } from '@/lib/api';
import { validators } from '@/lib/validation';

interface RegistrationFormProps {
  eventSlug: string;
  eventTitle: string;
}

export function RegistrationForm({ eventSlug, eventTitle }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const firstNameError = validators.required(formData.firstName, 'First name');
    if (firstNameError) newErrors.firstName = firstNameError;

    const lastNameError = validators.required(formData.lastName, 'Last name');
    if (lastNameError) newErrors.lastName = lastNameError;

    const emailError = validators.email(formData.email);
    if (emailError) newErrors.email = emailError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await registerForEvent({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        eventSlug,
      });
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors({ submit: error.message });
      } else {
        setErrors({ submit: 'Something went wrong. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-6" role="alert" aria-live="polite">
        <div className="w-16 h-16 mx-auto mb-4 bg-swiss-light border border-swiss-border flex items-center justify-center">
          <svg
            className="w-8 h-8 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">You&apos;re Registered!</h3>
        <p className="text-gray-600 text-sm mb-4">
          Check your email for confirmation and event details.
        </p>
        <p className="text-xs text-gray-500">
          Registered for: {eventTitle}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate data-testid="registration-form">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            error={errors.firstName}
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Last Name"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            error={errors.lastName}
            autoComplete="family-name"
            data-testid="last-name-input"
          />
        </div>

        <Input
          label="Email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          autoComplete="email"
          data-testid="email-input"
        />

        <Input
          label="Phone (Optional)"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          autoComplete="tel"
          helperText="For event reminders only"
          data-testid="phone-input"
        />

        {errors.submit && (
          <p className="text-sm text-swiss-red" role="alert">
            {errors.submit}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isSubmitting}
          data-testid="submit-button"
        >
          Register Now
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By registering, you agree to receive event-related communications.
        </p>
      </div>
    </form>
  );
}
