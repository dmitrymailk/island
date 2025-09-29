import React, { useRef } from 'react';
import type { DiscoverItem } from '../../types';
import DiscoverCard, { DiscoverCardHandles, SwipeAction } from './DiscoverCard';
import HotelDiscoverCard from './HotelDiscoverCard';

interface DiscoverCardStackProps {
  items: DiscoverItem[];
  onSwipe: (item: DiscoverItem, action: SwipeAction) => void;
  onUndo: () => void;
  onShare: (item: DiscoverItem) => void;
}

const ControlButton: React.FC<{onClick: () => void, children: React.ReactNode, className: string, title: string}> = ({onClick, children, className, title}) => (
    <button
        onClick={onClick}
        title={title}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    >
        {children}
    </button>
);


const DiscoverCardStack: React.FC<DiscoverCardStackProps> = ({ items, onSwipe, onUndo, onShare }) => {
  const topCardRef = useRef<DiscoverCardHandles>(null);

  const handleButtonClick = (action: SwipeAction) => {
    if (topCardRef.current && items.length > 0) {
      topCardRef.current.swipe(action);
    }
  };

  const cardsToRender = items.slice(-3);

  return (
    <div className="flex-grow w-full flex flex-col items-center justify-center">
        <div className="relative w-full max-w-sm h-[450px] flex items-center justify-center">
        {cardsToRender.length > 0 ? (
            cardsToRender.map((item, index) => {
                const isTopCard = index === cardsToRender.length - 1;
                const depth = cardsToRender.length - 1 - index;

                return (
                <DiscoverCard
                    key={item.hotel.id}
                    ref={isTopCard ? topCardRef : null}
                    onSwipeAnimationEnd={(action) => onSwipe(item, action)}
                    style={{
                        transform: `translateY(${-depth * 8}px) scale(${1 - depth * 0.05})`,
                        zIndex: items.length - depth,
                        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                >
                    <HotelDiscoverCard item={item} isTopCard={isTopCard} onShare={() => onShare(item)} />
                </DiscoverCard>
                );
            })
        ) : (
            <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center">
                {/* Placeholder for when cards run out */}
            </div>
        )}
        </div>

        <div className="mt-6 w-full max-w-xs mx-auto flex justify-around items-center">
            <ControlButton onClick={() => handleButtonClick('dislike')} title="Пропустить" className="bg-white text-red-500 focus:ring-red-300">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </ControlButton>
            <ControlButton onClick={onUndo} title="Отменить" className="bg-white text-gray-500 focus:ring-gray-300 w-12 h-12">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </ControlButton>
             <ControlButton onClick={() => handleButtonClick('like')} title="Нравится" className="bg-white text-green-500 focus:ring-green-300">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
            </ControlButton>
        </div>
    </div>
  );
};

export default DiscoverCardStack;