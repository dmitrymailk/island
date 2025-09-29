import React, { useMemo } from 'react';
import type { User, Hotel } from '../../types';
import Modal from '../ui/Modal';
import LikedHotelCard from './LikedHotelCard';

interface PublicLikesHistoryModalProps {
  discoverHistory: User['discoverHistory'];
  allHotels: Hotel[];
  onClose: () => void;
}

const PublicLikesHistoryModal: React.FC<PublicLikesHistoryModalProps> = ({ discoverHistory, allHotels, onClose }) => {
    const likedHotels = useMemo(() => {
        const likedHotelsMap = new Map<string, Hotel>();
        discoverHistory
            .filter(entry => entry.action === 'like')
            .forEach(entry => {
                if (!likedHotelsMap.has(entry.hotelId)) {
                    const hotel = allHotels.find(h => h.id === entry.hotelId);
                    if (hotel) {
                        likedHotelsMap.set(entry.hotelId, hotel);
                    }
                }
            });
        
        // Return in reverse chronological order of being added
        return Array.from(likedHotelsMap.values()).reverse();
    }, [discoverHistory, allHotels]);

    return (
        <Modal title="Понравившиеся отели" onClose={onClose} size="xl">
            {likedHotels.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[75vh] overflow-y-auto p-1 -m-1">
                    {likedHotels.map(hotel => (
                        <LikedHotelCard key={hotel.id} hotel={hotel} />
                    ))}
                </div>
            ) : (
                <p className="text-slate-500 text-center py-4">Пользователь еще ничего не лайкнул.</p>
            )}
        </Modal>
    );
};

export default PublicLikesHistoryModal;