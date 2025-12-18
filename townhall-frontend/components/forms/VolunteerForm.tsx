'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { submitVolunteerForm, ApiError } from '@/lib/api';
import { validators } from '@/lib/validation';
import { SITE_CONFIG } from '@/lib/constants';

const interestOptions = [
  { value: 'workshop-facilitator', label: 'Workshop Facilitator' },
  { value: 'event-support', label: 'Event Support' },
  { value: 'content-creator', label: 'Content Creator' },
  { value: 'community-ambassador', label: 'Community Ambassador' },
  { value: 'other', label: 'Other / Not Sure' },
];

const availabilityOptions = [
  { value: 'weekday-morning', label: 'Weekday Mornings' },
  { value: 'weekday-afternoon', label: 'Weekday Afternoons' },
  { value: 'weekday-evening', label: 'Weekday Evenings' },
  { value: 'weekend', label: 'Weekends' },
  { value: 'flexible', label: 'Flexible' },
];

export function VolunteerForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    availability: '',
    experience: '',
    motivation: '',
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

    const interestError = validators.required(formData.interest, 'Area of interest');
    if (interestError) newErrors.interest = 'Please select an area of interest';

    const motivationError = validators.required(formData.motivation, 'Motivation');
    if (motivationError) newErrors.motivation = 'Please tell us why you want to volunteer';

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
      await submitVolunteerForm({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        interest: formData.interest,
        availability: formData.availability || undefined,
        experience: formData.experience || undefined,
        motivation: formData.motivation,
      });
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof ApiError) {
        // Use the user-friendly message from ApiError
        setErrors({ submit: error.getUserMessage() });
        
        // If we have field-level validation errors, show them on the fields
        if (error.details && error.details.length > 0) {
          const fieldErrors: Record<string, string> = {};
          error.details.forEach(detail => {
            fieldErrors[detail.field] = detail.message;
          });
          setErrors(prev => ({ ...prev, ...fieldErrors }));
        }
      } else if (error instanceof Error) {
        // Network errors or other exceptions
        if (error.message.includes('fetch') || error.message.includes('network')) {
          setErrors({ submit: 'Unable to connect to server. Please check your internet connection.' });
        } else {
          setErrors({ submit: 'Something went wrong. Please try again.' });
        }
      } else {
        setErrors({ submit: 'Something went wrong. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8" role="alert" aria-live="polite">
        <div className="w-20 h-20 mx-auto mb-6 bg-swiss-light border border-swiss-border flex items-center justify-center">
          <svg
            className="w-10 h-10 text-black"
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
        <h3 className="text-2xl font-black uppercase mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">
          We&apos;ve received your volunteer application. Our team will review it and 
          get back to you within a week.
        </p>
        <p className="text-sm text-gray-500">
          In the meantime, join our <a href={SITE_CONFIG.discord} className="text-swiss-red hover:underline">Discord community</a> to connect with other volunteers.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate data-testid="volunteer-form">
      <div className="space-y-6">
        {/* Name */}
        <div className="grid md:grid-cols-2 gap-4">
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

        {/* Contact */}
        <div className="grid md:grid-cols-2 gap-4">
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
            data-testid="phone-input"
          />
        </div>

        {/* Interest & Availability */}
        <div className="grid md:grid-cols-2 gap-4">
          <Select
            label="Area of Interest"
            name="interest"
            required
            value={formData.interest}
            onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
            error={errors.interest}
            options={interestOptions}
            data-testid="interest-select"
          />
          <Select
            label="Availability"
            name="availability"
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            options={availabilityOptions}
            data-testid="availability-select"
          />
        </div>

        {/* Experience */}
        <Textarea
          label="Relevant Experience (Optional)"
          name="experience"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          placeholder="Tell us about any relevant skills or experience..."
          data-testid="experience-textarea"
        />

        {/* Motivation */}
        <Textarea
          label="Why do you want to volunteer?"
          name="motivation"
          required
          value={formData.motivation}
          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
          error={errors.motivation}
          placeholder="What draws you to Town Hall? What do you hope to contribute?"
          data-testid="motivation-textarea"
        />

        {errors.submit && (
          <p className="text-sm text-swiss-red" role="alert">
            {errors.submit}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          data-testid="submit-button"
        >
          Submit Application
        </Button>

        <p className="text-xs text-gray-500 text-center">
          We respect your privacy. Your information will only be used for volunteer coordination.
        </p>
      </div>
    </form>
  );
}
