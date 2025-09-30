import React from 'react';
import { getImagePropsSafe } from '../utils/imageUtils';

interface Contact {
  user_id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

interface ContactListProps {
  contacts: Contact[];
  selectedContacts: Set<string>;
  onToggleContact: (contactId: string) => void;
  onSelectAll: () => void;
  maxHeight?: string;
  existingFriendIds?: Set<string>;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  selectedContacts,
  onToggleContact,
  onSelectAll,
  maxHeight = 'max-h-64',
  existingFriendIds = new Set()
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onSelectAll}
          className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
        >
          {selectedContacts.size === contacts.length ? 'Отменить все' : 'Выбрать всех'}
        </button>
        <span className="text-sm text-slate-500">
          {selectedContacts.size} из {contacts.length} выбрано
        </span>
      </div>

      <div className={`space-y-2 ${maxHeight} overflow-y-auto`}>
        {contacts.map(contact => {
          const contactId = `tg_${contact.user_id}`;
          const isSelected = selectedContacts.has(contactId);
          const isAlreadyAdded = existingFriendIds.has(contactId);
          const fullName = contact.last_name
            ? `${contact.first_name} ${contact.last_name}`.trim()
            : contact.first_name;

          return (
            <div
              key={contactId}
              onClick={() => !isAlreadyAdded && onToggleContact(contactId)}
              className={`flex items-center p-3 rounded-lg transition-colors ${isAlreadyAdded
                ? 'bg-green-50 border-2 border-green-200 cursor-not-allowed opacity-60'
                : isSelected
                  ? 'bg-cyan-50 border-2 border-cyan-200 cursor-pointer'
                  : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100 cursor-pointer'
                }`}
            >
              <div className="flex-shrink-0 mr-3">
                {isAlreadyAdded ? (
                  <div className="w-4 h-4 rounded-full bg-green-600 border-2 border-green-600 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected
                      ? 'bg-cyan-600 border-cyan-600'
                      : 'border-slate-300'
                      }`}
                  >
                    {isSelected && (
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                )}
              </div>
              <img
                className="w-10 h-10 rounded-full mr-3"
                {...getImagePropsSafe(`https://i.pravatar.cc/150?u=${contactId}`, fullName)}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 truncate">{fullName}</p>
                {contact.username && (
                  <p className="text-sm text-slate-500">@{contact.username}</p>
                )}
                {isAlreadyAdded && (
                  <p className="text-xs text-green-600 font-medium">Уже добавлен</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ContactList;
