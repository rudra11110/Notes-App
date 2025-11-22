# Quick Start Guide

## 🎯 Get Running in 2 Minutes

### For Local Development

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install --include=dev

# 3. Start dev server
npm run dev

# 4. Open browser
# http://localhost:5173
```

### For Production Deployment

**Option A: Vercel (Easiest)**
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com
# 3. Import your repository
# 4. Click Deploy
# ✨ Done! Your app is live
```

**Option B: Netlify**
```bash
# 1. Go to netlify.com
# 2. Connect GitHub repository
# 3. Build command: cd frontend && npm run build
# 4. Publish directory: frontend/dist
# 5. Deploy
```

**Option C: Build Manually**
```bash
cd frontend
npm run build
# Upload contents of dist/ to any hosting service
```

## 📋 Pre-Deploy Checklist

- [ ] Supabase database created (tables auto-created)
- [ ] Environment variables set
- [ ] Frontend builds successfully: `npm run build`
- [ ] You can register a new account
- [ ] You can create/edit/delete notes

## 🔐 Testing Checklist

1. Register a new account
2. Create a note
3. Edit the note
4. Search for the note
5. Delete the note
6. Log out
7. Log back in
8. Previous notes are still there

## 📚 Documentation

- **Setup Details**: See SETUP.md
- **Deployment Options**: See DEPLOY.md
- **Full Checklist**: See PUBLISH.md
- **Architecture Overview**: See PROJECT_SUMMARY.md

## 🆘 Troubleshooting

**Issue: "npm run dev" fails**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --include=dev
```

**Issue: "Vite not found"**
```bash
# Install dev dependencies specifically
npm install --include=dev
```

**Issue: Can't create notes**
- Check Supabase dashboard
- Ensure database tables exist (see SETUP.md)
- Verify you're logged in

**Issue: Build fails**
```bash
# Clear build cache
rm -rf dist node_modules/.vite
npm run build
```

## 🌍 Environment Variables

Already configured in `.env`:
```
VITE_SUPABASE_URL=https://jikcapobxoisxbfxbzzg.supabase.co
VITE_SUPABASE_ANON_KEY=...
```

## 🚀 Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |

## ✅ You're All Set!

Your Notes App is:
- ✅ Ready to develop locally
- ✅ Ready to deploy
- ✅ Fully functional
- ✅ Secure
- ✅ Optimized

Start with `npm run dev` and see it in action! 🎉
