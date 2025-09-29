import React from 'react';
import type { User } from '../../types';
import { LEVELS } from '../../constants';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const currentLevel = LEVELS.find(l => l.level === user.level)!;
  const nextLevel = LEVELS.find(l => l.level === user.level + 1);

  const progressPercentage = nextLevel
    ? Math.max(0, Math.min(100, ((user.xp - currentLevel.xpThreshold) / (nextLevel.xpThreshold - currentLevel.xpThreshold)) * 100))
    : 100;

  return (
    <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
      <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" />
      <div className="flex-1 mt-4 sm:mt-0 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
        <p className="text-cyan-600 font-semibold">{currentLevel.name}</p>
        <div className="mt-3">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-1">
            <span>Прогресс</span>
            {nextLevel ? (
              <span>{user.xp.toLocaleString('ru-RU')} / {nextLevel.xpThreshold.toLocaleString('ru-RU')} XP</span>
            ) : (
              <span>Макс. уровень</span>
            )}
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div
              className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
           {nextLevel && (
            <p className="text-xs text-slate-400 mt-1">
              Еще {nextLevel.xpThreshold - user.xp} XP до уровня «{nextLevel.name}»
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
