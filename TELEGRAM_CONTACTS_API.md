# Telegram Contacts API Integration

Полноценная реализация API контактов Telegram согласно официальной документации [https://core.telegram.org/api/contacts](https://core.telegram.org/api/contacts).

## 🚀 Возможности

### Основные функции
- **Импорт контактов** - `contacts.importContacts`
- **Получение списка контактов** - `contacts.getContacts`
- **Поиск контактов** - `contacts.search`
- **Добавление контактов** - `contacts.addContact`
- **Удаление контактов** - `contacts.deleteContacts`
- **Получение статусов** - `contacts.getStatuses`
- **Управление сохраненными контактами** - `contacts.getSaved`, `contacts.resetSaved`

### Дополнительные возможности
- Отображение онлайн статусов пользователей
- Визуальные индикаторы (верификация, Premium, боты)
- Статистика контактов
- Поиск в реальном времени
- Массовые операции с контактами

## 📁 Структура файлов

```
├── types.ts                          # Типы для Telegram API
├── utils/
│   └── telegramContactsApi.ts        # API слой для работы с контактами
├── hooks/
│   └── useTelegramContacts.ts        # Основной хук для работы с контактами
├── components/
│   ├── ContactManager.tsx            # Главный компонент управления контактами
│   ├── ContactCard.tsx               # Карточка контакта
│   ├── ContactStats.tsx              # Статистика контактов
│   └── TelegramContactsImport.tsx    # Обновленный компонент импорта
└── pages/
    └── ContactsDemoPage.tsx          # Демонстрационная страница
```

## 🔧 Использование

### Базовое использование

```tsx
import { useTelegramContacts } from './hooks/useTelegramContacts';

const MyComponent = () => {
  const {
    allContacts,
    isLoading,
    error,
    loadAllContacts,
    searchContacts,
    addContact,
    deleteContacts
  } = useTelegramContacts();

  // Загрузка контактов
  useEffect(() => {
    loadAllContacts();
  }, []);

  return (
    <div>
      {allContacts.map(contact => (
        <div key={contact.id}>{contact.name}</div>
      ))}
    </div>
  );
};
```

### Использование ContactManager

```tsx
import ContactManager from './components/ContactManager';

const App = () => {
  const handleContactsImported = (contacts) => {
    console.log('Импортированы контакты:', contacts);
  };

  return (
    <ContactManager
      onContactsImported={handleContactsImported}
      onClose={() => setShowManager(false)}
    />
  );
};
```

## 📊 API Reference

### TelegramContactsAPI

Основной класс для работы с Telegram API контактов.

```typescript
class TelegramContactsAPI {
  // Импорт контактов из телефона
  async importContacts(contacts: InputPhoneContact[]): Promise<ImportedContacts>
  
  // Получение списка контактов
  async getContacts(hash: number = 0): Promise<TelegramContacts>
  
  // Поиск контактов
  async searchContacts(query: string, limit: number = 10): Promise<TelegramFound>
  
  // Добавление контакта
  async addContact(
    id: InputUser,
    first_name: string,
    last_name: string,
    phone: string,
    add_phone_privacy_exception: boolean = false
  ): Promise<any>
  
  // Удаление контактов
  async deleteContacts(ids: InputUser[]): Promise<any>
  
  // Получение статусов контактов
  async getStatuses(): Promise<ContactStatus[]>
}
```

### useTelegramContacts Hook

```typescript
const {
  // Состояния
  isLoading,
  error,
  allContacts,
  contactStatuses,
  searchResults,
  isSearching,
  searchError,
  
  // Основные методы
  loadAllContacts,
  searchContacts,
  importPhoneContacts,
  addContact,
  deleteContacts,
  deleteContactsByPhones,
  loadSavedContacts,
  resetSavedContacts,
  acceptContact,
  
  // Утилиты
  getUserStatus,
  isUserOnline,
  getUserStatusText,
  getCurrentTelegramUser,
  showTelegramAlert,
  showTelegramConfirm
} = useTelegramContacts();
```

## 🎨 Компоненты

### ContactManager

Главный компонент для управления контактами с табами:
- **Все контакты** - просмотр всех контактов
- **Поиск** - поиск по контактам
- **Импорт** - импорт контактов из телефона
- **Статистика** - детальная статистика контактов

### ContactCard

Карточка контакта с отображением:
- Аватара и имени
- Онлайн статуса
- Индикаторов (верификация, Premium, боты)
- Действий (добавить/удалить)

### ContactStats

Статистика контактов:
- Общее количество
- Онлайн пользователи
- Взаимные контакты
- Верифицированные аккаунты
- Premium пользователи
- Боты

## 🔄 Типы данных

### Основные типы

```typescript
interface TelegramUser {
  id: number;
  access_hash?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  phone?: string;
  photo?: TelegramUserProfilePhoto;
  status?: TelegramUserStatus;
  verified?: boolean;
  premium?: boolean;
  bot?: boolean;
  mutual_contact?: boolean;
  // ... другие поля
}

interface ContactWithTelegramData extends Friend {
  telegramUser?: TelegramUser;
  isOnline?: boolean;
  lastSeen?: number;
  mutualContact?: boolean;
  canAddToContacts?: boolean;
}
```

## 🚀 Демонстрация

Для просмотра демонстрации функционала:

1. Запустите приложение: `npm run dev`
2. Перейдите на страницу `/contacts-demo`
3. Нажмите "Открыть менеджер контактов"

## 🔧 Настройка

### Для реального использования

1. Замените `mock_token` в `TelegramContactsAPI` на реальный токен бота
2. Настройте правильный `baseUrl` для Telegram API
3. Реализуйте реальные вызовы API вместо симуляции

### Пример настройки

```typescript
const api = new TelegramContactsAPI(
  'YOUR_BOT_TOKEN',
  'https://api.telegram.org'
);
```

## 📝 Примечания

- Текущая реализация использует симуляцию API для демонстрации
- Для продакшена необходимо реализовать реальные вызовы к Telegram API
- Все методы соответствуют официальной документации Telegram
- Поддерживается работа в Telegram WebApp и обычном браузере

## 🔗 Ссылки

- [Официальная документация Telegram API](https://core.telegram.org/api/contacts)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram WebApp](https://core.telegram.org/bots/webapps)
