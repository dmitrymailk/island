import React from 'react';
import { Link } from 'react-router-dom';
import { ALL_BADGES } from '../../constants';

interface AchievementsWidgetProps {
  achievements: string[]; // array of badge IDs
  userId: string;
}

const AchievementsWidget: React.FC<AchievementsWidgetProps> = ({ achievements, userId }) => {
  const recentBadges = ALL_BADGES.filter(badge => achievements.includes(badge.id)).slice(-4);

  return (
    <div>
      <h3 className="font-bold text-slate-800 text-lg mb-4">Мои Достижения</h3>
      {recentBadges.length > 0 ? (
        <div className="grid grid-cols-4 gap-3">
          {recentBadges.map(badge => (
            <div key={badge.id} title={badge.name} className="flex items-center justify-center aspect-square bg-slate-100 rounded-full text-2xl">
              {badge.icon}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">У вас пока нет достижений. Оставьте отзыв, чтобы получить первое!</p>
      )}
      <Link to={`/achievements/${userId}`} className="mt-4 inline-block w-full text-center px-4 py-2 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors text-sm">
        Показать все
      </Link>
    </div>
  );
};

export default AchievementsWidget;