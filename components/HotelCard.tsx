import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Recommendation, User } from '../types';
import Card from './ui/Card';
import Rating from './ui/Rating';
import { MOCK_USERS_DATABASE } from '../constants';

interface HotelCardProps {
  recommendation: Recommendation;
  currentUser: User;
  allUsers: Record<string, User>;
}

const RecommendationModal: React.FC<{ reviews: Recommendation['reviews']; onClose: () => void, allUsers: Record<string, User> }> = ({ reviews, onClose, allUsers }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
                 <div className="p-4 border-b flex justify-between items-center">
                    <h4 className="font-bold text-gray-900">Отзывы вашего круга:</h4>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800">&times;</button>
                 </div>
                 <div className="p-4 max-h-80 overflow-y-auto">
                    <ul className="space-y-4">
                        {reviews.map(({ friend, review }) => {
                            const author = allUsers[friend.id];
                            const isPublicExpert = author?.isExpert && review.isPublic;

                            return (
                                <li key={friend.id}>
                                    <div className="flex items-start space-x-3 group">
                                        <img className={`h-10 w-10 rounded-full ${!isPublicExpert ? 'grayscale' : ''}`} src={friend.avatarUrl} alt={friend.name} />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{isPublicExpert ? friend.name : 'Кто-то из вашего круга'}</p>
                                            <p className="text-xs text-slate-600 italic">"{review.pros}"</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                 </div>
            </div>
        </div>
    );
};

const AnonymousBadge: React.FC<{ count: number }> = ({ count }) => (
    <div className="flex items-center space-x-2 rounded-full bg-slate-100 border border-slate-200 p-2 pr-4 shadow-sm">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
        </div>
        <p className="text-sm text-slate-800 font-medium">
            {count} {count === 1 ? 'рекомендация' : (count > 1 && count < 5 ? 'рекомендации' : 'рекомендаций')} из вашего круга
        </p>
    </div>
);


const RecommendationBadge: React.FC<{ reviews: Recommendation['reviews']; allUsers: Record<string, User> }> = ({ reviews, allUsers }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { publicExpertReviews, anonymousReviewsCount } = useMemo(() => {
        const publicExpertReviews = reviews.filter(r => {
            const author = allUsers[r.friend.id];
            return author?.isExpert && r.review.isPublic;
        });
        return {
            publicExpertReviews,
            anonymousReviewsCount: reviews.length - publicExpertReviews.length,
        };
    }, [reviews, allUsers]);

    if (reviews.length === 0) return null;

    const handleInteraction = () => setIsModalOpen(true);
    const handleMouseEnter = () => !('ontouchstart' in window) && setIsTooltipVisible(true);
    const handleMouseLeave = () => !('ontouchstart' in window) && setIsTooltipVisible(false);

    const renderBadgeContent = () => {
        if (publicExpertReviews.length > 0) {
            const firstExpert = publicExpertReviews[0];
            const remainingCount = reviews.length - 1;
            return (
                <div className="flex items-center space-x-2 rounded-full bg-amber-50 border border-amber-200 p-2 pr-4 shadow-sm">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={firstExpert.friend.avatarUrl} alt={firstExpert.friend.name} />
                    <p className="text-sm text-amber-900 font-medium">
                        ⭐ Рекомендует <span className="font-bold">{firstExpert.friend.name.split(' ')[0]}</span>
                        {remainingCount > 0 && ` и еще ${remainingCount}`}
                    </p>
                </div>
            );
        }
        if (anonymousReviewsCount > 0) {
            return <AnonymousBadge count={anonymousReviewsCount} />;
        }
        return null;
    };

    return (
        <>
        <div 
            className="group relative mt-4 cursor-pointer" 
            onClick={handleInteraction}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {renderBadgeContent()}
            {isTooltipVisible && (
                <div className="absolute z-10 bottom-full left-0 mb-2 w-72 bg-white border border-slate-200 rounded-lg shadow-lg opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="p-4">
                        <h4 className="font-bold text-gray-900 mb-2">Отзывы вашего круга:</h4>
                        <ul className="space-y-3">
                            {reviews.slice(0, 3).map(({ friend, review }) => {
                                const author = allUsers[friend.id];
                                const isPublicExpert = author?.isExpert && review.isPublic;
                                return (
                                <li key={friend.id}>
                                    <div className="flex items-start space-x-2 group">
                                        <img className={`h-8 w-8 rounded-full ${!isPublicExpert ? 'grayscale' : ''}`} src={friend.avatarUrl} alt={friend.name} />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{isPublicExpert ? friend.name : 'Кто-то из вашего круга'}</p>
                                            <p className="text-xs text-slate-500 italic">"{review.pros}"</p>
                                        </div>
                                    </div>
                                </li>
                            )})}
                             {reviews.length > 3 && (
                                 <li className="text-xs text-slate-500 font-medium text-center pt-2 border-t">и еще {reviews.length-3} отзыва...</li>
                             )}
                        </ul>
                    </div>
                    <div className="absolute w-3 h-3 bg-white transform rotate-45 -bottom-1.5 left-8 border-b border-r border-slate-200"></div>
                </div>
            )}
        </div>
        {isModalOpen && <RecommendationModal reviews={reviews} onClose={() => setIsModalOpen(false)} allUsers={allUsers} />}
        </>
    );
};

const HotelCard: React.FC<HotelCardProps> = ({ recommendation, currentUser, allUsers }) => {
  const { hotel, reviews } = recommendation;

  return (
    <Card className="transition-shadow duration-300 hover:shadow-xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Link to={`/hotel/${hotel.id}`}>
            <img className="h-56 w-full object-cover md:w-56" src={hotel.imageUrl} alt={hotel.name} />
          </Link>
        </div>
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <div className="uppercase tracking-wide text-sm text-cyan-600 font-semibold">{hotel.location}</div>
            <Link to={`/hotel/${hotel.id}`} className="block mt-1 text-xl leading-tight font-bold text-black hover:underline">{hotel.name}</Link>
            <div className="mt-2 flex items-center">
                 <Rating score={hotel.rating} />
                 <span className="ml-2 text-slate-500 text-sm">({hotel.rating.toFixed(1)})</span>
            </div>
            <RecommendationBadge reviews={reviews} allUsers={allUsers} />
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div className="text-slate-700">
                <span className="text-2xl font-bold">{hotel.pricePerNight.toLocaleString('ru-RU')} ₽</span>
                <span className="text-slate-500"> / ночь</span>
            </div>
            <Link 
              to={`/hotel/${hotel.id}`}
              className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-colors text-center"
            >
              Посмотреть
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;