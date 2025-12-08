// Jest setup file for tests
import 'dotenv/config';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.SANITY_PROJECT_ID = 'pvm742xo';
process.env.SANITY_DATASET = 'production';
process.env.SANITY_API_VERSION = '2024-01-01';
process.env.PORT = '3001';
process.env.FRONTEND_URL = 'http://localhost:3000';

// Mock console methods during tests to reduce noise
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock rate limiters to not interfere with tests
jest.mock('../src/middleware/rateLimit', () => ({
  apiLimiter: (req: any, res: any, next: any) => next(),
  formLimiter: (req: any, res: any, next: any) => next(),
}));
