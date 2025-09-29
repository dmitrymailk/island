import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Wishlist, Hotel, Friend, User } from '../types';
import Card from '../components/ui/Card';
import ShareWishlistModal from '../components/wishlist/ShareWishlistModal';

interface WishlistDetailPageProps {
    allWishlists: Wishlist[];
    allHotels: Hotel[];
    allFriends: Friend[];
    currentUser: User;
    allUsers: Record<string, User>;
    onShareWishlist: (wishlistId: string, friendIds: string[]) => void;
}

const WishlistDetailPage: React.FC<WishlistDetailPageProps> = ({ allWishlists, allHotels, allFriends, currentUser, allUsers, onShareWishlist }) => {
    const { wishlistId } = useParams<{ wishlistId: string }>();
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const wishlist = allWishlists.find(w => w.id === wishlistId);
    
    if (!wishlist) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-slate-800">Вишлист не найден</h2>
                <Link to="/wishlists" className="mt-4 inline-block text-cyan-600 hover:underline">Вернуться к вишлистам</Link>
            </div>
        );
    }
    
    const owner = allUsers[wishlist.ownerId];
    const members = [owner, ...wishlist.friendIds.map(id => allUsers[id])].filter((m): m is User => !!m);
    const isOwner = currentUser.id === wishlist.ownerId;
    
    const hotelsInWishlist = allHotels.filter(h => wishlist.hotelIds.includes(h.id));
    
    const handleShare = (friendIds: string[]) => {
        onShareWishlist(wishlist.id, friendIds);
    };

    return (
        <div>
            {isShareModalOpen && (
                <ShareWishlistModal
                    allFriends={allFriends}
                    currentMemberIds={[owner.id, ...wishlist.friendIds]}
                    onClose={() => setShareModalOpen(false)}
                    onShare={handleShare}
                />
            )}
            <div className="mb-6">
                <Link to="/wishlists" className="inline-flex items-center text-cyan-600 hover:text-cyan-800 transition-colors font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Назад ко всем вишлистам
                </Link>
            </div>

            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{wishlist.name}</h1>
                     <div className="mt-2 flex items-center">
                        <div className="flex -space-x-2">
                            {members.slice(0, 5).map(member => (
                                <img
                                    key={member.id}
                                    src={member.avatarUrl}
                                    alt={member.name}
                                    title={member.name}
                                    className="w-8 h-8 rounded-full border-2 border-white"
                                />
                            ))}
                        </div>
                        <p className="ml-3 text-slate-600 text-sm">
                            {members.length} {members.length === 1 ? 'участник' : (members.length > 1 && members.length < 5 ? 'участника' : 'участников')}
                        </p>
                    </div>
                </div>
                {isOwner && (
                    <button
                        onClick={() => setShareModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 bg-cyan-100 text-cyan-800 font-semibold rounded-lg hover:bg-cyan-200 transition-colors"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1v-1z" />
                         </svg>
                        Пригласить
                    </button>
                )}
            </div>

            {hotelsInWishlist.length > 0 ? (
                <div className="space-y-4">
                    {hotelsInWishlist.map(hotel => (
                        <Card key={hotel.id}>
                            <div className="flex flex-col sm:flex-row">
                                <img src={hotel.imageUrl} alt={hotel.name} className="h-48 w-full sm:w-48 object-cover" />
                                <div className="p-4 flex flex-col justify-between flex-grow">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800">{hotel.name}</h3>
                                        <p className="text-sm text-slate-500">{hotel.location}</p>
                                    </div>
                                    <div className="text-right mt-4">
                                        <Link to={`/hotel/${hotel.id}`} className="px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-sm hover:bg-cyan-700 text-sm">
                                            Посмотреть отель
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="text-center py-16 px-6">
                    <h3 className="mt-4 text-lg font-medium text-slate-900">В этом вишлисте пока пусто</h3>
                    <p className="mt-1 text-sm text-slate-500">Добавьте отели, чтобы начать планирование.</p>
                </Card>
            )}
        </div>
    );
};

export default WishlistDetailPage;