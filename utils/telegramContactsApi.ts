import type {
  InputPhoneContact,
  ImportedContacts,
  TelegramContacts,
  TelegramFound,
  ContactStatus,
  SavedContact,
  InputUser,
  TelegramUser,
  TelegramContact,
  ContactWithTelegramData,
  Friend
} from '../types';

// Базовый класс для работы с Telegram API
export class TelegramContactsAPI {
  private baseUrl: string;
  private accessToken: string;

  constructor(accessToken: string, baseUrl: string = 'https://api.telegram.org') {
    this.accessToken = accessToken;
    this.baseUrl = baseUrl;
  }

  // Вспомогательный метод для выполнения запросов к Telegram API
  private async makeRequest<T>(method: string, params: Record<string, any> = {}): Promise<T> {
    const url = `${this.baseUrl}/bot${this.accessToken}/${method}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.ok) {
        throw new Error(`Telegram API error: ${data.description}`);
      }

      return data.result;
    } catch (error) {
      console.error(`Error making request to ${method}:`, error);
      throw error;
    }
  }

  // Импорт контактов (contacts.importContacts)
  async importContacts(contacts: InputPhoneContact[]): Promise<ImportedContacts> {
    // В реальном приложении здесь должен быть вызов к Telegram API
    // Но поскольку мы работаем в WebApp, используем WebApp API
    return this.importContactsViaWebApp(contacts);
  }

  // Импорт контактов через WebApp API
  private async importContactsViaWebApp(contacts: InputPhoneContact[]): Promise<ImportedContacts> {
    // Симуляция импорта контактов через WebApp
    // В реальности здесь должен быть вызов к Telegram WebApp API
    const imported: any[] = [];
    const users: TelegramUser[] = [];
    const popular_invites: any[] = [];
    const retry_contacts: number[] = [];

    // Симулируем обработку контактов
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];

      // Симулируем, что некоторые контакты найдены в Telegram
      if (Math.random() > 0.7) { // 30% шанс найти контакт
        const userId = Math.floor(Math.random() * 1000000) + 100000;
        imported.push({
          user_id: userId,
          client_id: contact.client_id
        });

        users.push({
          id: userId,
          first_name: contact.first_name,
          last_name: contact.last_name,
          phone: contact.phone,
          contact: true,
          mutual_contact: Math.random() > 0.5
        });
      }
    }

    return {
      imported,
      popular_invites,
      retry_contacts,
      users
    };
  }

  // Получение списка контактов (contacts.getContacts)
  async getContacts(hash: number = 0): Promise<TelegramContacts> {
    // В реальном приложении здесь должен быть вызов к Telegram API
    // Но поскольку мы работаем в WebApp, используем WebApp API
    return this.getContactsViaWebApp(hash);
  }

  // Получение контактов через WebApp API
  private async getContactsViaWebApp(hash: number): Promise<TelegramContacts> {
    // Симуляция получения контактов через WebApp
    const contacts: TelegramContact[] = [];
    const users: TelegramUser[] = [];

    // Симулируем список контактов
    const mockContacts = [
      { id: 1, first_name: 'Анна', last_name: 'Иванова', phone: '+79001234567' },
      { id: 2, first_name: 'Петр', last_name: 'Петров', phone: '+79001234568' },
      { id: 3, first_name: 'Мария', last_name: 'Сидорова', phone: '+79001234569' },
    ];

    for (const contact of mockContacts) {
      const userId = contact.id;
      contacts.push({
        user_id: userId,
        mutual: Math.random() > 0.3
      });

      users.push({
        id: userId,
        first_name: contact.first_name,
        last_name: contact.last_name,
        phone: contact.phone,
        contact: true,
        mutual_contact: Math.random() > 0.3,
        status: {
          _: Math.random() > 0.5 ? 'userStatusOnline' : 'userStatusOffline',
          expires: Math.random() > 0.5 ? Date.now() + 3600000 : undefined,
          was_online: Math.random() > 0.5 ? Date.now() - Math.random() * 86400000 : undefined
        }
      });
    }

    return {
      contacts,
      saved_count: contacts.length,
      users
    };
  }

  // Поиск контактов (contacts.search)
  async searchContacts(query: string, limit: number = 10): Promise<TelegramFound> {
    // В реальном приложении здесь должен быть вызов к Telegram API
    return this.searchContactsViaWebApp(query, limit);
  }

  // Поиск контактов через WebApp API
  private async searchContactsViaWebApp(query: string, limit: number): Promise<TelegramFound> {
    // Симуляция поиска контактов
    const mockUsers: TelegramUser[] = [
      { id: 1, first_name: 'Анна', last_name: 'Иванова', username: 'anna_ivanova' },
      { id: 2, first_name: 'Петр', last_name: 'Петров', username: 'petr_petrov' },
      { id: 3, first_name: 'Мария', last_name: 'Сидорова', username: 'maria_sidorova' },
    ];

    const filteredUsers = mockUsers.filter(user =>
      user.first_name?.toLowerCase().includes(query.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(query.toLowerCase()) ||
      user.username?.toLowerCase().includes(query.toLowerCase())
    ).slice(0, limit);

    const my_results: any[] = [];
    const results: any[] = [];
    const chats: any[] = [];

    for (const user of filteredUsers) {
      results.push({
        _: 'peerUser',
        user_id: user.id
      });
    }

    return {
      my_results,
      results,
      chats,
      users: filteredUsers
    };
  }

  // Добавление контакта (contacts.addContact)
  async addContact(
    id: InputUser,
    first_name: string,
    last_name: string,
    phone: string,
    add_phone_privacy_exception: boolean = false
  ): Promise<any> {
    // В реальном приложении здесь должен быть вызов к Telegram API
    console.log('Adding contact:', { id, first_name, last_name, phone, add_phone_privacy_exception });

    // Симуляция успешного добавления
    return {
      _: 'updates',
      updates: [],
      users: [],
      chats: []
    };
  }

  // Удаление контактов (contacts.deleteContacts)
  async deleteContacts(ids: InputUser[]): Promise<any> {
    // В реальном приложении здесь должен быть вызов к Telegram API
    console.log('Deleting contacts:', ids);

    // Симуляция успешного удаления
    return {
      _: 'updates',
      updates: [],
      users: [],
      chats: []
    };
  }

  // Удаление контактов по номерам телефонов (contacts.deleteByPhones)
  async deleteByPhones(phones: string[]): Promise<boolean> {
    // В реальном приложении здесь должен быть вызов к Telegram API
    console.log('Deleting contacts by phones:', phones);

    // Симуляция успешного удаления
    return true;
  }

  // Сброс сохраненных контактов (contacts.resetSaved)
  async resetSaved(): Promise<boolean> {
    // В реальном приложении здесь должен быть вызов к Telegram API
    console.log('Resetting saved contacts');

    // Симуляция успешного сброса
    return true;
  }

  // Получение статусов контактов (contacts.getStatuses)
  async getStatuses(): Promise<ContactStatus[]> {
    // В реальном приложении здесь должен быть вызов к Telegram API
    return this.getStatusesViaWebApp();
  }

  // Получение статусов через WebApp API
  private async getStatusesViaWebApp(): Promise<ContactStatus[]> {
    // Симуляция получения статусов
    const statuses: ContactStatus[] = [
      {
        user_id: 1,
        status: {
          _: 'userStatusOnline',
          expires: Date.now() + 3600000
        }
      },
      {
        user_id: 2,
        status: {
          _: 'userStatusOffline',
          was_online: Date.now() - 1800000
        }
      },
      {
        user_id: 3,
        status: {
          _: 'userStatusRecently'
        }
      }
    ];

    return statuses;
  }

  // Получение сохраненных контактов (contacts.getSaved)
  async getSaved(): Promise<SavedContact[]> {
    // В реальном приложении здесь должен быть вызов к Telegram API
    return this.getSavedViaWebApp();
  }

  // Получение сохраненных контактов через WebApp API
  private async getSavedViaWebApp(): Promise<SavedContact[]> {
    // Симуляция получения сохраненных контактов
    return [
      {
        phone: '+79001234567',
        first_name: 'Анна',
        last_name: 'Иванова',
        date: Date.now() - 86400000
      },
      {
        phone: '+79001234568',
        first_name: 'Петр',
        last_name: 'Петров',
        date: Date.now() - 172800000
      }
    ];
  }

  // Получение ID контактов (contacts.getContactIDs)
  async getContactIDs(hash: number = 0): Promise<number[]> {
    // В реальном приложении здесь должен быть вызов к Telegram API
    return this.getContactIDsViaWebApp(hash);
  }

  // Получение ID контактов через WebApp API
  private async getContactIDsViaWebApp(hash: number): Promise<number[]> {
    // Симуляция получения ID контактов
    return [1, 2, 3];
  }

  // Принятие контакта (contacts.acceptContact)
  async acceptContact(id: InputUser): Promise<any> {
    // В реальном приложении здесь должен быть вызов к Telegram API
    console.log('Accepting contact:', id);

    // Симуляция успешного принятия
    return {
      _: 'updates',
      updates: [],
      users: [],
      chats: []
    };
  }
}

// Утилиты для работы с контактами
export class ContactUtils {
  // Конвертация TelegramUser в ContactWithTelegramData
  static convertTelegramUserToContact(user: TelegramUser, isOnline?: boolean): ContactWithTelegramData {
    const fullName = user.last_name
      ? `${user.first_name || ''} ${user.last_name}`.trim()
      : user.first_name || 'Unknown';

    return {
      id: `tg_${user.id}`,
      name: fullName,
      avatarUrl: user.photo?.stripped_thumb
        ? `https://t.me/i/userpic/320/${user.photo.stripped_thumb}`
        : `https://i.pravatar.cc/150?u=tg_${user.id}`,
      source: 'telegram' as const,
      telegramUser: user,
      isOnline,
      lastSeen: user.status?._ === 'userStatusOffline' ? user.status.was_online : undefined,
      mutualContact: user.mutual_contact || false,
      canAddToContacts: !user.contact && !user.self
    };
  }

  // Конвертация массива TelegramUser в массив ContactWithTelegramData
  static convertTelegramUsersToContacts(users: TelegramUser[], statuses: ContactStatus[] = []): ContactWithTelegramData[] {
    const statusMap = new Map(statuses.map(s => [s.user_id, s]));

    return users.map(user => {
      const status = statusMap.get(user.id);
      const isOnline = status?.status._ === 'userStatusOnline';

      return this.convertTelegramUserToContact(user, isOnline);
    });
  }

  // Конвертация ContactWithTelegramData в Friend
  static convertContactToFriend(contact: ContactWithTelegramData): Friend {
    return {
      id: contact.id,
      name: contact.name,
      avatarUrl: contact.avatarUrl,
      source: contact.source
    };
  }

  // Получение статуса пользователя в текстовом виде
  static getUserStatusText(status: any): string {
    switch (status._) {
      case 'userStatusOnline':
        return 'В сети';
      case 'userStatusOffline':
        if (status.was_online) {
          const lastSeen = new Date(status.was_online * 1000);
          const now = new Date();
          const diff = now.getTime() - lastSeen.getTime();

          if (diff < 60000) return 'был(а) в сети только что';
          if (diff < 3600000) return `был(а) в сети ${Math.floor(diff / 60000)} мин. назад`;
          if (diff < 86400000) return `был(а) в сети ${Math.floor(diff / 3600000)} ч. назад`;
          return `был(а) в сети ${Math.floor(diff / 86400000)} дн. назад`;
        }
        return 'был(а) в сети давно';
      case 'userStatusRecently':
        return 'был(а) в сети недавно';
      case 'userStatusLastWeek':
        return 'был(а) в сети на этой неделе';
      case 'userStatusLastMonth':
        return 'был(а) в сети в этом месяце';
      case 'userStatusEmpty':
      default:
        return 'давно не был(а) в сети';
    }
  }

  // Проверка, является ли пользователь онлайн
  static isUserOnline(status: any): boolean {
    return status._ === 'userStatusOnline';
  }

  // Получение времени последнего посещения
  static getLastSeenTime(status: any): number | null {
    if (status._ === 'userStatusOffline' && status.was_online) {
      return status.was_online * 1000; // Конвертируем в миллисекунды
    }
    return null;
  }
}
