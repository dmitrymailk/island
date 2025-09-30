# syntax=docker/dockerfile:1
FROM node:20-alpine

# Установка рабочей директории
WORKDIR /app

# Копируем package.json из корневой директории
# Нужно для установки зависимостей (express, telegram-bot-api и т.д.)
COPY ../package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем серверные файлы
COPY . ./server/

# Создаем директорию для db.json
RUN mkdir -p /app/server

# Экспонируем порт API сервера
EXPOSE 3001

# Запускаем сервер
CMD ["node", "server/index.js"]
