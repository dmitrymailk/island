
import React from 'react';
import { Link } from 'react-router-dom';
import type { Review, User, TripTag } from '../types';
import Card from './ui/Card';
import Rating from './ui/Rating';
import ExpertBadge from './ExpertBadge';

interface FriendReviewCardProps {
    review: Review;
    author: User;
    isCurrentUser?: boolean;
}

const TripTagPill: React.FC<{tag: TripTag}> = ({tag}) => {
    return <span className="inline-block bg-slate-100 rounded-full px-3 py-1 text-sm font-semibold text-slate-700 mr-2 mb-2">{tag}</span>
}

const FriendReviewCard: React.FC<FriendReviewCardProps> = ({ review, author, isCurrentUser = false }) => {
    const profileLink = isCurrentUser ? '/profile' : `/profile/${author.id}`;
    
    return (
        <Card className="overflow-hidden">
            <div className="p-6">
                <div className="flex items-start space-x-4">
                    <Link to={profileLink}>
                        <img className="h-16 w-16 rounded-full flex-shrink-0" src={author.avatarUrl} alt={author.name} />
                    </Link>
                    <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                        <div>
                            <div className="flex items-center space-x-2">
                                <Link to={profileLink} className="text-lg font-bold text-slate-800 hover:underline">
                                    {isCurrentUser ? 'Мой отзыв' : author.name}
                                </Link>
                                <ExpertBadge level={author.level} isExpert={author.isExpert} />
                            </div>
                            <p className="text-sm text-slate-500">Останавливался(-ась) {new Date(review.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' })}</p>
                        </div>
                        <div className="flex items-center mt-2 sm:mt-0">
                        <Rating score={review.rating} />
                        </div>
                    </div>
                    </div>
                </div>
                <div className="mt-4 space-y-4">
                    <div>
                        <h4 className="font-semibold text-slate-800 flex items-center"><span className="text-green-500 mr-2">👍</span>Что понравилось</h4>
                        <p className="mt-1 text-slate-600 pl-6">{review.pros}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800 flex items-center"><span className="text-red-500 mr-2">👎</span>Что не понравилось</h4>
                        <p className="mt-1 text-slate-600 pl-6">{review.cons}</p>
                    </div>
                    {review.lifehack && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <h4 className="font-bold text-amber-800 flex items-center"><span className="text-amber-500 mr-2">💡</span>{isCurrentUser ? 'Мой лайфхак' : 'Лайфхак от друга'}</h4>
                            <p className="mt-1 text-amber-700 pl-6">{review.lifehack}</p>
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    {review.tripTags.map(tag => <TripTagPill key={tag} tag={tag} />)}
                </div>
                </div>
                {review.photos.length > 0 && (
                    <div className="px-6 pb-6">
                        <h4 className="font-semibold text-slate-800 mb-2">Фото:</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {review.photos.map((photo, index) => (
                                <img key={index} src={photo} alt={`Photo ${index + 1} from ${author.name}`} className="rounded-lg object-cover aspect-square" />
                            ))}
                        </div>
                    </div>
                )}
                {!isCurrentUser && (
                    <div className="bg-slate-50 px-6 py-3 text-right">
                        <a href={`https://t.me/share/url?url=ostrovok.ru&text=Привет! Спрашиваю про твой отзыв на отель ${encodeURIComponent(review.hotelId)} на Островке.`} 
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-sky-100 text-sky-700 font-semibold rounded-lg hover:bg-sky-200 transition-colors text-sm">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22 5.9c-.3-.2-1.2-.5-2.2.1-.9.6-1.5 1.4-1.8 2.1-.3.7-.6 2.2-.8 3.7s-.4 2.9-.4 2.9-2.1-1.8-3.1-2.8-1-1.8-1-1.8-3.5 2.5-5.2 3.8c-1.8 1.3-3.3 1-3.3 1s-1.8-8.2 4.1-11.2c5.9-3 12.3-1.2 12.3-1.2s-2.1.8-3.6 2.5z" /></svg>
                            Спросить у {author.name.split(' ')[0]}
                        </a>
                    </div>
                )}
        </Card>
    );
}
export default FriendReviewCard;
