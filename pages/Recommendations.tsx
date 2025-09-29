import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import VibeCorner from '../components/VibeCorner';
import type { Recommendation, VibeCornerItem, User } from '../types';
import { MOCK_USERS_DATABASE } from '../constants';

const DiscoverBanner: React.FC = () => (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-8 mb-8 text-white shadow-lg overflow-hidden relative">
        <div className="relative z-10">
            <h2 className="text-3xl font-bold">Не знаете, что выбрать?</h2>
            <p className="mt-2 max-w-lg">Попробуйте Островок.Открытия! Это увлекательный способ найти отель мечты, просто свайпая карточки.</p>
            <Link to="/discover" className="mt-6 inline-block bg-white text-cyan-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-slate-100 transition-transform hover:scale-105">
                Начать игру
            </Link>
        </div>
        <div className="absolute -bottom-8 -right-8 text-white/20">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M21.3,12.23a1,1,0,0,0-1.06,0l-2,1.15a1,1,0,0,0-.53.9V17.5a1,1,0,0,0,.53.9l2,1.15a1,1,0,0,0,1.06,0l2-1.15a1,1,0,0,0,.53-.9V14.28a1,1,0,0,0-.53-.9Zm-.53,5.05-1.5,0.86v-1.72l1.5-.86Zm-5.34-2.5a1,1,0,0,0-1.06,0l-2,1.15a1,1,0,0,0-.53.9v3.22a1,1,0,0,0,.53.9l2,1.15a1,1,0,0,0,1.06,0l2-1.15a1,1,0,0,0,.53-.9V18.5a1,1,0,0,0-.53-.9Zm-.53,5.05-1.5.86v-1.72l1.5-.86Zm-5.34-5.2a1,1,0,0,0-1.06,0l-2,1.15a1,1,0,0,0-.53.9v3.22a1,1,0,0,0,.53.9l2,1.15a1,1,0,0,0,1.06,0l2-1.15a1,1,0,0,0,.53-.9V13.36a1,1,0,0,0-.53-.9Zm-.53,5.05-1.5.86v-1.72l1.5-.86ZM12,2.5a1,1,0,0,0-.53.9v3.22a1,1,0,0,0,.53.9l2,1.15a1,1,0,0,0,1.06,0l2-1.15a1,1,0,0,0,.53-.9V3.4a1,1,0,0,0-.53-.9l-2-1.15a1,1,0,0,0-1.06,0l-2,1.15A1,1,0,0,0,12,2.5Zm1.5,4.19v1.72l-1.5-.86,1.5-0.86Zm2,1.15,1.5.86v-1.72l-1.5-.86Z"/></svg>
        </div>
    </div>
);


const Recommendations: React.FC<{ recommendations: Recommendation[]; loading: boolean; vibeCornerFeed: VibeCornerItem[]; currentUser: User; }> = ({ recommendations, loading, vibeCornerFeed, currentUser }) => {
  const [showOnlyRecommended, setShowOnlyRecommended] = useState(true);

  const filteredRecommendations = useMemo(() => {
    if (!showOnlyRecommended) {
      return recommendations;
    }
    return recommendations.filter(r => r.reviews.length > 0);
  }, [showOnlyRecommended, recommendations]);


  if (loading) {
    return (
        <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                    <div className="md:flex space-x-6">
                        <div className="rounded-lg bg-slate-200 h-56 w-full md:w-56"></div>
                        <div className="flex-1 space-y-4 py-1 mt-4 md:mt-0">
                            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                            <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                            <div className="pt-4 mt-4">
                                <div className="h-16 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Рекомендации вашего круга</h1>
            <p className="mt-2 text-slate-600">Отели, в которых побывали ваши знакомые и эксперты, на которых вы подписаны.</p>
          </div>
          <div className="flex items-center mt-4 sm:mt-0">
            <label htmlFor="friends-toggle" className="flex items-center cursor-pointer">
              <span className="mr-3 text-sm font-medium text-slate-700">Только с отзывами</span>
              <div className="relative">
                <input
                  type="checkbox"
                  id="friends-toggle"
                  className="sr-only"
                  checked={showOnlyRecommended}
                  onChange={() => setShowOnlyRecommended(!showOnlyRecommended)}
                />
                <div className="block bg-slate-200 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform"></div>
              </div>
            </label>
            <style>{`
              #friends-toggle:checked ~ .dot {
                transform: translateX(100%);
                background-color: #0891b2;
              }
              #friends-toggle:checked ~ .block {
                  background-color: #67e8f9;
              }
            `}</style>
          </div>
        </div>
      </div>

      <DiscoverBanner />

      {filteredRecommendations.length > 0 ? (
        <div className="space-y-6">
          {filteredRecommendations.map(rec => (
            <HotelCard key={rec.hotel.id} recommendation={rec} currentUser={currentUser} allUsers={MOCK_USERS_DATABASE} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-slate-900">Пока нет рекомендаций</h3>
            <p className="mt-1 text-sm text-slate-500">
                Как только ваши друзья оставят отзывы на отели, они появятся здесь. Убедитесь, что отзывы одобрены в админ-панели.
            </p>
        </div>
      )}

      {vibeCornerFeed.length > 0 && <VibeCorner feed={vibeCornerFeed} />}
    </div>
  );
};

export default Recommendations;