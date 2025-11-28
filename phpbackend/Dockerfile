# Use PHP 8.2 with Apache
FROM <account_id>.dkr.ecr.<account_region>.amazonaws.com/php:8.2-apache-amd64

# Install necessary PHP extensions
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip git curl libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache rewrite module (important for Laravel or clean URLs)
RUN a2dismod deflate || true \
    && a2enmod rewrite
#RUN sed -i 's/Listen 80/Listen 8081/' /etc/apache2/ports.conf \
# && sed -i 's/<VirtualHost \*:80>/<VirtualHost *:8081>/' /etc/apache2/sites-available/000-default.conf
# Set custom PHP configuration
# Set custom PHP configuration for uploads
RUN echo "upload_max_filesize = 10M" > /usr/local/etc/php/conf.d/uploads.ini \
 && echo "post_max_size = 10M" >> /usr/local/etc/php/conf.d/uploads.ini
# Set PHP configuration for streaming
RUN echo "output_buffering = Off" > /usr/local/etc/php/conf.d/streaming.ini \
 && echo "zlib.output_compression = Off" >> /usr/local/etc/php/conf.d/streaming.ini \
 && echo "implicit_flush = On" >> /usr/local/etc/php/conf.d/streaming.ini \
 && echo "max_execution_time = 0" >> /usr/local/etc/php/conf.d/streaming.ini \
 && echo "memory_limit = 2G" >> /usr/local/etc/php/conf.d/streaming.ini
# Set working directory
WORKDIR /var/www/html

# Copy project files into container
COPY . .
RUN mkdir -p storage/logs bootstrap/cache \
 && chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache

# Set overall ownership (safe defaults)
RUN chown -R www-data:www-data /var/www/html \
 && find /var/www/html -type f -exec chmod 644 {} \; \
 && find /var/www/html -type d -exec chmod 755 {} \;

# Optional: Set document root (useful if using /public as entry point)
# RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Optional: install Composer (if not installed locally)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader
# Set permissions for Laravel storage and cache
RUN mkdir -p storage/logs bootstrap/cache \
 && chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache \
 && chown -R www-data:www-data /var/www/html \
 && find /var/www/html -type f -exec chmod 644 {} \; \
 && find /var/www/html -type d -exec chmod 755 {} \;
# Expose default Apache port
EXPOSE 80

# Default Apache startup command
CMD ["apache2-foreground"]