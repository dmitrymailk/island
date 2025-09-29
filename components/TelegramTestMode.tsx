import React, { useState } from 'react';
import type { Friend } from '../types';

interface TelegramTestModeProps {
  onContactsImported: (friends: Friend[]) => void;
  onClose: () => void;
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
}) => {
  const [selectedContacts, setSelectedContacts] = useState<Set<number>>(new Set());

  const toggleContactSelection = (userId: number) => {
    setSelectedContacts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedContacts.size === MOCK_TELEGRAM_CONTACTS.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(MOCK_TELEGRAM_CONTACTS.map(c => c.user_id)));
    }
  };

  const handleAddSelectedContacts = () => {
    const selectedTelegramContacts = MOCK_TELEGRAM_CONTACTS.filter(
      contact => selectedContacts.has(contact.user_id)
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
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2 text-center">
          Тестовый режим
        </h3>
        <p className="text-slate-600 text-sm mb-4 text-center">
          Telegram WebApp недоступен. Показываем демо-контакты для тестирования.
        </p>
        <div className="text-xs text-slate-400 bg-slate-50 p-3 rounded-lg">
          <p>• В реальном Telegram WebApp здесь будут ваши контакты</p>
          <p>• Выберите контакты для добавления в друзья</p>
          <p>• Все данные остаются на вашем устройстве</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleSelectAll}
          className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
        >
          {selectedContacts.size === MOCK_TELEGRAM_CONTACTS.length ? 'Отменить все' : 'Выбрать всех'}
        </button>
        <span className="text-sm text-slate-500">
          {selectedContacts.size} из {MOCK_TELEGRAM_CONTACTS.length} выбрано
        </span>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {MOCK_TELEGRAM_CONTACTS.map(contact => {
          const isSelected = selectedContacts.has(contact.user_id);
          const fullName = contact.last_name
            ? `${contact.first_name} ${contact.last_name}`.trim()
            : contact.first_name;

          return (
            <div
              key={contact.user_id}
              onClick={() => toggleContactSelection(contact.user_id)}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${isSelected
                ? 'bg-cyan-50 border-2 border-cyan-200'
                : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'
                }`}
            >
              <div className="flex-shrink-0 mr-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected
                  ? 'bg-cyan-600 border-cyan-600'
                  : 'border-slate-300'
                  }`}>
                  {isSelected && (
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <img
                src={`https://i.pravatar.cc/150?u=tg_${contact.user_id}`}
                alt={fullName}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 truncate">{fullName}</p>
                {contact.username && (
                  <p className="text-sm text-slate-500">@{contact.username}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

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
  );
};

export default TelegramTestMode;
