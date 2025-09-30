# 🔐 Инструкция по настройке Let's Encrypt для ostrovok.lingvo-gap.com

## Пошаговая инструкция

### Шаг 1: Остановите Docker контейнеры

```bash
cd /root/island/server
docker-compose down
```

### Шаг 2: Установите Certbot (если не установлен)

```bash
sudo apt update
sudo apt install -y certbot
```

### Шаг 3: Получите SSL сертификат

```bash
sudo certbot certonly --standalone -d ostrovok.lingvo-gap.com --email your-email@example.com --agree-tos --non-interactive
```

**⚠️ Замените `your-email@example.com` на ваш реальный email** (для уведомлений об истечении сертификата)

### Шаг 4: Скопируйте сертификаты

```bash
cd /root/island/server
sudo mkdir -p ./ssl
sudo cp /etc/letsencrypt/live/ostrovok.lingvo-gap.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/ostrovok.lingvo-gap.com/privkey.pem ./ssl/key.pem
sudo chmod 644 ./ssl/cert.pem
sudo chmod 644 ./ssl/key.pem
```

### Шаг 5: Обновите nginx.conf

```bash
cd /root/island/server
sed -i 's/server_name .*/server_name ostrovok.lingvo-gap.com;/' nginx.conf
```

### Шаг 6: Запустите сервер

```bash
docker-compose up -d
```

### Шаг 7: Проверьте, что всё работает

```bash
# Проверьте контейнеры
docker-compose ps

# Проверьте HTTPS
curl https://ostrovok.lingvo-gap.com/api/contacts/427649895
```

### Шаг 8: Обновите GitHub workflow

Откройте файл `.github/workflows/deploy.yml` и измените строку 40:

```yaml
VITE_TELEGRAM_SERVER_URL: https://ostrovok.lingvo-gap.com
```

### Шаг 9: Закоммитьте изменения

```bash
cd /root/island
git add .
git commit -m "Configure Let's Encrypt SSL for ostrovok.lingvo-gap.com"
git push origin main
```

### Шаг 10: Настройте автообновление сертификата

```bash
# Откройте crontab
sudo crontab -e

# Добавьте эту строку в конец файла:
0 2 * * * certbot renew --quiet --deploy-hook "/root/island/server/renew-ssl.sh"
```

Сохраните и закройте редактор (Ctrl+X, затем Y, затем Enter для nano).

---

## ✅ Готово!

После выполнения всех шагов:

1. ✅ Сервер будет работать по HTTPS с доверенным сертификатом
2. ✅ Фронтенд автоматически пересоберётся с новым URL
3. ✅ Сертификат будет автоматически обновляться каждые 90 дней
4. ✅ Ошибка `ERR_CERT_AUTHORITY_INVALID` исчезнет

Откройте `https://dmitrymailk.github.io/island/` и проверьте - всё должно работать без предупреждений! 🎉

---

## 🐛 Возможные проблемы

### Ошибка: "Port 80 already in use"

```bash
# Найдите процесс, использующий порт 80
sudo lsof -i :80

# Остановите все контейнеры
docker-compose down
```

### Ошибка: "Connection refused"

Убедитесь, что порты 80 и 443 открыты в firewall:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Проверка сертификата

```bash
# Информация о сертификате
sudo certbot certificates

# Тестовое обновление
sudo certbot renew --dry-run
```
