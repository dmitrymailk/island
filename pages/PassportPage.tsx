
import React from 'react';
import type { User, Transaction, Friend, Challenge, Review, Hotel } from '../types';
import Card from '../components/ui/Card';
import ProfileHeader from '../components/passport/ProfileHeader';
import MilesWidget from '../components/passport/MilesWidget';
import AchievementsWidget from '../components/passport/AchievementsWidget';
import TravelHistoryWidget from '../components/passport/TravelHistoryWidget';
import ChallengesWidget from '../components/passport/ChallengesWidget';
import StampCollectionWidget from '../components/passport/StampCollectionWidget';
import DiscoverHistoryWidget from '../components/passport/DiscoverHistoryWidget';
import FriendsWidget from '../components/profile/FriendsWidget';

interface PassportPageProps {
    user: User;
    transactions: Transaction[];
    friends: Friend[];
    challenges: Challenge[];
    onGiftMiles: (amount: number, description: string) => void;
    allReviews: Review[];
    allHotels: Hotel[];
}

const PassportPage: React.FC<PassportPageProps> = ({ user, transactions, friends, challenges, onGiftMiles, allReviews, allHotels }) => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Мой Профиль</h1>
                <p className="mt-2 text-slate-600">Ваш центр управления путешествиями, достижениями и милями.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <ProfileHeader user={user} />
                    </Card>
                    <Card className="p-6">
                        <ChallengesWidget challenges={challenges} />
                    </Card>
                    <TravelHistoryWidget 
                        user={user}
                        allReviews={allReviews}
                        allHotels={allHotels}
                        allFriends={friends}
                    />
                     <DiscoverHistoryWidget 
                        discoverHistory={user.discoverHistory}
                        allHotels={allHotels}
                    />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <Card className="p-6">
                       <MilesWidget miles={user.miles} transactions={transactions} friends={friends} onGiftMiles={onGiftMiles} />
                    </Card>
                    <Card className="p-6">
                        <FriendsWidget friends={friends} userId={user.id} isOwnProfile={true} />
                    </Card>
                     <Card className="p-6">
                       <AchievementsWidget achievements={user.achievements} userId={user.id} />
                    </Card>
                    <Card className="p-6">
                        <StampCollectionWidget visitedLocations={user.visitedLocations} />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PassportPage;
