import React, { useState } from 'react';
import type { Transaction, Friend } from '../../types';
import Modal from '../ui/Modal';

interface MilesWidgetProps {
  miles: number;
  transactions: Transaction[];
  friends: Friend[];
  onGiftMiles: (amount: number, description: string) => void;
}

const TransactionHistoryModal: React.FC<{ transactions: Transaction[]; onClose: () => void }> = ({ transactions, onClose }) => (
    <Modal title="История начислений" onClose={onClose}>
        <ul className="space-y-2 max-h-80 overflow-y-auto">
            {transactions.map(t => (
                <li key={t.id} className="flex justify-between items-center p-2 rounded-lg odd:bg-slate-50">
                    <div>
                        <p className="font-medium text-slate-800 text-sm">{t.description}</p>
                        <p className="text-xs text-slate-500">{new Date(t.date).toLocaleDateString('ru-RU')}</p>
                    </div>
                    <span className={`font-bold text-sm ${t.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString('ru-RU')}
                    </span>
                </li>
            ))}
        </ul>
    </Modal>
);

const GiftMilesModal: React.FC<{ friends: Friend[]; onClose: () => void; onGift: (amount: number, friendName: string) => void }> = ({ friends, onClose, onGift }) => {
    const [amount, setAmount] = useState('');
    const [friendId, setFriendId] = useState(friends[0]?.id || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = parseInt(amount, 10);
        if (numAmount > 0 && friendId) {
            const friendName = friends.find(f => f.id === friendId)?.name || 'другу';
            onGift(numAmount, `Подарок для ${friendName}`);
            onClose();
        }
    }
    return (
        <Modal title="Подарить мили" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="friend" className="block text-sm font-medium text-slate-700">Кому</label>
                    <select id="friend" value={friendId} onChange={e => setFriendId(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm">
                        {friends.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                    </select>
                </div>
                <div>
                     <label htmlFor="amount" className="block text-sm font-medium text-slate-700">Сколько</label>
                    <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} placeholder="100" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"/>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-sm hover:bg-cyan-700">Отправить</button>
                </div>
            </form>
        </Modal>
    );
};


const MilesWidget: React.FC<MilesWidgetProps> = ({ miles, transactions, friends, onGiftMiles }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showGift, setShowGift] = useState(false);

  return (
    <div>
      {showHistory && <TransactionHistoryModal transactions={transactions} onClose={() => setShowHistory(false)} />}
      {showGift && <GiftMilesModal friends={friends} onClose={() => setShowGift(false)} onGift={onGiftMiles} />}

      <h3 className="font-bold text-slate-800 text-lg mb-2">Мои Мили Дружбы</h3>
      <div className="text-center bg-amber-100 p-4 rounded-lg">
        <p className="text-4xl font-extrabold text-amber-800">{miles.toLocaleString('ru-RU')}</p>
        <p className="text-sm font-semibold text-amber-700">1 миля = 1 рубль</p>
      </div>
      <div className="mt-4 flex flex-col space-y-2 text-sm">
        <button onClick={() => setShowHistory(true)} className="w-full text-left text-cyan-600 hover:underline">История начислений</button>
        <button onClick={() => setShowGift(true)} className="w-full text-left text-cyan-600 hover:underline">Подарить другу</button>
        <button className="w-full text-left text-cyan-600 hover:underline">Как потратить?</button>
      </div>
    </div>
  );
};

export default MilesWidget;