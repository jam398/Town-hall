declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props: Record<string, string> }
    ) => void;
  }
}

export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(name, props ? { props } : undefined);
  }
}

export function trackFormSubmission(formName: string) {
  trackEvent('Form Submission', { form: formName });
}

export function trackEventRegistration(eventSlug: string) {
  trackEvent('Event Registration', { event: eventSlug });
}

export function trackVolunteerSignup(interest: string) {
  trackEvent('Volunteer Signup', { interest });
}

export function trackNewsletterSubscribe() {
  trackEvent('Newsletter Subscribe');
}

export function trackContactSubmission() {
  trackEvent('Contact Form Submit');
}
