import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { User, Hotel } from '../../types';
import Card from '../ui/Card';

type HistoryFilter = 'all' | 'like';

interface DiscoverHistoryWidgetProps {
  discoverHistory: User['discoverHistory'];
  allHotels: Hotel[];
}

const ActionIcon: React.FC<{action: 'like' | 'dislike'}> = ({ action }) => {
    switch (action) {
        case 'like': return <span title="Нравится" className="text-green-500">💚</span>;
        case 'dislike': return <span title="Пропущено" className="text-red-500">❌</span>;
        default: return null;
    }
}

const DiscoverHistoryWidget: React.FC<DiscoverHistoryWidgetProps> = ({ discoverHistory, allHotels }) => {
  const [filter, setFilter] = useState<HistoryFilter>('all');

  const historyWithHotels = useMemo(() => {
    return discoverHistory
      .map(entry => {
        const hotel = allHotels.find(h => h.id === entry.hotelId);
        return hotel ? { ...entry, hotel } : null;
      })
      .filter((item): item is { hotel: Hotel; hotelId: string; action: 'like' | 'dislike' } => !!item);
  }, [discoverHistory, allHotels]);
  
  const filteredHistory = useMemo(() => {
    if (filter === 'all') {
        return historyWithHotels;
    }
    return historyWithHotels.filter(item => item.action === filter);
  }, [filter, historyWithHotels]);

  const FilterButton: React.FC<{ status: HistoryFilter, text: string }> = ({ status, text }) => (
    <button
      onClick={() => setFilter(status)}
      className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
        filter === status
          ? 'bg-cyan-600 text-white'
          : 'bg-white text-slate-600 hover:bg-slate-100'
      }`}
    >
      {text}
    </button>
  );

  return (
    <Card className="p-6">
      <h3 className="font-bold text-slate-800 text-lg mb-4">История Открытий</h3>
       <div className="mb-4 flex space-x-2 p-1 bg-slate-100 rounded-full">
            <FilterButton status="all" text="Все" />
            <FilterButton status="like" text="Понравилось" />
        </div>
      {filteredHistory.length > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {filteredHistory.map(({hotel, action}, index) => (
                <div key={`${hotel.id}-${index}`} className="flex items-center p-2 rounded-lg hover:bg-slate-50">
                    <Link to={`/hotel/${hotel.id}`}>
                        <img src={hotel.imageUrl} alt={hotel.name} className="w-12 h-12 object-cover rounded-md" />
                    </Link>
                    <div className="ml-3 flex-grow">
                        <Link to={`/hotel/${hotel.id}`} className="font-semibold text-slate-800 text-sm hover:underline">{hotel.name}</Link>
                        <p className="text-xs text-slate-500">{hotel.location}</p>
                    </div>
                    <div className="text-xl">
                        <ActionIcon action={action} />
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500 text-center py-4">
            {filter === 'all' ? "Ваша история просмотров пуста. Начните в 'Открытиях'!" : "Здесь пока ничего нет."}
        </p>
      )}
    </Card>
  );
};

export default DiscoverHistoryWidget;