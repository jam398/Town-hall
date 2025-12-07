# Town Hall Backend - Start Server
Write-Host "Starting Town Hall Backend Server..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

Set-Location $PSScriptRoot
node dist/index.js
