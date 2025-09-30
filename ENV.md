# Переменные окружения

Этот файл описывает все доступные переменные окружения для настройки приложения.

## Фронтенд (.env в корне проекта)

### VITE_TELEGRAM_SERVER_URL

**Описание:** URL адрес сервера для импорта контактов Telegram и работы с API.

**Обязательная:** Нет

**Значение по умолчанию:** `http://localhost:3001`

**Примеры:**
```env
# Локальная разработка
VITE_TELEGRAM_SERVER_URL=http://localhost:3001

# Сервер в локальной сети
VITE_TELEGRAM_SERVER_URL=http://192.168.1.100:3001

# Удаленный сервер
VITE_TELEGRAM_SERVER_URL=https://api.myapp.com

# Docker контейнер в той же сети
VITE_TELEGRAM_SERVER_URL=http://telegram-bot-server:3001
```

**Где используется:**
- `hooks/useTelegramContacts.ts` - для загрузки и удаления контактов
- `config.ts` - основная конфигурация API

---

## Серверная часть (server/.env или .env в корне)

### TELEGRAM_BOT_TOKEN

**Описание:** Токен Telegram бота, полученный от [@BotFather](https://t.me/BotFather).

**Обязательная:** Да

**Значение по умолчанию:** Нет

**Как получить:**
1. Откройте Telegram и найдите [@BotFather](https://t.me/BotFather)
2. Отправьте команду `/newbot`
3. Следуйте инструкциям (введите имя и username бота)
4. Скопируйте полученный токен

**Пример:**
```env
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz123456789
```

**Где используется:**
- `server/index.js` - для инициализации Telegram бота

---

### PORT

**Описание:** Порт для запуска Express API сервера.

**Обязательная:** Нет

**Значение по умолчанию:** `3001`

**Пример:**
```env
PORT=3001
```

**Где используется:**
- `server/index.js` - для запуска Express сервера

---

### NODE_ENV

**Описание:** Окружение Node.js приложения.

**Обязательная:** Нет

**Значение по умолчанию:** `development`

**Возможные значения:**
- `development` - режим разработки
- `production` - продакшн режим

**Пример:**
```env
NODE_ENV=production
```

---

## Примеры конфигурации

### Локальная разработка

Создайте `.env` в корне проекта:

```env
# Фронтенд
VITE_TELEGRAM_SERVER_URL=http://localhost:3001

# Серверная часть
TELEGRAM_BOT_TOKEN=your_bot_token_here
PORT=3001
NODE_ENV=development
```

### Продакшн с удаленным сервером

**Фронтенд (.env):**
```env
VITE_TELEGRAM_SERVER_URL=https://api.yourapp.com
```

**Сервер (.env на сервере):**
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
PORT=3001
NODE_ENV=production
```

### Docker Compose

При использовании Docker, переменные окружения можно задать в `docker-compose.yml` или через `.env` файл.

**docker-compose.yml:**
```yaml
services:
  web:
    environment:
      - VITE_TELEGRAM_SERVER_URL=http://telegram-bot-server:3001
  
  telegram-bot-server:
    env_file:
      - .env
```

**.env:**
```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
PORT=3001
```

---

## Безопасность

⚠️ **Важно:**

1. **Никогда не коммитьте `.env` файлы в git!**
2. Добавьте `.env` в `.gitignore` (уже добавлено)
3. Не публикуйте токены и ключи API
4. Используйте разные токены для dev/prod окружений
5. Регулярно обновляйте токены и ключи

---

## Troubleshooting

### Переменные окружения не работают

1. Убедитесь, что файл называется `.env` (с точкой в начале)
2. Переменные для Vite должны начинаться с `VITE_`
3. Перезапустите dev-сервер после изменения `.env`
4. Проверьте, что `.env` находится в корне проекта

### Сервер не видит TELEGRAM_BOT_TOKEN

1. Проверьте, что `.env` существует (в корне или в `server/`)
2. Убедитесь, что токен правильный (нет лишних пробелов)
3. Перезапустите сервер

### CORS ошибки при обращении к API

Убедитесь, что `VITE_TELEGRAM_SERVER_URL` указывает на правильный адрес и порт, где запущен сервер.
