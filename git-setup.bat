@echo off
echo 🚀 Setting up Git for Frontend Collection...
echo.

REM Initialize git if not already done
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    echo ✅ Git repository initialized!
    echo.
)

echo 📋 Adding main project files...
git add index.html
git add landing-style.css
git add landing-script.js
git add README.md
git add package.json
git add server.py
git add start-local.bat
git add start-local.ps1
git add .gitignore

echo 📁 Adding essential project demos...

REM Add main project files
git add "Projects/Agency/index.html"
git add "Projects/Books-bootstrap-4-website/src/Index.html"
git add "Projects/Books-bootstrap-5-website/index.html"
git add "Projects/bootstrap4-website-master/index.html"
git add "Projects/Magz-master/index.html"
git add "Projects/nova-new-1.0.0/index.html"
git add "Projects/Nuno/nuno/index.html"
git add "Projects/outdoors-website/tours/index.html"
git add "Projects/the-rosa/the-rosa/index.html"
git add "Projects/SF_SAMPLE_BootstrapWeddingTemplate_mufOle/index.html"

REM Add office work projects
git add "Office Work/Clevercow/index.html"
git add "Office Work/CleverCowBootstrap/index.html"
git add "Office Work/CleverCowSCSS/index.html"

echo ✅ Essential files staged!
echo.

echo 📊 Checking staged files...
git diff --cached --name-only > temp_staged.txt
set /p stagedCount=<temp_staged.txt
del temp_staged.txt

echo 🎯 Ready to commit! Run these commands:
echo.
echo git commit -m "Initial commit: Frontend Collection with 20+ projects"
echo git branch -M main
echo git remote add origin ^<your-repo-url^>
echo git push -u origin main
echo.

echo 💡 Tip: The .gitignore file will prevent large unnecessary files from being tracked.
echo.

pause
