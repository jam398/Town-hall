# YouTube Embed Error 153 - SOLVED ✅

## Problem
When embedding YouTube videos in iframes, you may encounter:
- **Error 153**: "Error de configuración del reproductor de vídeo"
- **Error**: "Video player configuration error"

## Root Cause
YouTube blocks video embeds when:
1. ❌ HTML is opened directly from `file://` protocol (double-clicking HTML file)
2. ❌ Missing referrer policy on iframe
3. ❌ CORS not configured to allow the origin

## ✅ VERIFIED SOLUTION

### Step 1: Add Referrer Policy to YouTube Iframe
```html
<iframe 
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Video Title"
    referrerpolicy="strict-origin-when-cross-origin"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
</iframe>
```

### Step 2: Serve HTML via HTTP Server (NOT file://)
**Problem**: Opening HTML directly (`file://`) causes YouTube Error 153

**Solution**: Serve through HTTP server

Create `serve-vlog-viewer.js`:
```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'watch-vlog.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading page');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`\n🎬 Vlog Viewer Server Started!`);
  console.log(`📺 Open in browser: http://localhost:${PORT}`);
  console.log(`🛑 Press Ctrl+C to stop\n`);
});
```

### Step 3: Update Backend CORS Configuration
In `src/index.ts`, allow the HTTP server origin:

```typescript
// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3001', // Allow API docs/testing
  'http://localhost:8080', // Allow vlog viewer ⬅️ ADD THIS
  'null' // Allow file:// protocol for local HTML files
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
```

### Step 4: Start Both Servers
```bash
# Terminal 1: Start backend API
cd townhall-backend
npm run build
node dist/index.js

# Terminal 2: Start vlog viewer
cd townhall-backend
node serve-vlog-viewer.js
```

**Or start both at once:**
```bash
cd townhall-backend
npm run build
cmd //c "start /b node dist/index.js" && cmd //c "start /b node serve-vlog-viewer.js"
```

### Step 5: Open in Browser
```
http://localhost:8080
```

## Requirements Checklist
- ✅ YouTube Video ID: Exactly 11 characters (e.g., `dQw4w9WgXcQ`)
- ✅ Referrer Policy: `referrerpolicy="strict-origin-when-cross-origin"`
- ✅ HTTP Server: Serving HTML via `http://` (NOT `file://`)
- ✅ CORS: Backend allows origin `http://localhost:8080`
- ✅ Backend API: Running on port 3001
- ✅ Vlog Viewer: Running on port 8080

## Testing
1. Backend API: `curl http://localhost:3001/api/vlogs`
2. Vlog Viewer: `http://localhost:8080`
3. Both videos should load and play

## Common Mistakes
| ❌ Wrong | ✅ Correct |
|----------|-----------|
| Opening `watch-vlog.html` by double-clicking | Open `http://localhost:8080` |
| Missing `referrerpolicy` attribute | Add `referrerpolicy="strict-origin-when-cross-origin"` |
| CORS not allowing port 8080 | Add `'http://localhost:8080'` to `allowedOrigins` |
| YouTube ID wrong length | Must be exactly 11 characters |

## References
- [YouTube IFrame API Documentation](https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-player-api-client-identity)
- [MDN Referrer Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)

## Status
- ✅ **VERIFIED WORKING** (December 6, 2025)
- ✅ Both test video and user video playing successfully
- ✅ API returning vlog data correctly
