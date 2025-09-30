import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import TelegramContactsImport from '../components/TelegramContactsImport';
import { useTelegramContacts } from '../hooks/useTelegramContacts';
import type { Friend } from '../types';
import { getImagePropsSafe } from '../utils/imageUtils';

interface FriendsPageProps {
  friends: Friend[];
  onFriendsChange: (friends: Friend[], action: 'add' | 'remove') => void;
}

const FriendsPage: React.FC<FriendsPageProps> = ({ friends, onFriendsChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const { isTelegramWebApp } = useTelegramContacts();

  const filteredFriends = useMemo(() => {
    if (!searchQuery) {
      return friends;
    }
    return friends.filter(friend =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, friends]);

  const handleRemoveFriend = (friendToRemove: Friend) => {
    if (window.confirm(`Вы уверены, что хотите удалить ${friendToRemove.name} из друзей?`)) {
      onFriendsChange([friendToRemove], 'remove');
    }
  };

  const handleTelegramContactsImported = (importedFriends: Friend[]) => {
    onFriendsChange(importedFriends, 'add');
    setShowTelegramModal(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Мои друзья</h1>
          <p className="mt-2 text-slate-600">Люди, чьи рекомендации вы видите на сайте.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {isTelegramWebApp && (
            <button
              onClick={() => setShowTelegramModal(true)}
              className="shrink-0 inline-flex items-center px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Импорт из Telegram
            </button>
          )}
          <Link
            to="/invite"
            className="shrink-0 inline-flex items-center px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1v-1z" />
            </svg>
            Пригласить друзей
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Поиск по друзьям..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-sm px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>

      <Card>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {filteredFriends.map(friend => (
            <div key={friend.id} className="group relative">
              <Link to={`/profile/${friend.id}`} className="block text-center p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <img
                  className="h-24 w-24 rounded-full mx-auto shadow-lg group-hover:shadow-xl transition-shadow"
                  {...getImagePropsSafe(friend.avatarUrl, friend.name)}
                />
                <p className="mt-2 text-sm font-semibold text-slate-800">{friend.name}</p>
                <p className="text-xs text-slate-500 capitalize">{friend.source}</p>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveFriend(friend);
                }}
                className="absolute top-0 right-0 w-7 h-7 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                title={`Удалить ${friend.name}`}
              >
                &times;
              </button>
            </div>
          ))}
          {filteredFriends.length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-slate-500">Друзья не найдены.</p>
            </div>
          )}
        </div>
      </Card>

      {/* Модальное окно для импорта из Telegram */}
      <Modal
        isOpen={showTelegramModal}
        onClose={() => setShowTelegramModal(false)}
        title="Импорт друзей из Telegram"
      >
        <TelegramContactsImport
          onContactsImported={handleTelegramContactsImported}
          onClose={() => setShowTelegramModal(false)}
          existingFriends={friends}
        />
      </Modal>
    </div>
  );
};

export default FriendsPage;
