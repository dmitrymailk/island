import React, { useState, useEffect, useCallback } from 'react';
import { useTelegramContacts } from '../hooks/useTelegramContacts';
import TelegramTestMode from './TelegramTestMode';
import ContactList from './ContactList';
import type { Friend } from '../types';

interface TelegramContactsImportProps {
  onContactsImported: (friends: Friend[]) => void;
  onClose: () => void;
  existingFriends?: Friend[];
}

const TelegramContactsImport: React.FC<TelegramContactsImportProps> = ({
  onContactsImported,
  onClose,
  existingFriends = [],
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

  const [step, setStep] = useState<'intro' | 'loading' | 'found'>('intro');
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [localError, setLocalError] = useState<string | null>(null);

  // Обработка закрытия по ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Обработка импорта контактов
  const handleImportContacts = useCallback(async () => {
    try {
      setStep('loading');
      setLocalError(null);
      const contacts = await requestTelegramContacts();

      if (contacts.length > 0) {
        // Автоматически выбираем всех найденных контактов
        setSelectedContacts(new Set(contacts.map(c => `tg_${c.user_id}`)));
        setStep('found');
      } else {
        setLocalError('Контакты не найдены. Возможно, среди ваших контактов Telegram нет пользователей Островка.');
        setStep('intro');
      }
    } catch (err) {
      console.error('Ошибка импорта контактов:', err);
      const errorMessage = error || 'Произошла ошибка при импорте контактов. Попробуйте еще раз.';
      setLocalError(errorMessage);
      setStep('intro');
    }
  }, [requestTelegramContacts, error]);

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
    onClose();
  };

  // Обработка выбора всех контактов
  const handleSelectAll = useCallback(() => {
    if (selectedContacts.size === foundContacts.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(foundContacts.map(c => `tg_${c.user_id}`)));
    }
  }, [selectedContacts.size, foundContacts]);

  // Обработка клика вне модала
  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Если не в Telegram WebApp, показываем тестовый режим
  if (!isTelegramWebApp) {
    return <TelegramTestMode onContactsImported={onContactsImported} onClose={onClose} existingFriends={existingFriends} />;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="p-6">
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

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
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-cyan-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Импорт...
                    </>
                  ) : (
                    'Импортировать'
                  )}
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
              </div>

              <ContactList
                contacts={foundContacts}
                selectedContacts={selectedContacts}
                onToggleContact={toggleContactSelection}
                onSelectAll={handleSelectAll}
                existingFriendIds={new Set(existingFriends.map(f => f.id))}
              />

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


          {(error || localError) && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-red-600">{error || localError}</p>
                  {step === 'intro' && (
                    <button
                      onClick={handleImportContacts}
                      className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium underline"
                    >
                      Попробовать еще раз
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TelegramContactsImport;
