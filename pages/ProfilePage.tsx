import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { User, Review, Hotel, Friend } from '../types';
import ProfileHeader from '../components/passport/ProfileHeader';
import TravelHistoryWidget from '../components/passport/TravelHistoryWidget';
import AchievementsWidget from '../components/passport/AchievementsWidget';
import StampCollectionWidget from '../components/passport/StampCollectionWidget';
import PublicLikesWidget from '../components/profile/PublicLikesWidget';
import Card from '../components/ui/Card';
import FriendsWidget from '../components/profile/FriendsWidget';
import { generateMockUserData } from '../utils/mockDataGenerator';

interface ProfilePageProps {
    allUsers: Record<string, User>;
    allReviews: Review[];
    allHotels: Hotel[];
    allFriends: Friend[];
    currentUser: User;
    onFollow: (userId: string) => void;
    onFriendsChange?: (friends: Friend[], action: 'add' | 'remove') => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ allUsers, allReviews, allHotels, allFriends, currentUser, onFollow, onFriendsChange }) => {
    const { userId } = useParams<{ userId: string }>();
    const [, forceUpdate] = useState({});

    // Если пользователь не найден в базе, но это импортированный друг из Telegram,
    // генерируем для него рандомную активность
    useEffect(() => {
        if (userId && !allUsers[userId]) {
            const friend = allFriends.find(f => f.id === userId);
            if (friend) {
                // Это импортированный друг из Telegram, для которого нет данных
                const telegramId = parseInt(friend.id.replace('tg_', '')) || Math.floor(Math.random() * 1000000000);
                const allExistingUserIds = Object.keys(allUsers);

                const { user: mockUser } = generateMockUserData(
                    friend.id,
                    telegramId,
                    friend.name,
                    friend.avatarUrl,
                    allExistingUserIds
                );

                // Добавляем пользователя в базу данных
                allUsers[friend.id] = mockUser;

                console.log(`Generated mock data for user ${friend.name} on profile view:`, {
                    level: mockUser.level,
                    xp: mockUser.xp,
                    visitedLocations: mockUser.visitedLocations.length,
                    isExpert: mockUser.isExpert
                });

                // Принудительно обновляем компонент
                forceUpdate({});
            }
        }
    }, [userId, allUsers, allFriends]);

    const user = userId ? allUsers[userId] : undefined;

    if (!user) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-slate-800">Пользователь не найден</h2>
                <Link to="/" className="mt-4 inline-block text-cyan-600 hover:underline">Вернуться на главную</Link>
            </div>
        );
    }

    const isOwnProfile = user.id === currentUser.id;
    const isFollowing = currentUser.following.includes(user.id);

    // Determine which list of "friends" to show
    const friendsToShow: Friend[] = isOwnProfile
        ? allFriends
        : (user.following || [])
            .map(friendId => {
                const friendUser = allUsers[friendId];
                if (!friendUser) return null;
                return {
                    id: friendUser.id,
                    name: friendUser.name,
                    avatarUrl: friendUser.avatarUrl,
                    // source is not available on User object, so we mock it.
                    // It's not displayed in the widget anyway.
                    source: 'vk'
                };
            })
            .filter((f): f is Friend => f !== null);

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Профиль: {user.name}</h1>
                    <p className="mt-2 text-slate-600">История путешествий и достижения этого пользователя.</p>
                </div>
                {!isOwnProfile && (
                    <button
                        onClick={() => onFollow(user.id)}
                        className={`shrink-0 px-5 py-2 rounded-lg font-semibold transition-colors ${isFollowing
                            ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                            : 'bg-cyan-600 text-white hover:bg-cyan-700'
                            }`}
                    >
                        {isFollowing ? 'Отписаться' : 'Подписаться'}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <ProfileHeader user={user} />
                    </Card>
                    <TravelHistoryWidget
                        user={user}
                        allReviews={allReviews}
                        allHotels={allHotels}
                        allFriends={allFriends}
                    />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <PublicLikesWidget
                        discoverHistory={user.discoverHistory}
                        allHotels={allHotels}
                    />
                    <Card className="p-6">
                        <FriendsWidget
                            friends={friendsToShow}
                            userId={user.id}
                            isOwnProfile={isOwnProfile}
                            onFriendsChange={onFriendsChange}
                        />
                    </Card>
                    <Card className="p-6">
                        <AchievementsWidget achievements={user.achievements} userId={user.id} />
                    </Card>
                    <Card className="p-6">
                        <StampCollectionWidget visitedLocations={user.visitedLocations} />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;