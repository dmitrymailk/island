import React, { useState, useEffect } from 'react';
import { useTelegramContacts } from '../hooks/useTelegramContacts';
import TelegramTestMode from './TelegramTestMode';
import type { Friend } from '../types';

interface TelegramContactsImportProps {
  onContactsImported: (friends: Friend[]) => void;
  onClose: () => void;
}

const TelegramContactsImport: React.FC<TelegramContactsImportProps> = ({
  onContactsImported,
  onClose,
}) => {
  const {
    isLoading,
    error,
    foundContacts,
    isTelegramWebApp,
    requestTelegramContacts,
    convertTelegramContactsToFriends,
    showTelegramAlert,
    showTelegramConfirm,
  } = useTelegramContacts();

  const [step, setStep] = useState<'intro' | 'loading' | 'found' | 'success'>('intro');
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());

  // Обработка импорта контактов
  const handleImportContacts = async () => {
    try {
      setStep('loading');
      const contacts = await requestTelegramContacts();

      if (contacts.length > 0) {
        // Автоматически выбираем всех найденных контактов
        setSelectedContacts(new Set(contacts.map(c => `tg_${c.user_id}`)));
        setStep('found');
      } else {
        showTelegramAlert('Контакты не найдены');
        setStep('intro');
      }
    } catch (err) {
      console.error('Ошибка импорта контактов:', err);
      showTelegramAlert(error || 'Произошла ошибка при импорте контактов');
      setStep('intro');
    }
  };

  // Обработка выбора/отмены выбора контакта
  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(contactId)) {
        newSet.delete(contactId);
      } else {
        newSet.add(contactId);
      }
      return newSet;
    });
  };

  // Обработка добавления выбранных контактов
  const handleAddSelectedContacts = () => {
    const selectedTelegramContacts = foundContacts.filter(
      contact => selectedContacts.has(`tg_${contact.user_id}`)
    );

    const friends = convertTelegramContactsToFriends(selectedTelegramContacts);
    onContactsImported(friends);
    setStep('success');

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  // Обработка выбора всех контактов
  const handleSelectAll = () => {
    if (selectedContacts.size === foundContacts.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(foundContacts.map(c => `tg_${c.user_id}`)));
    }
  };

  // Если не в Telegram WebApp, показываем тестовый режим
  if (!isTelegramWebApp) {
    return <TelegramTestMode onContactsImported={onContactsImported} onClose={onClose} />;
  }

  return (
    <div className="p-6">
      {step === 'intro' && (
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Импорт друзей из Telegram
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Найдем ваших друзей из Telegram, которые уже используют Островок
            </p>
            <div className="text-xs text-slate-400 bg-slate-50 p-3 rounded-lg">
              <p>• Мы получим доступ только к контактам из вашего Telegram</p>
              <p>• Найдем среди них пользователей Островка</p>
              <p>• Никому не будем звонить или писать</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleImportContacts}
              className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Импортировать
            </button>
          </div>
        </div>
      )}

      {step === 'loading' && (
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Ищем друзей...
            </h3>
            <p className="text-slate-600 text-sm">
              Проверяем ваши контакты Telegram
            </p>
          </div>
        </div>
      )}

      {step === 'found' && (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Найдено {foundContacts.length} друзей!
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Выберите, кого добавить в друзья
            </p>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleSelectAll}
                className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
              >
                {selectedContacts.size === foundContacts.length ? 'Отменить все' : 'Выбрать всех'}
              </button>
              <span className="text-sm text-slate-500">
                {selectedContacts.size} из {foundContacts.length} выбрано
              </span>
            </div>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {foundContacts.map(contact => {
              const contactId = `tg_${contact.user_id}`;
              const isSelected = selectedContacts.has(contactId);
              const fullName = contact.last_name
                ? `${contact.first_name} ${contact.last_name}`.trim()
                : contact.first_name;

              return (
                <div
                  key={contactId}
                  onClick={() => toggleContactSelection(contactId)}
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
                    src={`https://i.pravatar.cc/150?u=${contactId}`}
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
              onClick={() => setStep('intro')}
              className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
            >
              Назад
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
      )}

      {step === 'success' && (
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Друзья добавлены!
            </h3>
            <p className="text-slate-600 text-sm">
              Теперь вы будете видеть их рекомендации
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default TelegramContactsImport;
