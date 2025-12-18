'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { submitContactForm, ApiError } from '@/lib/api';
import { validators } from '@/lib/validation';

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'media', label: 'Media / Press' },
  { value: 'sponsorship', label: 'Sponsorship' },
  { value: 'feedback', label: 'Feedback / Suggestion' },
  { value: 'other', label: 'Other' },
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const nameError = validators.required(formData.name, 'Name');
    if (nameError) newErrors.name = nameError;

    const emailError = validators.email(formData.email);
    if (emailError) newErrors.email = emailError;

    const subjectError = validators.required(formData.subject, 'Subject');
    if (subjectError) newErrors.subject = 'Please select a subject';

    const messageError = validators.required(formData.message, 'Message');
    if (messageError) {
      newErrors.message = messageError;
    } else {
      const minLengthError = validators.minLength(formData.message, 10, 'Message');
      if (minLengthError) newErrors.message = minLengthError;
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
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
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
        <div className="w-20 h-20 mx-auto mb-6 bg-swiss-black flex items-center justify-center">
          <svg
            className="w-10 h-10 text-swiss-white"
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
        <h3 className="text-h2 font-bold text-swiss-black mb-2">Message Sent!</h3>
        <p className="text-swiss-gray mb-4">
          Thank you for reaching out. We&apos;ll get back to you within 48 hours.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
          }}
          className="text-body-sm font-semibold text-swiss-black hover:text-swiss-red transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate data-testid="contact-form">
      <div className="space-y-6">
        <Input
          label="Your Name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          autoComplete="name"
          data-testid="name-input"
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          autoComplete="email"
          data-testid="email-input"
        />

        <Select
          label="Subject"
          name="subject"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          error={errors.subject}
          options={subjectOptions}
          data-testid="subject-select"
        />

        <Textarea
          label="Message"
          name="message"
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          error={errors.message}
          placeholder="How can we help you?"
          className="min-h-[150px]"
          data-testid="message-textarea"
        />

        {errors.submit && (
          <p className="text-body-sm text-swiss-red" role="alert">
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
          Send Message
        </Button>
      </div>
    </form>
  );
}
