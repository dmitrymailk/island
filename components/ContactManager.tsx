import React, { useState, useEffect, useCallback } from 'react';
import { useTelegramContacts } from '../hooks/useTelegramContacts';
import ContactCard from './ContactCard';
import type { ContactWithTelegramData } from '../types';

interface ContactManagerProps {
  onContactsImported?: (contacts: ContactWithTelegramData[]) => void;
  onClose?: () => void;
  existingFriends?: any[];
}

const ContactManager: React.FC<ContactManagerProps> = ({
  onContactsImported,
  onClose,
  existingFriends = []
}) => {
  const {
    isLoading,
    error,
    allContacts,
    contactStatuses,
    searchResults,
    isSearching,
    searchError,
    loadAllContacts,
    searchContacts,
    addContact,
    deleteContactsByPhones,
    showTelegramAlert,
    showTelegramConfirm,
    getCurrentTelegramUser,
  } = useTelegramContacts();

  const [activeTab, setActiveTab] = useState<'all' | 'search'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [contactsToDelete, setContactsToDelete] = useState<number[]>([]);
  const [botUsername, setBotUsername] = useState('ostrovok_friends_bot'); // ЗАМЕНИТЕ НА USERNAME ВАШЕГО БОТА

  const handleImport = useCallback(() => {
    console.log('ContactManager: handleImport called');
    console.log('ContactManager: onContactsImported =', onContactsImported);
    console.log('ContactManager: selectedContacts =', selectedContacts);
    console.log('ContactManager: allContacts =', allContacts);

    if (!onContactsImported) {
      console.log('ContactManager: No onContactsImported callback, returning');
      return;
    }

    const contactsToImport = allContacts.filter(c => selectedContacts.has(c.id));
    console.log('ContactManager: contactsToImport =', contactsToImport);
    onContactsImported(contactsToImport);
  }, [onContactsImported, allContacts, selectedContacts]);

  // Загружаем контакты при монтировании
  useEffect(() => {
    loadAllContacts();
  }, [loadAllContacts]);

  // Обработка поиска
  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      await searchContacts(query);
    }
  }, [searchContacts]);

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

  // Обработка выбора всех контактов
  const handleSelectAll = useCallback(() => {
    const currentContacts = activeTab === 'search' ? searchResults : allContacts;
    if (selectedContacts.size === currentContacts.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(currentContacts.map(c => c.id)));
    }
  }, [selectedContacts.size, activeTab, searchResults, allContacts]);

  // Обработка удаления контактов
  const handleDeleteContacts = useCallback(async (phones?: string[]) => {
    const phonesToDelete = phones || Array.from(selectedContacts)
      .map(id => allContacts.find(c => c.id === id)?.telegramUser?.phone)
      .filter((phone): phone is string => !!phone);

    if (phonesToDelete.length === 0) return;

    const confirmed = await showTelegramConfirm(
      `Удалить ${phonesToDelete.length} контакт(ов) из списка в приложении? Это действие не затронет ваш список контактов в Telegram.`
    );

    if (confirmed) {
      try {
        await deleteContactsByPhones(phonesToDelete);
        setSelectedContacts(new Set());
        showTelegramAlert('Контакты успешно удалены');
      } catch (err) {
        showTelegramAlert('Ошибка при удалении контактов');
      }
    }
  }, [selectedContacts, allContacts, deleteContactsByPhones, showTelegramConfirm, showTelegramAlert]);

  // Обработка импорта контактов из телефона - ТЕПЕРЬ ПРОСТО ОТКРЫВАЕТ БОТА
  const handleOpenBot = () => {
    const botUrl = `https://t.me/${botUsername}`;
    // Этот метод безопаснее, чем window.open
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink(botUrl);
    } else {
      window.open(botUrl, '_blank');
    }
  };

  // Обработка добавления контакта
  const handleAddContact = useCallback(async (contact: ContactWithTelegramData) => {
    if (!contact.telegramUser) return;

    try {
      await addContact(
        contact.telegramUser.id,
        contact.telegramUser.access_hash || 0,
        contact.telegramUser.first_name || '',
        contact.telegramUser.last_name || '',
        contact.telegramUser.phone || '',
        false
      );
      showTelegramAlert('Контакт успешно добавлен');
    } catch (err) {
      showTelegramAlert('Ошибка при добавлении контакта');
    }
  }, [addContact, showTelegramAlert]);

  // Получение текущих контактов для отображения
  const getCurrentContacts = () => {
    switch (activeTab) {
      case 'search':
        return searchResults;
      case 'all':
      default:
        return allContacts;
    }
  };

  const currentContacts = getCurrentContacts();

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
      <div className="p-6 overflow-y-auto">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Управление контактами</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Табы */}
        <div className="flex space-x-1 mb-6 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'all'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            Все контакты ({allContacts.length})
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'search'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            Поиск
          </button>
        </div>

        {/* Поиск */}
        {activeTab === 'search' && (
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск контактов..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {isSearching && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-600"></div>
                </div>
              )}
            </div>
            {searchError && (
              <p className="mt-2 text-sm text-red-600">{searchError}</p>
            )}
          </div>
        )}

        {/* Инструкция по импорту */}
        {activeTab === 'all' && (
          <div className="mb-6 bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-center">
            <p className="text-cyan-800 text-sm mb-3">
              Чтобы добавить новые контакты, перейдите в нашего Telegram бота и отправьте ему нужные контакты из вашего списка.
            </p>
            <button
              onClick={handleOpenBot}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:bg-cyan-400 disabled:cursor-not-allowed transition-colors text-sm font-medium inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.78l-1.42 6.54c-.14.64-.55.8-1.1.5l-2.25-1.65-1.08 1.04c-.12.12-.22.22-.45.22l.16-2.29 4.1-3.72c.18-.16-.05-.25-.3-.1l-5.11 3.2-2.2-.69c-.63-.2-.65-.6.13-1l8.6-3.32c.53-.2.98.17.82.78z" /></svg>
              Перейти к боту
            </button>
          </div>
        )}

        {/* Список контактов */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {currentContacts.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-slate-500">
                {activeTab === 'search' ? 'Начните поиск контактов' : 'Контакты не найдены'}
              </p>
            </div>
          ) : (
            <>
              {/* Кнопки управления */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  {selectedContacts.size === currentContacts.length ? 'Отменить все' : 'Выбрать все'}
                </button>
                {selectedContacts.size > 0 && (
                  <button
                    onClick={() => handleDeleteContacts()}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Удалить выбранные ({selectedContacts.size})
                  </button>
                )}
              </div>

              {/* Список контактов */}
              {currentContacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onAddContact={handleAddContact}
                  onDeleteContact={(contact) => {
                    if (contact.telegramUser?.phone) {
                      handleDeleteContacts([contact.telegramUser.phone]);
                    }
                  }}
                  isSelected={selectedContacts.has(contact.id)}
                  onToggleSelection={toggleContactSelection}
                />
              ))}
            </>
          )}
        </div>

        {/* Ошибки */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {onContactsImported && (
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleImport}
            disabled={selectedContacts.size === 0}
            className="px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors disabled:bg-cyan-300 disabled:cursor-not-allowed"
          >
            Добавить {selectedContacts.size > 0 ? `(${selectedContacts.size})` : ''}
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactManager;
