import type { Friend, Hotel, Review, Recommendation, AnalyticsData, User, Level, Badge, Wishlist, Transaction, Challenge, Perk, DiscoverItem, SliderItem } from './types';

export const FRIENDS: Friend[] = [
  { id: 'f1', name: 'Анна Иванова', avatarUrl: 'https://i.pravatar.cc/150?u=f1', source: 'vk' },
  { id: 'f2', name: 'Петр Сидоров', avatarUrl: 'https://i.pravatar.cc/150?u=f2', source: 'telegram' },
  { id: 'f3', name: 'Елена Васильева', avatarUrl: 'https://i.pravatar.cc/150?u=f3', source: 'contacts' },
  { id: 'f4', name: 'Дмитрий Петров', avatarUrl: 'https://i.pravatar.cc/150?u=f4', source: 'vk' },
  { id: 'f5', name: 'Ольга Смирнова', avatarUrl: 'https://i.pravatar.cc/150?u=f5', source: 'telegram' },
  { id: 'f6', name: 'Ирина Кузнецова', avatarUrl: 'https://i.pravatar.cc/150?u=f6', source: 'vk' },
  { id: 'f7', name: 'Максим Попов', avatarUrl: 'https://i.pravatar.cc/150?u=f7', source: 'telegram' }, // This friend will be the "Expert"
  { id: 'f8', name: 'София Лебедева', avatarUrl: 'https://i.pravatar.cc/150?u=f8', source: 'contacts' },
  { id: 'f9', name: 'Артем Соколов', avatarUrl: 'https://i.pravatar.cc/150?u=f9', source: 'vk' },
  { id: 'f10', name: 'Виктория Козлова', avatarUrl: 'https://i.pravatar.cc/150?u=f10', source: 'telegram' },
  { id: 'f11', name: 'Михаил Новиков', avatarUrl: 'https://i.pravatar.cc/150?u=f11', source: 'contacts' },
  { id: 'f12', name: 'Алина Орлова', avatarUrl: 'https://i.pravatar.cc/150?u=f12', source: 'telegram' }, // New Super Expert
];

