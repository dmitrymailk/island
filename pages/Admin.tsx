import React, { useState, useMemo } from 'react';
import type { Review, Friend, Hotel } from '../types';
import Card from '../components/ui/Card';

const statusClasses = {
  approved: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  rejected: 'bg-red-100 text-red-800',
};

const statusText = {
  approved: 'Одобрен',
  pending: 'На модерации',
  rejected: 'Отклонен',
}

interface AdminProps {
  reviews: Review[];
  friends: Friend[];
  hotels: Hotel[];
  onStatusChange: (reviewId: string, newStatus: Review['status']) => void;
  loading: boolean;
}

type StatusFilter = Review['status'] | 'all';

const Admin: React.FC<AdminProps> = ({ reviews, friends, hotels, onStatusChange, loading }) => {
  const [filter, setFilter] = useState<StatusFilter>('all');

  const filteredReviews = useMemo(() => {
    if (filter === 'all') {
      return reviews;
    }
    return reviews.filter(review => review.status === filter);
  }, [filter, reviews]);

  if (loading) {
    return <div>Загрузка панели администратора...</div>;
  }
  
  const FilterButton: React.FC<{ status: StatusFilter, text: string }> = ({ status, text }) => (
    <button
      onClick={() => setFilter(status)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        filter === status
          ? 'bg-cyan-600 text-white'
          : 'bg-white text-slate-600 hover:bg-slate-100'
      }`}
    >
      {text}
    </button>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Панель модерации</h1>
      <p className="text-slate-600 mb-6">Управление отзывами пользователей.</p>

      <div className="mb-4 flex space-x-2 p-1 bg-slate-100 rounded-lg">
        <FilterButton status="all" text="Все" />
        <FilterButton status="pending" text="На модерации" />
        <FilterButton status="approved" text="Одобренные" />
        <FilterButton status="rejected" text="Отклоненные" />
      </div>

      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Автор</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Отель</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Отзыв (кратко)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Статус</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredReviews.map(review => {
                const friend = friends.find(f => f.id === review.friendId);
                const hotel = hotels.find(h => h.id === review.hotelId);
                const reviewSummary = `👍 ${review.pros} 👎 ${review.cons}`;

                return (
                  <tr key={review.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={friend?.avatarUrl} alt={friend?.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{friend?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{hotel?.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-900 max-w-xs truncate" title={reviewSummary}>{reviewSummary}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[review.status]}`}>
                        {statusText[review.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                       {review.status !== 'approved' && <button onClick={() => onStatusChange(review.id, 'approved')} className="text-green-600 hover:text-green-900">Одобрить</button>}
                       {review.status !== 'rejected' && <button onClick={() => onStatusChange(review.id, 'rejected')} className="text-red-600 hover:text-red-900">Отклонить</button>}
                       {review.status !== 'pending' && <button onClick={() => onStatusChange(review.id, 'pending')} className="text-yellow-600 hover:text-yellow-900">В ожидание</button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Admin;