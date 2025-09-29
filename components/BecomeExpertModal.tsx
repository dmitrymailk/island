import React from 'react';

interface BecomeExpertModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

const BecomeExpertModal: React.FC<BecomeExpertModalProps> = ({ onConfirm, onClose }) => {
  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md text-center p-8 transform transition-all animate-jump-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">⭐</div>
        <h2 className="text-2xl font-bold text-slate-800">Станьте Экспертом Островка!</h2>
        <p className="text-slate-600 mt-2 max-w-sm mx-auto">
            Ваши отзывы великолепны! Похоже, вы настоящий знаток путешествий.
        </p>
        <div className="mt-6 text-left bg-slate-50 p-4 rounded-lg space-y-3">
            <h4 className="font-semibold text-center">Став Экспертом, вы сможете:</h4>
            <div className="flex items-start space-x-3">
                <span className="text-xl">🏆</span>
                <p className="text-sm text-slate-700">Получать <span className="font-bold">двойные мили и XP</span> за каждый публичный отзыв.</p>
            </div>
            <div className="flex items-start space-x-3">
                <span className="text-xl">📣</span>
                <p className="text-sm text-slate-700">Делиться опытом открыто: ваши отзывы будут подписаны вашим именем.</p>
            </div>
             <div className="flex items-start space-x-3">
                <span className="text-xl">📈</span>
                <p className="text-sm text-slate-700">Собирать подписчиков и стать лидером мнений в сообществе.</p>
            </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
             <button 
                onClick={onClose}
                className="w-full px-6 py-3 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
            >
              Нет, спасибо
            </button>
            <button 
                onClick={onConfirm}
                className="w-full px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 transition-colors"
            >
              Да, стать Экспертом!
            </button>
        </div>
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

export default BecomeExpertModal;