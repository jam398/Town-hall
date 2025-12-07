import rateLimit from 'express-rate-limit';

// General API rate limit
export const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // 100 requests per minute
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limit for POST endpoints (forms)
export const formLimiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 5, // 5 submissions per minute
  message: 'Too many submissions, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
