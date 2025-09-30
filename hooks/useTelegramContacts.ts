import { useState, useCallback, useEffect } from 'react';
import { parseInitData } from '@tma.js/sdk';
import type {
  Friend,
  ContactWithTelegramData,
  TelegramUser,
  InputPhoneContact,
  ContactStatus,
  TelegramContacts,
  TelegramFound,
  SavedContact
} from '../types';
import { TelegramContactsAPI, ContactUtils } from '../utils/telegramContactsApi';

// Расширяем window для доступа к Telegram WebApp API
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        version: string;
        platform: string;
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        ready: () => void;
        expand: () => void;
        close: () => void;
        showAlert: (message: string, callback?: () => void) => void;
        showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
        readTextFromClipboard: (callback?: (text: string) => void) => void;
        requestWriteAccess: (callback?: (granted: boolean) => void) => void;
        requestContact: (callback?: (granted: boolean, contact?: any) => void) => void;
        requestLocation: (callback?: (granted: boolean, location?: any) => void) => void;
        requestPoll: (params: any, callback?: (granted: boolean, poll?: any) => void) => void;
        requestQuiz: (params: any, callback?: (granted: boolean, quiz?: any) => void) => void;
        openLink: (url: string) => void;
        openTelegramLink: (url: string) => void;
        openInvoice: (url: string, callback?: (status: string) => void) => void;
        showPopup: (params: any, callback?: (buttonId: string) => void) => void;
      };
    };
  }
}

// Типы для Telegram WebApp API
interface TelegramContact {
  user_id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  phone_number?: string;
}

