// Simple HTTP server to serve the vlog viewer
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url}`);
  
  // Serve the HTML file
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
