# 🎥 Vlog Testing Guide

## Current Status
✅ Vlog API endpoint working: `GET /api/vlogs`  
✅ Backend server running on port 3001  
⏳ No vlog content added yet (returns empty array)

## How to Test Vlogs

### Step 1: Start Sanity Studio
```bash
cd townhall-backend/sanity
npx sanity dev
```
**Studio will open at:** http://localhost:3333

### Step 2: Add a Test Vlog

1. **Open Sanity Studio** at http://localhost:3333
2. **Click** "Vlog Post" in the left sidebar
3. **Click** "Create" button (top right)
4. **Fill in the form:**

   **Required Fields:**
   - **Title:** "AI Workshop Recap - Introduction to ChatGPT"
   - **YouTube Video ID:** `dQw4w9WgXcQ` (or use any YouTube video)
   - **Published At:** Select today's date

   **Optional Fields:**
   - **Description:** "In this workshop, we explored the fundamentals of AI..."
   - **Duration:** "15:30"
   - **Tags:** Add tags like "AI", "Workshop", "ChatGPT"

5. **Click** "Publish" button

### Step 3: Test the API

Run the test script:
```bash
cd townhall-backend
./test-vlogs.sh
```

Or manually test with curl:
```bash
curl http://localhost:3001/api/vlogs | jq
```

### Expected Response
```json
{
  "vlogs": [
    {
      "slug": "ai-workshop-recap-introduction-to-chatgpt",
      "title": "AI Workshop Recap - Introduction to ChatGPT",
      "description": "In this workshop, we explored the fundamentals of AI...",
      "publishedAt": "2025-12-06T00:00:00.000Z",
      "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "thumbnail": null,
      "duration": "15:30",
      "tags": ["AI", "Workshop", "ChatGPT"]
    }
  ]
}
```

## Getting YouTube Video IDs

### From YouTube URL:
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                ^^^^^^^^^^^
                                This is the ID
```

### Test Video IDs:
- `dQw4w9WgXcQ` - Popular test video
- `jNQXAC9IVRw` - First YouTube video ever
- `9bZkp7q19f0` - Gangnam Style

### For Real Content:
1. Find your workshop recording on YouTube
2. Copy the URL
3. Extract the ID after `v=`
4. Paste into Sanity Studio

## Frontend Integration

Once vlogs are in Sanity, the frontend can display them:

```typescript
// In townhall-frontend/app/vlogs/page.tsx
const response = await fetch('http://localhost:3001/api/vlogs');
const { vlogs } = await response.json();

// Render YouTube embed:
{vlogs.map(vlog => (
  <iframe
    src={`https://www.youtube.com/embed/${vlog.youtubeId}`}
    title={vlog.title}
    allowFullScreen
  />
))}
```

## Sanity Schema Fields

The vlog schema includes:
- ✅ `title` (required) - Video title
- ✅ `slug` (auto-generated from title)
- ✅ `youtubeId` (required) - YouTube video ID
- ✅ `description` (optional) - Video description
- ✅ `thumbnail` (optional) - Custom thumbnail image
- ✅ `duration` (optional) - Video length (e.g., "15:30")
- ✅ `publishedAt` (required) - Publication date
- ✅ `transcript` (optional) - Video transcript (rich text)
- ✅ `summary` (optional) - AI-generated summary
- ✅ `tags` (optional) - Category tags
- ✅ `status` (draft/published)

## Testing Checklist

- [ ] Backend running on port 3001
- [ ] Sanity Studio running on port 3333
- [ ] Can access Sanity Studio in browser
- [ ] Can create new vlog post
- [ ] Can add YouTube ID
- [ ] Can publish vlog
- [ ] API returns vlog data
- [ ] YouTube ID converts to playable URL
- [ ] All optional fields working

## Troubleshooting

### "Backend not running"
```bash
cd townhall-backend
npm start
```

### "Can't access Sanity Studio"
```bash
cd townhall-backend/sanity
npx sanity dev
```

### "API returns empty array"
- Check if vlog is published (not draft)
- Check `publishedAt` date is not in future
- Verify in Sanity Studio that content exists

### "YouTube video won't play"
- Verify YouTube ID is correct (11 characters)
- Some videos may be restricted by owner
- Test with known working ID: `dQw4w9WgXcQ`

## Next Steps

After testing:
1. ✅ Add real workshop recordings
2. ✅ Add transcripts (can use Whisper AI)
3. ✅ Generate summaries with AI
4. ✅ Connect to frontend vlog page
5. ✅ Test video playback on frontend
