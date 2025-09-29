import React from 'react';

interface StampCollectionWidgetProps {
    visitedLocations: string[];
}

const Stamp: React.FC<{ city: string }> = ({ city }) => (
    <div className="aspect-square bg-sky-100 border-2 border-dashed border-sky-300 rounded-lg flex flex-col items-center justify-center p-1 text-center">
        <span className="text-2xl">🏙️</span>
        <span className="text-[10px] font-bold text-sky-800 leading-tight mt-1">{city}</span>
    </div>
);

const StampCollectionWidget: React.FC<StampCollectionWidgetProps> = ({ visitedLocations }) => {
    const cities = [...new Set(visitedLocations.map(loc => loc.split(', ')[0]))].slice(0, 8);

    return (
        <div>
            <h3 className="font-bold text-slate-800 text-lg mb-4">Моя коллекция марок</h3>
            {cities.length > 0 ? (
                 <div className="grid grid-cols-4 gap-2">
                    {cities.map(city => <Stamp key={city} city={city} />)}
                </div>
            ) : (
                <p className="text-sm text-slate-500">Вы пока не получили ни одной марки. Оставьте отзыв о поездке, чтобы начать коллекцию!</p>
            )}
        </div>
    );
};

export default StampCollectionWidget;