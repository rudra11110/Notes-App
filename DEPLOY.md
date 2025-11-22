# Deployment Guide - Notes App

## Prerequisites

- Node.js 16+ and npm installed
- Supabase account with a project created
- Database schema initialized (see SETUP.md)

## Environment Setup

The `.env` file contains your Supabase credentials:
```
VITE_SUPABASE_URL=https://jikcapobxoisxbfxbzzg.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

These are automatically configured and ready to use.

## Local Development

```bash
cd frontend
npm install --include=dev
npm run dev
```

The app will be available at http://localhost:5173

## Production Build

```bash
cd frontend
npm run build
npm run preview
```

This generates optimized production files in the `dist/` directory.

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repo to Vercel (vercel.com)
3. Vercel will auto-detect it's a Vite app
4. Add environment variables in Vercel dashboard
5. Deploy with one click

### Option 2: Netlify

1. Push code to GitHub
2. Connect repo to Netlify (netlify.com)
3. Build command: `cd frontend && npm run build`
4. Publish directory: `frontend/dist`
5. Add environment variables in Netlify dashboard
6. Deploy

### Option 3: Docker

```bash
docker build -f Dockerfile.frontend -t notes-app .
docker run -p 3000:80 notes-app
```

### Option 4: Static Hosting (AWS S3, Google Cloud Storage, etc.)

1. Build the app: `npm run build`
2. Upload contents of `frontend/dist/` to your hosting
3. Configure 404 redirects to `index.html` for SPA routing

## Database Initialization

Before first use, run the SQL schema from SETUP.md in your Supabase SQL Editor.

## Testing the Deployment

1. Visit your deployed app URL
2. Register a new account
3. Create a test note
4. Edit and delete to verify all features work
5. Log out and log back in to verify auth persistence

## Troubleshooting

**Issue: "Cannot read environment variables"**
- Ensure `.env` file is in the frontend root directory
- For production deployments, set environment variables in the hosting platform's dashboard

**Issue: "Database connection error"**
- Verify Supabase URL and key are correct
- Check that database tables are created (run SETUP.md)
- Verify RLS policies are enabled

**Issue: "Auth not working"**
- Ensure Supabase Auth is enabled in your project
- Check that the auth provider (email/password) is enabled
- Verify database schema for users table

## Performance Optimization

The frontend is already optimized with:
- Vite for fast builds and development
- React code splitting
- CSS minification
- Gzip compression
- Production bundle: ~140KB gzipped

## Security

- All environment variables are client-side (checked before building)
- Supabase RLS policies enforce data access rules
- Auth tokens are managed by Supabase automatically
- No sensitive data is stored locally

## Support

For issues with:
- **Supabase**: https://supabase.com/docs
- **React**: https://react.dev
- **Vite**: https://vitejs.dev
