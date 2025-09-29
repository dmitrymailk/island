
import React from 'react';
import { Link } from 'react-router-dom';
import type { Friend } from '../../types';

interface FriendsWidgetProps {
  friends: Friend[];
  userId: string; // The ID of the user whose friends are being displayed
  isOwnProfile: boolean;
}

const FriendsWidget: React.FC<FriendsWidgetProps> = ({ friends, userId, isOwnProfile }) => {
  const friendsPreview = friends.slice(0, 8);
  const friendsLabel = isOwnProfile ? 'Мои друзья' : 'Подписки';

  return (
    <div>
      <h3 className="font-bold text-slate-800 text-lg mb-4">{friendsLabel}</h3>
      {friendsPreview.length > 0 ? (
        <div className="grid grid-cols-4 gap-3">
          {friendsPreview.map(friend => (
            <Link key={friend.id} to={`/profile/${friend.id}`} title={friend.name} className="block">
              <img src={friend.avatarUrl} alt={friend.name} className="w-full aspect-square rounded-full object-cover transition-transform hover:scale-105" />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">{isOwnProfile ? 'У вас пока нет друзей.' : 'У пользователя нет подписок.'}</p>
      )}
      {isOwnProfile && friends.length > 0 && (
        <Link to="/friends" className="mt-4 inline-block w-full text-center px-4 py-2 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors text-sm">
          {friends.length > 8 ? `Показать все (${friends.length})` : 'Управлять друзьями'}
        </Link>
      )}
    </div>
  );
};

export default FriendsWidget;
