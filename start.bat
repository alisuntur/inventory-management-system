@echo off
title Stitch - Bayi Yönetim Sistemi

echo ==========================================
echo   Stitch Bayi Yönetim Sistemi Başlatılıyor
echo ==========================================
echo.

echo [0/3] Veritabani (Docker) kontrol ediliyor...
docker info >nul 2>&1
if errorlevel 1 (
    echo   Docker calismiyor. Lutfen Docker Desktop'i baslatip bekleyin.
    echo   Baslatildiktan sonra bu dosyayi tekrar calistirin.
    pause
    exit /b 1
)

echo   Docker aktif. Konteynerler baslatiliyor...
cd /d %~dp0
docker-compose up -d
echo.

echo [1/3] Backend baslatiliyor (NestJS - Port 3000)...
start "Backend - NestJS" cmd /k "cd /d %~dp0backend && npm run start:dev"

timeout /t 8 /nobreak > nul

echo [2/3] Frontend baslatiliyor (Vite - Port 5173)...
start "Frontend - Vite" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ==========================================
echo   Tum servisler baslatildi!
echo.
echo   Veritabani : localhost:5432 (stitch_db)
echo   PgAdmin    : http://localhost:5050
echo   Backend    : http://localhost:3000
echo   Frontend   : http://localhost:5173
echo ==========================================
echo.
echo Bu pencereyi kapatabilirsiniz.
pause
