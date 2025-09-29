import React, { useState, useCallback, useEffect } from 'react';
import type { DiscoverItem, Hotel, Review, Friend, User } from '../types';
import { generateDiscoverFeed } from '../constants';
import DiscoverCardStack from '../components/discover/DiscoverCardStack';

interface DiscoverPageProps {
  hotels: Hotel[];
  reviews: Review[];
  friends: Friend[];
  currentUser: User;
  onDiscoverAction: (item: DiscoverItem, action: 'like' | 'dislike') => void;
  setToast: (toast: { message: string; type: 'success' | 'error' } | null) => void;
}

const DiscoverPage: React.FC<DiscoverPageProps> = ({ hotels, reviews, friends, currentUser, onDiscoverAction, setToast }) => {
  const [feed, setFeed] = useState<DiscoverItem[]>(() => generateDiscoverFeed(hotels, reviews, friends));
  const [swipedItems, setSwipedItems] = useState<{item: DiscoverItem, action: 'like' | 'dislike'}[]>([]);

  useEffect(() => {
    // When there are 3 or fewer cards left, add a new batch to create an "infinite" loop.
    if (feed.length <= 3) {
      setFeed(prev => {
        // To prevent visual jumps, we prepend new items instead of appending.
        const existingIds = new Set(prev.map(item => item.hotel.id));
        const newItems = generateDiscoverFeed(hotels, reviews, friends)
            .filter(item => !existingIds.has(item.hotel.id));
        
        return [...newItems, ...prev];
      });
    }
  }, [feed.length, hotels, reviews, friends]);


  const handleSwipe = useCallback((item: DiscoverItem, action: 'like' | 'dislike') => {
    // Optimistically remove from feed by filtering. This is safer than assuming it's the last item.
    setFeed(prev => prev.filter(f => f.hotel.id !== item.hotel.id));
    setSwipedItems(prev => [...prev, {item, action}]);
    
    onDiscoverAction(item, action);
  }, [onDiscoverAction]);
  
  const handleUndo = useCallback(() => {
    const lastSwiped = swipedItems[swipedItems.length - 1];
    if (lastSwiped) {
      // NOTE: We are NOT reversing the XP/wishlist action to keep it simple.
      // This is a common pattern in apps like Tinder.
      setSwipedItems(prev => prev.slice(0, -1));
      // Add the undone item back to the top of the stack (the end of the array).
      setFeed(prev => [...prev, lastSwiped.item]);
    }
  }, [swipedItems]);

  const handleShare = useCallback((item: DiscoverItem) => {
    const url = `${window.location.origin}${window.location.pathname}#/hotel/${item.hotel.id}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setToast({ message: `Ссылка на отель "${item.hotel.name}" скопирована!`, type: 'success' });
      })
      .catch(() => {
        setToast({ message: 'Не удалось скопировать ссылку.', type: 'error' });
      });
  }, [setToast]);

  return (
    <div className="w-full h-[calc(100vh-150px)] flex flex-col items-center justify-start pt-4 relative">
        <div className="w-full max-w-sm px-2 text-center mb-3">
             <h1 className="text-2xl font-bold text-slate-900">Островок.Открытия</h1>
            <p className="mt-1 text-sm text-slate-600">Нажимайте кнопки, чтобы найти отель мечты</p>
        </div>
        
        {feed.length > 0 ? (
             <DiscoverCardStack items={feed} onSwipe={handleSwipe} onUndo={handleUndo} onShare={handleShare} />
        ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
                <p className="text-slate-500">Загрузка отелей...</p>
            </div>
        )}
    </div>
  );
};

export default DiscoverPage;