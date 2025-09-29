import React, { useState, useMemo } from 'react';
import type { Wishlist, Hotel } from '../types';
import Card from '../components/ui/Card';
import { Link } from 'react-router-dom';
import Modal from '../components/ui/Modal';

interface WishlistsPageProps {
  wishlists: Wishlist[];
  hotels: Hotel[];
  onCreateWishlist: (name: string) => void;
}

const WishlistCard: React.FC<{ wishlist: Wishlist; hotels: Hotel[] }> = ({ wishlist, hotels }) => {
  const wishlistHotels = hotels.filter(h => wishlist.hotelIds.includes(h.id));

  return (
    <Link to={`/wishlist/${wishlist.id}`} className="block hover:shadow-lg rounded-xl transition-shadow">
      <Card className="flex flex-col h-full">
        <div className="p-6 flex-grow">
          <h2 className="text-xl font-bold text-slate-800">{wishlist.name}</h2>
          <p className="text-sm text-slate-500 mt-1">{wishlist.hotelIds.length} отелей · {wishlist.friendIds.length} друзей</p>
          <div className="mt-4 -space-x-2 flex">
            {wishlistHotels.slice(0, 4).map(hotel => (
              <img 
                key={hotel.id} 
                src={hotel.imageUrl} 
                alt={hotel.name} 
                className="w-10 h-10 object-cover rounded-full border-2 border-white"
                title={hotel.name}
              />
            ))}
            {wishlistHotels.length > 4 && (
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-semibold">
                +{wishlistHotels.length - 4}
              </div>
            )}
          </div>
        </div>
        <div className="bg-slate-50 p-4 border-t text-right">
          <span className="text-cyan-600 font-semibold text-sm">
            Открыть
          </span>
        </div>
      </Card>
    </Link>
  );
};

const CreateWishlistModal: React.FC<{ onClose: () => void; onCreate: (name: string) => void; }> = ({ onClose, onCreate }) => {
    const [name, setName] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onCreate(name.trim());
            onClose();
        }
    };
    return (
        <Modal title="Создать новый вишлист" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="wishlistName" className="block text-sm font-medium text-slate-700">Название</label>
                <input
                    id="wishlistName"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Напр., Поездка в Дагестан"
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    autoFocus
                />
                <div className="mt-4 flex justify-end">
                    <button type="submit" disabled={!name.trim()} className="px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-sm hover:bg-cyan-700 disabled:bg-slate-300">
                        Создать
                    </button>
                </div>
            </form>
        </Modal>
    );
}

const WishlistsPage: React.FC<WishlistsPageProps> = ({ wishlists, hotels, onCreateWishlist }) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  // Separate "My Finds" wishlist and sort others alphabetically
  const { discoverWishlist, otherWishlists } = useMemo(() => {
    const discover = wishlists.find(w => w.id === 'discover_wishlist');
    const others = wishlists
      .filter(w => w.id !== 'discover_wishlist')
      .sort((a, b) => a.name.localeCompare(b.name));
    return { discoverWishlist: discover, otherWishlists: others };
  }, [wishlists]);

  const allSortedWishlists = discoverWishlist ? [discoverWishlist, ...otherWishlists] : otherWishlists;

  return (
    <div>
      {isCreateModalOpen && <CreateWishlistModal onClose={() => setCreateModalOpen(false)} onCreate={onCreateWishlist} />}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Мои Вишлисты</h1>
          <p className="mt-2 text-slate-600">Планируйте поездки вместе с друзьями.</p>
        </div>
        <button onClick={() => setCreateModalOpen(true)} className="shrink-0 inline-flex items-center px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 transition-colors">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          Создать вишлист
        </button>
      </div>

      {allSortedWishlists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allSortedWishlists.map(wishlist => (
            <WishlistCard key={wishlist.id} wishlist={wishlist} hotels={hotels} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-16 px-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <h3 className="mt-4 text-lg font-medium text-slate-900">Пока нет вишлистов</h3>
            <p className="mt-1 text-sm text-slate-500">
                Создайте свой первый вишлист, чтобы начать планировать путешествие мечты.
            </p>
        </Card>
      )}
    </div>
  );
};

export default WishlistsPage;