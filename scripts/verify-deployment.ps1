# Town Hall Deployment Verification Script (PowerShell)
# Run this after deploying to verify everything works

param(
    [string]$BackendUrl = "https://townhall-backend-vpyh.onrender.com",
    [string]$FrontendUrl = ""
)

Write-Host "=========================================="
Write-Host "Town Hall Deployment Verification"
Write-Host "=========================================="
Write-Host ""

# Check backend health
Write-Host "[1/5] Checking backend health..."
try {
    $healthResponse = Invoke-RestMethod -Uri "$BackendUrl/api/health" -Method Get
    if ($healthResponse.status -eq "healthy") {
        Write-Host "OK: Backend is healthy"
        Write-Host "  Sanity: $($healthResponse.services.sanity)"
    } else {
        Write-Host "FAIL: Backend health check failed"
    }
} catch {
    Write-Host "FAIL: Backend unreachable"
    exit 1
}
Write-Host ""

# Check blog API
Write-Host "[2/5] Checking blog API..."
try {
    $blogResponse = Invoke-RestMethod -Uri "$BackendUrl/api/blog" -Method Get
    $blogCount = $blogResponse.posts.Count
    if ($blogCount -gt 0) {
        Write-Host "OK: Blog API returned $blogCount posts"
    } else {
        Write-Host "FAIL: Blog API returned no posts"
    }
} catch {
    Write-Host "FAIL: Blog API error"
}
Write-Host ""

# Check vlogs API
Write-Host "[3/5] Checking vlogs API..."
try {
    $vlogsResponse = Invoke-RestMethod -Uri "$BackendUrl/api/vlogs" -Method Get
    $vlogsCount = $vlogsResponse.vlogs.Count
    if ($vlogsCount -gt 0) {
        Write-Host "OK: Vlogs API returned $vlogsCount videos"
    } else {
        Write-Host "FAIL: Vlogs API returned no videos"
    }
} catch {
    Write-Host "FAIL: Vlogs API error"
}
Write-Host ""

# Check events API
Write-Host "[4/5] Checking events API..."
try {
    $eventsResponse = Invoke-RestMethod -Uri "$BackendUrl/api/events" -Method Get
    $eventsCount = $eventsResponse.events.Count
    Write-Host "OK: Events API returned $eventsCount events"
} catch {
    Write-Host "FAIL: Events API error"
}
Write-Host ""

# Check frontend (if URL provided)
if ($FrontendUrl) {
    Write-Host "[5/5] Checking frontend..."
    try {
        $frontendResponse = Invoke-WebRequest -Uri $FrontendUrl -UseBasicParsing
        if ($frontendResponse.StatusCode -eq 200) {
            Write-Host "OK: Frontend is accessible (HTTP 200)"
        } else {
            Write-Host "FAIL: Frontend returned HTTP $($frontendResponse.StatusCode)"
        }
    } catch {
        Write-Host "FAIL: Frontend unreachable"
    }
} else {
    Write-Host "[5/5] Skipping frontend check (no FrontendUrl provided)"
}
Write-Host ""

Write-Host "=========================================="
Write-Host "Verification complete!"
Write-Host "=========================================="
