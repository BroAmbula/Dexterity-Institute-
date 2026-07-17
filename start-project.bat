@echo off
echo Launching Dexterity Ecosystem...

:: 1. Spin up React Frontend
start cmd /k "echo Starting Frontend... && cd Frontend && npm run dev"

:: 2. Spin up Laravel Backend
start cmd /k "echo Starting Backend... && cd dexterity-api && php artisan serve"

exit