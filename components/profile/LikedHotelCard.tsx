import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Hotel } from '../../types';
import Card from '../ui/Card';

interface LikedHotelCardProps {
  hotel: Hotel;
}

const LikedHotelCard: React.FC<LikedHotelCardProps> = ({ hotel }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [hotel.imageUrl, ...hotel.photos];

    useEffect(() => {
        let interval: number | null = null;
        if (isHovered && images.length > 1) {
            interval = window.setInterval(() => {
                setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
            }, 800); // Fast scroll as requested
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
            <div className="h-48 w-full overflow-hidden relative">
                <Link to={`/hotel/${hotel.id}`} className="block w-full h-full">
                    {/* Image container for cross-fade effect */}
                    {images.map((src, index) => (
                        <img
                            key={`${hotel.id}-${index}`}
                            className="absolute top-0 left-0 h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                            style={{ opacity: index === currentImageIndex ? 1 : 0 }}
                            src={src}
                            alt={`${hotel.name} image ${index + 1}`}
                        />
                    ))}
                </Link>
                {/* Slider indicators */}
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
                 <div className="mt-4 text-right">
                    <Link to={`/hotel/${hotel.id}`} className="px-4 py-2 bg-cyan-100 text-cyan-800 font-semibold rounded-lg hover:bg-cyan-200 transition-colors text-sm">
                        Посмотреть
                    </Link>
                </div>
            </div>
        </Card>
    );
};

export default LikedHotelCard;