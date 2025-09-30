import React from 'react';
import type { ContactWithTelegramData, ContactStatus } from '../types';
import { ContactUtils } from '../utils/telegramContactsApi';

interface ContactStatsProps {
  contacts: ContactWithTelegramData[];
  statuses: ContactStatus[];
}

const ContactStats: React.FC<ContactStatsProps> = ({ contacts, statuses }) => {
  // Подсчет статистики
  const stats = React.useMemo(() => {
    const onlineCount = contacts.filter(contact =>
      contact.telegramUser && ContactUtils.isUserOnline(contact.telegramUser.status || { _: 'userStatusEmpty' })
    ).length;

    const mutualCount = contacts.filter(contact => contact.mutualContact).length;
    const verifiedCount = contacts.filter(contact => contact.telegramUser?.verified).length;
    const premiumCount = contacts.filter(contact => contact.telegramUser?.premium).length;
    const botCount = contacts.filter(contact => contact.telegramUser?.bot).length;

    // Группировка по статусам
    const statusGroups = contacts.reduce((acc, contact) => {
      if (!contact.telegramUser?.status) return acc;

      const status = contact.telegramUser.status._;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: contacts.length,
      online: onlineCount,
      mutual: mutualCount,
      verified: verifiedCount,
      premium: premiumCount,
      bots: botCount,
      statusGroups
    };
  }, [contacts]);

  return (
    <div className="bg-slate-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Статистика контактов</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Общее количество */}
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
              <p className="text-sm text-slate-500">Всего контактов</p>
            </div>
          </div>
        </div>

        {/* Онлайн */}
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.online}</p>
              <p className="text-sm text-slate-500">В сети</p>
            </div>
          </div>
        </div>

        {/* Взаимные контакты */}
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.mutual}</p>
              <p className="text-sm text-slate-500">Взаимные</p>
            </div>
          </div>
        </div>

        {/* Верифицированные */}
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.verified}</p>
              <p className="text-sm text-slate-500">Верифицированные</p>
            </div>
          </div>
        </div>

        {/* Premium */}
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.premium}</p>
              <p className="text-sm text-slate-500">Premium</p>
            </div>
          </div>
        </div>

        {/* Боты */}
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.bots}</p>
              <p className="text-sm text-slate-500">Боты</p>
            </div>
          </div>
        </div>
      </div>

      {/* Детальная статистика по статусам */}
      {Object.keys(stats.statusGroups).length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-slate-700 mb-3">Статусы пользователей</h4>
          <div className="space-y-2">
            {Object.entries(stats.statusGroups).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm text-slate-600">
                  {status === 'userStatusOnline' && 'В сети'}
                  {status === 'userStatusOffline' && 'Не в сети'}
                  {status === 'userStatusRecently' && 'Недавно'}
                  {status === 'userStatusLastWeek' && 'На этой неделе'}
                  {status === 'userStatusLastMonth' && 'В этом месяце'}
                  {status === 'userStatusEmpty' && 'Давно не был(а)'}
                </span>
                <span className="text-sm font-medium text-slate-900">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactStats;
