/**
 * Centralized constants for Town Hall
 * Single source of truth for content that appears across multiple pages
 */

export const SITE_CONFIG = {
  name: 'Town Hall',
  tagline: "Newark's AI Community Hub",
  description: 'Newark\'s nonprofit community hub for AI education, workshops, and events.',
  email: 'hello@townhallnewark.org',
  location: 'Newark, New Jersey',
  discord: 'https://discord.gg/UhFn3aQvrK',
  twitter: 'https://twitter.com/townhallnewark',
  linkedin: 'https://linkedin.com/company/townhallnewark',
  youtube: 'https://youtube.com/@townhallnewark',
} as const;

export const SITE_STATS = {
  communityMembers: '500+',
  workshopsHeld: '50+',
  freeToAttend: '100%',
  newEvents: 'Weekly',
  totalVlogs: '24',
  totalViews: '15K+',
  subscribers: '1.2K',
  totalArticles: '45+',
  contributors: '12',
  monthlyReaders: '5K+',
  upcomingEvents: '8',
  pastEvents: '50+',
  attendees: '2K+',
} as const;

export const NAV_LINKS = [
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Blog' },
  { href: '/vlogs', label: 'Vlogs' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const FOOTER_LINKS = {
  explore: [
    { href: '/events', label: 'Events' },
    { href: '/blog', label: 'Blog' },
    { href: '/vlogs', label: 'Vlogs' },
  ],
  getInvolved: [
    { href: '/volunteer', label: 'Volunteer' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/about', label: 'About Us' },
  ],
  connect: [
    { href: SITE_CONFIG.discord, label: 'Discord', external: true },
    { href: SITE_CONFIG.twitter, label: 'Twitter', external: true },
    { href: SITE_CONFIG.linkedin, label: 'LinkedIn', external: true },
  ],
} as const;

export const SOCIAL_LINKS = [
  { name: 'Discord', href: SITE_CONFIG.discord },
  { name: 'Twitter', href: SITE_CONFIG.twitter },
  { name: 'LinkedIn', href: SITE_CONFIG.linkedin },
  { name: 'YouTube', href: SITE_CONFIG.youtube },
] as const;
