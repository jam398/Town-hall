'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

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
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, eventSlug }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      setIsSuccess(true);
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-6" role="alert" aria-live="polite">
        <div className="w-16 h-16 mx-auto mb-4 bg-bauhaus-yellow flex items-center justify-center">
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
          <p className="text-sm text-bauhaus-red" role="alert">
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
