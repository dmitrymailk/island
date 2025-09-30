# ⚡ Быстрый запуск HTTPS

## На сервере (147.45.213.244):

```bash
# 1. Перейдите в папку сервера
cd /path/to/island/server

# 2. Сгенерируйте SSL сертификат
./generate-ssl-cert.sh

# 3. Запустите сервер с Nginx
docker compose up -d

# 4. Проверьте, что все работает
docker compose ps
curl -k https://147.45.213.244/api/contacts/YOUR_USER_ID

# 5. Откройте порты в firewall
sudo ufw allow 443/tcp
sudo ufw allow 80/tcp
```

## На GitHub:

```bash
# 1. Закоммитьте изменения
git add .
git commit -m "Add HTTPS support with Nginx"
git push origin main

# 2. Подождите завершения GitHub Actions (~2-3 мин)
```

## В браузере:

1. Откройте в новой вкладке: `https://147.45.213.244`
2. Нажмите "Дополнительно" → "Перейти на сайт"
3. Откройте ваше приложение: `https://dmitrymailk.github.io/island/`
4. ✅ Готово!

---

**📖 Подробная инструкция:** См. [README-SSL.md](README-SSL.md) или [../HTTPS_SETUP.md](../HTTPS_SETUP.md)
