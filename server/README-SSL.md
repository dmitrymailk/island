# Настройка HTTPS для Telegram Bot Server

Это руководство объясняет, как настроить HTTPS для вашего сервера, чтобы избежать ошибок Mixed Content при деплое на GitHub Pages.

## 🔒 Проблема

GitHub Pages работает по HTTPS, но если ваш API сервер работает по HTTP, браузер блокирует запросы с ошибкой:
```
Mixed Content: The page was loaded over HTTPS, but requested an insecure resource 'http://...'
```

## ✅ Решение: Nginx с SSL

Мы используем Nginx как reverse proxy с SSL сертификатом.

## 🚀 Быстрая настройка

### Вариант 1: Самоподписанный сертификат (для тестирования)

**⚠️ Внимание:** Браузер будет показывать предупреждение о безопасности!

1. **Сгенерируйте SSL сертификат:**
```bash
cd server
chmod +x generate-ssl-cert.sh
./generate-ssl-cert.sh
```

2. **Запустите сервер с Nginx:**
```bash
docker compose up -d
```

3. **Ваш API теперь доступен по HTTPS:**
```
https://147.45.213.244/api/contacts/427649895
```

### Вариант 2: Let's Encrypt (для продакшена) ⭐ РЕКОМЕНДУЕТСЯ

**Требования:** 
- Домен, указывающий на ваш сервер (например, `api.yourdomain.com`)
- Открытые порты 80 и 443

**Шаги:**

1. **Установите Certbot на сервере:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install certbot

# CentOS/RHEL
sudo yum install certbot
```

2. **Остановите Docker контейнеры:**
```bash
cd server
docker compose down
```

3. **Получите сертификат:**
```bash
# Замените yourdomain.com на ваш домен
sudo certbot certonly --standalone -d api.yourdomain.com
```

4. **Скопируйте сертификаты:**
```bash
sudo mkdir -p ./ssl
sudo cp /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/api.yourdomain.com/privkey.pem ./ssl/key.pem
sudo chmod 644 ./ssl/cert.pem
sudo chmod 644 ./ssl/key.pem
```

5. **Обновите nginx.conf:**
```nginx
server_name api.yourdomain.com;  # Замените IP на домен
```

6. **Запустите сервер:**
```bash
docker compose up -d
```

7. **Настройте автообновление сертификата:**
```bash
# Добавьте в crontab
sudo crontab -e

# Добавьте строку (проверка каждый день в 2:00):
0 2 * * * certbot renew --quiet --deploy-hook "cd /path/to/server && ./update-ssl.sh"
```

Создайте скрипт `update-ssl.sh`:
```bash
#!/bin/bash
cp /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem ./ssl/cert.pem
cp /etc/letsencrypt/live/api.yourdomain.com/privkey.pem ./ssl/key.pem
docker compose restart nginx
```

### Вариант 3: Использовать только IP с самоподписанным сертификатом

Если у вас нет домена, но нужен HTTPS для API:

1. **Используйте самоподписанный сертификат** (см. Вариант 1)

2. **Добавьте исключение в браузере:**
   - Откройте `https://147.45.213.244` в браузере
   - Браузер покажет предупреждение "Ваше подключение не защищено"
   - Нажмите "Дополнительно" → "Перейти на сайт (небезопасно)"
   - После этого запросы с фронтенда будут работать

3. **Для мобильных устройств:**
   - Откройте `https://147.45.213.244` в Safari/Chrome
   - Примите предупреждение безопасности
   - Теперь приложение будет работать

## 📁 Структура файлов

После настройки у вас будет:

```
server/
├── ssl/                    # SSL сертификаты
│   ├── cert.pem           # Публичный сертификат
│   └── key.pem            # Приватный ключ
├── nginx.conf             # Конфигурация Nginx
├── docker-compose.yml     # Обновленный compose с Nginx
├── generate-ssl-cert.sh   # Скрипт генерации самоподписанного сертификата
└── README-SSL.md          # Эта инструкция
```

## 🔍 Проверка

### 1. Проверьте, что контейнеры запущены:
```bash
docker compose ps
```

Должны быть запущены:
- `ostrovok-telegram-bot`
- `ostrovok-nginx`

### 2. Проверьте логи Nginx:
```bash
docker compose logs nginx
```

### 3. Проверьте SSL соединение:
```bash
curl -k https://147.45.213.244/api/contacts/YOUR_USER_ID
```

### 4. Проверьте в браузере:
Откройте Developer Tools → Network и проверьте, что запросы идут по HTTPS.

## ⚙️ Конфигурация портов

**По умолчанию:**
- **80** (HTTP) → редирект на HTTPS
- **443** (HTTPS) → проксирует на Express (3001)
- **3001** (Express) → доступен только внутри Docker сети

**Для изменения портов** отредактируйте `docker-compose.yml`:
```yaml
nginx:
  ports:
    - "8080:80"    # HTTP на порту 8080
    - "8443:443"   # HTTPS на порту 8443
```

## 🐛 Troubleshooting

### Ошибка: "SSL certificate problem: self signed certificate"

**Причина:** Используется самоподписанный сертификат

**Решение:**
1. Для тестирования: используйте флаг `-k` в curl или примите предупреждение в браузере
2. Для продакшена: используйте Let's Encrypt (Вариант 2)

### Ошибка: "ERR_SSL_PROTOCOL_ERROR"

**Решение:**
1. Проверьте, что порт 443 открыт в файрволе:
```bash
sudo ufw allow 443
```

2. Проверьте, что сертификаты существуют:
```bash
ls -la ./ssl/
```

### Ошибка: "Mixed Content" все еще появляется

**Решение:**
1. Убедитесь, что фронтенд использует HTTPS URL:
```env
VITE_TELEGRAM_SERVER_URL=https://147.45.213.244
```

2. Пересоберите и передеплойте фронтенд

3. Очистите кеш браузера

### Nginx не запускается

**Решение:**
```bash
# Проверьте логи
docker compose logs nginx

# Проверьте конфигурацию
docker compose exec nginx nginx -t

# Перезапустите
docker compose restart nginx
```

## 🔐 Безопасность

**⚠️ Важные моменты:**

1. **Никогда не коммитьте приватные ключи** (`key.pem`) в git
   - Добавьте `ssl/*.pem` в `.gitignore`

2. **Самоподписанные сертификаты** безопасны для тестирования, но НЕ для продакшена
   - Браузеры показывают предупреждения
   - Нет защиты от MITM атак

3. **Для продакшена используйте:**
   - Let's Encrypt (бесплатно, доверенный)
   - Коммерческие SSL сертификаты
   - Cloudflare SSL (бесплатно)

4. **Регулярно обновляйте сертификаты**
   - Let's Encrypt: каждые 90 дней (автоматически)
   - Коммерческие: обычно ежегодно

## 📚 Дополнительные ресурсы

- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Nginx SSL Configuration](https://nginx.org/en/docs/http/configuring_https_servers.html)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)

## 🔄 Обновление с HTTP на HTTPS

Если вы уже запустили сервер по HTTP:

1. **Остановите текущий сервер:**
```bash
docker compose down
```

2. **Создайте SSL сертификаты** (см. выше)

3. **Обновите docker-compose.yml** (уже сделано)

4. **Запустите с Nginx:**
```bash
docker compose up -d
```

5. **Обновите URL в фронтенде:**
```yaml
# .github/workflows/deploy.yml
VITE_TELEGRAM_SERVER_URL: https://147.45.213.244
```

6. **Передеплойте фронтенд**
