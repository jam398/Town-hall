import { 
  cn, 
  formatDate, 
  formatTime, 
  truncate, 
  slugify, 
  debounce,
  getShareUrls,
  generateGoogleCalendarUrl,
} from '@/lib/utils';

describe('cn (classNames)', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('foo', true && 'bar', false && 'baz')).toBe('foo bar');
  });

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });

  it('merges Tailwind classes correctly', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles arrays', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar');
  });

  it('handles objects', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });
});

describe('formatDate', () => {
  it('formats date string correctly', () => {
    const result = formatDate('2024-12-20');
    expect(result).toContain('December');
    expect(result).toContain('20');
    expect(result).toContain('2024');
  });

  it('formats Date object correctly', () => {
    const date = new Date('2024-12-20');
    const result = formatDate(date);
    expect(result).toContain('December');
  });

  it('accepts custom options', () => {
    const result = formatDate('2024-12-20', { month: 'short' });
    expect(result).toContain('Dec');
  });
});

describe('formatTime', () => {
  it('formats 24h time to 12h format', () => {
    expect(formatTime('14:30')).toBe('2:30 PM');
    expect(formatTime('09:00')).toBe('9:00 AM');
  });

  it('handles midnight', () => {
    expect(formatTime('00:00')).toBe('12:00 AM');
  });

  it('handles noon', () => {
    expect(formatTime('12:00')).toBe('12:00 PM');
  });

  it('handles single digit minutes', () => {
    expect(formatTime('14:05')).toBe('2:05 PM');
  });
});

describe('truncate', () => {
  it('truncates long text', () => {
    const text = 'This is a very long text that should be truncated';
    expect(truncate(text, 20)).toBe('This is a very long...');
  });

  it('does not truncate short text', () => {
    const text = 'Short text';
    expect(truncate(text, 20)).toBe('Short text');
  });

  it('handles exact length', () => {
    const text = 'Exactly twenty chars';
    expect(truncate(text, 20)).toBe('Exactly twenty chars');
  });

  it('handles empty string', () => {
    expect(truncate('', 10)).toBe('');
  });
});

describe('slugify', () => {
  it('converts text to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('handles multiple spaces', () => {
    expect(slugify('Hello   World')).toBe('hello-world');
  });

  it('handles leading/trailing spaces', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world');
  });

  it('converts to lowercase', () => {
    expect(slugify('HELLO WORLD')).toBe('hello-world');
  });

  it('handles numbers', () => {
    expect(slugify('Event 2024')).toBe('event-2024');
  });
});

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('delays function execution', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('only executes once for multiple calls', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments to the function', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('arg1', 'arg2');
    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('resets timer on subsequent calls', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    jest.advanceTimersByTime(50);
    debouncedFn();
    jest.advanceTimersByTime(50);
    
    expect(fn).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('getShareUrls', () => {
  const url = 'https://example.com/post';
  const title = 'Test Post';

  it('generates Twitter share URL', () => {
    const urls = getShareUrls(url, title);
    expect(urls.twitter).toContain('twitter.com');
    expect(urls.twitter).toContain(encodeURIComponent(url));
    expect(urls.twitter).toContain(encodeURIComponent(title));
  });

  it('generates Facebook share URL', () => {
    const urls = getShareUrls(url, title);
    expect(urls.facebook).toContain('facebook.com');
    expect(urls.facebook).toContain(encodeURIComponent(url));
  });

  it('generates LinkedIn share URL', () => {
    const urls = getShareUrls(url, title);
    expect(urls.linkedin).toContain('linkedin.com');
    expect(urls.linkedin).toContain(encodeURIComponent(url));
  });

  it('generates email share URL', () => {
    const urls = getShareUrls(url, title);
    expect(urls.email).toContain('mailto:');
    expect(urls.email).toContain(encodeURIComponent(title));
    expect(urls.email).toContain(encodeURIComponent(url));
  });
});

describe('generateGoogleCalendarUrl', () => {
  const event = {
    title: 'AI Workshop',
    description: 'Learn about AI',
    location: 'Newark Library',
    startDate: '2025-01-15',
    startTime: '18:00',
    endTime: '20:00',
  };

  it('generates valid Google Calendar URL', () => {
    const url = generateGoogleCalendarUrl(event);
    expect(url).toContain('calendar.google.com');
    expect(url).toContain('action=TEMPLATE');
  });

  it('includes event title', () => {
    const url = generateGoogleCalendarUrl(event);
    expect(url).toContain('AI+Workshop');
  });

  it('includes event location', () => {
    const url = generateGoogleCalendarUrl(event);
    expect(url).toContain('Newark');
  });

  it('includes date range', () => {
    const url = generateGoogleCalendarUrl(event);
    expect(url).toContain('dates=');
  });

  it('handles missing optional fields', () => {
    const minimalEvent = {
      title: 'Simple Event',
      startDate: '2025-01-15',
      startTime: '18:00',
    };
    const url = generateGoogleCalendarUrl(minimalEvent);
    expect(url).toContain('calendar.google.com');
  });
});