export const HOTELS: Hotel[] = [
  { id: 'h1', name: 'Cosmos Collection Izhevsk Hotel', location: 'Ижевск, Россия', coordinates: { lat: 56.8525, lng: 53.2075 }, pricePerNight: 4500, rating: 4.8, imageUrl: 'https://picsum.photos/seed/h1/800/600', photos: ['https://picsum.photos/seed/h1-2/800/600', 'https://picsum.photos/seed/h1-3/800/600'], videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
  { id: 'h2', name: 'Radisson Blu, Dubai Waterfront', location: 'Дубай, ОАЭ', coordinates: { lat: 25.1856, lng: 55.2695 }, pricePerNight: 15000, rating: 4.9, imageUrl: 'https://picsum.photos/seed/h2/800/600', photos: ['https://picsum.photos/seed/h2-2/800/600', 'https://picsum.photos/seed/h2-3/800/600'], videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
  { id: 'h3', name: 'Metropol Hotel', location: 'Москва, Россия', coordinates: { lat: 55.7587, lng: 37.6221 }, pricePerNight: 22000, rating: 4.7, imageUrl: 'https://picsum.photos/seed/h3/800/600', photos: ['https://picsum.photos/seed/h3-2/800/600', 'https://picsum.photos/seed/h3-3/800/600'] },
  { id: 'h4', name: 'Sochi Marriott Krasnaya Polyana', location: 'Сочи, Россия', coordinates: { lat: 43.6811, lng: 40.2053 }, pricePerNight: 12500, rating: 4.6, imageUrl: 'https://picsum.photos/seed/h4/800/600', photos: ['https://picsum.photos/seed/h4-2/800/600'], videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  { id: 'h5', name: 'Armani Hotel Dubai', location: 'Дубай, ОАЭ', coordinates: { lat: 25.1972, lng: 55.2744 }, pricePerNight: 45000, rating: 5.0, imageUrl: 'https://picsum.photos/seed/h5/800/600', photos: ['https://picsum.photos/seed/h5-2/800/600', 'https://picsum.photos/seed/h5-3/800/600'] },
  { id: 'h6', name: 'Four Seasons Hotel Lion Palace', location: 'Санкт-Петербург, Россия', coordinates: { lat: 59.9358, lng: 30.3101 }, pricePerNight: 35000, rating: 4.9, imageUrl: 'https://picsum.photos/seed/h6/800/600', photos: ['https://picsum.photos/seed/h6-2/800/600'] },
  { id: 'h7', name: 'Grand Hotel Polyana', location: 'Сочи, Россия', coordinates: { lat: 43.6725, lng: 40.2583 }, pricePerNight: 18000, rating: 4.7, imageUrl: 'https://picsum.photos/seed/h7/800/600', photos: ['https://picsum.photos/seed/h7-2/800/600', 'https://picsum.photos/seed/h7-3/800/600'] },
  { id: 'h8', name: 'Hotel Baltschug Kempinski', location: 'Москва, Россия', coordinates: { lat: 55.7481, lng: 37.6253 }, pricePerNight: 28000, rating: 4.8, imageUrl: 'https://picsum.photos/seed/h8/800/600', photos: ['https://picsum.photos/seed/h8-2/800/600'] },
  { id: 'h9', name: 'The Ritz-Carlton, Istanbul', location: 'Стамбул, Турция', coordinates: { lat: 41.0401, lng: 28.9902 }, pricePerNight: 25000, rating: 4.9, imageUrl: 'https://picsum.photos/seed/h9/800/600', photos: ['https://picsum.photos/seed/h9-2/800/600'], videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
  { id: 'h10', name: 'Park Hyatt Kazan', location: 'Казань, Россия', coordinates: { lat: 55.7887, lng: 49.1221 }, pricePerNight: 9500, rating: 4.7, imageUrl: 'https://picsum.photos/seed/h10/800/600', photos: ['https://picsum.photos/seed/h10-2/800/600'] },
  { id: 'h11', name: 'Schloss-Hotel Yantarny', location: 'Калининград, Россия', coordinates: { lat: 54.8722, lng: 19.9386 }, pricePerNight: 8500, rating: 4.9, imageUrl: 'https://picsum.photos/seed/h11/800/600', photos: ['https://picsum.photos/seed/h11-2/800/600'] },
];

export const REVIEWS: Review[] = [
  { id: 'r1', friendId: 'f1', hotelId: 'h2', rating: 5, pros: 'Просто восхитительный вид на Бурдж-Халифа! Сервис на высшем уровне.', cons: 'Немного дорогие напитки в мини-баре.', lifehack: 'Просите номер на этаже повыше, чтобы вид был еще лучше!', tripTags: ['Романтика'], photos: ['https://picsum.photos/seed/r1p1/400/300', 'https://picsum.photos/seed/r1p2/400/300'], date: '2024-05-10', status: 'approved', isPublic: false },
  { id: 'r2', friendId: 'f2', hotelId: 'h1', rating: 4, pros: 'Отличный отель в центре Ижевска. Чисто, уютно, хороший завтрак.', cons: 'Парковка платная, пришлось искать место во дворах.', tripTags: ['Бизнес'], photos: [], date: '2024-04-22', status: 'approved', isPublic: false },
  { id: 'r3', friendId: 'f3', hotelId: 'h3', rating: 5, pros: 'Историческое место, чувствуешь себя частью истории. Номера роскошные, персонал очень вежливый.', cons: 'Цена, конечно, кусается, но оно того стоит.', lifehack: 'Обязательно сходите на экскурсию по отелю, расскажут много интересного.', tripTags: ['Романтика'], photos: ['https://picsum.photos/seed/r3p1/400/300'], date: '2024-06-01', status: 'pending', isPublic: true },
  { id: 'r4', friendId: 'f4', hotelId: 'h4', rating: 4, pros: 'Прекрасное расположение в горах. Воздух, природа, спа-центр — все для отличного отдыха.', cons: 'До подъемников нужно ехать на шаттле.', tripTags: ['Семья с детьми'], photos: [], date: '2024-03-15', status: 'approved', isPublic: true },
  { id: 'r5', friendId: 'f5', hotelId: 'h2', rating: 5, pros: 'Бассейн на крыше — это что-то! Очень понравилось, персонал очень внимательный.', cons: 'Вечером у бассейна бывает многолюдно.', lifehack: 'Приходите к бассейну утром, пока все на завтраке.', tripTags: ['Соло'], photos: ['https://picsum.photos/seed/r5p1/400/300'], date: '2024-06-05', status: 'approved', isPublic: true },
  { id: 'r6', friendId: 'f1', hotelId: 'h4', rating: 3, pros: 'Расположение хорошее, рядом с природой.', cons: 'В целом неплохо, но ожидали большего. Номер был немного уставший, требовал ремонта.', tripTags: ['Семья с детьми'], photos: [], date: '2023-11-20', status: 'rejected', isPublic: false },
  { id: 'r7', friendId: 'f7', hotelId: 'h5', rating: 5, pros: 'Невероятный отель прямо в Бурдж-Халифа. Стильно, дорого, незабываемо.', cons: 'Очень сложная система лифтов, легко запутаться.', lifehack: 'Пользуйтесь услугами консьержа для навигации по зданию.', tripTags: ['Романтика'], photos: ['https://picsum.photos/seed/r7p1/400/300'], date: '2024-07-01', status: 'approved', isPublic: true },
  { id: 'r8', friendId: 'f7', hotelId: 'h6', rating: 5, pros: 'Лучший отель в Питере. Шикарные интерьеры, безупречный сервис.', cons: 'Завтраки дорогие, но выбор блюд огромный.', tripTags: ['Романтика', 'Бизнес'], photos: [], date: '2024-06-15', status: 'approved', isPublic: true },
  { id: 'r9', friendId: 'f8', hotelId: 'h7', rating: 4, pros: 'Хороший семейный отель в Красной Поляне. Большая территория, много развлечений для детей.', cons: 'В высокий сезон бывает шумно.', tripTags: ['Семья с детьми'], photos: [], date: '2024-07-10', status: 'pending', isPublic: true },
  { id: 'r10', friendId: 'f9', hotelId: 'h8', rating: 5, pros: 'Классика с видом на Кремль. Все на высшем уровне, как и ожидалось от Kempinski.', cons: 'Интернет мог бы быть побыстрее.', lifehack: 'Бронируйте столик в ресторане на крыше заранее, места быстро заканчиваются.', tripTags: ['Бизнес'], photos: ['https://picsum.photos/seed/r10p1/400/300'], date: '2024-05-20', status: 'approved', isPublic: true },
  { id: 'r11', friendId: 'f10', hotelId: 'h9', rating: 3, pros: 'Расположение отличное, в центре Стамбула.', cons: 'Номер был меньше, чем я думала. За такую цену ожидала большего.', tripTags: ['Соло'], photos: [], date: '2024-04-30', status: 'rejected', isPublic: false },
  { id: 'r12', friendId: 'f11', hotelId: 'h10', rating: 4, pros: 'Хороший бизнес-отель в центре Казани. Удобно, чисто, хороший ресторан.', cons: 'Слышимость из коридора.', tripTags: ['Бизнес'], photos: [], date: '2024-06-25', status: 'approved', isPublic: false },
  { id: 'r13', friendId: 'f2', hotelId: 'h5', rating: 5, pros: 'Присоединяюсь ко всем восторженным отзывам. Armani Hotel — это уровень!', cons: 'Сложно найти свободные даты.', tripTags: ['Романтика'], photos: [], date: '2024-07-05', status: 'approved', isPublic: false },
  { id: 'r14', friendId: 'f4', hotelId: 'h6', rating: 4, pros: 'Очень красиво, для особого случая — идеально.', cons: 'Показалось немного пафосно для обычной поездки.', tripTags: ['Романтика'], photos: [], date: '2024-07-08', status: 'pending', isPublic: false },
  { id: 'r15', friendId: 'f1', hotelId: 'h1', rating: 5, pros: 'Была в Ижевске по работе, и этот отель стал приятным открытием. Современный и комфортный.', cons: 'Завтрак не включен в стоимость.', lifehack: 'Рядом с отелем есть отличная кофейня с вкусными завтраками.', tripTags: ['Бизнес'], photos: [], date: '2024-07-12', status: 'approved', isPublic: false },
  { id: 'r16', friendId: 'f12', hotelId: 'h11', rating: 5, pros: 'Потрясающее место с историей. Атмосфера замка, отличный СПА и вид на море. Полный восторг!', cons: 'Далеко от центра города, но это скорее плюс для уединенного отдыха.', lifehack: 'Обязательно забронируйте ужин в их ресторане с панорамным видом.', tripTags: ['Романтика', 'Соло'], photos: ['https://picsum.photos/seed/r16p1/400/300'], date: '2024-07-20', status: 'approved', isPublic: true },
  { id: 'r17', friendId: 'f1', hotelId: 'h11', rating: 4, pros: 'Очень красивый отель, как в сказке. Хорошие завтраки.', cons: 'Интернет был медленным в номере.', tripTags: ['Семья с детьми'], photos: [], date: '2024-06-18', status: 'approved', isPublic: false },
  { id: 'r18', friendId: 'f5', hotelId: 'h10', rating: 5, pros: 'Идеальное расположение для знакомства с Казанью, всё в пешей доступности. Номера стильные, сервис на высоте.', cons: 'Нет своего бассейна.', tripTags: ['Бизнес', 'Соло'], photos: ['https://picsum.photos/seed/r18p1/400/300'], date: '2024-07-22', status: 'approved', isPublic: true },
  // Reviews from the current user to populate their travel history
  { id: 'r_user1', friendId: 'user123', hotelId: 'h2', rating: 5, pros: 'Невероятный вид и отличный сервис. Бассейн на крыше просто супер!', cons: 'Цены в ресторане отеля довольно высокие.', lifehack: 'Заказывайте такси через приложение, а не у отеля, выйдет дешевле.', tripTags: ['Романтика', 'Соло'], photos: ['https://picsum.photos/seed/user_r1p1/400/300'], date: '2024-07-18', status: 'approved', isPublic: false },
  { id: 'r_user2', friendId: 'user123', hotelId: 'h4', rating: 4, pros: 'Отличное место для семейного отдыха в горах. Хороший SPA и чистый воздух.', cons: 'Завтраки могли бы быть разнообразнее.', tripTags: ['Семья с детьми'], photos: [], date: '2024-01-25', status: 'approved', isPublic: false },
];

export const getRecommendations = (reviews: Review[], hotels: Hotel[], friends: Friend[]): Recommendation[] => {
  const recommendationsMap: Map<string, Recommendation> = new Map();
  // We show recommendations from friends, regardless of public/private status on the main feed
  const approvedReviews = reviews.filter(r => r.status === 'approved');

  for (const review of approvedReviews) {
    const hotel = hotels.find(h => h.id === review.hotelId);
    // A recommendation is valid if the review is from a user in our friend list.
    const friend = friends.find(f => f.id === review.friendId);

    if (hotel && friend) {
      if (!recommendationsMap.has(hotel.id)) {
        recommendationsMap.set(hotel.id, {
          hotel,
          reviews: [],
        });
      }
      recommendationsMap.get(hotel.id)!.reviews.push({ friend, review });
    }
  }

  return Array.from(recommendationsMap.values()).sort((a,b) => b.reviews.length - a.reviews.length);
};

export const MOCK_ANALYTICS_DATA: AnalyticsData = {
    connections: [
      { month: 'Янв', count: 120 },
      { month: 'Фев', count: 180 },
      { month: 'Мар', count: 250 },
      { month: 'Апр', count: 310 },
      { month: 'Май', count: 420 },
      { month: 'Июн', count: 550 },
    ],
    bookings: [
      { month: 'Янв', count: 15 },
      { month: 'Фев', count: 25 },
      { month: 'Мар', count: 40 },
      { month: 'Апр', count: 60 },
      { month: 'Май', count: 90 },
      { month: 'Июн', count: 130 },
    ],
    recommendationSources: [
      { name: 'VK', value: 45 },
      { name: 'Telegram', value: 30 },
      { name: 'Контакты', value: 25 },
    ],
};

// --- Gamification Constants ---

export const LEVELS: Level[] = [
    { level: 1, name: 'Турист', xpThreshold: 0, cashbackPercent: 1 },
    { level: 2, name: 'Исследователь', xpThreshold: 1001, cashbackPercent: 2 },
    { level: 3, name: 'Эксперт', xpThreshold: 5001, cashbackPercent: 3.5 },
    { level: 4, name: 'Легенда Островка', xpThreshold: 20001, cashbackPercent: 5 },
];

export const ALL_BADGES: Badge[] = [
    { id: 'b1', name: 'Первый отзыв', description: 'Оставьте свой первый отзыв для друзей.', icon: '✍️' },
    { id: 'b2', name: 'Душа компании', description: 'Пригласите 5 друзей.', icon: '🎉' },
    { id: 'b3', name: 'Надежный советчик', description: 'Добейтесь, чтобы по вашему отзыву забронировали отель.', icon: '👍' },
    { id: 'b4', name: 'Фотограф', description: 'Добавьте хотя бы одно фото к своему отзыву.', icon: '📸' },
    { id: 'b5', name: 'Лайфхакер', description: 'Поделитесь полезным советом в отзыве.', icon: '💡' },
    { id: 'b6', name: 'Покоритель столиц', description: 'Оставьте отзывы об отелях в 3 разных столицах.', icon: '🏛️' },
    { id: 'b7', name: 'Планировщик', description: 'Создайте свой первый вишлист для путешествия.', icon: '🗺️' },
    { id: 'b8', name: 'Первооткрыватель', description: 'Пролистайте 50 карточек в Открытиях.', icon: '🧭' },
    { id: 'b9', name: 'Коллекционер Находок', description: 'Добавьте 10 отелей в вишлист из Открытий.', icon: '💎' },
];

// Single source of truth for all users in the system
export const MOCK_USERS_DATABASE: Record<string, User> = {
    'user123': {
        id: 'user123',
        name: 'Екатерина',
        avatarUrl: 'https://i.pravatar.cc/150?u=user123',
        level: 2,
        xp: 1550,
        miles: 2450,
        achievements: ['b1', 'b4', 'b5'],
        visitedLocations: ['Дубай, ОАЭ', 'Ижевск, Россия', 'Сочи, Россия', 'Москва, Россия', 'Санкт-Петербург, Россия', 'Стамбул, Турция', 'Казань, Россия'],
        discoverHistory: [
            { hotelId: 'h8', action: 'like' },
            { hotelId: 'h7', action: 'like' },
        ],
        following: ['f1', 'f2', 'f3', 'f4', 'f5', 'f7', 'f9', 'f11', 'f12'],
        isExpert: false,
        bio: 'Люблю находить уютные отели с хорошим видом. Всегда ищу места, куда хочется вернуться.',
    },
    'f1': { id: 'f1', name: 'Анна Иванова', avatarUrl: 'https://i.pravatar.cc/150?u=f1', level: 2, xp: 2500, miles: 500, achievements: ['b1', 'b4'], visitedLocations: ['Дубай, ОАЭ', 'Сочи, Россия', 'Ижевск, Россия', 'Калининград, Россия'], discoverHistory: [
        { hotelId: 'h3', action: 'like' },
        { hotelId: 'h5', action: 'like' },
        { hotelId: 'h8', action: 'like' },
    ], following: [], isExpert: false },
    'f2': { id: 'f2', name: 'Петр Сидоров', avatarUrl: 'https://i.pravatar.cc/150?u=f2', level: 2, xp: 1800, miles: 1200, achievements: ['b1', 'b5'], visitedLocations: ['Ижевск, Россия', 'Дубай, ОАЭ'], discoverHistory: [
        { hotelId: 'h6', action: 'like' },
        { hotelId: 'h7', action: 'like' },
    ], following: [], isExpert: true },
    'f3': { id: 'f3', name: 'Елена Васильева', avatarUrl: 'https://i.pravatar.cc/150?u=f3', level: 1, xp: 500, miles: 250, achievements: ['b1'], visitedLocations: ['Москва, Россия'], discoverHistory: [
        { hotelId: 'h1', action: 'like' },
        { hotelId: 'h2', action: 'like' },
        { hotelId: 'h10', action: 'like' },
    ], following: [], isExpert: true },
    'f4': { id: 'f4', name: 'Дмитрий Петров', avatarUrl: 'https://i.pravatar.cc/150?u=f4', level: 1, xp: 950, miles: 800, achievements: ['b1'], visitedLocations: ['Сочи, Россия', 'Санкт-Петербург, Россия'], discoverHistory: [
        { hotelId: 'h1', action: 'like' },
        { hotelId: 'h9', action: 'like' },
    ], following: [], isExpert: true },
    'f5': { id: 'f5', name: 'Ольга Смирнова', avatarUrl: 'https://i.pravatar.cc/150?u=f5', level: 3, xp: 6100, miles: 4500, achievements: ['b1', 'b4', 'b7'], visitedLocations: ['Дубай, ОАЭ', 'Казань, Россия'], discoverHistory: [
        { hotelId: 'h1', action: 'like' },
        { hotelId: 'h3', action: 'like' },
        { hotelId: 'h4', action: 'like' },
        { hotelId: 'h8', action: 'like' },
    ], following: ['f7', 'f12'], isExpert: true, bio: 'Обожаю городские путешествия и отели с историей. В моих отзывах всегда найдете детали, которые не пишут в гидах.' },
    'f6': { id: 'f6', name: 'Ирина Кузнецова', avatarUrl: 'https://i.pravatar.cc/150?u=f6', level: 1, xp: 200, miles: 100, achievements: [], visitedLocations: [], discoverHistory: [], following: [], isExpert: false },
    'f7': { id: 'f7', name: 'Максим Попов', avatarUrl: 'https://i.pravatar.cc/150?u=f7', level: 3, xp: 5500, miles: 10000, achievements: ['b1', 'b5', 'b6'], visitedLocations: ['Дубай, ОАЭ', 'Санкт-Петербург, Россия', 'Москва, Россия', 'Стамбул, Турция'], discoverHistory: [
        { hotelId: 'h9', action: 'like' },
        { hotelId: 'h3', action: 'like' },
        { hotelId: 'h1', action: 'like' },
        { hotelId: 'h2', action: 'like' },
        { hotelId: 'h4', action: 'like' },
        { hotelId: 'h8', action: 'like' },
        { hotelId: 'h10', action: 'like' },
    ], following: ['user123', 'f5'], isExpert: true, bio: 'Путешествую по работе и для души. Ценю хороший сервис и интересную архитектуру. Делюсь только проверенными местами.' }, // Expert
    'f8': { id: 'f8', name: 'София Лебедева', avatarUrl: 'https://i.pravatar.cc/150?u=f8', level: 2, xp: 1300, miles: 1100, achievements: ['b1', 'b7'], visitedLocations: ['Сочи, Россия'], discoverHistory: [], following: [], isExpert: true },
    'f9': { id: 'f9', name: 'Артем Соколов', avatarUrl: 'https://i.pravatar.cc/150?u=f9', level: 2, xp: 4000, miles: 300, achievements: ['b1', 'b4', 'b5'], visitedLocations: ['Москва, Россия'], discoverHistory: [
        { hotelId: 'h1', action: 'like' },
        { hotelId: 'h2', action: 'like' },
        { hotelId: 'h3', action: 'like' },
        { hotelId: 'h4', action: 'like' },
        { hotelId: 'h5', action: 'like' },
    ], following: [], isExpert: true },
    'f10': { id: 'f10', name: 'Виктория Козлова', avatarUrl: 'https://i.pravatar.cc/150?u=f10', level: 1, xp: 800, miles: 50, achievements: ['b1'], visitedLocations: ['Стамбул, Турция'], discoverHistory: [], following: [], isExpert: false },
    'f11': { id: 'f11', name: 'Михаил Новиков', avatarUrl: 'https://i.pravatar.cc/150?u=f11', level: 1, xp: 1000, miles: 2000, achievements: ['b1'], visitedLocations: ['Казань, Россия'], discoverHistory: [
        { hotelId: 'h6', action: 'like' },
        { hotelId: 'h5', action: 'like' },
        { hotelId: 'h4', action: 'like' },
    ], following: [], isExpert: false },
    'f12': { id: 'f12', name: 'Алина Орлова', avatarUrl: 'https://i.pravatar.cc/150?u=f12', level: 4, xp: 25000, miles: 15000, achievements: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'], visitedLocations: ['Калининград, Россия', 'Дубай, ОАЭ', 'Санкт-Петербург, Россия', 'Москва, Россия', 'Стамбул, Турция', 'Казань, Россия'], discoverHistory: [
        { hotelId: 'h1', action: 'like' }, { hotelId: 'h2', action: 'like' }, { hotelId: 'h3', action: 'like' }, { hotelId: 'h4', action: 'like' }, { hotelId: 'h5', action: 'like' }, { hotelId: 'h6', action: 'like' }, { hotelId: 'h7', action: 'like' }, { hotelId: 'h8', action: 'like' }, { hotelId: 'h9', action: 'like' }, { hotelId: 'h10', action: 'like' }, { hotelId: 'h11', action: 'like' }
    ], following: ['f7', 'user123', 'f5'], isExpert: true, bio: 'Профессиональный путешественник и отельный критик. Ищу жемчужины по всему миру.' }, // New Super Expert
};

export const MOCK_WISHLISTS: Wishlist[] = [
    { id: 'w1', name: 'Поездка в Дубай', ownerId: 'user123', hotelIds: ['h2', 'h5'], friendIds: ['f1', 'f5'] },
    { id: 'w2', name: 'Выходные в Питере', ownerId: 'user123', hotelIds: ['h6'], friendIds: [] },
];

export const TRANSACTIONS: Transaction[] = [
    { id: 't1', date: '2024-07-20', description: 'Начисление за отзыв об отеле', amount: 50 },
    { id: 't2', date: '2024-07-19', description: 'Покупка перка "Завтрак"', amount: -1000 },
    { id: 't3', date: '2024-07-18', description: 'Начисление за бронирование друга', amount: 500 },
    { id: 't4', date: '2024-07-15', description: 'Скидка на бронирование', amount: -1500 },
    { id: 't5', date: '2024-07-12', description: 'Кэшбэк за бронирование', amount: 350 },
];

export const ACTIVE_CHALLENGES: Challenge[] = [
    { id: 'c1', name: 'Столичный эксперт', description: 'Оставьте отзывы в 3 разных столицах', xpReward: 200, milesReward: 100, currentProgress: 2, target: 3 },
    { id: 'c2', name: 'Дружелюбный гид', description: 'Пригласите 2 новых друзей', xpReward: 100, milesReward: 50, currentProgress: 1, target: 2 },
];

export const HOTEL_PERKS: Perk[] = [
    { id: 'p1', hotelId: 'h2', name: 'Бесплатный завтрак', description: 'Начните день с вкусного завтрака за наш счет.', costInMiles: 1500 },
    { id: 'p2', hotelId: 'h2', name: 'Повышение категории номера', description: 'Наслаждайтесь большим комфортом и лучшим видом.', costInMiles: 3000 },
    { id: 'p3', hotelId: 'h6', name: 'Поздний выезд', description: 'Не торопитесь и отдохните еще немного.', costInMiles: 1000 },
];


// --- Discover Constants ---
export const generateDiscoverFeed = (
  allHotels: Hotel[],
  allReviews: Review[],
  allFriends: Friend[],
): DiscoverItem[] => {
    const friendReviewedHotelIds = new Set(allReviews.filter(r => allFriends.some(f => f.id === r.friendId)).map(r => r.hotelId));
  
    const hotelItems: DiscoverItem[] = allHotels.map((hotel) => {
        const sliderContent: SliderItem[] = [];

        // Add main photo first
        sliderContent.push({ type: 'photo', url: hotel.imageUrl });

        // Add other photos
        hotel.photos.forEach(photoUrl => {
            sliderContent.push({ type: 'photo', url: photoUrl });
        });

        // Add video if available
        if (hotel.videoUrl) {
            sliderContent.push({ type: 'video', url: hotel.videoUrl });
        }

        // Add friend reviews
        const hotelFriendReviews = allReviews.filter(r => 
            r.hotelId === hotel.id && 
            allFriends.some(f => f.id === r.friendId) && 
            r.status === 'approved'
        );
        hotelFriendReviews.forEach(review => {
            const friend = allFriends.find(f => f.id === review.friendId);
            if (friend) {
                sliderContent.push({ type: 'review', review, friend });
            }
        });

        const reviewsForHotel = allReviews.filter(r => r.hotelId === hotel.id && allFriends.some(f => f.id === r.friendId));
        const recommendedBy = reviewsForHotel.length > 0 ? allFriends.find(f => f.id === reviewsForHotel[0].friendId) : undefined;
        
        return {
            type: 'hotel',
            hotel,
            sliderContent,
            recommendedBy,
        };
    });

    // Prioritize hotels recommended by friends
    hotelItems.sort((a, b) => {
        const aIsRecommended = (a.type === 'hotel' && friendReviewedHotelIds.has(a.hotel.id));
        const bIsRecommended = (b.type === 'hotel' && friendReviewedHotelIds.has(b.hotel.id));
        if (aIsRecommended && !bIsRecommended) return -1;
        if (!aIsRecommended && bIsRecommended) return 1;
        return 0.5 - Math.random(); // Shuffle others
    });

    return hotelItems;
};