'use client';

import { useState } from 'react';
import { subscribeNewsletter, ApiError } from '@/lib/api';
import { validators } from '@/lib/validation';

interface NewsletterFormProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function NewsletterForm({ variant = 'dark', className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validators.email(email);
    if (emailError) {
      setStatus('error');
      setMessage(emailError);
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await subscribeNewsletter({ email });
      setStatus('success');
      setMessage(response.message || 'Successfully subscribed!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      if (error instanceof ApiError) {
        setMessage(error.message);
      } else {
        setMessage('Failed to subscribe. Please try again.');
      }
    }
  };

  const isDark = variant === 'dark';

  if (status === 'success') {
    return (
      <div className={`p-6 ${isDark ? 'bg-swiss-white/10' : 'bg-swiss-light'} ${className}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 flex items-center justify-center ${isDark ? 'bg-swiss-red' : 'bg-swiss-black'}`}>
            <svg className="w-5 h-5 text-swiss-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className={`font-semibold ${isDark ? 'text-swiss-white' : 'text-swiss-black'}`}>
              You&apos;re subscribed!
            </p>
            <p className={`text-body-sm ${isDark ? 'text-neutral-400' : 'text-swiss-gray'}`}>
              {message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === 'loading'}
            className={`w-full px-4 py-4 text-swiss-black bg-swiss-white border focus:outline-none focus:ring-2 focus:ring-swiss-red disabled:opacity-50 ${
              status === 'error' ? 'border-swiss-red' : 'border-swiss-border'
            }`}
            aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-8 py-4 bg-swiss-red text-swiss-white font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </div>
      {status === 'error' && (
        <p id="newsletter-error" className="mt-2 text-body-sm text-swiss-red" role="alert">
          {message}
        </p>
      )}
      <p className={`text-caption mt-4 ${isDark ? 'text-neutral-500' : 'text-swiss-gray'}`}>
        We respect your privacy. Unsubscribe anytime.
      </p>
    </form>
  );
}
