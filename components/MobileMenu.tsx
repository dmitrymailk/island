import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import type { User } from '../types';
import { getImagePropsSafe } from '../utils/imageUtils';

interface MobileMenuProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ user, isOpen, onClose }) => {
  // Prevent body scroll when menu is open and handle escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 text-base font-medium transition-all duration-200 ${isActive
      ? 'bg-cyan-100 text-cyan-700 border-l-4 border-cyan-500'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  const menuItems = [
    { to: '/', label: 'Рекомендации', icon: '🏠' },
    { to: '/discover', label: 'Открытия', icon: '🔍' },
    { to: '/profile', label: 'Профиль', icon: '👤' },
    { to: '/wishlists', label: 'Вишлисты', icon: '❤️' },
    { to: '/year-in-review', label: 'Мой год', icon: '📊' },
    { to: '/admin', label: 'Админ-панель', icon: '⚙️' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: 'white' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
          <div className="flex items-center space-x-2">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="#00B4FF" />
              <path fillRule="evenodd" clipRule="evenodd" d="M24 10C16.268 10 10 16.268 10 24H16C16 19.5817 19.5817 16 24 16V10Z" fill="white" />
            </svg>
            <span className="text-lg font-bold text-slate-800">
              Ostrovok<span className="text-cyan-600">.ru</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-cyan-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <img
              className="w-16 h-16 rounded-full border-3 border-cyan-500 shadow-md"
              {...getImagePropsSafe(user.avatarUrl, user.name)}
            />
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-slate-900 truncate">{user.name}</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center space-x-1 bg-amber-100 text-amber-800 font-semibold px-3 py-1.5 rounded-full text-sm">
                  <span>💎</span>
                  <span>{user.miles.toLocaleString('ru-RU')} миль</span>
                </div>
                {user.isExpert && (
                  <div className="flex items-center space-x-1 bg-purple-100 text-purple-800 font-semibold px-3 py-1.5 rounded-full text-sm">
                    <span>⭐</span>
                    <span>Эксперт</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto bg-white">
          <div className="py-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navLinkClass}
                onClick={onClose}
                end={item.to === '/'}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-base">{item.label}</span>
                </div>
              </NavLink>
            ))}
          </div>

          {/* Additional Info Card */}
          <div className="mx-4 my-4 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">💡</span>
              <h3 className="text-lg font-semibold">Не знаете, что выбрать?</h3>
            </div>
            <p className="text-sm text-cyan-100 mb-3">
              Попробуйте Островок.Открытия! Это увлекательный способ найти отель мечты, просто свайпая карточки.
            </p>
            <NavLink
              to="/discover"
              onClick={onClose}
              className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <span>🔍</span>
              <span>Попробовать</span>
            </NavLink>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="text-xs text-slate-500 text-center">
            Версия 1.0.0
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
