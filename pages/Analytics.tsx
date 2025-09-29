
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useMockData } from '../hooks/useMockData';
import Card from '../components/ui/Card';

const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6'];

const Analytics: React.FC = () => {
  const { analytics, loading } = useMockData();

  if (loading || !analytics) {
    return <div>Загрузка аналитики...</div>;
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Аналитика программы "Друзья рекомендуют"</h1>
      <p className="text-slate-600 mb-8">Ключевые метрики для оценки эффективности.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 col-span-1 lg:col-span-2">
          <h3 className="font-semibold text-slate-800 mb-4">Рост подключений и бронирований</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.connections}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#0891b2" />
              <YAxis yAxisId="right" orientation="right" stroke="#6366f1" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill="#0891b2" name="Новые подключения" />
              <Bar yAxisId="right" data={analytics.bookings} dataKey="count" fill="#6366f1" name="Бронирования" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Источники рекомендаций</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.recommendationSources}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {analytics.recommendationSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

         <Card className="p-6 text-center">
            <h3 className="font-semibold text-slate-800">Всего подключений</h3>
            <p className="text-4xl font-bold text-cyan-600 mt-4">
              {analytics.connections.reduce((acc, item) => acc + item.count, 0)}
            </p>
         </Card>
        <Card className="p-6 text-center">
            <h3 className="font-semibold text-slate-800">Всего бронирований</h3>
            <p className="text-4xl font-bold text-indigo-600 mt-4">
               {analytics.bookings.reduce((acc, item) => acc + item.count, 0)}
            </p>
         </Card>
        <Card className="p-6 text-center">
            <h3 className="font-semibold text-slate-800">Конверсия в бронирование</h3>
            <p className="text-4xl font-bold text-slate-800 mt-4">
              {(
                analytics.bookings.reduce((acc, item) => acc + item.count, 0) / 
                analytics.connections.reduce((acc, item) => acc + item.count, 0) * 100
              ).toFixed(1)}%
            </p>
         </Card>
      </div>
    </div>
  );
};

export default Analytics;
