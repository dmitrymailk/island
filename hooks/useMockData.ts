
import { useState, useEffect } from 'react';
import type { Review, Friend, Hotel, AnalyticsData } from '../types';
import { REVIEWS, FRIENDS, HOTELS, MOCK_ANALYTICS_DATA } from '../constants';

export const useMockData = () => {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setAllReviews(REVIEWS);
      setFriends(FRIENDS);
      setHotels(HOTELS);
      setAnalytics(MOCK_ANALYTICS_DATA);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { allReviews, friends, hotels, analytics, loading };
};
