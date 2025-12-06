'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';

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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production:
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      setIsSuccess(true);
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8" role="alert" aria-live="polite">
        <div className="w-20 h-20 mx-auto mb-6 bg-bauhaus-blue flex items-center justify-center">
          <svg
            className="w-10 h-10 text-white"
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
        <h3 className="text-2xl font-black uppercase mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-4">
          Thank you for reaching out. We&apos;ll get back to you within 48 hours.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
          }}
          className="text-sm font-semibold uppercase tracking-wider text-bauhaus-blue hover:text-bauhaus-red transition-colors"
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
          <p className="text-sm text-bauhaus-red" role="alert">
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
