import 'dotenv/config';
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- НАСТРОЙКА ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const token = process.env.TELEGRAM_BOT_TOKEN;
const port = process.env.PORT || 3001;
const bot = new TelegramBot(token, { polling: true });

// Проверка токена
if (!token || token === 'YOUR_TELEGRAM_BOT_TOKEN_GOES_HERE') {
  console.error('\x1b[31m%s\x1b[0m', 'Ошибка: Пожалуйста, создайте файл .env в корне проекта и вставьте в него ваш реальный токен от @BotFather.');
  process.exit(1);
}

// --- ХРАНИЛИЩЕ ДАННЫХ (в файле) ---
const dbPath = path.resolve(__dirname, 'db.json');
let contactStore = {};

// Функция для чтения данных из файла
const loadContactStore = () => {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf-8');
      contactStore = JSON.parse(data);
      console.log('Хранилище контактов успешно загружено из db.json.');
    } else {
      console.log('db.json не найден, будет создан новый файл.');
    }
  } catch (error) {
    console.error('Ошибка при чтении db.json:', error);
  }
};

// Функция для записи данных в файл
const saveContactStore = () => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(contactStore, null, 2));
    console.log('Хранилище контактов успешно сохранено в db.json.');
  } catch (error) {
    console.error('Ошибка при сохранении в db.json:', error);
  }
};

// Загружаем данные при старте
loadContactStore();


// --- НАСТРОЙКА СЕРВЕРА EXPRESS ---
const app = express();
app.use(cors()); // Разрешаем CORS-запросы
app.use(express.json()); // Для парсинга JSON-тел запросов

// Middleware для логирования запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] Получен запрос: ${req.method} ${req.url}`);
  next();
});


// --- ЛОГИКА TELEGRAM БОТА ---
bot.on('contact', (msg) => {
  const userId = msg.from.id;
  const contact = msg.contact;

  if (!contactStore[userId]) {
    contactStore[userId] = [];
  }

  // Проверяем, нет ли уже такого контакта (по номеру телефона)
  const isDuplicate = contactStore[userId].some(
    (c) => c.phone_number === contact.phone_number
  );

  if (!isDuplicate) {
    contactStore[userId].push(contact);
    saveContactStore(); // Сохраняем изменения
    console.log(`[${new Date().toLocaleTimeString()}] Добавлен новый контакт для пользователя ${userId}: ${contact.first_name}`);
  } else {
    console.log(`[${new Date().toLocaleTimeString()}] Контакт ${contact.first_name} уже существует для пользователя ${userId}.`);
  }

  bot.sendMessage(msg.chat.id, `Контакт "${contact.first_name}" получен!`);
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Привет! Пожалуйста, поделись со мной контактами, которые хочешь импортировать. Ты можешь выбрать сразу несколько.");
});

console.log('\x1b[32m%s\x1b[0m', `Бот ${'@' + (await bot.getMe()).username} успешно запущен...`);


// --- API ЭНДПОИНТЫ ---
app.get('/api/contacts/:userId', (req, res) => {
  const { userId } = req.params;
  const userContacts = contactStore[userId] || [];

  console.log(`[${new Date().toLocaleTimeString()}] Запрос контактов для пользователя ${userId}. Найдено: ${userContacts.length}`);

  res.json(userContacts);
});

app.delete('/api/contacts/:userId', (req, res) => {
  const { userId } = req.params;
  const { phones } = req.body;

  if (!phones || !Array.isArray(phones)) {
    return res.status(400).json({ error: 'An array of phone numbers is required.' });
  }

  if (contactStore[userId]) {
    const initialCount = contactStore[userId].length;
    contactStore[userId] = contactStore[userId].filter(
      contact => !phones.includes(contact.phone_number)
    );
    const removedCount = initialCount - contactStore[userId].length;
    if (removedCount > 0) {
      saveContactStore(); // Сохраняем изменения
    }
    console.log(`[${new Date().toLocaleTimeString()}] Удалено ${removedCount} контактов для пользователя ${userId}.`);
    res.status(200).json({ message: `${removedCount} contacts deleted successfully.` });
  } else {
    res.status(404).json({ error: 'User not found.' });
  }
});

// --- ЗАПУСК СЕРВЕРА ---
app.listen(port, () => {
  console.log(`\x1b[34m%s\x1b[0m`, `Сервер API запущен на http://localhost:${port}`);
});
