# PowerShell script to start Frontend Collection Local Server
Write-Host "Starting Frontend Collection Local Server..." -ForegroundColor Green
Write-Host ""

# Check if Python is available
try {
    $pythonVersion = python --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Using Custom Python Server..." -ForegroundColor Yellow
        Write-Host "Python Version: $pythonVersion" -ForegroundColor Gray
        Write-Host ""
        
        # Start custom Python server
        python server.py
    }
} catch {
    # Check if Node.js is available
    try {
        $nodeVersion = node --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Python not found, checking for Node.js..." -ForegroundColor Yellow
            
            # Check if http-server is installed
            try {
                npm list -g http-server 2>$null
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "Using Node.js http-server..." -ForegroundColor Yellow
                } else {
                    Write-Host "Installing http-server..." -ForegroundColor Yellow
                    npm install -g http-server
                }
                
                Write-Host ""
                Write-Host "Your Frontend Collection is now running at:" -ForegroundColor Cyan
                Write-Host "http://localhost:8000" -ForegroundColor White
                Write-Host ""
                Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
                Write-Host ""
                
                # Open browser
                Start-Process "http://localhost:8000"
                
                # Start http-server
                http-server -p 8000
            } catch {
                Write-Host "Error with Node.js setup" -ForegroundColor Red
                Write-Host "Opening index.html directly..." -ForegroundColor Yellow
                Start-Process "index.html"
            }
        }
    } catch {
        Write-Host "Neither Python nor Node.js found!" -ForegroundColor Red
        Write-Host "Please install Python or Node.js to run a local server." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Alternative: Opening index.html directly in browser..." -ForegroundColor Yellow
        Write-Host ""
        Start-Process "index.html"
    }
}

Read-Host "Press Enter to exit"
