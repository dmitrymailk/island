
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../ui/Modal';
import TelegramContactsImport from '../TelegramContactsImport';
import { useTelegramContacts } from '../../hooks/useTelegramContacts';
import type { Friend } from '../../types';
import { getImagePropsSafe } from '../../utils/imageUtils';

interface FriendsWidgetProps {
  friends: Friend[];
  userId: string; // The ID of the user whose friends are being displayed
  isOwnProfile: boolean;
  onFriendsChange?: (friends: Friend[], action: 'add' | 'remove') => void;
}

const FriendsWidget: React.FC<FriendsWidgetProps> = ({ friends, userId, isOwnProfile, onFriendsChange }) => {
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const { isTelegramWebApp } = useTelegramContacts();
  const friendsPreview = friends.slice(0, 8);
  const friendsLabel = isOwnProfile ? 'Мои друзья' : 'Подписки';

  const handleTelegramContactsImported = (importedFriends: Friend[]) => {
    if (onFriendsChange) {
      onFriendsChange(importedFriends, 'add');
    }
    setShowTelegramModal(false);
  };

  return (
    <div>
      <h3 className="font-bold text-slate-800 text-lg mb-4">{friendsLabel}</h3>
      {friendsPreview.length > 0 ? (
        <div className="grid grid-cols-4 gap-3">
          {friendsPreview.map(friend => (
            <Link key={friend.id} to={`/profile/${friend.id}`} title={friend.name} className="block">
              <img
                className="w-full aspect-square rounded-full object-cover transition-transform hover:scale-105"
                {...getImagePropsSafe(friend.avatarUrl, friend.name)}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">{isOwnProfile ? 'У вас пока нет друзей.' : 'У пользователя нет подписок.'}</p>
      )}
      {isOwnProfile && (
        <div className="mt-4 space-y-2">
          {isTelegramWebApp && (
            <button
              onClick={() => setShowTelegramModal(true)}
              className="w-full text-center px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors text-sm"
            >
              Импорт из Telegram
            </button>
          )}
          {friends.length > 0 && (
            <Link to="/friends" className="inline-block w-full text-center px-4 py-2 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors text-sm">
              {friends.length > 8 ? `Показать все (${friends.length})` : 'Управлять друзьями'}
            </Link>
          )}
        </div>
      )}

      {/* Модальное окно для импорта из Telegram */}
      {isOwnProfile && (
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
      )}
    </div>
  );
};

export default FriendsWidget;
