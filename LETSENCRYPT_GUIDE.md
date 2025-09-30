# 🔐 Let's Encrypt для решения ERR_CERT_AUTHORITY_INVALID

## Проблема

Вы видите ошибку: `Failed to load resource: net::ERR_CERT_AUTHORITY_INVALID`

Это происходит из-за **самоподписанного сертификата**, который браузеры не доверяют.

---

## ⚠️ ВАЖНО: Нужен домен!

Let's Encrypt **не работает с голыми IP адресами**. Вам нужен домен (например, `api.example.com`), который указывает на ваш сервер `147.45.213.244`.

---

## 🌐 Варианты решения

### Вариант 1: Получить бесплатный домен

**Бесплатные DNS сервисы:**
- [DuckDNS](https://www.duckdns.org/) - бесплатные поддомены (например, `mybot.duckdns.org`)
- [No-IP](https://www.noip.com/) - бесплатный динамический DNS
- [FreeDNS](https://freedns.afraid.org/) - бесплатные домены

**Настройка DuckDNS (пример):**
1. Зарегистрируйтесь на https://www.duckdns.org/
2. Создайте поддомен (например, `island-bot`)
3. Укажите IP: `147.45.213.244`
4. Ваш домен: `island-bot.duckdns.org`

### Вариант 2: Купить домен

- [Namecheap](https://www.namecheap.com/) - от $1/год
- [GoDaddy](https://www.godaddy.com/)
- [reg.ru](https://www.reg.ru/) - русский регистратор

### Вариант 3: Принять самоподписанный сертификат (временно)

Если вам нужно быстро протестировать:

1. Откройте в браузере: `https://147.45.213.244`
2. Нажмите **"Дополнительно"** → **"Перейти на сайт (небезопасно)"**
3. Обновите страницу вашего приложения
4. ✅ API будет работать (но предупреждение останется)

---

## 🚀 Настройка Let's Encrypt

### Шаг 1: Получите домен

Используйте один из вариантов выше. Для примера используем `island-bot.duckdns.org`.

### Шаг 2: Настройте DNS

Убедитесь, что домен указывает на ваш сервер:

```bash
# Проверка DNS
nslookup island-bot.duckdns.org

# Должен вернуть: 147.45.213.244
```

### Шаг 3: Запустите скрипт установки

```bash
cd /root/island/server

# С email (рекомендуется для уведомлений)
./setup-letsencrypt.sh island-bot.duckdns.org your-email@example.com

# Или без email
./setup-letsencrypt.sh island-bot.duckdns.org
```

Скрипт автоматически:
- Установит Certbot (если не установлен)
- Остановит Docker контейнеры
- Получит сертификат от Let's Encrypt
- Скопирует сертификаты в `./ssl/`
- Обновит `nginx.conf` с вашим доменом

### Шаг 4: Запустите сервер

```bash
docker-compose up -d
```

### Шаг 5: Проверьте

```bash
# Проверьте контейнеры
docker-compose ps

# Проверьте HTTPS
curl https://island-bot.duckdns.org/api/contacts/YOUR_USER_ID

# Проверьте SSL
curl -v https://island-bot.duckdns.org 2>&1 | grep "SSL certificate verify"
```

### Шаг 6: Обновите фронтенд

Измените `.github/workflows/deploy.yml`:

```yaml
env:
  VITE_TELEGRAM_SERVER_URL: https://island-bot.duckdns.org
```

Закоммитьте и запушьте:

```bash
git add .github/workflows/deploy.yml
git commit -m "Update API URL to use Let's Encrypt domain"
git push origin main
```

---

## 🔄 Автообновление сертификата

Let's Encrypt сертификаты действительны **90 дней**. Настройте автообновление:

### Способ 1: Через crontab (рекомендуется)

```bash
# Откройте crontab
sudo crontab -e

# Добавьте строку (проверка каждый день в 2:00):
0 2 * * * certbot renew --quiet --deploy-hook "/root/island/server/renew-ssl.sh"
```

### Способ 2: Через systemd timer

```bash
# Создайте systemd timer
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Проверьте статус
sudo systemctl status certbot.timer
```

### Тест обновления

```bash
# Тестовый запуск (не обновляет реально)
sudo certbot renew --dry-run
```

---

## 🔍 Проверка сертификата

### В браузере:
1. Откройте `https://island-bot.duckdns.org`
2. Нажмите на замок в адресной строке
3. Проверьте, что сертификат от "Let's Encrypt"

### Онлайн инструменты:
- [SSL Labs](https://www.ssllabs.com/ssltest/) - детальная проверка SSL
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html)

### Командная строка:

```bash
# Информация о сертификате
openssl s_client -connect island-bot.duckdns.org:443 -servername island-bot.duckdns.org < /dev/null

# Срок действия
echo | openssl s_client -connect island-bot.duckdns.org:443 2>/dev/null | openssl x509 -noout -dates
```

---

## 🐛 Troubleshooting

### Ошибка: "Certbot failed to authenticate"

**Причина:** Домен не указывает на ваш сервер или порт 80 закрыт

**Решение:**
```bash
# Проверьте DNS
nslookup your-domain.com

# Откройте порт 80
sudo ufw allow 80

# Остановите все сервисы на порту 80
sudo lsof -i :80
docker-compose down
```

### Ошибка: "Too many certificates already issued"

**Причина:** Лимит Let's Encrypt (5 сертификатов/неделю на домен)

**Решение:** Подождите неделю или используйте другой домен/поддомен

### Ошибка: "Unable to find a real A record"

**Причина:** DNS не настроен или не обновился

**Решение:**
```bash
# Подождите распространения DNS (до 48 часов)
# Проверьте через разные DNS серверы:
nslookup your-domain.com 8.8.8.8
nslookup your-domain.com 1.1.1.1
```

### Сертификат не обновляется автоматически

**Решение:**
```bash
# Проверьте логи certbot
sudo journalctl -u certbot.timer

# Проверьте права на renew-ssl.sh
chmod +x /root/island/server/renew-ssl.sh

# Тестовое обновление
sudo certbot renew --dry-run
```

---

## 📊 Сравнение вариантов

| Вариант | Стоимость | Время настройки | Безопасность | Подходит для |
|---------|-----------|----------------|--------------|--------------|
| **Самоподписанный** | Бесплатно | 1 мин | ⚠️ Предупреждения | Разработка/тест |
| **Let's Encrypt + бесплатный домен** | Бесплатно | 15-30 мин | ✅ Доверенный | Продакшен |
| **Let's Encrypt + свой домен** | $1-15/год | 15-30 мин | ✅ Доверенный | Продакшен |
| **Платный SSL** | $50-300/год | 30-60 мин | ✅ Доверенный | Корпоративный |

---

## 🎯 Рекомендация

**Для продакшена:**
1. Получите бесплатный домен на DuckDNS (5 минут)
2. Запустите `./setup-letsencrypt.sh` (5 минут)
3. Настройте автообновление (2 минуты)
4. **Итого: 15 минут** → 100% доверенный SSL сертификат ✅

**Для быстрого теста:**
1. Откройте `https://147.45.213.244` в браузере
2. Примите предупреждение
3. **Итого: 30 секунд** → работает, но с предупреждением ⚠️

---

## 📚 Дополнительные ресурсы

- [Let's Encrypt документация](https://letsencrypt.org/docs/)
- [Certbot инструкции](https://certbot.eff.org/)
- [DuckDNS руководство](https://www.duckdns.org/spec.jsp)
- [server/README-SSL.md](server/README-SSL.md) - Подробная SSL инструкция
