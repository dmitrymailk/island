
import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import Recommendations from './pages/Recommendations';
import Admin from './pages/Admin';
import Analytics from './pages/Analytics';
import HotelPage from './pages/HotelPage';
import FriendsPage from './pages/FriendsPage';
import InvitePage from './pages/InvitePage';
import SubmitReviewPage from './pages/SubmitReviewPage';
import PassportPage from './pages/PassportPage';
import AchievementsPage from './pages/AchievementsPage';
import WishlistsPage from './pages/WishlistsPage';
import WishlistDetailPage from './pages/WishlistDetailPage';
import YearSummaryPage from './pages/YearSummaryPage';
import ProfilePage from './pages/ProfilePage';
import DiscoverPage from './pages/DiscoverPage';
import LevelUpModal from './components/LevelUpModal';
import BecomeExpertModal from './components/BecomeExpertModal';
import Toast from './components/ui/Toast';
import { useMockData } from './hooks/useMockData';
import type { Review, Friend, User, Wishlist, Transaction, Challenge, DiscoverItem, Hotel, VibeCornerItem } from './types';
import { getRecommendations, LEVELS, MOCK_WISHLISTS, MOCK_USERS_DATABASE, TRANSACTIONS, ACTIVE_CHALLENGES, ALL_BADGES } from './constants';
import { preloadCriticalImages } from './utils/imageUtils';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [showLevelUpModal, setShowLevelUpModal] = useState<number | null>(null);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [discoverActionsCount, setDiscoverActionsCount] = useState(0);


  const { allReviews: initialReviews, friends: initialFriends, hotels, loading: dataLoading } = useMockData();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Initial load of all mock data
  useEffect(() => {
    if (!dataLoading) {
      setReviews(initialReviews);
      setFriends(initialFriends);
      setCurrentUser(MOCK_USERS_DATABASE['user123']);
      setWishlists(MOCK_WISHLISTS);
      setTransactions(TRANSACTIONS);
      setChallenges(ACTIVE_CHALLENGES);

      // Предзагрузка критически важных изображений для Telegram Web Apps
      if (hotels.length > 0 && initialReviews.length > 0) {
        preloadCriticalImages(hotels, initialReviews).catch(error => {
          console.warn('Failed to preload critical images:', error);
        });
      }
    }
  }, [dataLoading, initialReviews, initialFriends, hotels]);

  const recommendations = useMemo(() => {
    if (!friends.length || !hotels.length) return [];

    // Recommendations should also include public posts from followed experts
    const friendIds = new Set(friends.map(f => f.id));
    const followedIds = new Set(currentUser?.following || []);

    const relevantReviews = reviews.filter(review => {
      if (review.status !== 'approved') return false;
      // It's a private review from a friend
      if (!review.isPublic && friendIds.has(review.friendId)) return true;
      // It's a public review from someone I follow who is an expert
      const author = MOCK_USERS_DATABASE[review.friendId];
      if (review.isPublic && author?.isExpert && followedIds.has(review.friendId)) return true;

      return false;
    });

    const recs = getRecommendations(relevantReviews, hotels, friends);

    if (currentUser?.following) {
      recs.sort((a, b) => {
        const aFollowed = a.reviews.some(r => currentUser.following.includes(r.friend.id));
        const bFollowed = b.reviews.some(r => currentUser.following.includes(r.friend.id));
        if (aFollowed && !bFollowed) return -1;
        if (!aFollowed && bFollowed) return 1;
        return 0;
      });
    }
    return recs;
  }, [reviews, hotels, friends, currentUser]);

  const vibeCornerFeed = useMemo((): VibeCornerItem[] => {
    if (!currentUser || currentUser.following.length === 0) return [];

    const likedByFollowed: Record<string, User[]> = {};

    currentUser.following.forEach(followedId => {
      const followedUser = MOCK_USERS_DATABASE[followedId];
      if (followedUser && followedUser.discoverHistory) {
        followedUser.discoverHistory
          .filter(action => action.action === 'like')
          .forEach(({ hotelId }) => {
            if (!likedByFollowed[hotelId]) {
              likedByFollowed[hotelId] = [];
            }
            if (!likedByFollowed[hotelId].some(u => u.id === followedUser.id)) {
              likedByFollowed[hotelId].push(followedUser);
            }
          });
      }
    });

    const feed = Object.entries(likedByFollowed)
      .map(([hotelId, users]) => {
        const hotel = hotels.find(h => h.id === hotelId);
        return hotel ? { hotel, likedBy: users } : null;
      })
      .filter((item): item is VibeCornerItem => !!item);

    for (let i = feed.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [feed[i], feed[j]] = [feed[j], feed[i]];
    }

    return feed;
  }, [currentUser, hotels]);

  const addXp = (amount: number, newBadgeIds: string[] = []) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser };
    updatedUser.xp += amount;
    updatedUser.achievements = [...new Set([...updatedUser.achievements, ...newBadgeIds])];

    const currentLevel = LEVELS.find(l => l.level === updatedUser.level)!;
    const nextLevel = LEVELS.find(l => l.level === updatedUser.level + 1);

    if (nextLevel && updatedUser.xp >= nextLevel.xpThreshold) {
      updatedUser.level = nextLevel.level;
      setShowLevelUpModal(nextLevel.level);
    }

    MOCK_USERS_DATABASE[currentUser.id] = updatedUser;
    setCurrentUser(updatedUser);
  };

  const handleStatusChange = (reviewId: string, newStatus: Review['status']) => {
    setReviews(reviews.map(r => r.id === reviewId ? { ...r, status: newStatus } : r));
  };

  const handleFriendsChange = (changedFriends: Friend[], action: 'add' | 'remove') => {
    if (action === 'add') {
      setFriends(prev => {
        // Получаем существующие ID друзей
        const existingIds = new Set(prev.map(f => f.id));

        // Фильтруем новых друзей, оставляя только тех, кого еще нет в списке
        const newFriends = changedFriends.filter(friend => !existingIds.has(friend.id));

        if (newFriends.length > 0) {
          setToast({ message: `${newFriends.length} друзей добавлено!`, type: 'success' });
          return [...prev, ...newFriends];
        } else {
          setToast({ message: 'Все выбранные друзья уже добавлены.', type: 'info' });
          return prev;
        }
      });
    } else if (action === 'remove') {
      const idsToRemove = new Set(changedFriends.map(f => f.id));
      setFriends(prev => prev.filter(f => !idsToRemove.has(f.id)));
      setToast({ message: 'Друг удален.', type: 'success' });
    }
  };

  const handleReviewSubmit = (reviewData: Omit<Review, 'id' | 'friendId' | 'date' | 'status'>) => {
    if (!currentUser) return;

    const newReview: Review = {
      ...reviewData,
      id: `r${Date.now()}`,
      friendId: currentUser.id,
      date: new Date().toISOString(),
      status: 'pending',
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    setToast({ message: 'Отзыв отправлен на модерацию!', type: 'success' });

    let xpGained = 100;
    // Double XP for public reviews from experts
    if (currentUser.isExpert && reviewData.isPublic) {
      xpGained *= 2;
    }
    const newAchievements: string[] = [];
    if (!currentUser.achievements.includes('b1')) newAchievements.push('b1');
    if (reviewData.photos.length > 0 && !currentUser.achievements.includes('b4')) newAchievements.push('b4');
    if (reviewData.lifehack && !currentUser.achievements.includes('b5')) newAchievements.push('b5');

    addXp(xpGained, newAchievements);

    // Trigger "Become Expert" modal
    const userReviewsCount = updatedReviews.filter(r => r.friendId === currentUser.id).length;
    if (userReviewsCount >= 3 && !currentUser.isExpert) {
      setShowExpertModal(true);
    }
    navigate('/profile'); // Redirect to profile after submission to see rewards
  };

  const handleBecomeExpert = () => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, isExpert: true };
    setCurrentUser(updatedUser);
    MOCK_USERS_DATABASE[currentUser.id] = updatedUser;
    setShowExpertModal(false);
    setToast({ message: 'Поздравляем! Вы стали Экспертом!', type: 'success' });
  };

  const handleSpendMiles = (amount: number, description: string) => {
    if (!currentUser || currentUser.miles < amount) {
      setToast({ message: 'Недостаточно миль!', type: 'error' });
      return;
    }
    const newTransaction: Transaction = {
      id: `t${Date.now()}`,
      date: new Date().toISOString(),
      description,
      amount: -amount
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setCurrentUser(prev => prev ? ({ ...prev, miles: prev.miles - amount }) : null);
    setToast({ message: `Вы потратили ${amount} миль!`, type: 'success' });
  };

  const handleAddToWishlist = (hotelId: string, wishlistId: string) => {
    setWishlists(prev => prev.map(w => {
      if (w.id === wishlistId && !w.hotelIds.includes(hotelId)) {
        return { ...w, hotelIds: [...w.hotelIds, hotelId] };
      }
      return w;
    }));
    setToast({ message: 'Отель добавлен в вишлист!', type: 'success' });
  };

  const handleCreateWishlist = (name: string) => {
    if (!currentUser) return;
    const newWishlist: Wishlist = {
      id: `w${Date.now()}`,
      name,
      ownerId: currentUser.id,
      hotelIds: [],
      friendIds: [],
    };
    setWishlists(prev => [...prev, newWishlist]);
    setToast({ message: `Вишлист "${name}" создан!`, type: 'success' });
  };

  const handleShareWishlist = (wishlistId: string, friendIds: string[]) => {
    setWishlists(prev =>
      prev.map(w => {
        if (w.id === wishlistId) {
          const newFriendIds = [...new Set([...w.friendIds, ...friendIds])];
          return { ...w, friendIds: newFriendIds };
        }
        return w;
      })
    );
    const friendCount = friendIds.length;
    const message = friendCount === 1
      ? '1 друг добавлен в вишлист!'
      : friendCount > 1 && friendCount < 5
        ? `${friendCount} друга добавлено в вишлист!`
        : `${friendCount} друзей добавлено в вишлист!`;
    setToast({ message, type: 'success' });
  };

  const handleDiscoverAction = (item: DiscoverItem, action: 'like' | 'dislike') => {
    if (!currentUser) return;

    let updatedUser = { ...currentUser };

    const newHistoryEntry = { hotelId: item.hotel.id, action };
    updatedUser.discoverHistory = [newHistoryEntry, ...(updatedUser.discoverHistory || [])];

    const newActionCount = discoverActionsCount + 1;
    setDiscoverActionsCount(newActionCount);

    let xpGained = 15;
    const newAchievements: string[] = [];

    const discovererBadge = ALL_BADGES.find(b => b.id === 'b8')!;
    if (newActionCount >= 50 && !updatedUser.achievements.includes('b8')) {
      newAchievements.push('b8');
      xpGained += 100;
      setToast({ message: `Новое достижение: ${discovererBadge.name}!`, type: 'success' });
    }

    if (action !== 'dislike' && item.type === 'hotel') {
      const discoverWishlistId = 'discover_wishlist';
      let newWishlists = [...wishlists];
      let discoverWishlist = newWishlists.find(w => w.id === discoverWishlistId);

      if (!discoverWishlist) {
        discoverWishlist = {
          id: discoverWishlistId,
          name: 'Мои Находки',
          ownerId: currentUser.id,
          hotelIds: [],
          friendIds: [],
        };
        newWishlists.push(discoverWishlist);
      }

      if (!discoverWishlist.hotelIds.includes(item.hotel.id)) {
        discoverWishlist.hotelIds.push(item.hotel.id);
      }
      setWishlists(newWishlists);

      const collectorBadge = ALL_BADGES.find(b => b.id === 'b9')!;
      if (discoverWishlist.hotelIds.length >= 10 && !updatedUser.achievements.includes('b9')) {
        newAchievements.push('b9');
        xpGained += 150;
        setToast({ message: `Новое достижение: ${collectorBadge.name}!`, type: 'success' });
      }
    }

    updatedUser.xp += xpGained;
    updatedUser.achievements = [...new Set([...updatedUser.achievements, ...newAchievements])];

    const nextLevel = LEVELS.find(l => l.level === updatedUser.level + 1);

    if (nextLevel && updatedUser.xp >= nextLevel.xpThreshold) {
      updatedUser.level = nextLevel.level;
      setShowLevelUpModal(nextLevel.level);
    }

    MOCK_USERS_DATABASE[currentUser.id] = updatedUser;
    setCurrentUser(updatedUser);
  };

  const handleFollow = (userIdToFollow: string) => {
    if (!currentUser) return;

    const isFollowing = currentUser.following.includes(userIdToFollow);
    const updatedFollowing = isFollowing
      ? currentUser.following.filter(id => id !== userIdToFollow)
      : [...currentUser.following, userIdToFollow];

    const updatedUser = { ...currentUser, following: updatedFollowing };

    MOCK_USERS_DATABASE[currentUser.id] = updatedUser;
    setCurrentUser(updatedUser);

    setToast({
      message: isFollowing ? `Вы отписались от ${MOCK_USERS_DATABASE[userIdToFollow]?.name}.` : `Вы подписались на ${MOCK_USERS_DATABASE[userIdToFollow]?.name}!`,
      type: 'success',
    });
  };

  if (dataLoading || !currentUser) {
    return <div className="flex justify-center items-center h-screen">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={currentUser} />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Routes>
          <Route path="/" element={<Recommendations recommendations={recommendations} loading={dataLoading} vibeCornerFeed={vibeCornerFeed} currentUser={currentUser} />} />
          <Route path="/discover" element={<DiscoverPage hotels={hotels} reviews={reviews} friends={friends} currentUser={currentUser} onDiscoverAction={handleDiscoverAction} setToast={setToast} />} />
          <Route path="/admin" element={<Admin reviews={reviews} friends={friends} hotels={hotels} onStatusChange={handleStatusChange} loading={dataLoading} />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/hotel/:hotelId" element={<HotelPage hotels={hotels} reviews={reviews} friends={friends} user={currentUser} wishlists={wishlists} onSpendMiles={handleSpendMiles} onAddToWishlist={handleAddToWishlist} allUsers={MOCK_USERS_DATABASE} />} />
          <Route path="/friends" element={<FriendsPage friends={friends} onFriendsChange={handleFriendsChange} />} />
          <Route path="/invite" element={<InvitePage onFriendsChange={handleFriendsChange} existingFriends={friends} />} />
          <Route path="/submit-review/:hotelId" element={<SubmitReviewPage hotels={hotels} onSubmit={handleReviewSubmit} currentUser={currentUser} />} />
          <Route path="/profile" element={<PassportPage user={currentUser} transactions={transactions} friends={friends} challenges={challenges} onGiftMiles={handleSpendMiles} allReviews={reviews} allHotels={hotels} />} />
          <Route path="/achievements/:userId" element={<AchievementsPage allUsers={MOCK_USERS_DATABASE} currentUser={currentUser} />} />
          <Route path="/wishlists" element={<WishlistsPage wishlists={wishlists} hotels={hotels} onCreateWishlist={handleCreateWishlist} />} />
          <Route path="/wishlist/:wishlistId" element={<WishlistDetailPage allWishlists={wishlists} allHotels={hotels} allFriends={friends} currentUser={currentUser} allUsers={MOCK_USERS_DATABASE} onShareWishlist={handleShareWishlist} />} />
          <Route path="/year-in-review" element={<YearSummaryPage user={currentUser} reviews={reviews} />} />
          <Route path="/profile/:userId" element={<ProfilePage allUsers={MOCK_USERS_DATABASE} allReviews={reviews} allHotels={hotels} allFriends={friends} currentUser={currentUser} onFollow={handleFollow} />} />
        </Routes>
      </main>
      {showLevelUpModal && <LevelUpModal level={showLevelUpModal} onClose={() => setShowLevelUpModal(null)} />}
      {showExpertModal && <BecomeExpertModal onConfirm={handleBecomeExpert} onClose={() => setShowExpertModal(false)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;
