import React from 'react';
import { LEVELS } from '../constants';

interface ExpertBadgeProps {
  level: number;
  isExpert: boolean;
}

const ExpertBadge: React.FC<ExpertBadgeProps> = ({ level, isExpert }) => {
    const levelInfo = LEVELS.find(l => l.level === level);
    if (!levelInfo || !isExpert) return null;

    const badgeColor = level >= 4 ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
    const icon = level >= 4 ? '👑' : '⭐';

    return (
        <span 
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeColor}`}
            title={`Статус: Эксперт · Уровень: ${levelInfo.name}`}
        >
            {icon} <span className="ml-1.5">Эксперт</span>
        </span>
    );
};

export default ExpertBadge;