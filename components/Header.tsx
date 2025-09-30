
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import type { User } from '../types';
import { getImagePropsSafe } from '../utils/imageUtils';

interface HeaderProps {
  user: User;
}

const Logo = () => (
  <div className="flex items-center space-x-2">
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="#00B4FF" />
      <path fillRule="evenodd" clipRule="evenodd" d="M24 10C16.268 10 10 16.268 10 24H16C16 19.5817 19.5817 16 24 16V10Z" fill="white" />
    </svg>
    <span className="text-xl font-bold text-slate-800">
      Ostrovok<span className="text-cyan-600">.ru</span>
    </span>
  </div>
);


const Header: React.FC<HeaderProps> = ({ user }) => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
      ? 'bg-cyan-100 text-cyan-700'
      : 'text-slate-600 hover:bg-slate-200'
    }`;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0" end>
              <Logo />
            </NavLink>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" className={navLinkClass} end>Рекомендации</NavLink>
                <NavLink to="/discover" className={navLinkClass}>Открытия</NavLink>
                <NavLink to="/profile" className={navLinkClass}>Профиль</NavLink>
                <NavLink to="/wishlists" className={navLinkClass}>Вишлисты</NavLink>
                <NavLink to="/year-in-review" className={navLinkClass}>Мой год</NavLink>
                <NavLink to="/admin" className={navLinkClass}>Админ-панель</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-amber-100 text-amber-800 font-semibold px-3 py-1.5 rounded-full text-sm">
                <span> мили</span>
                <span>{user.miles.toLocaleString('ru-RU')}</span>
              </div>
              <Link to="/profile">
                <img
                  className="w-10 h-10 rounded-full border-2 border-cyan-500 hover:border-cyan-700 transition"
                  {...getImagePropsSafe(user.avatarUrl, user.name)}
                />
              </Link>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            {/* Mobile menu button can be added here */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
