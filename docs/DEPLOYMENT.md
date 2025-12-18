# Deployment Guide - Town Hall Newark

## Overview

This document describes how to deploy the Town Hall Newark website to production using the automated CI/CD pipeline.

---

## Deployment Architecture

```
GitHub (main branch)
    ↓ push
GitHub Actions CI
    ↓ tests pass
Netlify (frontend)
    ↓
Production URL
```

---

## Required GitHub Secrets

Before the deploy step will work, you must configure the following secrets in your GitHub repository:

### How to Add Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each of the following:

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Your deployed backend URL (e.g., `https://api.townhallnewark.org/api`) |
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token | Netlify Dashboard → User Settings → Applications → Personal access tokens |
| `NETLIFY_SITE_ID` | Netlify site ID | Netlify Dashboard → Site settings → General → Site ID |

---

## Netlify Setup

### 1. Create Netlify Account
- Go to [netlify.com](https://netlify.com)
- Sign up with GitHub

### 2. Create New Site
- Click "Add new site" → "Import an existing project"
- Connect to your GitHub repository
- Configure build settings:
  - **Base directory:** `townhall-frontend`
  - **Build command:** `npm run build`
  - **Publish directory:** `townhall-frontend/.next`

### 3. Get Site ID
- Go to Site settings → General
- Copy the "Site ID" value
- Add as `NETLIFY_SITE_ID` secret in GitHub

### 4. Get Auth Token
- Go to User settings → Applications
- Generate a new personal access token
- Add as `NETLIFY_AUTH_TOKEN` secret in GitHub

---

## Backend Deployment

The backend needs to be deployed separately. Options include:

### Option 1: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Option 2: Render
1. Create account at [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Configure:
   - **Root Directory:** `townhall-backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

### Option 3: Fly.io
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Deploy
cd townhall-backend
fly launch
fly deploy
```

---

## Environment Variables

### Frontend (Netlify)
Set in Netlify Dashboard → Site settings → Environment variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | Your backend URL |

### Backend (Railway/Render/Fly)
Set in your hosting provider's dashboard:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3001` (or provider default) |
| `FRONTEND_URL` | Your Netlify URL |
| `SANITY_PROJECT_ID` | `pvm742xo` |
| `SANITY_DATASET` | `production` |
| `SANITY_TOKEN` | Your Sanity API token |
| `HUBSPOT_API_KEY` | Your HubSpot API key |
| `RESEND_API_KEY` | Your Resend API key |

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/test.yml`) runs:

1. **Frontend Tests** - Lint, unit tests, E2E, accessibility, Lighthouse
2. **Build Verification** - Ensures the app builds successfully
3. **Bundle Size Check** - Reports JS bundle sizes
4. **Deploy** - Deploys to Netlify (main branch only)
5. **Docker Build** - Verifies Docker images build

### Triggering Deployment

Deployment happens automatically when:
- Code is pushed to `main` branch
- All tests pass
- Build succeeds

---

## Manual Deployment

If you need to deploy manually:

```bash
# Frontend
cd townhall-frontend
npm run build
npx netlify deploy --prod

# Backend
cd townhall-backend
npm run build
# Then deploy to your hosting provider
```

---

## Rollback

To rollback to a previous deployment:

1. Go to Netlify Dashboard → Deploys
2. Find the previous working deploy
3. Click "Publish deploy"

---

## Monitoring

After deployment, monitor:

- **Netlify Analytics** - Traffic and performance
- **Plausible Analytics** - User behavior (after consent)
- **Backend Logs** - Error tracking in your hosting provider

---

*Document created: December 2024*
