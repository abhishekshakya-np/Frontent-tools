@echo off
echo Starting Frontend Collection Local Server...
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Custom Python Server...
    echo.
    python server.py
) else (
    REM Check if Node.js is available
    node --version >nul 2>&1
    if %errorlevel% == 0 (
        echo Python not found, checking for Node.js...
        npm list -g http-server >nul 2>&1
        if %errorlevel% == 0 (
            echo Using Node.js http-server...
            echo.
            echo Your Frontend Collection is now running at:
            echo http://localhost:8000
            echo.
            echo Press Ctrl+C to stop the server
            echo.
            timeout /t 2 /nobreak > nul
            start http://localhost:8000
            http-server -p 8000 -o
        ) else (
            echo Installing http-server...
            npm install -g http-server
            echo.
            echo Your Frontend Collection is now running at:
            echo http://localhost:8000
            echo.
            echo Press Ctrl+C to stop the server
            echo.
            timeout /t 2 /nobreak > nul
            start http://localhost:8000
            http-server -p 8000 -o
        )
    ) else (
        echo Neither Python nor Node.js found!
        echo Please install Python or Node.js to run a local server.
        echo.
        echo Alternative: Simply open index.html in your browser
        echo.
        start index.html
    )
)

pause
