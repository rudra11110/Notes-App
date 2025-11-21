# Notes App — Final Full Production Package

This package contains a full-stack Notes App:
- Frontend: React + Vite + Tailwind + Lucide Icons + Framer Motion
- Backend: Node + Express + Sequelize + MySQL + JWT
- Dockerized: frontend, backend, MySQL via docker-compose
- Seed script, Postman collection, GitHub Actions CI

## Quick start with Docker
1. Copy `.env.example` to `.env` if you wish to change defaults.
2. Run: `docker-compose up --build`
3. Backend: http://localhost:5000
4. Frontend: http://localhost:3000

## Run seed (inside backend container or locally)
- `cd backend && npm install && npm run seed`

## Notes
- Default credentials for seeded user: demo@example.com / demo1234
- Change `JWT_SECRET` in production
