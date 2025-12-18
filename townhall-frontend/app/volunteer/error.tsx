'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function VolunteerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Volunteer page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-swiss-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 bg-swiss-red/10 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-swiss-red" aria-hidden="true" />
        </div>
        <h1 className="text-h2 font-bold text-swiss-black mb-4">
          Something went wrong
        </h1>
        <p className="text-body text-swiss-gray mb-8">
          We couldn&apos;t load the volunteer page. Please try again.
        </p>
        <Button onClick={reset} variant="primary">
          Try Again
        </Button>
      </div>
    </div>
  );
}
