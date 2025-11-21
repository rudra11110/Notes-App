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
app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Try to mount API routes if present. Support several export styles:
// - module.exports = router (Express Router)
// - module.exports = (app) => { app.get(...); }
// - export default router (ESM compiled to CommonJS has .default)
try {
  const apiModule = require('./routes');
  if (!apiModule) {
    console.warn('Routes module returned falsy value; skipping mount.');
  } else if (typeof apiModule === 'function') {
    const maybeRouter = apiModule(app);
    if (maybeRouter && typeof maybeRouter.use === 'function') {
      app.use('/api', maybeRouter);
    }
  } else if (apiModule.default && typeof apiModule.default === 'function') {
    const maybeRouter = apiModule.default(app);
    if (maybeRouter && typeof maybeRouter.use === 'function') {
      app.use('/api', maybeRouter);
    } else {
      app.use('/api', apiModule.default);
    }
  } else {
    app.use('/api', apiModule);
  }
} catch (err) {
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
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : (err && err.message) || 'Unknown error',
  });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT} (ENV=${process.env.NODE_ENV || 'development'})`);
});

// Graceful shutdown
function shutdown(signal) {
  console.log(`Received ${signal}. Closing server...`);
  server.close((err) => {
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
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('unhandledRejection', reason);
});