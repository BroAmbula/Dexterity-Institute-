# 1. Base Image
FROM php:8.4-fpm

# 2. Install dependencies
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

# 3. Setup
WORKDIR /var/www

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy only dependency files first to cache them
COPY composer.json composer.lock ./

# Install dependencies WITHOUT scripts (This fixes the build crash)
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Now copy the rest of the app
COPY . .

# Ensure permissions (Render needs this)
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# 4. Expose and Run
EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=$PORT