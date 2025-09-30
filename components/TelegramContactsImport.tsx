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
        console.log('TelegramContactsImport: Received contacts from ContactManager:', contacts);
        const friends = contacts.map(contact => ({
          id: contact.id,
          name: contact.name,
          avatarUrl: contact.avatarUrl,
          source: 'telegram' as const,
        }));
        console.log('TelegramContactsImport: Converted to friends:', friends);
        console.log('TelegramContactsImport: Calling onContactsImported...');
        onContactsImported(friends);
        console.log('TelegramContactsImport: Calling onClose...');
        onClose();
        console.log('TelegramContactsImport: Done!');
      }}
      onClose={onClose}
      existingFriends={existingFriends}
    />
  );
};

export default TelegramContactsImport;
