import { validators, validateForm, EMAIL_REGEX } from '@/lib/validation';

describe('validators', () => {
  describe('required', () => {
    it('returns error for empty string', () => {
      expect(validators.required('', 'Name')).toBe('Name is required');
    });

    it('returns error for whitespace-only string', () => {
      expect(validators.required('   ', 'Name')).toBe('Name is required');
    });

    it('returns null for valid string', () => {
      expect(validators.required('John', 'Name')).toBeNull();
    });

    it('uses default field name', () => {
      expect(validators.required('')).toBe('This field is required');
    });
  });

  describe('email', () => {
    it('returns error for empty email', () => {
      expect(validators.email('')).toBe('Email is required');
    });

    it('returns error for invalid email format', () => {
      expect(validators.email('invalid')).toBe('Please enter a valid email address');
      expect(validators.email('invalid@')).toBe('Please enter a valid email address');
      expect(validators.email('@domain.com')).toBe('Please enter a valid email address');
      expect(validators.email('test@domain')).toBe('Please enter a valid email address');
    });

    it('returns null for valid email', () => {
      expect(validators.email('test@example.com')).toBeNull();
      expect(validators.email('user.name@domain.org')).toBeNull();
      expect(validators.email('user+tag@example.co.uk')).toBeNull();
    });
  });

  describe('minLength', () => {
    it('returns error when string is too short', () => {
      expect(validators.minLength('hi', 5, 'Message')).toBe('Message must be at least 5 characters');
    });

    it('returns null when string meets minimum length', () => {
      expect(validators.minLength('hello', 5, 'Message')).toBeNull();
    });

    it('returns null when string exceeds minimum length', () => {
      expect(validators.minLength('hello world', 5, 'Message')).toBeNull();
    });

    it('trims whitespace before checking', () => {
      expect(validators.minLength('  hi  ', 5, 'Message')).toBe('Message must be at least 5 characters');
    });
  });

  describe('phone', () => {
    it('returns null for empty phone (optional field)', () => {
      expect(validators.phone('')).toBeNull();
      expect(validators.phone('   ')).toBeNull();
    });

    it('returns error for invalid phone format', () => {
      expect(validators.phone('123')).toBe('Please enter a valid phone number');
      expect(validators.phone('abc')).toBe('Please enter a valid phone number');
    });

    it('returns null for valid phone formats', () => {
      expect(validators.phone('1234567890')).toBeNull();
      expect(validators.phone('123-456-7890')).toBeNull();
      expect(validators.phone('(123) 456-7890')).toBeNull();
      expect(validators.phone('+1 123 456 7890')).toBeNull();
    });
  });
});

describe('EMAIL_REGEX', () => {
  it('matches valid emails', () => {
    expect(EMAIL_REGEX.test('test@example.com')).toBe(true);
    expect(EMAIL_REGEX.test('user.name@domain.org')).toBe(true);
  });

  it('does not match invalid emails', () => {
    expect(EMAIL_REGEX.test('invalid')).toBe(false);
    expect(EMAIL_REGEX.test('@domain.com')).toBe(false);
  });
});

describe('validateForm', () => {
  it('returns empty object when all validations pass', () => {
    const data = { name: 'John', email: 'john@example.com' };
    const rules = {
      name: [(v: string) => validators.required(v, 'Name')],
      email: [(v: string) => validators.email(v)],
    };
    
    const errors = validateForm(data, rules);
    expect(errors).toEqual({});
  });

  it('returns errors for failed validations', () => {
    const data = { name: '', email: 'invalid' };
    const rules = {
      name: [(v: string) => validators.required(v, 'Name')],
      email: [(v: string) => validators.email(v)],
    };
    
    const errors = validateForm(data, rules);
    expect(errors.name).toBe('Name is required');
    expect(errors.email).toBe('Please enter a valid email address');
  });

  it('stops at first error for each field', () => {
    const data = { message: '' };
    const rules = {
      message: [
        (v: string) => validators.required(v, 'Message'),
        (v: string) => validators.minLength(v, 10, 'Message'),
      ],
    };
    
    const errors = validateForm(data, rules);
    expect(errors.message).toBe('Message is required');
  });
});
