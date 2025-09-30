import type { User, Review, Hotel, TripTag } from '../types';
import { HOTELS, ALL_BADGES, LEVELS, REVIEWS } from '../constants';

/**
 * Генератор mock данных для новых пользователей из Telegram
 * 
 * ВАЖНО: Имя и аватар берутся РЕАЛЬНЫЕ из Telegram!
 * Генерируется только активность пользователя: отзывы, лайки, уровень, достижения и т.д.
 */

// Пулы данных для генерации реалистичной активности пользователей
const CITIES = [
  'Москва, Россия', 'Санкт-Петербург, Россия', 'Казань, Россия',
  'Екатеринбург, Россия', 'Новосибирск, Россия', 'Сочи, Россия',
  'Калининград, Россия', 'Владивосток, Россия', 'Нижний Новгород, Россия',
  'Краснодар, Россия', 'Уфа, Россия', 'Волгоград, Россия', 'Пермь, Россия',
  'Красноярск, Россия', 'Воронеж, Россия', 'Самара, Россия', 'Омск, Россия',
  'Ростов-на-Дону, Россия', 'Челябинск, Россия', 'Иркутск, Россия',
  'Дубай, ОАЭ', 'Стамбул, Турция', 'Барселона, Испания', 'Париж, Франция',
  'Прага, Чехия', 'Рим, Италия', 'Берлин, Германия', 'Вена, Австрия'
];

const BIO_TEMPLATES = [
  'Люблю находить уютные отели с хорошим видом. Всегда ищу места, куда хочется вернуться.',
  'Путешествую по работе и для души. Ценю хороший сервис и интересную архитектуру.',
  'Обожаю городские путешествия и отели с историей. В моих отзывах всегда найдете детали.',
  'Профессиональный путешественник. Делюсь только проверенными местами.',
  'Семейные путешествия - моя страсть. Ищу отели, где комфортно с детьми.',
  'Соло-путешественник и фотограф. Ценю атмосферу и аутентичность.',
  'Бизнес-путешествия по всему миру. Знаю толк в комфорте и сервисе.',
  'Романтические путешествия и необычные отели - мой профиль.',
  'Люблю открывать новые места и делиться впечатлениями с друзьями.',
  'Ценю качественный отдых и всегда готов помочь советом.',
  '', '', '' // Некоторые пользователи без био
];

const REVIEW_PROS_POOL = [
  'Отличное расположение в центре города',
  'Очень чистые и просторные номера',
  'Вежливый и отзывчивый персонал',
  'Вкусный и разнообразный завтрак',
  'Красивый вид из окна',
  'Современный дизайн интерьера',
  'Хорошее соотношение цена-качество',
  'Тихое и спокойное место',
  'Удобная кровать, отлично выспался',
  'Быстрый WiFi во всём отеле',
  'Отличная звукоизоляция номеров',
  'Большая ванная комната',
  'Просторный номер для семьи',
  'Хороший завтрак "шведский стол"',
  'Рядом много кафе и достопримечательностей',
  'Бесплатная парковка',
  'Удобная система раннего заезда',
  'Номер полностью соответствовал описанию',
  'Приятная атмосфера и уют',
  'Чистый бассейн и хороший спа-центр'
];

const REVIEW_CONS_POOL = [
  'Wi-Fi работал медленно в номере',
  'Завтрак мог бы быть разнообразнее',
  'Парковка платная',
  'Слышимость из коридора',
  'Номер был немного меньше ожидаемого',
  'Цены в ресторане отеля высокие',
  'Кондиционер шумел ночью',
  'Долгое ожидание при заезде',
  'Лифт часто был занят',
  'Нет бассейна',
  'Завтрак начинается поздно',
  'Ванная комната требует обновления',
  'Далеко от метро',
  'Платный трансфер из аэропорта',
  'Маленький телевизор в номере',
  'Немного устаревшая мебель',
  'Шумно из-за близости к дороге',
  'Холодно в номере вечером',
  'Мало розеток в номере',
  'Нет мини-бара'
];

const REVIEW_LIFEHACKS_POOL = [
  'Просите номер на верхних этажах - тише и вид лучше',
  'Заказывайте такси через приложение, а не у отеля, выйдет дешевле',
  'Бронируйте столик в ресторане заранее',
  'Приходите к бассейну утром, пока все на завтраке',
  'Запрашивайте поздний выезд заранее - часто дают бесплатно',
  'Рядом с отелем есть отличная кофейня с вкусными завтраками',
  'Обязательно сходите на экскурсию, расскажут много интересного',
  'Пользуйтесь услугами консьержа - очень помогают',
  'Бронируйте номер с видом - разница в цене небольшая',
  'Заказывайте завтрак заранее в номер - приятное начало дня'
];

