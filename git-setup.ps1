# PowerShell script to set up git for Frontend Collection with selective file staging

Write-Host "🚀 Setting up Git for Frontend Collection..." -ForegroundColor Green
Write-Host ""

# Initialize git if not already done
if (-not (Test-Path ".git")) {
    Write-Host "📁 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git repository initialized!" -ForegroundColor Green
    Write-Host ""
}

# Add main project files first
Write-Host "📋 Adding main project files..." -ForegroundColor Yellow
git add index.html
git add landing-style.css
git add landing-script.js
git add README.md
git add package.json
git add server.py
git add start-local.bat
git add start-local.ps1
git add .gitignore

# Add essential project folders (main demos only)
Write-Host "📁 Adding essential project demos..." -ForegroundColor Yellow

# Add main project HTML files (demos)
git add "Projects/Agency/index.html"
git add "Projects/Agency/style.css"
git add "Projects/Agency/README.md"

git add "Projects/Books-bootstrap-4-website/src/Index.html"
git add "Projects/Books-bootstrap-4-website/src/style.css"

git add "Projects/Books-bootstrap-5-website/index.html"
git add "Projects/Books-bootstrap-5-website/style.css"

git add "Projects/bootstrap4-website-master/index.html"
git add "Projects/bootstrap4-website-master/style.css"

git add "Projects/Magz-master/index.html"
git add "Projects/Magz-master/README.md"

git add "Projects/nova-new-1.0.0/index.html"

git add "Projects/Nuno/nuno/index.html"

git add "Projects/outdoors-website/tours/index.html"
git add "Projects/outdoors-website/tours/style.css"

git add "Projects/the-rosa/the-rosa/index.html"
git add "Projects/the-rosa/the-rosa/style.css"

git add "Projects/SF_SAMPLE_BootstrapWeddingTemplate_mufOle/index.html"

# Add component snippets (main files only)
git add "component-snippets/*/index.html"
git add "component-snippets/*/style.css"
git add "component-snippets/*/README.md"

# Add email templates
git add "email-templates/*/index.html"
git add "email-templates/*/*.html"

# Add office work projects (main files)
git add "office-work/Clevercow/index.html"
git add "office-work/CleverCowBootstrap/index.html"
git add "office-work/CleverCowSCSS/index.html"
git add "office-work/minds-mirror/index.html"

# Add portfolio projects
git add "Portfolio/*/index.html"
git add "Portfolio/*/style.css"

Write-Host "✅ Essential files staged!" -ForegroundColor Green
Write-Host ""

# Check what's staged
Write-Host "📊 Checking staged files..." -ForegroundColor Yellow
$stagedFiles = git diff --cached --name-only
$fileCount = ($stagedFiles | Measure-Object).Count

Write-Host "📈 Total staged files: $fileCount" -ForegroundColor Cyan
Write-Host ""

if ($fileCount -gt 0) {
    Write-Host "🎯 Ready to commit! Run one of these commands:" -ForegroundColor Green
    Write-Host ""
    Write-Host "git commit -m 'Initial commit: Frontend Collection with 20+ projects'" -ForegroundColor White
    Write-Host "git branch -M main" -ForegroundColor White
    Write-Host "git remote add origin <your-repo-url>" -ForegroundColor White
    Write-Host "git push -u origin main" -ForegroundColor White
    Write-Host ""
    
    # Show some staged files as preview
    Write-Host "📋 Sample of staged files:" -ForegroundColor Yellow
    $stagedFiles | Select-Object -First 10 | ForEach-Object {
        Write-Host "  ✓ $_" -ForegroundColor Green
    }
    
    if ($fileCount -gt 10) {
        Write-Host "  ... and $($fileCount - 10) more files" -ForegroundColor Gray
    }
}
else {
    Write-Host "❌ No files were staged. Please check the file paths." -ForegroundColor Red
}

Write-Host ""
Write-Host "💡 Tip: The .gitignore file will prevent large unnecessary files from being tracked." -ForegroundColor Blue
