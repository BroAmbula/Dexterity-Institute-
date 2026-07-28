#!/bin/sh
set -e

echo "Running database migrations..."
php artisan migrate --force

echo "Caching config/routes..."
php artisan config:cache || true
php artisan route:cache || true

echo "Starting server on port ${PORT}..."
exec php -S 0.0.0.0:"$PORT" -t public