import React from 'react';
import { LEVELS } from '../constants';

interface LevelUpModalProps {
  level: number;
  onClose: () => void;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ level, onClose }) => {
  const levelInfo = LEVELS.find(l => l.level === level);

  if (!levelInfo) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm text-center p-8 transform transition-all animate-jump-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-slate-800">Новый уровень!</h2>
        <p className="text-slate-600 mt-2">Поздравляем! Вы достигли уровня:</p>
        <p className="text-3xl font-extrabold text-cyan-600 my-3">{levelInfo.name}</p>
        <div className="mt-4 text-left bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold">Новые преимущества:</h4>
            <ul className="list-disc list-inside text-sm text-slate-600 mt-2">
                <li>Кешбэк милями: <span className="font-bold">{levelInfo.cashbackPercent}%</span></li>
                {level >= 3 && <li>Ваши отзывы помечаются как "Мнение Эксперта"</li>}
            </ul>
        </div>
        <button 
            onClick={onClose}
            className="mt-6 w-full px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 transition-colors"
        >
          Продолжить
        </button>
      </div>
      <style>{`
        @keyframes jump-in {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-jump-in {
            animation: jump-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LevelUpModal;
