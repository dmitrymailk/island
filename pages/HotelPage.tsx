import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Hotel, Review, Friend, User, Wishlist, Perk } from '../types';
import { HOTEL_PERKS, MOCK_USERS_DATABASE } from '../constants';
import Card from '../components/ui/Card';
import Rating from '../components/ui/Rating';
import Modal from '../components/ui/Modal';
import FriendReviewCard from '../components/FriendReviewCard';
import { getImagePropsSafe } from '../utils/imageUtils';

interface HotelPageProps {
  hotels: Hotel[];
  reviews: Review[];
  friends: Friend[];
  user: User;
  wishlists: Wishlist[];
  onSpendMiles: (amount: number, description: string) => void;
  onAddToWishlist: (hotelId: string, wishlistId: string) => void;
  allUsers: Record<string, User>;
}

const AddToWishlistModal: React.FC<{
  wishlists: Wishlist[],
  onClose: () => void,
  onAddToWishlist: (wishlistId: string) => void
}> = ({ wishlists, onClose, onAddToWishlist }) => {
  return (
    <Modal title="Добавить в вишлист" onClose={onClose}>
      <div className="space-y-2">
        {wishlists.length > 0 ? wishlists.map(w => (
          <button
            key={w.id}
            onClick={() => {
              onAddToWishlist(w.id);
              onClose();
            }}
            className="w-full text-left p-3 rounded-lg hover:bg-slate-100"
          >
            {w.name}
          </button>
        )) : (
          <p className="text-slate-500 text-sm p-3">У вас пока нет вишлистов. <Link to="/wishlists" className="text-cyan-600 hover:underline">Создать?</Link></p>
        )}
      </div>
    </Modal>
  );
};

const HotelPage: React.FC<HotelPageProps> = ({ hotels, reviews, friends, user, wishlists, onSpendMiles, onAddToWishlist, allUsers }) => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [milesToSpend, setMilesToSpend] = useState(0);
  const [showWishlistModal, setShowWishlistModal] = useState(false);

  const hotel = hotels.find(h => h.id === hotelId);
  const hotelPerks = HOTEL_PERKS.filter(p => p.hotelId === hotelId);

  const hotelReviews = reviews
    .filter(r => r.hotelId === hotelId && r.status === 'approved')
    .map(review => {
      const author = allUsers[review.friendId];
      return { review, author };
    })
    .filter((item): item is { review: Review; author: User } => !!item.author)
    .sort((a, b) => new Date(b.review.date).getTime() - new Date(a.review.date).getTime());

  if (!hotel) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-slate-800">Отель не найден</h2>
        <Link to="/" className="mt-4 inline-block text-cyan-600 hover:underline">Вернуться к рекомендациям</Link>
      </div>
    );
  }

  // Filter reviews for display based on privacy
  const visibleReviews = hotelReviews.filter(({ review, author }) => {
    if (review.isPublic && author.isExpert) return true; // Public expert reviews are always visible
    if (!review.isPublic && friends.some(f => f.id === author.id)) return true; // Private reviews are visible if from a friend
    return false;
  });

  const finalPrice = hotel.pricePerNight - milesToSpend;

  const handleMilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 0 && value <= user.miles && value <= hotel.pricePerNight) {
      setMilesToSpend(value);
    }
  }

  return (
    <div>
      {showWishlistModal && (
        <AddToWishlistModal
          wishlists={wishlists}
          onClose={() => setShowWishlistModal(false)}
          onAddToWishlist={(wishlistId) => onAddToWishlist(hotel.id, wishlistId)}
        />
      )}

      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-cyan-600 hover:text-cyan-800 transition-colors font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Назад к рекомендациям
        </Link>
      </div>

      <Card>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <img
            className="h-64 lg:h-full w-full object-cover lg:rounded-l-xl lg:rounded-r-none rounded-t-xl"
            {...getImagePropsSafe(hotel.imageUrl, hotel.name)}
          />
          <div className="p-6 sm:p-8 flex flex-col">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="uppercase tracking-wide text-sm text-cyan-600 font-semibold">{hotel.location}</div>
                  <h1 className="block mt-1 text-3xl leading-tight font-bold text-black">{hotel.name}</h1>
                </div>
                <button onClick={() => setShowWishlistModal(true)} title="Добавить в вишлист" className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-pink-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
              </div>
              <div className="mt-4 flex items-center">
                <Rating score={hotel.rating} />
                <span className="ml-2 text-slate-500 text-sm">({hotel.rating.toFixed(1)} на основе всех оценок)</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-slate-800">Бронирование</h3>
              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Цена за ночь:</span>
                  <span>{hotel.pricePerNight.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between items-center text-green-600 mt-2">
                  <span>Скидка милями:</span>
                  <span>- {milesToSpend.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="mt-2 pt-2 border-t">
                  <div className="flex justify-between items-center text-slate-800 font-bold text-lg">
                    <span>Итого:</span>
                    <span>{finalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="miles" className="block text-sm font-medium text-slate-700">Использовать мили (доступно: {user.miles})</label>
                <input type="range" id="miles" min="0" max={Math.min(user.miles, hotel.pricePerNight)} value={milesToSpend} onChange={handleMilesChange} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-2" />
              </div>

              <button onClick={() => onSpendMiles(milesToSpend, `Скидка на ${hotel.name}`)} className="mt-4 w-full px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-colors">
                Забронировать со скидкой
              </button>
            </div>
          </div>
        </div>
      </Card>

      {hotelPerks.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Эксклюзивные перки за мили</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotelPerks.map(perk => (
              <Card key={perk.id} className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-slate-800">{perk.name}</h4>
                  <p className="text-sm text-slate-500">{perk.description}</p>
                </div>
                <button
                  onClick={() => onSpendMiles(perk.costInMiles, `Перк: ${perk.name}`)}
                  className="ml-4 shrink-0 px-4 py-2 bg-amber-400 text-amber-900 font-semibold rounded-lg text-sm hover:bg-amber-500"
                >
                  {perk.costInMiles} миль
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Отзывы вашего круга</h2>
        {visibleReviews.length > 0 ? (
          <div className="space-y-6">
            {visibleReviews.map(({ review, author }) => (
              <FriendReviewCard key={review.id} review={review} author={author} isCurrentUser={author.id === user.id} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-slate-500">Для этого отеля пока нет одобренных отзывов от ваших друзей или экспертов, на которых вы подписаны.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HotelPage;