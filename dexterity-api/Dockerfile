# Use PHP 8.4
FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    libpq-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_pgsql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy ONLY your API code (ensure you are only copying the dexterity-api folder)
# If your Dockerfile is inside the dexterity-api folder, this is fine:
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# REMOVED: npm install and npm run build lines

# Expose port and start
EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=$POR