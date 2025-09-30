import React from 'react';
import type { ContactWithTelegramData } from '../types';
import { ContactUtils } from '../utils/telegramContactsApi';

interface ContactCardProps {
  contact: ContactWithTelegramData;
  onAddContact?: (contact: ContactWithTelegramData) => void;
  onDeleteContact?: (contact: ContactWithTelegramData) => void;
  showActions?: boolean;
  isSelected?: boolean;
  onToggleSelection?: (contactId: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onAddContact,
  onDeleteContact,
  showActions = true,
  isSelected = false,
  onToggleSelection
}) => {
  const telegramUser = contact.telegramUser;
  const isOnline = telegramUser ? ContactUtils.isUserOnline(telegramUser.status || { _: 'userStatusEmpty' }) : false;
  const statusText = telegramUser ? ContactUtils.getUserStatusText(telegramUser.status || { _: 'userStatusEmpty' }) : '';

  return (
    <div className={`flex items-center p-4 border rounded-lg transition-colors ${isSelected
      ? 'border-cyan-200 bg-cyan-50'
      : 'border-slate-200 hover:border-slate-300'
      }`}>
      {/* Чекбокс для выбора */}
      {onToggleSelection && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelection(contact.id)}
          className="mr-4 h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-slate-300 rounded"
        />
      )}

      {/* Аватар */}
      <div className="relative">
        <img
          src={contact.avatarUrl}
          alt={contact.name}
          className="w-12 h-12 rounded-full"
        />
        {/* Индикатор онлайн статуса */}
        {telegramUser && (
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-slate-300'
            }`} />
        )}
      </div>

      {/* Информация о контакте */}
      <div className="flex-1 min-w-0 ml-4">
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-slate-900 truncate">
            {contact.name}
          </h3>

          {/* Иконки статуса */}
          <div className="flex items-center ml-2 space-x-1">
            {telegramUser?.verified && (
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}

            {telegramUser?.premium && (
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}

            {telegramUser?.bot && (
              <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>

        {/* Username */}
        {telegramUser?.username && (
          <p className="text-sm text-slate-500">@{telegramUser.username}</p>
        )}

        {/* Номер телефона */}
        {telegramUser?.phone && (
          <p className="text-sm text-slate-500">{telegramUser.phone}</p>
        )}

        {/* Статус */}
        {telegramUser && statusText && (
          <div className="flex items-center mt-1">
            <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-slate-300'
              }`} />
            <p className="text-xs text-slate-500">{statusText}</p>
          </div>
        )}

        {/* Дополнительная информация */}
        <div className="flex items-center mt-2 space-x-4 text-xs text-slate-400">
          {contact.mutualContact && (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Взаимный контакт
            </span>
          )}

          {contact.source === 'telegram' && (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Telegram
            </span>
          )}
        </div>
      </div>

      {/* Действия */}
      {showActions && (
        <div className="flex items-center space-x-2 ml-4">
          {contact.canAddToContacts && onAddContact && (
            <button
              onClick={() => onAddContact(contact)}
              className="px-3 py-1 text-xs bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
            >
              Добавить
            </button>
          )}

          {onDeleteContact && (
            <button
              onClick={() => onDeleteContact(contact)}
              className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Удалить
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactCard;
