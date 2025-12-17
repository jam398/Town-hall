'use client';

import { Calendar, FileText, AlertCircle } from 'lucide-react';
import { Button } from './Button';

type EmptyStateVariant = 'events' | 'posts' | 'generic';

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

const variantConfig: Record<EmptyStateVariant, { icon: typeof Calendar; defaultTitle: string; defaultDescription: string }> = {
  events: {
    icon: Calendar,
    defaultTitle: 'No upcoming events',
    defaultDescription: 'Check back soon for new workshops and community gatherings.',
  },
  posts: {
    icon: FileText,
    defaultTitle: 'No articles yet',
    defaultDescription: 'We\'re working on new content. Check back soon!',
  },
  generic: {
    icon: AlertCircle,
    defaultTitle: 'Nothing to show',
    defaultDescription: 'There\'s no content available at the moment.',
  },
};

export function EmptyState({
  variant = 'generic',
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 bg-swiss-light flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-swiss-gray" aria-hidden="true" />
      </div>
      <h3 className="text-h3 font-semibold text-swiss-black mb-2">
        {title || config.defaultTitle}
      </h3>
      <p className="text-body text-swiss-gray max-w-md mb-6">
        {description || config.defaultDescription}
      </p>
      {actionLabel && actionHref && (
        <Button href={actionHref} variant="outline" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
