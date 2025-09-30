# Telegram Bot Server

Серверная часть проекта с Telegram ботом для импорта контактов и Express API сервером.

## 🚀 Быстрый старт

### Запуск через Docker Compose (рекомендуется)

1. **Убедитесь, что файл `.env` создан в корне проекта:**

```bash
cd ..
```

Создайте `.env` файл:
```env
TELEGRAM_BOT_TOKEN=your_bot_token_from_BotFather
PORT=3001
```

2. **Вернитесь в папку server и запустите контейнер:**

```bash
cd server
docker compose up -d
```

3. **Проверьте логи:**

```bash
docker compose logs -f
```

Вы должны увидеть:
```
Бот @ваш_бот успешно запущен...
Сервер API запущен на http://localhost:3001
```

4. **Откройте бота в Telegram и отправьте `/start`**

### Запуск без Docker

```bash
# Из корня проекта
npm install
npm run server
```

## 📦 Что внутри

```
server/
├── index.js              # Основной файл сервера
├── db.json              # База данных контактов (создается автоматически)
├── Dockerfile           # Docker образ для сервера
├── docker-compose.yml   # Конфигурация Docker Compose
├── .dockerignore        # Файлы, игнорируемые при сборке образа
└── README.md           # Эта документация
```

## 🐳 Docker команды

### Основные команды

**Запуск в фоновом режиме:**
```bash
docker compose up -d
```

**Просмотр логов:**
```bash
docker compose logs -f
```

**Остановка контейнера:**
```bash
docker compose down
```

**Перезапуск:**
```bash
docker compose restart
```

**Пересборка образа:**
```bash
docker compose up --build
```

### Дополнительные команды

**Просмотр статуса:**
```bash
docker compose ps
```

**Выполнение команды внутри контейнера:**
```bash
docker compose exec telegram-bot-server sh
```

**Просмотр логов за последние N строк:**
```bash
docker compose logs --tail=100
```

**Остановка с удалением volumes:**
```bash
docker compose down -v
```

## 🔧 Конфигурация

### Переменные окружения

Файл `.env` должен находиться в **корне проекта** (на уровень выше):

```env
# Обязательные параметры
TELEGRAM_BOT_TOKEN=your_bot_token_here

# Необязательные параметры
PORT=3001
NODE_ENV=production
```

### Порты

- **3001** - Express API сервер (можно изменить через переменную `PORT`)

### Volumes

Docker Compose монтирует следующие директории:

- `.:/app/server` - для hot-reload при разработке
- `./db.json:/app/server/db.json` - сохранение базы данных на хосте

## 📡 API Endpoints

### GET /api/contacts/:userId

Получить список контактов пользователя.

**Пример:**
```bash
curl http://localhost:3001/api/contacts/427649895
```

**Ответ:**
```json
[
  {
    "phone_number": "+79272587856",
    "first_name": "Арина",
    "last_name": "Капшук",
    "user_id": 5457930994
  }
]
```

### DELETE /api/contacts/:userId

Удалить контакты пользователя.

**Пример:**
```bash
curl -X DELETE http://localhost:3001/api/contacts/427649895 \
  -H "Content-Type: application/json" \
  -d '{"phones": ["+79272587856"]}'
```

**Ответ:**
```json
{
  "message": "1 contacts deleted successfully."
}
```

## 🐛 Troubleshooting

### Проблема: Контейнер не запускается

**Решение:**
1. Проверьте, создан ли файл `.env` в корне проекта
2. Убедитесь, что в `.env` указан корректный токен бота
3. Проверьте логи: `docker compose logs`

### Проблема: Порт 3001 занят

**Решение 1:** Измените порт в `.env`:
```env
PORT=3002
```

**Решение 2:** Измените маппинг портов в `docker-compose.yml`:
```yaml
ports:
  - "3002:3001"
```

### Проблема: Бот не отвечает в Telegram

**Решение:**
1. Проверьте логи: `docker compose logs -f`
2. Убедитесь, что токен правильный
3. Проверьте, что бот не запущен в другом месте
4. Перезапустите контейнер: `docker compose restart`

### Проблема: База данных db.json пустая после перезапуска

**Решение:**
Убедитесь, что в `docker-compose.yml` есть маппинг:
```yaml
volumes:
  - ./db.json:/app/server/db.json
```

### Проблема: Изменения в коде не применяются

**Решение:**
1. Пересоберите образ: `docker compose up --build`
2. Или перезапустите: `docker compose restart`

## 🔒 Безопасность

⚠️ **Важно:**
- Никогда не коммитьте `.env` файл в git
- Не публикуйте токен бота
- Используйте `.gitignore` для исключения чувствительных данных

## 📚 Дополнительная информация

### Как получить Telegram Bot Token

1. Откройте Telegram и найдите [@BotFather](https://t.me/BotFather)
2. Отправьте команду `/newbot`
3. Следуйте инструкциям:
   - Введите имя бота (например, "Ostrovok Contacts Bot")
   - Введите username бота (должен заканчиваться на `bot`, например, `ostrovok_contacts_bot`)
4. Скопируйте полученный токен и вставьте в `.env` файл

### Архитектура

```
┌──────────────┐
│   Telegram   │
│   User       │
└──────┬───────┘
       │ Отправка контакта
       ▼
┌──────────────────┐
│  Telegram Bot    │
│  (node-telegram- │
│   bot-api)       │
└──────┬───────────┘
       │ Сохранение
       ▼
┌──────────────────┐
│   db.json        │
│   (файловое      │
│    хранилище)    │
└──────┬───────────┘
       │ Чтение
       ▼
┌──────────────────┐
│  Express API     │
│  (REST)          │
└──────┬───────────┘
       │ HTTP запрос
       ▼
┌──────────────────┐
│   Frontend       │
│   (React)        │
└──────────────────┘
```

## 📄 Лицензия

Часть проекта Ostrovok 2025.
