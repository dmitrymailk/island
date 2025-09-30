export interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  source: 'vk' | 'contacts' | 'telegram';
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  pricePerNight: number;
  rating: number;
  imageUrl: string;
  photos: string[];
  videoUrl?: string;
  additionalInfo?: {
    starsCount: number;
    reviewCount: string;
    ratingCategory: string;
    amenities: string[];
    valueAdds: string[];
    discount: string;
    oldPrice: string;
    roomType: string;
    roomSubtitle: string;
    distance: string;
  };
}

export type TripTag = 'Семья с детьми' | 'Романтика' | 'Бизнес' | 'Соло' | 'С животными';

export interface Review {
  id: string;
  friendId: string;
  hotelId: string;
  rating: number;
  pros: string;
  cons: string;
  lifehack?: string;
  tripTags: TripTag[];
  photos: string[];
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  isPublic: boolean;
}

export interface Recommendation {
  hotel: Hotel;
  reviews: {
    friend: Friend;
    review: Review;
  }[];
}

export interface AnalyticsData {
  connections: { month: string; count: number }[];
  bookings: { month: string; count: number }[];
  recommendationSources: { name: string; value: number }[];
}

// --- Gamification Types ---

export interface Level {
  level: number;
  name: string;
  xpThreshold: number;
  cashbackPercent: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or SVG path
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  level: number;
  xp: number;
  miles: number;
  achievements: string[]; // Array of badge IDs
  visitedLocations: string[]; // Array of city/country names
  discoverHistory: { hotelId: string; action: 'like' | 'dislike' }[];
  following: string[]; // Array of user IDs
  isExpert: boolean;
  bio?: string;
}

export interface Wishlist {
  id: string;
  name: string;
  ownerId: string;
  hotelIds: string[];
  friendIds: string[];
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number; // positive for earning, negative for spending
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  milesReward: number;
  currentProgress: number;
  target: number;
}

export interface Perk {
  id: string;
  hotelId: string;
  name: string;
  description: string;
  costInMiles: number;
}

// --- Discover Types ---

export type SliderItem =
  | { type: 'photo'; url: string; }
  | { type: 'video'; url: string; }
  | { type: 'review'; review: Review; friend: Friend; }
  | { type: 'following_review'; review: Review; user: User; };

export type DiscoverItem = {
  type: 'hotel',
  hotel: Hotel,
  sliderContent: SliderItem[],
  recommendedBy?: Friend
};

// --- Vibe Corner Types ---
export interface VibeCornerItem {
  hotel: Hotel;
  likedBy: User[];
}