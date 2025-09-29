import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { User, Hotel } from '../../types';
import Card from '../ui/Card';
import PublicLikesHistoryModal from './PublicLikesHistoryModal';

interface PublicLikesWidgetProps {
  discoverHistory: User['discoverHistory'];
  allHotels: Hotel[];
}

const PublicLikesWidget: React.FC<PublicLikesWidgetProps> = ({ discoverHistory, allHotels }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const totalLiked = useMemo(() => {
        const likedHotelIds = new Set<string>();
        discoverHistory
            .filter(entry => entry.action === 'like')
            .forEach(entry => likedHotelIds.add(entry.hotelId));

        // Return in reverse chronological order to show most recent first
        return Array.from(likedHotelIds).map(id => allHotels.find(h => h.id === id)).filter((h): h is Hotel => !!h).reverse();
    }, [discoverHistory, allHotels]);

    const likedHotelsPreview = totalLiked.slice(0, 6);

    if (totalLiked.length === 0) {
        return null; // Don't render the component if there are no likes
    }
    
    const handleLinkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <>
            {isModalOpen && (
                <PublicLikesHistoryModal
                    discoverHistory={discoverHistory}
                    allHotels={allHotels}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <Card 
                className="p-6 cursor-pointer hover:bg-slate-50 transition-colors group"
                onClick={() => setIsModalOpen(true)}
            >
                <h3 className="font-bold text-slate-800 text-lg mb-4">Недавно понравилось</h3>
                <div className="grid grid-cols-3 gap-3">
                    {likedHotelsPreview.map(hotel => (
                         <Link 
                            to={`/hotel/${hotel.id}`} 
                            key={hotel.id} 
                            className="group aspect-square block rounded-lg overflow-hidden relative"
                            onClick={handleLinkClick}
                        >
                            <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <p className="absolute bottom-1.5 left-1.5 right-1.5 text-white text-[10px] font-bold leading-tight">{hotel.name}</p>
                         </Link>
                    ))}
                </div>
                {totalLiked.length > 6 && (
                    <div
                        className="mt-4 w-full text-center px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg group-hover:bg-slate-200 transition-colors text-sm"
                    >
                        Показать все ({totalLiked.length})
                    </div>
                )}
            </Card>
        </>
    );
};

export default PublicLikesWidget;