# Use the CLI version (or default PHP) instead of FPM
FROM php:8.4-cli

# Install dependencies (same as before)
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

COPY composer.json composer.lock ./

RUN composer install --no-dev --optimize-autoloader --no-scripts

COPY . .

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Use the built-in PHP web server pointed at the 'public' directory
# Railway provides the PORT environment variable
CMD php -S 0.0.0.0:$PORT -t public