
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import type { User } from '../types';
import { getImagePropsSafe } from '../utils/imageUtils';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  user: User;
}

const Logo = () => (
  <div className="flex items-center space-x-2 flex-shrink-0">
    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="#00B4FF" />
      <path fillRule="evenodd" clipRule="evenodd" d="M24 10C16.268 10 10 16.268 10 24H16C16 19.5817 19.5817 16 24 16V10Z" fill="white" />
    </svg>
    <span className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 whitespace-nowrap">
      Ostrovok<span className="text-cyan-600">.ru</span>
    </span>
  </div>
);


const Header: React.FC<HeaderProps> = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
      ? 'bg-cyan-100 text-cyan-700'
      : 'text-slate-600 hover:bg-slate-200'
    }`;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-shrink-0">
            <NavLink to="/" className="flex-shrink-0" end>
              <Logo />
            </NavLink>
          </div>

          <div className="hidden xl:flex items-center flex-1 justify-center">
            <div className="flex items-baseline space-x-1">
              <NavLink to="/" className={navLinkClass} end>Рекомендации</NavLink>
              <NavLink to="/discover" className={navLinkClass}>Открытия</NavLink>
              <NavLink to="/profile" className={navLinkClass}>Профиль</NavLink>
              <NavLink to="/wishlists" className={navLinkClass}>Вишлисты</NavLink>
              <NavLink to="/year-in-review" className={navLinkClass}>Мой год</NavLink>
              <NavLink to="/admin" className={navLinkClass}>Админ-панель</NavLink>
            </div>
          </div>

          <div className="hidden xl:flex items-center space-x-3 flex-shrink-0">
            <div className="flex items-center gap-1.5 bg-amber-100 text-amber-800 font-semibold px-3 py-1.5 rounded-full text-sm whitespace-nowrap">
              <span> мили</span>
              <span>{user.miles.toLocaleString('ru-RU')}</span>
            </div>
            <Link to="/profile" className="flex-shrink-0">
              <img
                className="w-10 h-10 rounded-full border-2 border-cyan-500 hover:border-cyan-700 transition"
                {...getImagePropsSafe(user.avatarUrl, user.name)}
              />
            </Link>
          </div>

          <div className="xl:hidden flex items-center flex-shrink-0">
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        user={user}
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </header>
  );
};

export default Header;
