import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { User, Review, Hotel, Friend } from '../../types';
import { MOCK_USERS_DATABASE } from '../../constants';
import Card from '../ui/Card';
import FriendReviewCard from '../FriendReviewCard';

interface TravelHistoryWidgetProps {
    user: User;
    allReviews: Review[];
    allHotels: Hotel[];
    allFriends: Friend[];
}

interface UserHistoryItem {
    hotel: Hotel;
    userReview: Review;
    friendReviews: { review: Review; author: User }[];
}

const TravelHistoryWidget: React.FC<TravelHistoryWidgetProps> = ({ user, allReviews, allHotels, allFriends }) => {

    const userHistory = useMemo((): UserHistoryItem[] => {
        const userReviews = allReviews.filter(r => r.friendId === user.id && r.status === 'approved');
        
        return userReviews.map(userReview => {
            const hotel = allHotels.find(h => h.id === userReview.hotelId);
            if (!hotel) return null;

            const friendReviews = allReviews
                .filter(r => r.hotelId === hotel.id && r.friendId !== user.id && r.status === 'approved')
                .map(review => {
                    const author = MOCK_USERS_DATABASE[review.friendId];
                    if (!author) return null;
                    return { review, author };
                })
                .filter((item): item is { review: Review; author: User } => !!item);

            return { hotel, userReview, friendReviews };
        }).filter((item): item is UserHistoryItem => !!item);

    }, [user, allReviews, allHotels]);

    if (userHistory.length === 0) {
        return (
            <Card className="p-6">
                 <h3 className="font-bold text-slate-800 text-lg mb-4">История моих путешествий</h3>
                 <p className="text-sm text-slate-500">Вы еще не оставляли отзывов. Как только вы поделитесь впечатлениями об отеле, они появятся здесь.</p>
                 <Link to="/" className="mt-4 inline-block text-cyan-600 font-semibold hover:underline">Найти отель для отзыва</Link>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                 <h3 className="font-bold text-slate-800 text-lg">История моих путешествий</h3>
                 <p className="text-sm text-slate-500">Отели, в которых вы побывали и оставили отзывы.</p>
            </div>
            {userHistory.map(({ hotel, userReview, friendReviews }) => (
                <Card key={hotel.id} className="p-0 overflow-hidden">
                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                             <img src={hotel.imageUrl} alt={hotel.name} className="w-full sm:w-32 h-32 object-cover rounded-lg" />
                             <div className="flex-1">
                                <p className="text-sm text-cyan-600 font-semibold">{hotel.location}</p>
                                <h4 className="text-xl font-bold text-slate-900 hover:underline">
                                    <Link to={`/hotel/${hotel.id}`}>{hotel.name}</Link>
                                </h4>
                             </div>
                        </div>
                    </div>

                    <div className="px-6 pb-6 space-y-6">
                       <FriendReviewCard 
                            review={userReview}
                            author={user}
                            isCurrentUser={true}
                       />
                       {friendReviews.length > 0 && (
                           <div>
                               <h5 className="text-md font-semibold text-slate-700 mb-4 pl-2 border-l-4 border-cyan-500">Отзывы друзей об этом отеле:</h5>
                               <div className="space-y-4">
                                {friendReviews.map(({review, author}) => (
                                    <FriendReviewCard 
                                        key={review.id}
                                        review={review}
                                        author={author}
                                    />
                                ))}
                               </div>
                           </div>
                       )}
                    </div>

                </Card>
            ))}
        </div>
    );
};

export default TravelHistoryWidget;