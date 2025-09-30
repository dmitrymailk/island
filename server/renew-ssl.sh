#!/bin/bash

# Скрипт для обновления SSL сертификатов после renew от certbot

set -e

echo "🔄 Обновление SSL сертификатов..."

# Получаем домен из nginx.conf
DOMAIN=$(grep -oP 'server_name \K[^;]+' nginx.conf | head -1 | xargs)

if [ -z "$DOMAIN" ]; then
    echo "❌ Не удалось определить домен из nginx.conf"
    exit 1
fi

echo "Домен: $DOMAIN"

# Путь к сертификатам Let's Encrypt
CERT_PATH="/etc/letsencrypt/live/$DOMAIN"

if [ ! -d "$CERT_PATH" ]; then
    echo "❌ Сертификаты не найдены в $CERT_PATH"
    exit 1
fi

# Копируем обновленные сертификаты
cp "$CERT_PATH/fullchain.pem" ./ssl/cert.pem
cp "$CERT_PATH/privkey.pem" ./ssl/key.pem
chmod 644 ./ssl/cert.pem
chmod 644 ./ssl/key.pem

# Перезапускаем nginx
cd "$(dirname "$0")"
docker-compose restart nginx

echo "✅ SSL сертификаты успешно обновлены!"
echo "✅ Nginx перезапущен"
