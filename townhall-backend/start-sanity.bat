@echo off
echo.
echo ========================================
echo   Starting Sanity Studio
echo ========================================
echo.

cd /d "%~dp0sanity"

echo Checking if Sanity Studio is already running...
netstat -ano | findstr :3333 >nul
if %ERRORLEVEL% EQU 0 (
    echo.
    echo [32mSanity Studio is already running![0m
    echo Opening in browser...
    start http://localhost:3333
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 0
)

echo Starting Sanity Studio...
echo.
echo [33mThis window will stay open. Do NOT close it![0m
echo [33mSanity Studio will be available at: http://localhost:3333[0m
echo.
echo Opening in browser...
timeout /t 3 >nul
start http://localhost:3333

npx sanity dev
