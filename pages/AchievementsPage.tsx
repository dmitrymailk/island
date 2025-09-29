
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import type { User, Badge } from '../types';
import { ALL_BADGES } from '../constants';
import Card from '../components/ui/Card';

interface AchievementsPageProps {
  allUsers: Record<string, User>;
  currentUser: User;
}

const BadgeCard: React.FC<{ badge: Badge; isEarned: boolean }> = ({ badge, isEarned }) => {
  return (
    <div
      className={`relative border-2 rounded-xl p-4 text-center transition-all duration-300 flex flex-col justify-between ${isEarned ? 'border-amber-400 bg-amber-50' : 'border-slate-200 bg-white'}`}
      title={badge.description}
    >
      <div>
        <div className={`text-5xl transition-transform duration-300 ${isEarned ? '' : 'grayscale'}`}>
          {badge.icon}
        </div>
        <h3 className={`mt-2 font-semibold text-sm ${isEarned ? 'text-amber-900' : 'text-slate-800'}`}>{badge.name}</h3>
      </div>
      {isEarned ? (
        <p className="text-xs mt-1 font-bold text-amber-700">Получено!</p>
      ) : (
        <p className="text-xs mt-1 text-slate-500">{badge.description}</p>
      )}
    </div>
  );
};


const AchievementsPage: React.FC<AchievementsPageProps> = ({ allUsers, currentUser }) => {
  const { userId } = useParams<{ userId: string }>();
  const user = userId ? allUsers[userId] : undefined;

  const isViewingOwnProfile = user?.id === currentUser.id;
  const backLink = isViewingOwnProfile ? '/profile' : `/profile/${userId}`;

  if (!user) {
    return (
        <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-slate-800">Пользователь не найден</h2>
            <Link to="/" className="mt-4 inline-block text-cyan-600 hover:underline">Вернуться на главную</Link>
        </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link to={backLink} className="inline-flex items-center text-cyan-600 hover:text-cyan-800 transition-colors font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Назад в профиль
        </Link>
      </div>

       <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">{isViewingOwnProfile ? 'Мои Достижения' : `Достижения: ${user.name}`}</h1>
            <p className="mt-2 text-slate-600">Собирайте все бейджи и становитесь Легендой Островка!</p>
        </div>

      <Card>
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ALL_BADGES.map(badge => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                isEarned={user.achievements.includes(badge.id)}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AchievementsPage;