const TRIP_TAGS_POOL: TripTag[] = [
  'Семья с детьми', 'Романтика', 'Бизнес', 'Соло', 'С животными'
];

// Вспомогательные функции
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Эта функция больше не используется - имена берутся из Telegram
// export function generateRandomName(userId: number): string {
//   const isMale = userId % 2 === 0;
//   const firstName = getRandomElement(isMale ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE);
//   const lastName = getRandomElement(LAST_NAMES);
//   return `${firstName} ${lastName}${isMale ? '' : 'а'}`;
// }

// Генерация уровня и XP
function generateLevelAndXP(): { level: number; xp: number } {
  const rand = Math.random();

  if (rand < 0.5) {
    // 50% - уровень 1
    return { level: 1, xp: getRandomInt(0, 1000) };
  } else if (rand < 0.8) {
    // 30% - уровень 2
    return { level: 2, xp: getRandomInt(1001, 5000) };
  } else if (rand < 0.95) {
    // 15% - уровень 3
    return { level: 3, xp: getRandomInt(5001, 20000) };
  } else {
    // 5% - уровень 4 (легенды)
    return { level: 4, xp: getRandomInt(20001, 35000) };
  }
}

// Генерация списка достижений
function generateAchievements(level: number): string[] {
  const achievements: string[] = [];
  const allBadgeIds = ALL_BADGES.map(b => b.id);

  // Базовые достижения для всех уровней
  if (level >= 1) {
    achievements.push('b1'); // Первый отзыв
  }

  // Дополнительные достижения в зависимости от уровня
  const additionalCount = level === 1 ? getRandomInt(0, 2) :
    level === 2 ? getRandomInt(1, 4) :
      level === 3 ? getRandomInt(3, 6) :
        getRandomInt(5, 9);

  const availableBadges = allBadgeIds.filter(id => !achievements.includes(id));
  const additional = getRandomElements(availableBadges, additionalCount);

  return [...achievements, ...additional];
}

// Генерация посещенных локаций
function generateVisitedLocations(level: number): string[] {
  const minCities = level === 1 ? 1 : level === 2 ? 2 : level === 3 ? 3 : 5;
  const maxCities = level === 1 ? 3 : level === 2 ? 5 : level === 3 ? 8 : 12;
  const count = getRandomInt(minCities, maxCities);

  return getRandomElements(CITIES, count);
}

// Генерация истории в Discover
function generateDiscoverHistory(level: number): { hotelId: string; action: 'like' | 'dislike' }[] {
  const count = getRandomInt(level * 2, level * 5);
  const history: { hotelId: string; action: 'like' | 'dislike' }[] = [];

  const availableHotels = getRandomElements(HOTELS, Math.min(count, HOTELS.length));

  for (const hotel of availableHotels) {
    history.push({
      hotelId: hotel.id,
      action: Math.random() > 0.2 ? 'like' : 'dislike' // 80% лайков
    });
  }

  return history;
}

// Генерация миль
function generateMiles(level: number, xp: number): number {
  const baseMin = level === 1 ? 50 : level === 2 ? 500 : level === 3 ? 2000 : 8000;
  const baseMax = level === 1 ? 500 : level === 2 ? 3000 : level === 3 ? 10000 : 20000;

  return getRandomInt(baseMin, baseMax);
}

// Генерация био
function generateBio(level: number): string | undefined {
  // Высокоуровневые пользователи чаще имеют био
  const hasBio = level >= 3 ? Math.random() > 0.3 : Math.random() > 0.7;

  if (!hasBio) {
    return undefined;
  }

  return getRandomElement(BIO_TEMPLATES.filter(b => b !== ''));
}

// Определение статуса эксперта
function determineExpertStatus(level: number, achievements: string[]): boolean {
  // Эксперты - это пользователи уровня 2+ с определенными достижениями
  if (level < 2) return false;

  // Чем выше уровень, тем больше вероятность быть экспертом
  const expertChance = level === 2 ? 0.3 : level === 3 ? 0.6 : 0.9;

  return Math.random() < expertChance;
}

