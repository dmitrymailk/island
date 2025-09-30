import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { DiscoverItem } from '../../types';
import { getImagePropsSafe } from '../../utils/imageUtils';

interface HotelDiscoverCardProps {
    item: Extract<DiscoverItem, { type: 'hotel' }>;
    isTopCard: boolean;
    onShare: () => void;
}

const SliderReviewContent: React.FC<{
    item: Extract<DiscoverItem['sliderContent'][number], { type: 'review' }>;
    hotelImageUrl: string;
}> = ({ item, hotelImageUrl }) => {
    const { review, friend } = item;
    const impactfulText = review.lifehack || review.pros;

    return (
        <div className="w-full h-full relative flex flex-col p-6 justify-center items-center text-center">
            <img
                className="absolute top-0 left-0 w-full h-full object-cover scale-125 blur-md"
                {...getImagePropsSafe(review.photos[0] || hotelImageUrl, "Review background")}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

            <div className="relative z-10 text-white">
                <div className="text-6xl opacity-30 leading-none font-serif">"</div>
                <p className="text-xl font-semibold -mt-8 shadow-black/50 [text-shadow:_0_2px_4px_var(--tw-shadow-color)]">
                    {impactfulText}
                </p>
                <div className="mt-6 flex items-center justify-center space-x-3">
                    <img
                        className="w-12 h-12 rounded-full border-2 border-white/50"
                        {...getImagePropsSafe(friend.avatarUrl, friend.name)}
                    />
                    <div>
                        <p className="font-bold">{friend.name}</p>
                        <div className="flex items-center space-x-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-400'}>★</span>
                                ))}
                            </div>
                            <p className="text-sm opacity-80">{review.tripTags.join(', ')}</p>
                        </div>
                        <p className="text-xs opacity-60">{new Date(review.date).toLocaleDateString('ru-RU')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SliderFollowingReviewContent: React.FC<{
    item: Extract<DiscoverItem['sliderContent'][number], { type: 'following_review' }>;
    hotelImageUrl: string;
}> = ({ item, hotelImageUrl }) => {
    const { review, user } = item;
    const impactfulText = review.lifehack || review.pros;

    return (
        <div className="w-full h-full relative flex flex-col p-6 justify-center items-center text-center">
            <img
                className="absolute top-0 left-0 w-full h-full object-cover scale-125 blur-md"
                {...getImagePropsSafe(review.photos[0] || hotelImageUrl, "Review background")}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

            <div className="relative z-10 text-white">
                <div className="text-6xl opacity-30 leading-none font-serif">"</div>
                <p className="text-xl font-semibold -mt-8 shadow-black/50 [text-shadow:_0_2px_4px_var(--tw-shadow-color)]">
                    {impactfulText}
                </p>
                <div className="mt-6 flex items-center justify-center space-x-3">
                    <img
                        className="w-12 h-12 rounded-full border-2 border-white/50"
                        {...getImagePropsSafe(user.avatarUrl, user.name)}
                    />
                    <div>
                        <p className="font-bold">{user.name}</p>
                        <div className="flex items-center space-x-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-400'}>★</span>
                                ))}
                            </div>
                            <p className="text-sm opacity-80">{review.tripTags.join(', ')}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <p className="text-xs opacity-60">{new Date(review.date).toLocaleDateString('ru-RU')}</p>
                            <p className="text-xs opacity-60">•</p>
                            <p className="text-xs opacity-60">Подписка</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const HotelDiscoverCard: React.FC<HotelDiscoverCardProps> = ({ item, isTopCard, onShare }) => {
    const { hotel, recommendedBy, sliderContent } = item;
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<number | null>(null);


    useEffect(() => {
        // Function to explicitly clear any existing interval
        const clearTimer = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        // The timer should only run for the top card to prevent race conditions and unwanted background activity.
        if (isTopCard && !isPaused && sliderContent.length > 1) {
            // Start a new timer.
            intervalRef.current = window.setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % sliderContent.length);
            }, 4000); // Faster interval as requested by user.
        } else {
            // If it's not the top card or is paused, ensure any running timer is cleared.
            clearTimer();
        }

        // The cleanup function is crucial for when the component unmounts or dependencies change.
        return clearTimer;
    }, [isTopCard, isPaused, sliderContent.length]);

    useEffect(() => {
        if (sliderContent[currentIndex].type === 'video' && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(error => console.log("Autoplay was prevented:", error));
        }
    }, [currentIndex, sliderContent]);

    const goToPrevious = () => setCurrentIndex(prev => (prev - 1 + sliderContent.length) % sliderContent.length);
    const goToNext = () => setCurrentIndex(prev => (prev + 1) % sliderContent.length);

    const handleShareClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent slide change
        e.preventDefault(); // Prevent any other default action
        onShare();
    };

    const currentSlide = sliderContent[currentIndex];

    return (
        <div
            className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden relative flex flex-col select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Progress Bars & Share Button */}
            <div className="absolute top-2 left-2 right-2 z-20 flex items-center space-x-1">
                {sliderContent.map((_, index) => (
                    <div key={index} className="flex-1 h-1 bg-white/40 rounded-full overflow-hidden">
                        <div
                            className="h-1 bg-white rounded-full"
                            style={{
                                animation: index === currentIndex && !isPaused && isTopCard ? `progress-anim 4s linear forwards` : 'none',
                                width: index < currentIndex ? '100%' : '0%',
                            }}
                            onAnimationEnd={(e) => e.stopPropagation()}
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={handleShareClick}
                className="absolute top-2.5 right-2.5 z-30 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
                title="Поделиться"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </button>
            <style>{`
                @keyframes progress-anim { from { width: 0%; } to { width: 100%; } }
            `}</style>

            {/* Content */}
            <div className="flex-grow relative">
                {currentSlide.type === 'photo' && <img className="absolute top-0 left-0 w-full h-full object-cover" {...getImagePropsSafe(currentSlide.url, hotel.name)} />}
                {currentSlide.type === 'video' && <video ref={videoRef} src={currentSlide.url} className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop playsInline />}
                {currentSlide.type === 'review' && <SliderReviewContent item={currentSlide} hotelImageUrl={hotel.imageUrl} />}
                {currentSlide.type === 'following_review' && <SliderFollowingReviewContent item={currentSlide} hotelImageUrl={hotel.imageUrl} />}
            </div>

            {/* Gradient Overlay & Info */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full p-5 z-20 text-white">
                {recommendedBy && (
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-3 py-1.5 rounded-full text-sm mb-2 pointer-events-none">
                        <span>⭐️</span>
                        <span>Рекомендует {recommendedBy.name.split(' ')[0]}</span>
                    </div>
                )}
                <Link
                    to={`/hotel/${hotel.id}`}
                    className="block pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold leading-tight shadow-black/50 [text-shadow:_0_2px_4px_var(--tw-shadow-color)] hover:underline">{hotel.name}</h2>
                </Link>
                <div className="mt-2 text-xl font-bold pointer-events-none">{hotel.pricePerNight.toLocaleString('ru-RU')} ₽ <span className="text-sm opacity-80 font-normal">/ ночь</span></div>
            </div>

            {/* Navigation controls */}
            {sliderContent.length > 1 && (
                <div className="absolute inset-0 z-10 flex justify-between">
                    <div className="w-1/2 h-full cursor-pointer" onClick={goToPrevious}></div>
                    <div className="w-1/2 h-full cursor-pointer" onClick={goToNext}></div>
                </div>
            )}
        </div>
    );
};

export default HotelDiscoverCard;