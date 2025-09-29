import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../ui/Modal';

interface DiscoverSummaryModalProps {
  onContinue: () => void;
  onViewWishlist: () => void;
}

const DiscoverSummaryModal: React.FC<DiscoverSummaryModalProps> = ({ onContinue, onViewWishlist }) => {
  return (
    <Modal title="Отличная работа!" onClose={onContinue}>
      <div className="text-center">
        <div className="text-6xl mb-4">🎉</div>
        <p className="text-slate-600 mb-6">
          Вы отобрали несколько отличных вариантов! Хотите посмотреть на них или продолжить поиски?
        </p>
        <div className="flex flex-col space-y-3">
          <Link
            to="/wishlist/discover_wishlist"
            onClick={onViewWishlist}
            className="w-full px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 transition-colors text-center"
          >
            Сравнить находки
          </Link>
          <button
            onClick={onContinue}
            className="w-full px-6 py-3 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
          >
            Продолжить игру
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DiscoverSummaryModal;
