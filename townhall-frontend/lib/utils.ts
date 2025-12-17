import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 * Handles conditional classes and deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Predefined date format presets for consistent formatting across the app
 */
export const DATE_FORMATS = {
  // "February 15, 2024"
  full: { year: 'numeric', month: 'long', day: 'numeric' } as const,
  // "Feb 15, 2024"
  short: { year: 'numeric', month: 'short', day: 'numeric' } as const,
  // "Thursday, February 15"
  weekday: { weekday: 'long', month: 'long', day: 'numeric' } as const,
  // "FEB"
  monthShort: { month: 'short' } as const,
  // "15"
  dayOnly: { day: 'numeric' } as const,
  // "February 2024"
  monthYear: { year: 'numeric', month: 'long' } as const,
};

type DateFormatPreset = keyof typeof DATE_FORMATS;

/**
 * Format date for display
 * @param date - Date string or Date object
 * @param format - Preset format name or custom Intl.DateTimeFormatOptions
 */
export function formatDate(
  date: string | Date, 
  format: DateFormatPreset | Intl.DateTimeFormatOptions = 'full'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const options = typeof format === 'string' ? DATE_FORMATS[format] : format;
  return d.toLocaleDateString('en-US', options);
}

/**
 * Get date parts for custom display (e.g., large day number with month label)
 */
export function getDateParts(date: string | Date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  return {
    day: d.getDate(),
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    monthLong: d.toLocaleDateString('en-US', { month: 'long' }),
    year: d.getFullYear(),
    weekday: d.toLocaleDateString('en-US', { weekday: 'long' }),
  };
}

/**
 * Format time for display
 */
export function formatTime(time: string): string {
  // Handle 24h format or 12h format
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Generate Google Calendar URL
 */
export function generateGoogleCalendarUrl(event: {
  title: string;
  description?: string;
  location?: string;
  startDate: string;
  startTime: string;
  endTime?: string;
}): string {
  const { title, description, location, startDate, startTime, endTime } = event;
  
  // Parse date and time
  const start = new Date(`${startDate}T${startTime}`);
  const end = endTime 
    ? new Date(`${startDate}T${endTime}`)
    : new Date(start.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours
  
  // Format for Google Calendar (YYYYMMDDTHHmmss)
  const formatGoogleDate = (d: Date) => 
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
    details: description || '',
    location: location || '',
  });
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate iCal file content
 */
export function generateICalContent(event: {
  title: string;
  description?: string;
  location?: string;
  startDate: string;
  startTime: string;
  endTime?: string;
}): string {
  const { title, description, location, startDate, startTime, endTime } = event;
  
  const start = new Date(`${startDate}T${startTime}`);
  const end = endTime 
    ? new Date(`${startDate}T${endTime}`)
    : new Date(start.getTime() + 2 * 60 * 60 * 1000);
  
  const formatICalDate = (d: Date) => 
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Town Hall Newark//Event//EN
BEGIN:VEVENT
DTSTART:${formatICalDate(start)}
DTEND:${formatICalDate(end)}
SUMMARY:${title}
DESCRIPTION:${description || ''}
LOCATION:${location || ''}
END:VEVENT
END:VCALENDAR`;
}

/**
 * Download iCal file
 */
export function downloadICal(event: {
  title: string;
  description?: string;
  location?: string;
  startDate: string;
  startTime: string;
  endTime?: string;
}): void {
  const content = generateICalContent(event);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.title.replace(/\s+/g, '-').toLowerCase()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Generate share URLs
 */
export function getShareUrls(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  };
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Slugify string
 */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}
