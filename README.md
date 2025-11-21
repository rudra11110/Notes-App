# Notes App

A modern notes application built with React and Supabase.

## Features
- React + Vite + Tailwind CSS + Lucide Icons + Framer Motion
- Supabase for authentication and database
- Secure user authentication with email/password
- Create, read, update, and delete notes
- Dark mode support
- Responsive design

## Setup

### 1. Database Setup

You need to set up the database schema in your Supabase project first.

1. Go to your Supabase Dashboard SQL Editor
2. Run the SQL script from `SETUP.md`

### 2. Install Dependencies

```bash
cd frontend
npm install --include=dev
```

### 3. Run Development Server

The development server will start automatically. The app will be available at http://localhost:3000

### 4. Build for Production

```bash
cd frontend
npm run build
```

## Environment Variables

The `.env` file contains your Supabase credentials:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Project Structure

- `frontend/` - React application
- `backend/` - Legacy backend (not used, app now uses Supabase directly)
- `SETUP.md` - Database setup instructions
