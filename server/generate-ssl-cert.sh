#!/bin/bash

# Скрипт для генерации самоподписанного SSL сертификата
# Используйте это только для тестирования!
# Для продакшена используйте Let's Encrypt или настоящие сертификаты

mkdir -p ./ssl

echo "Генерация самоподписанного SSL сертификата..."

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout ./ssl/key.pem \
    -out ./ssl/cert.pem \
    -subj "/C=RU/ST=Moscow/L=Moscow/O=Ostrovok/OU=Dev/CN=147.45.213.244"

echo "✅ Сертификат успешно создан в ./ssl/"
echo "⚠️  ВНИМАНИЕ: Это самоподписанный сертификат для разработки!"
echo "⚠️  Браузер будет показывать предупреждение о безопасности."
echo ""
echo "Для продакшена используйте Let's Encrypt:"
echo "  sudo certbot --nginx -d yourdomain.com"
