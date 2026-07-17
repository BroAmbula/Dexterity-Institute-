# 1. Base Image - Must be the first line!
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
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /var/www
COPY . .
RUN composer install --no-dev --optimize-autoloader

# 4. Expose and Run
EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=$PORT