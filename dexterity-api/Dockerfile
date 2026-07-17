FROM php:8.4-fpm

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

WORKDIR /var/www

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy only dependency files first
COPY composer.json composer.lock ./

# Install dependencies WITH --no-scripts to stop the crash
RUN composer install --no-dev --optimize-autoloader --no-scripts

COPY . .

# Ensure permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=$PORT