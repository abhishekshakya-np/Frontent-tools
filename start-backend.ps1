# Start Frontend Collection Backend (Flask - homepage + API + admin)
$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ProjectRoot

Write-Host "Starting Backend (homepage + API + admin)..." -ForegroundColor Green
Write-Host "Project root: $ProjectRoot" -ForegroundColor Gray
Write-Host ""

python backend/app.py
