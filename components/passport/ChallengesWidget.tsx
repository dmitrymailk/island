import React from 'react';
import type { Challenge } from '../../types';

interface ChallengesWidgetProps {
  challenges: Challenge[];
}

const ChallengeItem: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
    const progressPercentage = Math.min(100, (challenge.currentProgress / challenge.target) * 100);
    return (
        <div>
            <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-semibold text-sm text-slate-800">{challenge.name}</h4>
                <span className="text-xs font-bold text-cyan-600">+{challenge.xpReward} XP</span>
            </div>
            <p className="text-xs text-slate-500 mb-2">{challenge.description}</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                    className="bg-cyan-500 h-2 rounded-full" 
                    style={{ width: `${progressPercentage}%`}}
                ></div>
            </div>
             <p className="text-right text-xs text-slate-400 mt-1">{challenge.currentProgress} / {challenge.target}</p>
        </div>
    );
}

const ChallengesWidget: React.FC<ChallengesWidgetProps> = ({ challenges }) => {
  return (
    <div>
      <h3 className="font-bold text-slate-800 text-lg mb-4">Активные Челленджи</h3>
      {challenges.length > 0 ? (
        <div className="space-y-4">
          {challenges.map(challenge => (
            <ChallengeItem key={challenge.id} challenge={challenge} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">Сейчас нет активных челленджей. Загляните позже!</p>
      )}
    </div>
  );
};

export default ChallengesWidget;