// Генерация отзыва
export function generateRandomReview(
  userId: string,
  hotelId: string,
  reviewId: string,
  isPublic: boolean = false
): Review {
  const rating = getRandomInt(3, 5);
  const pros = getRandomElement(REVIEW_PROS_POOL);
  const cons = getRandomElement(REVIEW_CONS_POOL);
  const hasLifehack = Math.random() > 0.6;
  const lifehack = hasLifehack ? getRandomElement(REVIEW_LIFEHACKS_POOL) : undefined;
  const tripTagsCount = getRandomInt(1, 2);
  const tripTags = getRandomElements(TRIP_TAGS_POOL, tripTagsCount);

  // Фото для высоких оценок
  const hasPhotos = rating >= 4 && Math.random() > 0.5;
  const photos = hasPhotos
    ? [`https://picsum.photos/seed/${reviewId}/400/300`]
    : [];

  // Случайная дата за последние 6 месяцев
  const daysAgo = getRandomInt(1, 180);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const dateString = date.toISOString().split('T')[0];

  return {
    id: reviewId,
    friendId: userId,
    hotelId,
    rating,
    pros,
    cons,
    lifehack,
    tripTags,
    photos,
    date: dateString,
    status: 'approved',
    isPublic
  };
}

// Генерация отзывов для пользователя
function generateUserReviews(userId: string, level: number): Review[] {
  const reviewCount = level === 1 ? getRandomInt(0, 2) :
    level === 2 ? getRandomInt(1, 4) :
      level === 3 ? getRandomInt(3, 7) :
        getRandomInt(5, 12);

  if (reviewCount === 0) return [];

  const reviews: Review[] = [];
  const reviewedHotels = getRandomElements(HOTELS, reviewCount);

  reviewedHotels.forEach((hotel, index) => {
    const reviewId = `r_mock_${userId}_${hotel.id}_${index}`;
    const isPublic = Math.random() > 0.4; // 60% публичные
    reviews.push(generateRandomReview(userId, hotel.id, reviewId, isPublic));
  });

  return reviews;
}

// Генерация подписок
function generateFollowing(level: number, allUserIds: string[]): string[] {
  if (level === 1) {
    return Math.random() > 0.7 ? [] : [getRandomElement(allUserIds)];
  }

  const count = level === 2 ? getRandomInt(0, 3) :
    level === 3 ? getRandomInt(1, 5) :
      getRandomInt(3, 8);

  return getRandomElements(allUserIds, Math.min(count, allUserIds.length));
}

// Основная функция генерации данных пользователя
// name и avatarUrl ДОЛЖНЫ передаваться из Telegram - это реальные данные пользователя
// Генерируем только активность: отзывы, лайки, достижения и т.д.
export function generateMockUserData(
  userId: string,
  telegramUserId: number,
  name: string, // Обязательный параметр - реальное имя из Telegram
  avatarUrl: string, // Обязательный параметр - реальный аватар из Telegram
  existingUserIds: string[] = []
): { user: User; reviews: Review[] } {
  // Генерируем только игровую активность и статистику
  const { level, xp } = generateLevelAndXP();
  const miles = generateMiles(level, xp);
  const achievements = generateAchievements(level);
  const visitedLocations = generateVisitedLocations(level);
  const discoverHistory = generateDiscoverHistory(level);
  const isExpert = determineExpertStatus(level, achievements);
  const bio = generateBio(level);
  const following = generateFollowing(level, existingUserIds);

  const user: User = {
    id: userId,
    name, // Реальное имя из Telegram
    avatarUrl, // Реальный аватар из Telegram
    level,
    xp,
    miles,
    achievements,
    visitedLocations,
    discoverHistory,
    following,
    isExpert,
    bio
  };

  const reviews = generateUserReviews(userId, level);

  return { user, reviews };
}

// Генерация данных для нескольких пользователей
export function generateMockDataForUsers(
  userIds: Array<{ id: string; telegramId: number; name: string; avatarUrl: string }>,
  existingUserIds: string[] = []
): { users: Record<string, User>; reviews: Review[] } {
  const users: Record<string, User> = {};
  const allReviews: Review[] = [];

  userIds.forEach(({ id, telegramId, name, avatarUrl }) => {
    const { user, reviews } = generateMockUserData(id, telegramId, name, avatarUrl, existingUserIds);
    users[id] = user;
    allReviews.push(...reviews);
  });

  return { users, reviews: allReviews };
}
