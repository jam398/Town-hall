import 'dotenv/config';
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
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3001', // Allow API docs/testing
  'http://localhost:8080', // Allow vlog viewer
  'null' // Allow file:// protocol for local HTML files
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps, curl, or file://)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

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
