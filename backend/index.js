#!/usr/bin/env node
'use strict';

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Basic middleware
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan(process.env.LOG_FORMAT || 'combined'));

// CORS configuration
app.use(cors({
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Try to mount API routes if present
try {
  // If your routes export an Express router (adjust path if different).
  // If your routes are in backend/routes/index.js set module.exports = router in that file.
  const apiRouter = require('./routes');
  app.use('/api', apiRouter);
} catch (err) {
  // If routes folder is missing, keep server running; log error for visibility
  console.warn('No API routes mounted (./routes not found or failed to load):', err && err.message ? err.message : err);
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  res.status(err && err.status ? err.status : 500).json({
    error: (process.env.NODE_ENV === 'production') ? 'Internal Server Error' : (err && err.message) || 'Unknown error'
  });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT} (ENV=${process.env.NODE_ENV || 'development'})`);
});

// Graceful shutdown
function shutdown(signal) {
  console.log(`Received ${signal}. Closing server...`);
  server.close(err => {
    if (err) {
      console.error('Error closing server:', err);
      process.exit(1);
    }
    console.log('Server closed gracefully.');
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
  // Optionally notify monitoring service here
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('unhandledRejection', reason);
  // Optionally record or alert here
});
