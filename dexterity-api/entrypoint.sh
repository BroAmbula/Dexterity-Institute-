#!/bin/sh
set -e

echo "Running database migrations..."
php artisan migrate --force

echo "Caching config/routes..."
php artisan config:cache || true
php artisan route:cache || true

echo "Starting Laravel server on port ${PORT:-8080}..."
exec php artisan serve --host=0.0.0.0 --port="${PORT:-8080}"