FROM php:8.1-apache
# Install necessary PHP extensions
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip git curl libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache rewrite module
# Disable Apache modules that may buffer output and enable rewrite
RUN a2dismod deflate || true \
    && a2enmod rewrite

# Set custom PHP configuration
# Set custom PHP configuration for uploads
RUN echo "upload_max_filesize = 200M" > /usr/local/etc/php/conf.d/uploads.ini \
 && echo "post_max_size = 200M" >> /usr/local/etc/php/conf.d/uploads.ini

# Set PHP configuration for streaming
RUN echo "output_buffering = Off" > /usr/local/etc/php/conf.d/streaming.ini \
 && echo "zlib.output_compression = Off" >> /usr/local/etc/php/conf.d/streaming.ini \
 && echo "implicit_flush = On" >> /usr/local/etc/php/conf.d/streaming.ini \
 && echo "max_execution_time = 0" >> /usr/local/etc/php/conf.d/streaming.ini \
 && echo "memory_limit = 2G" >> /usr/local/etc/php/conf.d/streaming.ini

RUN echo "LimitRequestBody 0" >> /etc/apache2/apache2.conf

# Set working directory
WORKDIR /var/www/html

# Copy project files into container
COPY . .

# Set permissions
RUN mkdir -p storage/logs bootstrap/cache \
 && chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache

RUN chown -R www-data:www-data /var/www/html \
 && find /var/www/html -type f -exec chmod 644 {} \; \
 && find /var/www/html -type d -exec chmod 755 {} \;

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader
# Set permissions for Laravel storage and cache
RUN mkdir -p storage/logs bootstrap/cache \
 && chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R 775 storage bootstrap/cache \
 && chown -R www-data:www-data /var/www/html \
 && find /var/www/html -type f -exec chmod 644 {} \; \
 && find /var/www/html -type d -exec chmod 755 {} \;

COPY entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
# Expose Apache port

