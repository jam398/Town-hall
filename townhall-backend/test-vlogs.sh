#!/bin/bash

echo "🎥 Testing Vlog API Endpoints"
echo "=============================="
echo ""

# Test 1: Check if backend is running
echo "1️⃣ Checking if backend is running on port 3001..."
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "✅ Backend is running!"
else
    echo "❌ Backend is not running. Start it with: npm start"
    exit 1
fi

echo ""
echo "2️⃣ Fetching vlogs from API..."
echo "GET http://localhost:3001/api/vlogs"
echo ""

response=$(curl -s http://localhost:3001/api/vlogs)
echo "$response" | jq '.' 2>/dev/null || echo "$response"

echo ""
echo "=============================="
echo "📝 How to add a test vlog:"
echo ""
echo "Option 1: Via Sanity Studio (Recommended)"
echo "  1. Run: cd sanity && npx sanity dev"
echo "  2. Open: http://localhost:3333"
echo "  3. Click 'Vlog Post' → Create new"
echo "  4. Fill in:"
echo "     - Title: Test AI Workshop Recap"
echo "     - YouTube ID: dQw4w9WgXcQ (or any YouTube video ID)"
echo "     - Description: Testing vlog functionality"
echo "     - Published At: (select today's date)"
echo "  5. Click Publish"
echo ""
echo "Option 2: Test with sample YouTube video IDs"
echo "  - dQw4w9WgXcQ (popular test video)"
echo "  - jNQXAC9IVRw (Me at the zoo - first YouTube video)"
echo "  - 9bZkp7q19f0 (PSY - Gangnam Style)"
echo ""
echo "To get YouTube ID from URL:"
echo "  https://www.youtube.com/watch?v=dQw4w9WgXcQ"
echo "                                  ^^^^^^^^^^^"
echo "  The ID is the part after 'v='"
echo ""
echo "=============================="
