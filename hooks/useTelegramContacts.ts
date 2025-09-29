import { useState, useCallback } from 'react';
import WebApp from '@twa-dev/sdk';
import type { Friend } from '../types';

// Расширяем window для доступа к оригинальному Telegram WebApp API
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        requestContacts: (callback: (granted: boolean, contacts?: TelegramContact[]) => void) => void;
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

  // Проверяем, доступен ли Telegram WebApp
  const isTelegramWebApp = useCallback(() => {
    return typeof window !== 'undefined' &&
      WebApp.initDataUnsafe?.user &&
      window.Telegram?.WebApp?.requestContacts;
  }, []);

  // Получаем контакты из Telegram
  const requestTelegramContacts = useCallback(() => {
    if (!isTelegramWebApp()) {
      setError('Telegram WebApp недоступен');
      return Promise.reject('Telegram WebApp недоступен');
    }

    setIsLoading(true);
    setError(null);

    return new Promise<TelegramContact[]>((resolve, reject) => {
      try {
        window.Telegram!.WebApp.requestContacts((granted, contacts) => {
          setIsLoading(false);

          if (!granted) {
            const errorMsg = 'Доступ к контактам не предоставлен';
            setError(errorMsg);
            reject(errorMsg);
            return;
          }

          if (!contacts || contacts.length === 0) {
            const errorMsg = 'Контакты не найдены';
            setError(errorMsg);
            reject(errorMsg);
            return;
          }

          setFoundContacts(contacts);
          resolve(contacts);
        });
      } catch (err) {
        setIsLoading(false);
        const errorMsg = 'Ошибка при запросе контактов';
        setError(errorMsg);
        reject(errorMsg);
      }
    });
  }, [isTelegramWebApp]);

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

    const user = WebApp.initDataUnsafe.user;
    return user ? {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      languageCode: user.language_code,
    } : null;
  }, [isTelegramWebApp]);

  // Показываем уведомление в Telegram
  const showTelegramAlert = useCallback((message: string) => {
    if (isTelegramWebApp()) {
      WebApp.showAlert(message);
    } else {
      alert(message);
    }
  }, [isTelegramWebApp]);

  // Показываем подтверждение в Telegram
  const showTelegramConfirm = useCallback((message: string): Promise<boolean> => {
    if (!isTelegramWebApp()) {
      return Promise.resolve(confirm(message));
    }

    return new Promise((resolve) => {
      WebApp.showConfirm(message, (confirmed) => {
        resolve(confirmed);
      });
    });
  }, [isTelegramWebApp]);

  return {
    isLoading,
    error,
    foundContacts,
    isTelegramWebApp: isTelegramWebApp(),
    requestTelegramContacts,
    convertTelegramContactsToFriends,
    getCurrentTelegramUser,
    showTelegramAlert,
    showTelegramConfirm,
  };
};
