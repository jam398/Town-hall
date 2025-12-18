# Town Hall Deployment Guide

This guide covers deploying Town Hall to production using:
- **Frontend**: Vercel (Next.js)
- **Backend**: Render (Express/Node.js)
- **Automation**: n8n Cloud (webhooks & workflows)
- **CMS**: Sanity (already configured)

---

## Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Vercel        │────▶│   Render        │────▶│   Sanity CMS    │
│   (Frontend)    │     │   (Backend)     │     │   (Content)     │
│   Next.js       │     │   Express API   │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │   n8n Cloud     │
                        │   (Automation)  │
                        │   Webhooks      │
                        └─────────────────┘
```

---

## Step 1: Deploy Backend to Render

### 1.1 Create Render Account
1. Go to [render.com](https://render.com) and sign up
2. Connect your GitHub account

### 1.2 Create Web Service
1. Click **New** → **Web Service**
2. Connect your GitHub repo: `jam398/Town-hall`
3. Configure:
   - **Name**: `townhall-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main` or `final-submissions`
   - **Root Directory**: `townhall-backend`
   - **Runtime**: Node
   - **Build Command**: `npm ci && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or Starter for better performance)

### 1.3 Set Environment Variables in Render
Go to **Environment** tab and add:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | Required |
| `PORT` | `3001` | Required |
| `SANITY_PROJECT_ID` | `pvm742xo` | Your Sanity project ID |
| `SANITY_DATASET` | `production` | Your Sanity dataset |
| `SANITY_TOKEN` | `skovrSL1j3...` | Your Sanity API token (keep secret!) |
| `FRONTEND_URL` | `https://your-app.vercel.app` | Update after Vercel deploy |
| `N8N_WEBHOOK_URL` | `https://your-n8n.app.n8n.cloud/webhook/...` | Update after n8n setup |

### 1.4 Deploy
Click **Create Web Service**. Render will build and deploy automatically.

**Your backend URL will be**: `https://townhall-backend.onrender.com`

> ⚠️ **Note**: Free tier services spin down after 15 minutes of inactivity. First request after spin-down takes ~30 seconds.

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Import your repository

### 2.2 Import Project
1. Click **Add New** → **Project**
2. Import `jam398/Town-hall`
3. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `townhall-frontend`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### 2.3 Set Environment Variables in Vercel
Go to **Settings** → **Environment Variables** and add:

| Key | Value | Environments |
|-----|-------|--------------|
| `NEXT_PUBLIC_API_URL` | `https://townhall-backend.onrender.com/api` | Production, Preview, Development |

### 2.4 Deploy
Click **Deploy**. Vercel will build and deploy automatically.

**Your frontend URL will be**: `https://your-project.vercel.app`

### 2.5 Update Render FRONTEND_URL
Go back to Render and update the `FRONTEND_URL` environment variable to your Vercel URL.

---

## Step 3: Set Up n8n Cloud

### 3.1 Create n8n Cloud Account
1. Go to [n8n.cloud](https://n8n.cloud) and sign up
2. Create a new instance

### 3.2 Create Webhook Workflows
Create workflows for:

#### Volunteer Signup Workflow
1. **Trigger**: Webhook (POST)
2. **Actions**: 
   - Send Discord notification
   - Add to HubSpot CRM
   - Send confirmation email

#### Event Registration Workflow
1. **Trigger**: Webhook (POST)
2. **Actions**:
   - Send Discord notification
   - Add to calendar
   - Send confirmation email

#### Contact Form Workflow
1. **Trigger**: Webhook (POST)
2. **Actions**:
   - Send Discord notification
   - Create HubSpot ticket
   - Send auto-reply email

### 3.3 Get Webhook URLs
After creating each workflow:
1. Click the Webhook node
2. Copy the **Production URL**
3. Add to Render environment variables

---

## Step 4: Verify Deployment

### 4.1 Test Backend Health
```bash
curl https://townhall-backend.onrender.com/api/health
```
Expected: `{"status":"ok","timestamp":"..."}`

### 4.2 Test Frontend
1. Visit your Vercel URL
2. Navigate to `/blog` - should show blog posts
3. Navigate to `/vlogs` - should show videos
4. Navigate to `/events` - should show events

### 4.3 Test Form Submissions
1. Go to `/volunteer` and submit a test application
2. Check n8n workflow execution logs
3. Verify Discord notification received

---

## Environment Variables Summary

### Backend (Render)
```env
NODE_ENV=production
PORT=3001
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_TOKEN=your_sanity_token
FRONTEND_URL=https://your-app.vercel.app
N8N_WEBHOOK_URL=https://your-n8n.app.n8n.cloud/webhook/...
RESEND_API_KEY=your_resend_key (optional)
```

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://townhall-backend.onrender.com/api
```

---

## Troubleshooting

### "Network error: Unable to connect to API"
- Check that `NEXT_PUBLIC_API_URL` is set correctly in Vercel
- Verify backend is running: `curl https://your-backend.onrender.com/api/health`
- Check Render logs for errors

### CORS Errors
- Verify `FRONTEND_URL` in Render matches your Vercel domain
- Backend CORS is configured to allow `*.vercel.app` domains

### Blog/Vlogs Empty
- Check Sanity credentials in Render
- Verify Sanity has published content
- Check Render logs for Sanity API errors

### Forms Not Submitting
- Check n8n webhook URLs are correct
- Verify n8n workflows are active
- Check Render logs for webhook errors

---

## Updating Deployments

### Frontend (Vercel)
Push to `main` branch → Vercel auto-deploys

### Backend (Render)
Push to `main` branch → Render auto-deploys

### Preview Deployments
- **Vercel**: Every PR gets a preview URL automatically
- **Render**: Configure preview environments in Render dashboard (paid feature)

---

## Cost Estimates

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Hobby | Free |
| Render | Free | Free (with cold starts) |
| Render | Starter | $7/month (no cold starts) |
| n8n Cloud | Starter | Free (limited executions) |
| Sanity | Free | Free (generous limits) |

**Total**: $0-7/month for production deployment
