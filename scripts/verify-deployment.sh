#!/bin/bash
# Town Hall Deployment Verification Script
# Run this after deploying to verify everything works

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BACKEND_URL="${BACKEND_URL:-https://townhall-backend-vpyh.onrender.com}"
FRONTEND_URL="${FRONTEND_URL:-}"

echo "=========================================="
echo "Town Hall Deployment Verification"
echo "=========================================="
echo ""

# Check backend health
echo -e "${YELLOW}[1/5] Checking backend health...${NC}"
HEALTH_RESPONSE=$(curl -s "${BACKEND_URL}/api/health")
if echo "$HEALTH_RESPONSE" | grep -q '"status":"healthy"'; then
    echo -e "${GREEN}✓ Backend is healthy${NC}"
    echo "  Response: $HEALTH_RESPONSE"
else
    echo -e "${RED}✗ Backend health check failed${NC}"
    echo "  Response: $HEALTH_RESPONSE"
    exit 1
fi
echo ""

# Check blog API
echo -e "${YELLOW}[2/5] Checking blog API...${NC}"
BLOG_RESPONSE=$(curl -s "${BACKEND_URL}/api/blog")
BLOG_COUNT=$(echo "$BLOG_RESPONSE" | grep -o '"slug"' | wc -l)
if [ "$BLOG_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓ Blog API returned $BLOG_COUNT posts${NC}"
else
    echo -e "${RED}✗ Blog API returned no posts${NC}"
    echo "  Check Sanity CMS for published blog posts"
fi
echo ""

# Check vlogs API
echo -e "${YELLOW}[3/5] Checking vlogs API...${NC}"
VLOGS_RESPONSE=$(curl -s "${BACKEND_URL}/api/vlogs")
VLOGS_COUNT=$(echo "$VLOGS_RESPONSE" | grep -o '"slug"' | wc -l)
if [ "$VLOGS_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓ Vlogs API returned $VLOGS_COUNT videos${NC}"
else
    echo -e "${RED}✗ Vlogs API returned no videos${NC}"
    echo "  Check Sanity CMS for published vlogs"
fi
echo ""

# Check events API
echo -e "${YELLOW}[4/5] Checking events API...${NC}"
EVENTS_RESPONSE=$(curl -s "${BACKEND_URL}/api/events")
EVENTS_COUNT=$(echo "$EVENTS_RESPONSE" | grep -o '"slug"' | wc -l)
echo -e "${GREEN}✓ Events API returned $EVENTS_COUNT events${NC}"
echo ""

# Check frontend (if URL provided)
if [ -n "$FRONTEND_URL" ]; then
    echo -e "${YELLOW}[5/5] Checking frontend...${NC}"
    FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${FRONTEND_URL}")
    if [ "$FRONTEND_STATUS" = "200" ]; then
        echo -e "${GREEN}✓ Frontend is accessible (HTTP $FRONTEND_STATUS)${NC}"
    else
        echo -e "${RED}✗ Frontend returned HTTP $FRONTEND_STATUS${NC}"
    fi
else
    echo -e "${YELLOW}[5/5] Skipping frontend check (FRONTEND_URL not set)${NC}"
    echo "  Set FRONTEND_URL environment variable to check frontend"
fi
echo ""

echo "=========================================="
echo -e "${GREEN}Verification complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Visit ${FRONTEND_URL:-your-vercel-url}/blog to verify blog posts display"
echo "2. Visit ${FRONTEND_URL:-your-vercel-url}/vlogs to verify videos display"
echo "3. Submit a test volunteer form to verify form submission works"
echo ""
