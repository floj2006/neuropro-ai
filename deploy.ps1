# NeuroPro AI - GitHub Deploy Script
# Запуск: .\deploy.ps1

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  NeuroPro AI - GitHub Deploy" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is available
try {
    $gitVersion = git --version
    Write-Host "[OK] Git найден: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Git не найден!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Установите Git:" -ForegroundColor Yellow
    Write-Host "  - https://git-scm.com/download/win" -ForegroundColor Gray
    Write-Host "  - winget install Git.Git" -ForegroundColor Gray
    Write-Host ""
    pause
    exit 1
}

Write-Host ""

# Initialize git repo if not exists
if (-not (Test-Path ".git")) {
    Write-Host "[INFO] Инициализация git репозитория..." -ForegroundColor Yellow
    git init
    Write-Host ""
}

# Add all files
Write-Host "[INFO] Добавление файлов..." -ForegroundColor Yellow
git add .
Write-Host ""

# Show changes
Write-Host "[INFO] Изменения:" -ForegroundColor Yellow
git status --short
Write-Host ""

# Commit
$commitMessage = Read-Host "Введите сообщение коммита (или нажмите Enter для авто)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
}

git commit -m $commitMessage
Write-Host ""

# Check if remote is set
$remoteUrl = git remote get-url origin 2>$null
if ([string]::IsNullOrWhiteSpace($remoteUrl)) {
    Write-Host "[WARNING] Удаленный репозиторий не настроен!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Введите URL вашего GitHub репозитория:" -ForegroundColor Yellow
    Write-Host "Пример: https://github.com/username/neuropro-ai.git" -ForegroundColor Gray
    Write-Host ""
    $repoUrl = Read-Host "URL"
    git remote add origin $repoUrl
    Write-Host ""
} else {
    Write-Host "[OK] Remote: $remoteUrl" -ForegroundColor Green
    Write-Host ""
}

# Push
Write-Host "[INFO] Отправка на GitHub..." -ForegroundColor Yellow
git branch -M main 2>$null
git push -u origin main

Write-Host ""
if ($LASTEXITCODE -eq 0) {
    Write-Host "====================================" -ForegroundColor Green
    Write-Host "  [SUCCESS] Успешно отправлено!" -ForegroundColor Green
    Write-Host "====================================" -ForegroundColor Green
} else {
    Write-Host "====================================" -ForegroundColor Red
    Write-Host "  [ERROR] Ошибка при отправке!" -ForegroundColor Red
    Write-Host "====================================" -ForegroundColor Red
}

Write-Host ""
Write-Host "Нажмите любую клавишу для выхода..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
