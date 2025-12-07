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

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
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
