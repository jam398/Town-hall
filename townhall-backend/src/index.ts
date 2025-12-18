import dotenv from 'dotenv';
import path from 'path';

// Load .env from backend directory
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });
console.log('📝 Loaded .env from:', envPath);
console.log('🗄️  SANITY_DATASET:', process.env.SANITY_DATASET);
console.log('🔑 SANITY_TOKEN:', process.env.SANITY_TOKEN ? '✅ Set' : '❌ Not set');
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { apiLimiter } from './middleware/rateLimit';
import { errorHandler } from './middleware/errorHandler';

// Import routes
import eventsRouter from './api/events';
import registrationsRouter from './api/registrations';
import blogRouter from './api/blog';
import vlogsRouter from './api/vlogs';
import volunteerRouter from './api/volunteer';
import contactRouter from './api/contact';
import healthRouter from './api/health';
import webhooksRouter from './api/webhooks';
import aiRouter from './api/ai';
import newsletterRouter from './api/newsletter';

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3001;
const isDev = process.env.NODE_ENV !== 'production';

// CORS configuration - MUST come before helmet for preflight requests
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // In development, allow all localhost origins
    if (isDev) {
      if (!origin || origin.startsWith('http://127.0.0.1:') || origin.startsWith('http://localhost:')) {
        callback(null, true);
        return;
      }
    }
    // Production CORS - Vercel, Render, ngrok, and local development
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'https://townhall-fronend.vercel.app',
      'http://localhost:3001',
      'http://localhost:8080',
      'null',
    ];
    
    // Allow Vercel preview/production deployments
    if (origin && (origin.endsWith('.vercel.app') || origin.includes('.vercel.app'))) {
      callback(null, true);
      return;
    }
    
    // Allow any ngrok URLs (they change frequently)
    if (origin && origin.includes('.ngrok')) {
      callback(null, true);
      return;
    }
    
    // Allow Render URLs (for backend-to-backend if needed)
    if (origin && origin.includes('.onrender.com')) {
      callback(null, true);
      return;
    }
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};
app.use(cors(corsOptions));

// Security middleware - after CORS
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use('/api/', apiLimiter);

// Routes
app.use('/api/health', healthRouter);
app.use('/api/events', eventsRouter);
app.use('/api/events', registrationsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/vlogs', vlogsRouter);
app.use('/api/volunteer', volunteerRouter);
app.use('/api/contact', contactRouter);
app.use('/api/webhooks', webhooksRouter);
app.use('/api/ai', aiRouter);
app.use('/api/newsletter', newsletterRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Town Hall Newark API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      events: '/api/events',
      register: '/api/events/register',
      blog: '/api/blog',
      vlogs: '/api/vlogs',
      volunteer: '/api/volunteer',
      contact: '/api/contact',
      newsletter: '/api/newsletter',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

// Handle server errors
server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

export default app;
