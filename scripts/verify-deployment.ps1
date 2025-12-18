# Town Hall Deployment Verification Script (PowerShell)
# Run this after deploying to verify everything works

param(
    [string]$BackendUrl = "https://townhall-backend-vpyh.onrender.com",
    [string]$FrontendUrl = ""
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Town Hall Deployment Verification" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check backend health
Write-Host "[1/5] Checking backend health..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-RestMethod -Uri "$BackendUrl/api/health" -Method Get
    if ($healthResponse.status -eq "healthy") {
        Write-Host "✓ Backend is healthy" -ForegroundColor Green
        Write-Host "  Sanity: $($healthResponse.services.sanity)" -ForegroundColor Gray
    } else {
        Write-Host "✗ Backend health check failed" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Backend unreachable: $_" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Check blog API
Write-Host "[2/5] Checking blog API..." -ForegroundColor Yellow
try {
    $blogResponse = Invoke-RestMethod -Uri "$BackendUrl/api/blog" -Method Get
    $blogCount = $blogResponse.posts.Count
    if ($blogCount -gt 0) {
        Write-Host "✓ Blog API returned $blogCount posts" -ForegroundColor Green
    } else {
        Write-Host "✗ Blog API returned no posts" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Blog API failed: $_" -ForegroundColor Red
}
Write-Host ""

# Check vlogs API
Write-Host "[3/5] Checking vlogs API..." -ForegroundColor Yellow
try {
    $vlogsResponse = Invoke-RestMethod -Uri "$BackendUrl/api/vlogs" -Method Get
    $vlogsCount = $vlogsResponse.vlogs.Count
    if ($vlogsCount -gt 0) {
        Write-Host "✓ Vlogs API returned $vlogsCount videos" -ForegroundColor Green
    } else {
        Write-Host "✗ Vlogs API returned no videos" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Vlogs API failed: $_" -ForegroundColor Red
}
Write-Host ""

# Check events API
Write-Host "[4/5] Checking events API..." -ForegroundColor Yellow
try {
    $eventsResponse = Invoke-RestMethod -Uri "$BackendUrl/api/events" -Method Get
    $eventsCount = $eventsResponse.events.Count
    Write-Host "✓ Events API returned $eventsCount events" -ForegroundColor Green
} catch {
    Write-Host "✗ Events API failed: $_" -ForegroundColor Red
}
Write-Host ""

# Check frontend (if URL provided)
if ($FrontendUrl) {
    Write-Host "[5/5] Checking frontend..." -ForegroundColor Yellow
    try {
        $frontendResponse = Invoke-WebRequest -Uri $FrontendUrl -UseBasicParsing
        if ($frontendResponse.StatusCode -eq 200) {
            Write-Host "✓ Frontend is accessible (HTTP 200)" -ForegroundColor Green
        } else {
            Write-Host "✗ Frontend returned HTTP $($frontendResponse.StatusCode)" -ForegroundColor Red
        }
    } catch {
        Write-Host "✗ Frontend unreachable: $_" -ForegroundColor Red
    }
} else {
    Write-Host "[5/5] Skipping frontend check (no FrontendUrl provided)" -ForegroundColor Yellow
    Write-Host "  Run with: .\verify-deployment.ps1 -FrontendUrl 'https://your-app.vercel.app'" -ForegroundColor Gray
}
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Verification complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "1. Visit $FrontendUrl/blog to verify blog posts display" -ForegroundColor Gray
Write-Host "2. Visit $FrontendUrl/vlogs to verify videos display" -ForegroundColor Gray
Write-Host "3. Submit a test volunteer form to verify form submission works" -ForegroundColor Gray
Write-Host ""
