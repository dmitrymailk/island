import React, { useState, useCallback } from 'react';
import ContactList from './ContactList';
import type { Friend } from '../types';

interface TelegramTestModeProps {
  onContactsImported: (friends: Friend[]) => void;
  onClose: () => void;
  existingFriends?: Friend[];
}

// Моковые данные для тестирования вне Telegram WebApp
const MOCK_TELEGRAM_CONTACTS = [
  {
    user_id: 123456789,
    first_name: 'Анна',
    last_name: 'Петрова',
    username: 'anna_pet',
    phone_number: '+7900123456'
  },
  {
    user_id: 987654321,
    first_name: 'Дмитрий',
    last_name: 'Сидоров',
    username: 'dmitry_s',
    phone_number: '+7900654321'
  },
  {
    user_id: 456789123,
    first_name: 'Елена',
    username: 'elena_m',
    phone_number: '+7900789012'
  },
  {
    user_id: 789123456,
    first_name: 'Михаил',
    last_name: 'Козлов',
    phone_number: '+7900456789'
  }
];

const TelegramTestMode: React.FC<TelegramTestModeProps> = ({
  onContactsImported,
  onClose,
  existingFriends = [],
}) => {
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());


  const toggleContactSelection = useCallback((contactId: string) => {
    setSelectedContacts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(contactId)) {
        newSet.delete(contactId);
      } else {
        newSet.add(contactId);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedContacts.size === MOCK_TELEGRAM_CONTACTS.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(MOCK_TELEGRAM_CONTACTS.map(c => `tg_${c.user_id}`)));
    }
  }, [selectedContacts.size]);


  const handleAddSelectedContacts = useCallback(() => {
    const selectedTelegramContacts = MOCK_TELEGRAM_CONTACTS.filter(
      contact => selectedContacts.has(`tg_${contact.user_id}`)
    );

    const friends: Friend[] = selectedTelegramContacts.map(contact => {
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

    onContactsImported(friends);
    onClose();
  }, [selectedContacts, onContactsImported, onClose]);

  return (
    <div className="w-full">
      <div className="relative">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2 text-center">
            {typeof window !== 'undefined' && window.Telegram?.WebApp?.platform === 'tdesktop'
              ? 'Telegram Desktop'
              : 'Тестовый режим'}
          </h3>
          <p className="text-slate-600 text-sm mb-4 text-center">
            {typeof window !== 'undefined' && window.Telegram?.WebApp?.platform === 'tdesktop'
              ? 'Вы используете Telegram Desktop. Импорт контактов недоступен в этой версии. Откройте приложение в мобильном Telegram для импорта контактов.'
              : 'Telegram WebApp недоступен. Показываем демо-контакты для тестирования.'}
          </p>
          <div className="text-xs text-slate-500 bg-yellow-50 p-2 rounded-lg mb-4">
            <p className="font-medium">Отладочная информация:</p>
            <p>• window.Telegram: {typeof window !== 'undefined' && window.Telegram ? '✅' : '❌'}</p>
            <p>• window.Telegram.WebApp: {typeof window !== 'undefined' && window.Telegram?.WebApp ? '✅' : '❌'}</p>
            <p>• initData: {typeof window !== 'undefined' && window.Telegram?.WebApp?.initData ? `✅ (${window.Telegram.WebApp.initData.length} символов)` : '❌'}</p>
            <p>• requestContacts: {typeof window !== 'undefined' && window.Telegram?.WebApp?.requestContacts ? '✅' : '❌'}</p>
            <p>• showAlert: {typeof window !== 'undefined' && window.Telegram?.WebApp?.showAlert ? '✅' : '❌'}</p>
            <p>• showConfirm: {typeof window !== 'undefined' && window.Telegram?.WebApp?.showConfirm ? '✅' : '❌'}</p>
            <p>• version: {typeof window !== 'undefined' && window.Telegram?.WebApp?.version ? window.Telegram.WebApp.version : 'N/A'}</p>
            <p>• platform: {typeof window !== 'undefined' && window.Telegram?.WebApp?.platform ? window.Telegram.WebApp.platform : 'N/A'}</p>
            <p>• User Agent: {typeof window !== 'undefined' ? window.navigator.userAgent.substring(0, 50) + '...' : 'N/A'}</p>
          </div>
          <div className="text-xs text-slate-400 bg-slate-50 p-3 rounded-lg mb-4">
            <p>• В реальном Telegram WebApp здесь будут ваши контакты</p>
            <p>• Выберите контакты для добавления в друзья</p>
            <p>• Все данные остаются на вашем устройстве</p>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                console.log('Force refresh Telegram WebApp check');
                window.location.reload();
              }}
              className="text-xs text-cyan-600 hover:text-cyan-700 underline"
            >
              Обновить проверку Telegram WebApp
            </button>
          </div>
        </div>

        <ContactList
          contacts={MOCK_TELEGRAM_CONTACTS}
          selectedContacts={selectedContacts}
          onToggleContact={toggleContactSelection}
          onSelectAll={handleSelectAll}
          existingFriendIds={new Set(existingFriends.map(f => f.id))}
        />

        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleAddSelectedContacts}
            disabled={selectedContacts.size === 0}
            className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            Добавить выбранных ({selectedContacts.size})
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelegramTestMode;
