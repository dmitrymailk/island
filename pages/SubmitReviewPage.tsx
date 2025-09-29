import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Hotel, Review, TripTag, User } from '../types';
import Card from '../components/ui/Card';
import { StarIcon } from '../components/ui/Rating';

interface SubmitReviewPageProps {
  hotels: Hotel[];
  onSubmit: (review: Omit<Review, 'id' | 'friendId' | 'date' | 'status'>) => void;
  currentUser: User;
}

const ALL_TAGS: TripTag[] = ['Семья с детьми', 'Романтика', 'Бизнес', 'Соло', 'С животными'];

const SubmitReviewPage: React.FC<SubmitReviewPageProps> = ({ hotels, onSubmit, currentUser }) => {
    const { hotelId } = useParams<{ hotelId: string }>();
    const navigate = useNavigate();
    const hotel = hotels.find(h => h.id === hotelId);

    const [step, setStep] = useState(1);
    const [rating, setRating] = useState(0);
    const [pros, setPros] = useState('');
    const [cons, setCons] = useState('');
    const [lifehack, setLifehack] = useState('');
    const [tripTags, setTripTags] = useState<TripTag[]>([]);
    const [photos, setPhotos] = useState<string[]>([]);
    const [isPublic, setIsPublic] = useState(false);

    if (!hotel) {
        return <div>Отель не найден.</div>
    }

    const handleTagClick = (tag: TripTag) => {
        setTripTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleAddPhoto = () => {
        // Mock photo upload
        if (photos.length < 5) {
            const photoId = Date.now();
            setPhotos(prev => [...prev, `https://picsum.photos/seed/${photoId}/400/300`]);
        }
    };

    const handleRemovePhoto = (photoUrl: string) => {
        setPhotos(prev => prev.filter(p => p !== photoUrl));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            hotelId: hotel.id,
            rating,
            pros,
            cons,
            lifehack,
            tripTags,
            photos,
            isPublic,
        });
        navigate('/passport'); // Redirect to passport after submission to see rewards
    };
    
    const isStep1Valid = rating > 0;
    const isStep2Valid = pros.length > 5 && cons.length > 5;
    const isStep3Valid = tripTags.length > 0;

    return (
        <Card className="max-w-2xl mx-auto p-8">
            <h1 className="text-2xl font-bold text-slate-900">Отзыв об отеле</h1>
            <h2 className="text-xl font-semibold text-cyan-700">{hotel.name}</h2>
            
            <form onSubmit={handleSubmit}>
                {/* Step 1: Rating */}
                <div className={`${step !== 1 ? 'hidden' : 'block'}`}>
                    <h3 className="mt-8 text-lg font-semibold">Шаг 1: Ваша общая оценка</h3>
                    <div className="flex items-center space-x-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                            <button type="button" key={i} onClick={() => setRating(i + 1)}>
                                <StarIcon filled={i < rating} className="w-8 h-8 cursor-pointer" />
                            </button>
                        ))}
                    </div>
                     <button type="button" onClick={() => setStep(2)} disabled={!isStep1Valid} className="mt-6 w-full px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 disabled:bg-slate-300 transition-colors">
                        Далее
                    </button>
                </div>

                 {/* Step 2: Impressions */}
                <div className={`${step !== 2 ? 'hidden' : 'block'}`}>
                    <h3 className="mt-8 text-lg font-semibold">Шаг 2: Ваши впечатления</h3>
                    <div className="mt-4">
                        <label htmlFor="pros" className="block text-sm font-medium text-slate-700">Что понравилось 👍</label>
                        <textarea id="pros" value={pros} onChange={e => setPros(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm" placeholder="Чистый номер, вежливый персонал..."></textarea>
                    </div>
                     <div className="mt-4">
                        <label htmlFor="cons" className="block text-sm font-medium text-slate-700">Что не понравилось 👎</label>
                        <textarea id="cons" value={cons} onChange={e => setCons(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm" placeholder="Шумно, скудный завтрак..."></textarea>
                    </div>
                     <div className="mt-4">
                        <label htmlFor="lifehack" className="block text-sm font-medium text-slate-700">Совет для друга 💡</label>
                        <input id="lifehack" value={lifehack} onChange={e => setLifehack(e.target.value)} type="text" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm" placeholder="Просите номер с видом на море!"/>
                    </div>
                    <div className="flex space-x-2">
                        <button type="button" onClick={() => setStep(1)} className="mt-6 flex-1 px-6 py-3 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">Назад</button>
                        <button type="button" onClick={() => setStep(3)} disabled={!isStep2Valid} className="mt-6 flex-1 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 disabled:bg-slate-300 transition-colors">Далее</button>
                    </div>
                </div>
                
                 {/* Step 3: Details */}
                 <div className={`${step !== 3 ? 'hidden' : 'block'}`}>
                    <h3 className="mt-8 text-lg font-semibold">Шаг 3: Детали поездки</h3>
                    <p className="text-sm text-slate-600">Выберите теги, которые описывают вашу поездку.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {ALL_TAGS.map(tag => (
                             <button type="button" key={tag} onClick={() => handleTagClick(tag)} className={`px-3 py-1.5 text-sm font-medium rounded-full border-2 transition-colors ${tripTags.includes(tag) ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white text-slate-700 border-slate-300 hover:border-cyan-500'}`}>
                                {tag}
                            </button>
                        ))}
                    </div>
                     <div className="flex space-x-2">
                        <button type="button" onClick={() => setStep(2)} className="mt-6 flex-1 px-6 py-3 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">Назад</button>
                        <button type="button" onClick={() => setStep(4)} disabled={!isStep3Valid} className="mt-6 flex-1 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 disabled:bg-slate-300 transition-colors">Далее</button>
                    </div>
                 </div>
                 
                 {/* Step 4: Photos */}
                 <div className={`${step !== 4 ? 'hidden' : 'block'}`}>
                    <h3 className="mt-8 text-lg font-semibold">Шаг 4: Загрузите фото</h3>
                    <p className="text-sm text-slate-600">Добавьте до 5 фотографий.</p>
                    <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {photos.map(p => (
                            <div key={p} className="relative group">
                                <img src={p} alt="upload preview" className="w-full h-24 object-cover rounded-lg"/>
                                <button type="button" onClick={() => handleRemovePhoto(p)} className="absolute top-1 right-1 w-6 h-6 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100">&times;</button>
                            </div>
                        ))}
                        {photos.length < 5 && (
                            <button type="button" onClick={handleAddPhoto} className="w-full h-24 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-500 hover:border-cyan-500 hover:text-cyan-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                <span className="text-xs mt-1">Добавить</span>
                            </button>
                        )}
                    </div>
                     <div className="flex space-x-2">
                        <button type="button" onClick={() => setStep(3)} className="mt-6 flex-1 px-6 py-3 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">Назад</button>
                        <button type="button" onClick={() => setStep(5)} className="mt-6 flex-1 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 disabled:bg-slate-300 transition-colors">Далее</button>
                    </div>
                 </div>

                 {/* Step 5: Privacy */}
                 <div className={`${step !== 5 ? 'hidden' : 'block'}`}>
                    <h3 className="mt-8 text-lg font-semibold">Шаг 5: Как опубликовать ваш отзыв?</h3>
                    <fieldset className="mt-4 space-y-4">
                        <div className={`relative flex items-start p-4 border-2 rounded-lg transition-colors ${!isPublic ? 'border-cyan-500 bg-cyan-50' : 'border-slate-300'}`}>
                            <div className="flex h-5 items-center">
                                <input id="privacy-anonymous" name="privacy" type="radio" checked={!isPublic} onChange={() => setIsPublic(false)} className="h-4 w-4 border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="privacy-anonymous" className="font-medium text-gray-900">🔒 Стандартная публикация (Анонимно)</label>
                                <p className="text-gray-500">Ваш отзыв будет опубликован анонимно. Ваши друзья увидят его как "рекомендацию из вашего круга", без имени и фото.</p>
                            </div>
                        </div>

                         <div className={`relative flex items-start p-4 border-2 rounded-lg transition-colors ${isPublic ? 'border-amber-500 bg-amber-50' : 'border-slate-300'} ${!currentUser.isExpert ? 'opacity-60' : ''}`} title={!currentUser.isExpert ? "Станьте Экспертом, чтобы публиковать отзывы от своего имени" : ""}>
                            <div className="flex h-5 items-center">
                                <input id="privacy-public" name="privacy" type="radio" checked={isPublic} onChange={() => setIsPublic(true)} disabled={!currentUser.isExpert} className="h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-500" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="privacy-public" className="font-medium text-gray-900">⭐ Публикация от Эксперта</label>
                                <p className="text-gray-500">Ваш отзыв будет опубликован с вашим именем. Он поможет большему числу путешественников и принесет <span className="font-bold">двойные мили и XP!</span></p>
                            </div>
                        </div>
                    </fieldset>

                      <div className="flex space-x-2">
                        <button type="button" onClick={() => setStep(4)} className="mt-6 flex-1 px-6 py-3 bg-slate-200 text-slate-800 font-semibold rounded-lg hover:bg-slate-300 transition-colors">Назад</button>
                        <button type="submit" className="mt-6 flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 disabled:bg-slate-300 transition-colors">Опубликовать отзыв</button>
                    </div>
                 </div>
            </form>
        </Card>
    );
};

export default SubmitReviewPage;