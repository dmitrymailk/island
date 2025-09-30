import React from 'react';
import ContactManager from './ContactManager';
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
  return (
    <ContactManager
      onContactsImported={(contacts) => {
        const friends = contacts.map(contact => ({
          id: contact.id,
          name: contact.name,
          avatarUrl: contact.avatarUrl,
          source: 'telegram' as const,
        }));
        onContactsImported(friends);
        onClose();
      }}
      onClose={onClose}
      existingFriends={existingFriends}
    />
  );
};

export default TelegramContactsImport;
