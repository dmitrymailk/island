# 🔒 Настройка HTTPS для решения Mixed Content

## Проблема

Вы получаете ошибку:
```
Mixed Content: The page at 'https://dmitrymailk.github.io/island/#/friends' 
was loaded over HTTPS, but requested an insecure resource 
'http://147.45.213.244/api/contacts/427649895'. 
This request has been blocked; the content must be served over HTTPS.
```

## Причина

GitHub Pages работает по **HTTPS**, а ваш API сервер по **HTTP**. 
Браузеры блокируют Mixed Content (смешанный контент) из соображений безопасности.

## ✅ Решение

Нужно настроить HTTPS на вашем сервере `147.45.213.244`.

---

## 🚀 Шаги для исправления

### На сервере (147.45.213.244):

#### 1. Сгенерируйте SSL сертификат

**Опция A: Самоподписанный сертификат (быстро, для теста)**

```bash
cd /path/to/island/server
chmod +x generate-ssl-cert.sh
./generate-ssl-cert.sh
```

⚠️ **Внимание:** Браузер покажет предупреждение. Вам нужно будет:
1. Открыть `https://147.45.213.244` в браузере
2. Нажать "Дополнительно" → "Перейти на сайт"
3. После этого API запросы будут работать

**Опция B: Let's Encrypt (для продакшена, требует домен)**

```bash
# Установите Certbot
sudo apt install certbot

# Остановите сервер
cd /path/to/island/server
docker compose down

# Получите сертификат (замените на ваш домен)
sudo certbot certonly --standalone -d api.yourdomain.com

# Скопируйте сертификаты
sudo mkdir -p ./ssl
sudo cp /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/api.yourdomain.com/privkey.pem ./ssl/key.pem
sudo chmod 644 ./ssl/*
```

#### 2. Обновите конфигурацию (уже сделано в коммите)

Файлы уже обновлены:
- ✅ `docker-compose.yml` - добавлен Nginx
- ✅ `nginx.conf` - конфигурация reverse proxy с SSL
- ✅ `.github/workflows/deploy.yml` - изменен URL на HTTPS

#### 3. Запустите сервер с HTTPS

```bash
cd /path/to/island/server
docker compose up -d
```

#### 4. Проверьте, что работает

```bash
# Проверьте контейнеры
docker compose ps

# Должны быть запущены:
# - ostrovok-telegram-bot
# - ostrovok-nginx

# Проверьте API
curl -k https://147.45.213.244/api/contacts/YOUR_USER_ID
```

#### 5. Откройте порты в firewall

```bash
# Для Ubuntu/Debian
sudo ufw allow 443/tcp
sudo ufw allow 80/tcp

# Для CentOS/RHEL
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --reload
```

---

### На GitHub (обновление фронтенда):

#### 6. Закоммитьте изменения

```bash
git add .
git commit -m "Add HTTPS support with Nginx reverse proxy"
git push origin main
```

Это автоматически запустит новый деплой с HTTPS URL.

---

## 🔍 Проверка

1. **Дождитесь завершения GitHub Actions** (2-3 минуты)
   - Перейдите в "Actions" вашего репозитория
   - Проверьте, что деплой прошел успешно

2. **Откройте сайт:** `https://dmitrymailk.github.io/island/`

3. **Откройте DevTools (F12) → Network**
   - Попробуйте загрузить контакты
   - Проверьте, что запросы идут на `https://147.45.213.244`

4. **Если используете самоподписанный сертификат:**
   - Откройте отдельной вкладкой: `https://147.45.213.244`
   - Примите предупреждение безопасности
   - Вернитесь на сайт и обновите страницу

---

## 📁 Созданные файлы

```
server/
├── nginx.conf              # Конфигурация Nginx с SSL
├── docker-compose.yml      # Обновлен: добавлен Nginx
├── generate-ssl-cert.sh    # Скрипт генерации самоподписанного сертификата
├── README-SSL.md           # Подробная инструкция по SSL
└── .gitignore             # Исключает приватные ключи из git
```

---

## 🐛 Troubleshooting

### Проблема: ERR_CERT_AUTHORITY_INVALID

**Причина:** Используется самоподписанный сертификат

**Решение:**
1. Откройте `https://147.45.213.244` в браузере
2. Нажмите "Дополнительно" → "Перейти на сайт"
3. Обновите страницу приложения

### Проблема: Connection refused

**Причина:** Nginx не запущен или порт закрыт

**Решение:**
```bash
# Проверьте контейнеры
docker compose ps

# Проверьте логи
docker compose logs nginx

# Откройте порт
sudo ufw allow 443
```

### Проблема: Mixed Content ошибка все еще появляется

**Решение:**
1. Очистите кеш браузера (Ctrl+Shift+Delete)
2. Проверьте, что GitHub Actions деплой завершился
3. Проверьте в DevTools, что запросы идут на HTTPS

---

## 📚 Дополнительная информация

- **Подробная инструкция:** [server/README-SSL.md](server/README-SSL.md)
- **Конфигурация сервера:** [server/README.md](server/README.md)
- **Переменные окружения:** [ENV.md](ENV.md)

---

## 🎯 Резюме

1. ✅ **На сервере:** Запустите `./generate-ssl-cert.sh` и `docker compose up -d`
2. ✅ **В GitHub:** Закоммитьте изменения и запушьте
3. ✅ **В браузере:** Примите самоподписанный сертификат на `https://147.45.213.244`
4. ✅ **Готово!** Приложение должно работать без ошибок Mixed Content
