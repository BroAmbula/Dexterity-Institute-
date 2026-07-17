FROM php:8.4-cli

# Install dependencies (Added nodejs and npm)
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    libpq-dev \
    nodejs \
    npm \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_pgsql

WORKDIR /var/www

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy dependency files
COPY composer.json composer.lock package.json package-lock.json* ./

# Install PHP and Node dependencies
RUN composer install --no-dev --optimize-autoloader --no-scripts
RUN npm install && npm run build

# Copy the rest of the application
COPY . .

# Permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Start the server
CMD php -S 0.0.0.0:$PORT -t public