export const useTelegramContacts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foundContacts, setFoundContacts] = useState<TelegramContact[]>([]);
  const [allContacts, setAllContacts] = useState<ContactWithTelegramData[]>([]);
  const [contactStatuses, setContactStatuses] = useState<ContactStatus[]>([]);
  const [savedContacts, setSavedContacts] = useState<SavedContact[]>([]);
  const [searchResults, setSearchResults] = useState<ContactWithTelegramData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Инициализация API
  const [api] = useState(() => new TelegramContactsAPI('mock_token'));

  // Проверяем, доступен ли Telegram WebApp
  const isTelegramWebApp = useCallback(() => {
    // Проверяем базовые условия
    if (typeof window === 'undefined') {
      console.log('Telegram WebApp check: window is undefined');
      return false;
    }

    if (!window.Telegram) {
      console.log('Telegram WebApp check: window.Telegram is undefined');
      return false;
    }

    if (!window.Telegram.WebApp) {
      console.log('Telegram WebApp check: window.Telegram.WebApp is undefined');
      return false;
    }

    // Логируем информацию о Telegram WebApp
    console.log('Telegram WebApp info:', {
      version: window.Telegram.WebApp.version,
      platform: window.Telegram.WebApp.platform,
      initData: window.Telegram.WebApp.initData,
      initDataLength: window.Telegram.WebApp.initData?.length || 0,
      isExpanded: window.Telegram.WebApp.isExpanded,
      viewportHeight: window.Telegram.WebApp.viewportHeight,
    });

    // Проверяем наличие основных методов Telegram WebApp
    // requestContacts может быть недоступен в Telegram Desktop
    const hasBasicMethods = window.Telegram.WebApp.showAlert &&
      window.Telegram.WebApp.showConfirm;

    if (!hasBasicMethods) {
      console.log('Telegram WebApp check: basic methods not available');
      return false;
    }

    // Проверяем платформу - в Desktop requestContacts недоступен
    const isDesktop = window.Telegram.WebApp.platform === 'tdesktop';

    console.log('Platform:', window.Telegram.WebApp.platform);

    // Проверяем наличие initData
    if (!window.Telegram.WebApp.initData) {
      console.log('Telegram WebApp check: initData is empty, but WebApp methods are available');
      // Если методы доступны, но initData пустой, все равно считаем что мы в Telegram WebApp
      return true;
    }

    // Пробуем парсить initData
    try {
      const parsedData = parseInitData(window.Telegram.WebApp.initData);
      console.log('Parsed initData:', parsedData);

      if (!parsedData) {
        console.log('Telegram WebApp check: parsed initData is null, but WebApp methods are available');
        return true;
      }

      if (!parsedData.user) {
        console.log('Telegram WebApp check: no user in parsed initData, but WebApp methods are available');
        return true;
      }

      console.log('Telegram WebApp check: SUCCESS - user found:', parsedData.user);
      return true;
    } catch (err) {
      console.log('Telegram WebApp check: error parsing initData, but WebApp methods are available:', err);
      return true;
    }
  }, []);

  // Конвертируем контакты Telegram в формат Friend
  const convertTelegramContactsToFriends = useCallback((contacts: TelegramContact[]): Friend[] => {
    return contacts.map(contact => {
      const fullName = contact.last_name
        ? `${contact.first_name} ${contact.last_name}`.trim()
        : contact.first_name;

      return {
        id: `tg_${contact.user_id}`,
        name: fullName,
        avatarUrl: `https://i.pravatar.cc/150?u=tg_${contact.user_id}`,
        source: 'telegram' as const,
      };
    });
  }, []);

  // Получаем информацию о текущем пользователе Telegram
  const getCurrentTelegramUser = useCallback(() => {
    if (!isTelegramWebApp()) {
      return null;
    }

    const initDataParsed = parseInitData(window.Telegram?.WebApp?.initData || '');
    const user = initDataParsed?.user;
    return user ? {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      languageCode: user.languageCode,
    } : null;
  }, [isTelegramWebApp]);

  // Загрузка всех контактов
  const loadAllContacts = useCallback(async () => {
    if (!isTelegramWebApp()) {
      setError('Telegram WebApp недоступен');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const currentUser = getCurrentTelegramUser();
      if (!currentUser) {
        setError("Не удалось определить пользователя Telegram.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:3001/api/contacts/${currentUser.id}`);
      if (!response.ok) {
        throw new Error(`Ошибка сети при загрузке контактов: ${response.status}`);
      }
      const serverContacts: TelegramContact[] = await response.json();

      const users: TelegramUser[] = serverContacts.map(c => ({
        id: c.user_id,
        first_name: c.first_name,
        last_name: c.last_name,
        phone: c.phone_number,
        contact: true
      }));

      const statusesData = await api.getStatuses();
      setContactStatuses(statusesData);

      const contacts = ContactUtils.convertTelegramUsersToContacts(
        users,
        statusesData
      );

      setAllContacts(contacts);
      return contacts;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Ошибка при загрузке контактов';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [isTelegramWebApp, api, getCurrentTelegramUser]);

  // Поиск контактов
  const searchContacts = useCallback(async (query: string, limit: number = 10) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const searchData = await api.searchContacts(query, limit);
      const contacts = ContactUtils.convertTelegramUsersToContacts(searchData.users);
      setSearchResults(contacts);
      return contacts;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Ошибка при поиске контактов';
      setSearchError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsSearching(false);
    }
  }, [api]);

  // Импорт контактов из телефона
  const importPhoneContacts = useCallback(async (phoneContacts: InputPhoneContact[]) => {
    if (!isTelegramWebApp()) {
      setError('Telegram WebApp недоступен');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const importedData = await api.importContacts(phoneContacts);

      // Обновляем список контактов
      const contacts = ContactUtils.convertTelegramUsersToContacts(importedData.users);
      setAllContacts(prev => {
        const existingIds = new Set(prev.map(c => c.id));
        const newContacts = contacts.filter(c => !existingIds.has(c.id));
        return [...prev, ...newContacts];
      });

      return importedData;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Ошибка при импорте контактов';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [isTelegramWebApp, api]);

  // Добавление контакта
  const addContact = useCallback(async (
    userId: number,
    accessHash: number,
    firstName: string,
    lastName: string,
    phone: string,
    addPhonePrivacyException: boolean = false
  ) => {
    if (!isTelegramWebApp()) {
      setError('Telegram WebApp недоступен');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await api.addContact(
        { user_id: userId, access_hash: accessHash },
        firstName,
        lastName,
        phone,
        addPhonePrivacyException
      );

      // Обновляем список контактов
      await loadAllContacts();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Ошибка при добавлении контакта';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [isTelegramWebApp, api, loadAllContacts]);

  // Удаление контактов по номерам телефонов
  const deleteContactsByPhones = useCallback(async (phones: string[]) => {
    const currentUser = getCurrentTelegramUser();
    if (!currentUser) {
      setError('Не удалось определить пользователя Telegram.');
      return;
    }

    if (phones.length === 0) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/api/contacts/${currentUser.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phones }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении контактов на сервере');
      }

      await response.json();

      // Обновляем список контактов
      await loadAllContacts();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Ошибка при удалении контактов';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [getCurrentTelegramUser, loadAllContacts]);

  // Загрузка сохраненных контактов
  const loadSavedContacts = useCallback(async () => {
    if (!isTelegramWebApp()) {
      setError('Telegram WebApp недоступен');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const saved = await api.getSaved();
      setSavedContacts(saved);
      return saved;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Ошибка при загрузке сохраненных контактов';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [isTelegramWebApp, api]);

  // Сброс сохраненных контактов
  const resetSavedContacts = useCallback(async () => {
    if (!isTelegramWebApp()) {
      setError('Telegram WebApp недоступен');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await api.resetSaved();
      setSavedContacts([]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Ошибка при сбросе контактов';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [isTelegramWebApp, api]);

  // Принятие контакта
  const acceptContact = useCallback(async (userId: number, accessHash: number) => {
    if (!isTelegramWebApp()) {
      setError('Telegram WebApp недоступен');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await api.acceptContact({ user_id: userId, access_hash: accessHash });

      // Обновляем список контактов
      await loadAllContacts();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Ошибка при принятии контакта';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [isTelegramWebApp, api, loadAllContacts]);

  // Получение статуса пользователя
  const getUserStatus = useCallback((userId: number): ContactStatus | undefined => {
    return contactStatuses.find(s => s.user_id === userId);
  }, [contactStatuses]);

  // Проверка, онлайн ли пользователь
  const isUserOnline = useCallback((userId: number): boolean => {
    const status = getUserStatus(userId);
    return status ? ContactUtils.isUserOnline(status.status) : false;
  }, [getUserStatus]);

  // Получение текста статуса пользователя
  const getUserStatusText = useCallback((userId: number): string => {
    const status = getUserStatus(userId);
    return status ? ContactUtils.getUserStatusText(status.status) : 'статус неизвестен';
  }, [getUserStatus]);

  // Показываем уведомление в Telegram
  const showTelegramAlert = useCallback((message: string) => {
    if (isTelegramWebApp() && window.Telegram?.WebApp?.showAlert) {
      window.Telegram.WebApp.showAlert(message);
    } else {
      alert(message);
    }
  }, [isTelegramWebApp]);

  // Показываем подтверждение в Telegram
  const showTelegramConfirm = useCallback((message: string): Promise<boolean> => {
    if (!isTelegramWebApp()) {
      return Promise.resolve(confirm(message));
    }

    if (window.Telegram?.WebApp?.showConfirm) {
      return new Promise((resolve) => {
        window.Telegram.WebApp.showConfirm(message, (confirmed) => {
          resolve(confirmed);
        });
      });
    }

    return Promise.resolve(confirm(message));
  }, [isTelegramWebApp]);

  return {
    // Основные состояния
    isLoading,
    error,
    isTelegramWebApp: isTelegramWebApp(),

    // Контакты
    foundContacts,
    allContacts,
    contactStatuses,
    savedContacts,
    searchResults,
    isSearching,
    searchError,

    // Основные методы
    convertTelegramContactsToFriends,
    loadAllContacts,
    searchContacts,
    importPhoneContacts,
    addContact,
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
    showTelegramConfirm,
  };
};
