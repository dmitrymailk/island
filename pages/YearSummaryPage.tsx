import React, { useMemo } from 'react';
import type { User, Review, TripTag } from '../types';
import { LEVELS } from '../constants';
import { getImagePropsSafe } from '../utils/imageUtils';

interface YearSummaryPageProps {
    user: User;
    reviews: Review[];
}

const StatItem: React.FC<{ icon: string, value: string | number, label: string }> = ({ icon, value, label }) => (
    <div className="bg-white/20 p-2 rounded-xl text-center text-white backdrop-blur-sm transition-transform hover:scale-105 shadow-lg flex flex-col justify-center items-center min-h-[5rem]">
        <div className="text-2xl">{icon}</div>
        <div className="text-base font-bold mt-1" title={String(value)}>{value}</div>
        <div className="text-[9px] font-medium opacity-80 mt-0.5" title={label}>{label}</div>
    </div>
);


const YearSummaryPage: React.FC<YearSummaryPageProps> = ({ user, reviews }) => {
    const stats = useMemo(() => {
        const userReviews = reviews.filter(r => r.friendId === user.id && r.status === 'approved');
        const citiesVisited = new Set(user.visitedLocations.map(l => l.split(', ')[0]));
        const countriesVisited = new Set(user.visitedLocations.map(l => l.split(', ')[1]));

        const tagCounts = userReviews.flatMap(r => r.tripTags).reduce((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
        }, {} as Record<TripTag, number>);

        const favoriteTripType = Object.keys(tagCounts).length > 0
            ? Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0][0]
            : 'Не указан';

        const currentLevel = LEVELS.find(l => l.level === user.level)?.name || 'Турист';

        const likesCount = user.discoverHistory.filter(h => h.action === 'like').length;

        return {
            reviewsCount: userReviews.length,
            citiesCount: citiesVisited.size,
            countriesCount: countriesVisited.size,
            milesEarned: user.miles,
            favoriteTripType,
            currentLevel,
            xpEarned: user.xp,
            likesCount,
        };
    }, [user, reviews]);


    return (
        <div className="w-full flex flex-col items-center py-8">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-extrabold text-slate-800">Мой год в путешествиях!</h1>
                <p className="mt-1 text-slate-600 max-w-lg">Вот ваша персональная статистика за год.</p>
            </div>

            <div id="story-content-capture" className="w-[360px] h-[640px] p-6 flex flex-col bg-gradient-to-br from-cyan-400 to-sky-600 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center space-x-3">
                    <img
                        className="w-12 h-12 rounded-full border-2 border-white/50"
                        {...getImagePropsSafe(user.avatarUrl, user.name)}
                    />
                    <div>
                        <p className="font-bold text-white text-lg drop-shadow-md">{user.name}</p>
                        <p className="text-white/80 text-sm">Итоги года</p>
                    </div>
                </div>

                <div className="flex-grow flex flex-col justify-center text-center">
                    <div className="text-center">
                        <h2 className="text-white text-3xl font-black drop-shadow-md">
                            Мой Островок
                        </h2>
                        <p className="text-white/90 font-semibold text-2xl mt-1 drop-shadow-md tracking-wider">
                            Впечатлений
                        </p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3 mt-8">
                        <StatItem icon="🌍" value={stats.countriesCount} label="стран" />
                        <StatItem icon="🏙️" value={stats.citiesCount} label="городов" />
                        <StatItem icon="✍️" value={stats.reviewsCount} label="отзывов" />
                        <StatItem icon="⭐" value={stats.milesEarned.toLocaleString('ru-RU')} label="миль" />
                        <StatItem icon="✨" value={stats.xpEarned.toLocaleString('ru-RU')} label="опыта" />
                        <StatItem icon="💚" value={stats.likesCount} label="лайков" />
                        <StatItem icon="✈️" value={stats.favoriteTripType} label="тип поездок" />
                        <StatItem icon="🏆" value={stats.currentLevel} label="уровень" />
                    </div>
                </div>

                <div className="mt-auto pt-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="white" fillOpacity="0.8" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M24 10C16.268 10 10 16.268 10 24H16C16 19.5817 19.5817 16 24 16V10Z" fill="#00B4FF" />
                        </svg>
                        <span className="text-lg font-bold text-white/80 drop-shadow-md">Ostrovok.ru</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YearSummaryPage;