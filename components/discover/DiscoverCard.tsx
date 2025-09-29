import React, { useState, useImperativeHandle, forwardRef } from 'react';

export type SwipeAction = 'like' | 'dislike';

export interface DiscoverCardHandles {
  swipe: (action: SwipeAction) => void;
}

interface DiscoverCardProps {
  children: React.ReactNode;
  onSwipeAnimationEnd: (action: SwipeAction) => void;
  style?: React.CSSProperties;
}

const DiscoverCard = forwardRef<DiscoverCardHandles, DiscoverCardProps>(
  ({ children, onSwipeAnimationEnd, style }, ref) => {
    const [animationClass, setAnimationClass] = useState('');

    const triggerSwipe = (action: SwipeAction) => {
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
      switch (action) {
        case 'like':
          setAnimationClass('swiping-out-right');
          break;
        case 'dislike':
          setAnimationClass('swiping-out-left');
          break;
      }
    };

    useImperativeHandle(ref, () => ({
      swipe: triggerSwipe,
    }));

    const handleAnimationEnd = () => {
        let action: SwipeAction = 'dislike';
        if (animationClass === 'swiping-out-right') action = 'like';
        onSwipeAnimationEnd(action);
    };

    return (
      <div
        className={`absolute w-full h-full ${animationClass}`}
        style={{...style}}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </div>
    );
  }
);

export default DiscoverCard;