
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import TelegramContactsImport from '../components/TelegramContactsImport';
import type { Friend } from '../types';
import { getImagePropsSafe } from '../utils/imageUtils';

interface InvitePageProps {
    onFriendsChange: (friends: Friend[], action: 'add') => void;
    existingFriends?: Friend[];
}

// Mock potential friends found in contacts
const MOCK_FOUND_FRIENDS: Friend[] = [
    { id: 'f12', name: 'Сергей Волков', avatarUrl: 'https://i.pravatar.cc/150?u=f12', source: 'contacts' },
    { id: 'f13', name: 'Мария Зайцева', avatarUrl: 'https://i.pravatar.cc/150?u=f13', source: 'contacts' },
    { id: 'f14', name: 'Алексей Морозов', avatarUrl: 'https://i.pravatar.cc/150?u=f14', source: 'contacts' },
];

const InvitePage: React.FC<InvitePageProps> = ({ onFriendsChange, existingFriends = [] }) => {
    const [view, setView] = useState<'options' | 'link' | 'contacts' | 'contacts-found' | 'telegram'>('options');
    const [linkCopied, setLinkCopied] = useState(false);
    const [contactsAdded, setContactsAdded] = useState(false);
    const [showTelegramModal, setShowTelegramModal] = useState(false);
    const inviteLink = "https://ostrovok.ru/invite/aBcDeFg123";

    const copyLink = () => {
        navigator.clipboard.writeText(inviteLink).then(() => {
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        });
    };

    const handleAddContacts = () => {
        onFriendsChange(MOCK_FOUND_FRIENDS, 'add');
        setContactsAdded(true);
    };

    const handleTelegramContactsImported = (friends: Friend[]) => {
        onFriendsChange(friends, 'add');
        setShowTelegramModal(false);
    };

    const renderContent = () => {
        switch (view) {
            case 'options':
                return (
                    <>
                        <h1 className="text-3xl font-bold text-slate-900">Пригласите друзей</h1>
                        <p className="mt-2 text-slate-600 max-w-md mx-auto">Выберите способ, как добавить друзей, чтобы видеть их рекомендации.</p>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button onClick={() => setView('link')} className="p-6 border-2 border-slate-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-colors">
                                <h2 className="font-semibold text-lg">🔗 Волшебная ссылка</h2>
                                <p className="text-sm text-slate-500 mt-1">Отправьте личную ссылку друзьям.</p>
                            </button>
                            <button onClick={() => setView('contacts')} className="p-6 border-2 border-slate-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-colors">
                                <h2 className="font-semibold text-lg">👥 Контакты телефона</h2>
                                <p className="text-sm text-slate-500 mt-1">Найдите, кто уже есть на Островке.</p>
                            </button>
                            <button onClick={() => setShowTelegramModal(true)} className="p-6 border-2 border-slate-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-colors sm:col-span-2">
                                <h2 className="font-semibold text-lg">📱 Импорт из Telegram</h2>
                                <p className="text-sm text-slate-500 mt-1">Найдите друзей из вашего Telegram.</p>
                            </button>
                        </div>
                    </>
                );
            case 'link':
                return (
                    <>
                        <h1 className="text-2xl font-bold text-slate-900">Волшебная ссылка</h1>
                        <p className="mt-2 text-slate-600 max-w-md mx-auto">Отправьте ссылку друзьям. Когда они перейдут по ней, вы начнете видеть рекомендации друг друга.</p>
                        <div className="mt-8">
                            <input readOnly value={inviteLink} className="w-full bg-slate-100 border-2 border-slate-200 rounded-lg py-3 px-4 text-slate-700 text-center" />
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center">
                            <button onClick={copyLink} className="w-full sm:w-auto flex-1 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 transition-colors">{linkCopied ? 'Скопировано!' : 'Копировать'}</button>
                            <a href={`https://t.me/share/url?url=${inviteLink}&text=...`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex-1 flex items-center justify-center px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 transition-colors">Поделиться в Telegram</a>
                        </div>
                    </>
                );
            case 'contacts':
                return (
                    <>
                        <h1 className="text-2xl font-bold text-slate-900">Импорт контактов</h1>
                        <p className="mt-2 text-slate-600 max-w-md mx-auto">Разрешите доступ к контактам, чтобы найти друзей, которые уже используют Островок.</p>
                        <p className="mt-4 text-xs text-slate-400">Мы используем номера только для поиска совпадений в базе Островка и никому не будем звонить или писать. Данные надежно защищены.</p>
                        <button onClick={() => setTimeout(() => setView('contacts-found'), 1500)} className="mt-6 w-full px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700">
                            Разрешить доступ
                        </button>
                    </>
                );
            case 'contacts-found':
                return (
                    <>
                        <h1 className="text-2xl font-bold text-slate-900">Найдено {MOCK_FOUND_FRIENDS.length} друга!</h1>
                        <p className="mt-2 text-slate-600">Эти люди из ваших контактов уже есть на Островке.</p>
                        <div className="mt-6 space-y-3">
                            {MOCK_FOUND_FRIENDS.map(friend => (
                                <div key={friend.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                                    <div className="flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            {...getImagePropsSafe(friend.avatarUrl, friend.name)}
                                        />
                                        <p className="ml-3 font-medium">{friend.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleAddContacts} disabled={contactsAdded} className="mt-6 w-full px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 disabled:bg-slate-400">
                            {contactsAdded ? 'Добавлены!' : 'Добавить всех'}
                        </button>
                    </>
                );
        }
    }

    return (
        <div>
            <div className="mb-6">
                <Link to={view === 'options' ? "/friends" : ''} onClick={() => view !== 'options' && setView('options')} className="inline-flex items-center text-cyan-600 hover:text-cyan-800 transition-colors font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {view === 'options' ? 'Назад к друзьям' : 'Назад к выбору'}
                </Link>
            </div>
            <Card className="max-w-2xl mx-auto">
                <div className="p-8 text-center">
                    {renderContent()}
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
                    existingFriends={existingFriends}
                />
            </Modal>
        </div>
    );
};

export default InvitePage;
