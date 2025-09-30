import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { VibeCornerItem } from '../types';
import Card from './ui/Card';
import { getImagePropsSafe } from '../utils/imageUtils';

const VibeCornerCard: React.FC<{ item: VibeCornerItem }> = ({ item }) => {
    const { hotel, likedBy } = item;
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [hotel.imageUrl, ...hotel.photos];

    useEffect(() => {
        let interval: number | null = null;
        if (isHovered && images.length > 1) {
            interval = window.setInterval(() => {
                setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
            }, 800); // Быстрая прокрутка, как было запрошено
        } else {
            setCurrentImageIndex(0);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isHovered, images.length]);

    return (
        <Card
            className="flex flex-col h-full transition-shadow duration-300 hover:shadow-xl group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="h-40 w-full overflow-hidden relative">
                <Link to={`/hotel/${hotel.id}`} className="block w-full h-full">
                    {/* Контейнер для изображений для создания эффекта cross-fade */}
                    {images.map((src, index) => (
                        <img
                            key={`${hotel.id}-${index}`}
                            className="absolute top-0 left-0 h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                            style={{ opacity: index === currentImageIndex ? 1 : 0 }}
                            {...getImagePropsSafe(src, `${hotel.name} image ${index + 1}`)}
                        />
                    ))}
                </Link>
                {/* Индикаторы слайдера */}
                {images.length > 1 && (
                    <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center space-x-1.5 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`h-1.5 w-1.5 rounded-full shadow-sm transition-colors duration-300 ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                            ></div>
                        ))}
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-slate-800 leading-tight flex-grow">
                    <Link to={`/hotel/${hotel.id}`} className="hover:underline">{hotel.name}</Link>
                </h3>
                <p className="text-xs text-slate-500 mt-1">{hotel.location}</p>
                <div className="mt-3 pt-3 border-t flex items-center">
                    <div className="flex -space-x-2">
                        {likedBy.slice(0, 3).map(user => (
                            <Link key={user.id} to={`/profile/${user.id}`} title={user.name}>
                                <img
                                    className="w-7 h-7 rounded-full border-2 border-white"
                                    {...getImagePropsSafe(user.avatarUrl, user.name)}
                                />
                            </Link>
                        ))}
                    </div>
                    <p className="text-xs text-slate-600 ml-2">
                        {likedBy.length > 1 ? `Нравится ${likedBy[0].name.split(' ')[0]} и еще ${likedBy.length - 1}` : `Нравится ${likedBy[0].name}`}
                    </p>
                </div>
            </div>
        </Card>
    );
};

const VibeCorner: React.FC<{ feed: VibeCornerItem[] }> = ({ feed }) => {
    return (
        <div className="mt-12">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Уголок Вдохновения</h2>
                <p className="mt-1 text-slate-600">Бесконечная лента для поиска идей! Здесь собраны отели, которые понравились людям из ваших подписок.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {feed.map(item => (
                    <VibeCornerCard key={item.hotel.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default VibeCorner;