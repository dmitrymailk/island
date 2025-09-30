#!/bin/bash

# Скрипт для настройки Let's Encrypt сертификата
# Требуется домен, указывающий на ваш сервер!

set -e

echo "🔒 Настройка Let's Encrypt для Telegram Bot Server"
echo ""

# Проверка аргументов
if [ -z "$1" ]; then
    echo "❌ Ошибка: Не указан домен!"
    echo ""
    echo "Использование:"
    echo "  ./setup-letsencrypt.sh your-domain.com [email@example.com]"
    echo ""
    echo "Пример:"
    echo "  ./setup-letsencrypt.sh api.example.com admin@example.com"
    exit 1
fi

DOMAIN=$1
EMAIL=${2:-""}

echo "Домен: $DOMAIN"
if [ -n "$EMAIL" ]; then
    echo "Email: $EMAIL"
fi
echo ""

# Проверка установки certbot
if ! command -v certbot &> /dev/null; then
    echo "📦 Certbot не установлен. Устанавливаем..."
    sudo apt update
    sudo apt install -y certbot
fi

# Остановка контейнеров
echo "🛑 Остановка Docker контейнеров..."
docker-compose down

# Получение сертификата
echo "🔐 Получение SSL сертификата от Let's Encrypt..."
if [ -n "$EMAIL" ]; then
    sudo certbot certonly --standalone -d "$DOMAIN" --email "$EMAIL" --agree-tos --non-interactive
else
    sudo certbot certonly --standalone -d "$DOMAIN" --register-unsafely-without-email --agree-tos --non-interactive
fi

# Создание директории для сертификатов
echo "📁 Создание директории ssl/..."
mkdir -p ./ssl

# Копирование сертификатов
echo "📋 Копирование сертификатов..."
sudo cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ./ssl/cert.pem
sudo cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" ./ssl/key.pem
sudo chmod 644 ./ssl/cert.pem
sudo chmod 644 ./ssl/key.pem

# Обновление nginx.conf
echo "⚙️  Обновление nginx.conf..."
sed -i "s/server_name .*/server_name $DOMAIN;/" nginx.conf

echo ""
echo "✅ Let's Encrypt сертификат успешно установлен!"
echo ""
echo "📝 Следующие шаги:"
echo "1. Запустите сервер: docker-compose up -d"
echo "2. Обновите .github/workflows/deploy.yml:"
echo "   VITE_TELEGRAM_SERVER_URL: https://$DOMAIN"
echo "3. Настройте автообновление сертификата (см. ниже)"
echo ""
echo "🔄 Автообновление сертификата:"
echo "Добавьте в crontab (sudo crontab -e):"
echo "0 2 * * * certbot renew --quiet --deploy-hook '$(pwd)/renew-ssl.sh'"
echo ""
