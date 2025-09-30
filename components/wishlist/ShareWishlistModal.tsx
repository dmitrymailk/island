import React, { useState } from 'react';
import type { Friend } from '../../types';
import Modal from '../ui/Modal';
import { getImagePropsSafe } from '../../utils/imageUtils';

interface ShareWishlistModalProps {
  allFriends: Friend[];
  currentMemberIds: string[];
  onClose: () => void;
  onShare: (friendIds: string[]) => void;
}

const ShareWishlistModal: React.FC<ShareWishlistModalProps> = ({ allFriends, currentMemberIds, onClose, onShare }) => {
  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>([]);

  const handleToggleFriend = (friendId: string) => {
    setSelectedFriendIds(prev =>
      prev.includes(friendId) ? prev.filter(id => id !== friendId) : [...prev, friendId]
    );
  };

  const handleSubmit = () => {
    onShare(selectedFriendIds);
    onClose();
  };

  return (
    <Modal title="Поделиться вишлистом" onClose={onClose}>
      <div>
        <p className="text-sm text-slate-600 mb-4">Выберите друзей, с которыми хотите поделиться этим вишлистом. Они смогут просматривать отели.</p>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {allFriends.map(friend => {
            const isAlreadyMember = currentMemberIds.includes(friend.id);
            const isSelected = selectedFriendIds.includes(friend.id);

            return (
              <label
                key={friend.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${isAlreadyMember ? 'bg-slate-200 opacity-60' : isSelected ? 'bg-cyan-100' : 'hover:bg-slate-50'
                  }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected || isAlreadyMember}
                  disabled={isAlreadyMember}
                  onChange={() => handleToggleFriend(friend.id)}
                  className="h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                />
                <img
                  className="w-10 h-10 rounded-full ml-4"
                  {...getImagePropsSafe(friend.avatarUrl, friend.name)}
                />
                <span className="ml-3 font-medium text-slate-800">{friend.name}</span>
                {isAlreadyMember && <span className="ml-auto text-xs font-semibold text-slate-500">УЖЕ В СПИСКЕ</span>}
              </label>
            );
          })}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={selectedFriendIds.length === 0}
            className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-sm hover:bg-cyan-700 disabled:bg-slate-300"
          >
            Поделиться
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareWishlistModal;
