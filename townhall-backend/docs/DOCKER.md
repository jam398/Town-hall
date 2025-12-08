# Docker Setup Guide

## Town Hall Backend - Docker Documentation

This guide covers Docker containerization, deployment, and development workflows for the Town Hall backend API.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Quick Start](#quick-start)
4. [Development Workflow](#development-workflow)
5. [Production Deployment](#production-deployment)
6. [Docker Compose](#docker-compose)
7. [Environment Variables](#environment-variables)
8. [Health Checks](#health-checks)
9. [Troubleshooting](#troubleshooting)
10. [Performance Optimization](#performance-optimization)

---

## Overview

The Town Hall backend uses a **multi-stage Docker build** for optimized production images:

- **Stage 1 (deps)**: Install production dependencies only
- **Stage 2 (builder)**: Build TypeScript to JavaScript
- **Stage 3 (runner)**: Minimal runtime image with security hardening

**Key Features:**
- Alpine Linux base (small image size: ~150MB)
- Non-root user execution
- Health check endpoint
- Hot reload support in development
- Production-optimized builds

---

## Prerequisites

**Required:**
- Docker 20.10+ ([Install Docker](https://docs.docker.com/get-docker/))
- Docker Compose 2.0+ (included with Docker Desktop)
- Node.js 20+ (for local development)

**Optional:**
- Docker Desktop (for GUI management)
- Visual Studio Code with Docker extension

---

## Quick Start

### 1. Clone and Setup

```bash
cd townhall-backend
cp .env.example .env
# Edit .env with your actual API keys
```

### 2. Build and Run

```bash
# Build the Docker image
docker build -t townhall-backend:latest .

# Run the container
docker run -p 3001:3001 --env-file .env townhall-backend:latest
```

### 3. Verify

```bash
# Check health endpoint
curl http://localhost:3001/api/health

# Expected response:
# {
#   "status": "healthy",
#   "timestamp": "2025-12-08T...",
#   "sanity": { "connected": true },
#   "environment": "production"
# }
```

---

## Development Workflow

### Option 1: Docker with Hot Reload

Create `Dockerfile.dev`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
```

Run with volume mounting:

```bash
# Build development image
docker build -f Dockerfile.dev -t townhall-backend:dev .

# Run with hot reload
docker run -p 3001:3001 \
  -v $(pwd)/src:/app/src \
  --env-file .env \
  townhall-backend:dev
```

### Option 2: Local Development (Recommended)

```bash
# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev
```

**Why Local Development?**
- Faster iteration cycles
- Better IDE integration
- Easier debugging
- No Docker overhead

---

## Production Deployment

### Build Production Image

```bash
# Build with version tag
docker build -t townhall-backend:1.0.0 .
docker tag townhall-backend:1.0.0 townhall-backend:latest

# Test the build
docker run -p 3001:3001 --env-file .env townhall-backend:1.0.0
```

### Push to Registry

```bash
# Tag for Docker Hub
docker tag townhall-backend:1.0.0 yourusername/townhall-backend:1.0.0

# Login and push
docker login
docker push yourusername/townhall-backend:1.0.0
docker push yourusername/townhall-backend:latest
```

### Deploy to Cloud

**AWS ECS:**
```bash
# Create ECR repository
aws ecr create-repository --repository-name townhall-backend

# Authenticate Docker to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Tag and push
docker tag townhall-backend:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/townhall-backend:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/townhall-backend:latest
```

**Render.com:**
```yaml
# render.yaml
services:
  - type: web
    name: townhall-backend
    env: docker
    dockerfilePath: ./townhall-backend/Dockerfile
    dockerContext: ./townhall-backend
    envVars:
      - key: NODE_ENV
        value: production
      - key: SANITY_PROJECT_ID
        sync: false
      - key: OPENAI_API_KEY
        sync: false
```

**Railway.app:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

---

## Docker Compose

### Full Stack Setup

The root `docker-compose.yml` orchestrates both frontend and backend:

```bash
# From project root
cd /path/to/Town-hall

# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

### Backend-Only Setup

Create `townhall-backend/docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    env_file:
      - .env
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3001/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped

networks:
  default:
    name: townhall-network
```

Usage:

```bash
# Start backend only
docker-compose up backend

# Rebuild and start
docker-compose up --build backend

# Run tests in container
docker-compose run backend npm test
```

---

## Environment Variables

### Required Variables

```bash
# Sanity CMS
SANITY_PROJECT_ID=pvm742xo
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_TOKEN=sk...

# Email Service (Resend)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=hello@townhallnewark.org

# HubSpot CRM
HUBSPOT_API_KEY=pat-na1-...
```

### Optional Variables

```bash
# OpenAI (Phase 3 AI features)
OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=gpt-4o-mini

# Discord Webhooks
DISCORD_WEBHOOK_EVENTS=https://discord.com/api/webhooks/...
DISCORD_WEBHOOK_VOLUNTEERS=https://discord.com/api/webhooks/...
DISCORD_WEBHOOK_GENERAL=https://discord.com/api/webhooks/...

# Server Configuration
NODE_ENV=production
PORT=3001
API_BASE_URL=https://api.townhallnewark.org

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

### Passing Environment Variables

**Method 1: .env file**
```bash
docker run --env-file .env -p 3001:3001 townhall-backend:latest
```

**Method 2: Individual variables**
```bash
docker run \
  -e NODE_ENV=production \
  -e SANITY_PROJECT_ID=pvm742xo \
  -e SANITY_TOKEN=sk... \
  -p 3001:3001 \
  townhall-backend:latest
```

**Method 3: Docker Compose**
```yaml
services:
  backend:
    environment:
      - NODE_ENV=production
      - SANITY_PROJECT_ID=${SANITY_PROJECT_ID}
    env_file:
      - .env
```

---

## Health Checks

### Container Health Check

Add to `docker-compose.yml`:

```yaml
services:
  backend:
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3001/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Check Container Health

```bash
# View health status
docker ps

# Inspect health check logs
docker inspect --format='{{json .State.Health}}' <container-id> | jq

# Manual health check
docker exec <container-id> wget --quiet --tries=1 --spider http://localhost:3001/api/health
```

### Health Endpoint Response

```bash
curl http://localhost:3001/api/health
```

**Healthy Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-08T12:00:00.000Z",
  "sanity": {
    "connected": true,
    "projectId": "pvm742xo"
  },
  "environment": "production",
  "uptime": 3600
}
```

**Unhealthy Response (503):**
```json
{
  "status": "unhealthy",
  "timestamp": "2025-12-08T12:00:00.000Z",
  "sanity": {
    "connected": false,
    "error": "Failed to connect to Sanity"
  },
  "environment": "production"
}
```

---

## Troubleshooting

### Container Won't Start

**Check logs:**
```bash
docker logs <container-id>
docker-compose logs backend
```

**Common issues:**
- Missing environment variables → Check `.env` file
- Port already in use → Change port mapping `-p 3002:3001`
- Build errors → Run `docker build --no-cache`

### Build Failures

**Clear Docker cache:**
```bash
docker builder prune -a
docker system prune -a
```

**Rebuild without cache:**
```bash
docker build --no-cache -t townhall-backend:latest .
```

**Check build logs:**
```bash
docker build --progress=plain -t townhall-backend:latest .
```

### Connection Issues

**Test from inside container:**
```bash
docker exec -it <container-id> sh
wget http://localhost:3001/api/health
env | grep SANITY
```

**Test Sanity connection:**
```bash
docker exec -it <container-id> node -e "
const fetch = require('node-fetch');
fetch('https://pvm742xo.api.sanity.io/v2024-01-01/data/query/production?query=*[_type==\"event\"][0]', {
  headers: { 'Authorization': 'Bearer ' + process.env.SANITY_TOKEN }
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
"
```

### Performance Issues

**Check resource usage:**
```bash
docker stats <container-id>
```

**Limit resources:**
```bash
docker run \
  --memory="512m" \
  --cpus="1.0" \
  -p 3001:3001 \
  townhall-backend:latest
```

### Network Issues

**Inspect network:**
```bash
docker network ls
docker network inspect townhall-network
```

**Test connectivity:**
```bash
# From frontend container to backend
docker exec frontend-container curl http://backend:3001/api/health
```

---

## Performance Optimization

### Image Size Optimization

**Current optimizations:**
- ✅ Multi-stage build (reduces size by 70%)
- ✅ Alpine Linux base (minimal footprint)
- ✅ Production-only dependencies
- ✅ .dockerignore excludes unnecessary files

**Check image size:**
```bash
docker images | grep townhall-backend
# townhall-backend   latest   150MB
```

### Build Speed Optimization

**Use BuildKit:**
```bash
DOCKER_BUILDKIT=1 docker build -t townhall-backend:latest .
```

**Layer caching:**
```dockerfile
# Copy package files first (changes less often)
COPY package*.json ./
RUN npm ci

# Copy source code last (changes more often)
COPY . .
```

### Runtime Performance

**Use NODE_ENV=production:**
```bash
docker run -e NODE_ENV=production -p 3001:3001 townhall-backend:latest
```

**Enable Node.js optimizations:**
```dockerfile
ENV NODE_OPTIONS="--max-old-space-size=512"
```

---

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/docker.yml`:

```yaml
name: Docker Build and Push

on:
  push:
    branches: [main, Beginning]
    tags: ['v*']

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: ./townhall-backend
          push: true
          tags: |
            yourusername/townhall-backend:latest
            yourusername/townhall-backend:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
      
      - name: Test container
        run: |
          docker run -d -p 3001:3001 \
            -e SANITY_PROJECT_ID=${{ secrets.SANITY_PROJECT_ID }} \
            -e SANITY_TOKEN=${{ secrets.SANITY_TOKEN }} \
            --name test-backend \
            yourusername/townhall-backend:latest
          
          sleep 10
          curl -f http://localhost:3001/api/health || exit 1
```

---

## Security Best Practices

### Image Security

**Scan for vulnerabilities:**
```bash
# Using Docker Scout
docker scout cves townhall-backend:latest

# Using Trivy
trivy image townhall-backend:latest
```

**Best practices implemented:**
- ✅ Non-root user (expressjs:1001)
- ✅ Minimal base image (Alpine)
- ✅ No secrets in Dockerfile
- ✅ Read-only filesystem where possible

### Runtime Security

**Run with security options:**
```bash
docker run \
  --read-only \
  --tmpfs /tmp \
  --cap-drop=ALL \
  --security-opt=no-new-privileges:true \
  -p 3001:3001 \
  townhall-backend:latest
```

**Docker Compose security:**
```yaml
services:
  backend:
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    read_only: true
    tmpfs:
      - /tmp
```

---

## Backup and Recovery

### Container Data

**No persistent data in container** - All data stored in Sanity CMS (cloud-hosted).

**Backup environment variables:**
```bash
# Export current config
docker exec backend env > backup-env-$(date +%Y%m%d).txt
```

### Logs

**Export container logs:**
```bash
docker logs backend > backend-logs-$(date +%Y%m%d).log
docker-compose logs > full-logs-$(date +%Y%m%d).log
```

**Configure log rotation:**
```yaml
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

---

## Cost Estimation

### Container Resources

**Minimum requirements:**
- CPU: 0.5 vCPU
- Memory: 512 MB
- Storage: 1 GB

**Recommended (production):**
- CPU: 1 vCPU
- Memory: 1 GB
- Storage: 2 GB

### Cloud Hosting Costs

**AWS ECS Fargate:**
- 0.5 vCPU + 1GB RAM: ~$15/month
- 1 vCPU + 2GB RAM: ~$30/month

**Render.com:**
- Starter: $7/month (512 MB RAM)
- Standard: $25/month (2 GB RAM)

**Railway.app:**
- Hobby: $5/month (512 MB RAM)
- Pro: $20/month (8 GB RAM)

**DigitalOcean App Platform:**
- Basic: $5/month (512 MB RAM)
- Professional: $12/month (1 GB RAM)

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Alpine Linux Docker Image](https://hub.docker.com/_/alpine)
- [Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)

---

## Support

For issues or questions:
- GitHub Issues: [Town Hall Repository](https://github.com/jam398/Town-hall)
- Documentation: See `docs/` directory
- Contact: hello@townhallnewark.org
