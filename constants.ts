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
    {
        id: 'h1',
        name: 'Апартаменты Пархоменко New Apart',
        location: 'улица Пархоменко, д.8А, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 3060,
        rating: 9,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/aa/0b/aa0bf652d6b209d87d2e377c3ae15e406291b714.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/aa/0b/aa0bf652d6b209d87d2e377c3ae15e406291b714.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/89/58/895811467d534c1f7ba38cb8aa50ad72cbe16ca9.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/3c/16/3c16bae485814bbb3996695a9eb380d4f7970845.jpeg'
        ],
        additionalInfo: {
            starsCount: 0,
            reviewCount: '113 отзывов',
            ratingCategory: 'Превосходно',
            amenities: [
                'Бесплатный интернет',
                'Парковка',
                'Семейный отель',
                'Кондиционер',
                'Кухня'
            ],
            valueAdds: [
                'Питание не вкл.',
                'Без беспл. отмены',
                'Отложенная оплатаДля бронирования карта не нужна!'
            ],
            discount: 'Скидка 10%',
            oldPrice: '3 400 ₽',
            roomType: 'Апартаменты с балконом',
            roomSubtitle: '',
            distance: '514 м от центра Волгограда'
        }
    },
    {
        id: 'h2',
        name: 'Отель Cosmos Volgograd',
        location: 'улица Михаила Балонина, 7, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 10600,
        rating: 8,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/a8/bc/a8bc4343a215f59a6ecaca1c6b0b7ea272c9fe36.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/a8/bc/a8bc4343a215f59a6ecaca1c6b0b7ea272c9fe36.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/52/13/5213b0855ab38b5e0c9ef0ec8d86f36f45199f62.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/e5/8e/e58ece3438623598ebd3ed36f8994c98246ea1b9.jpeg'
        ],
        additionalInfo: {
            starsCount: 4,
            reviewCount: '623 отзыва',
            ratingCategory: 'Отлично',
            amenities: [
                'Бесплатный интернет',
                'Трансфер',
                'Семейный отель',
                'Фитнес',
                'Бар/ресторан',
                'Конференц-зал'
            ],
            valueAdds: [
                'Завтрак вкл.',
                'Беспл. отмена',
                'Оплата на сайте'
            ],
            discount: '',
            oldPrice: '',
            roomType: 'Двухместный номер Standard с видом на город',
            roomSubtitle: 'двуспальная кровать',
            distance: '523 м от центра Волгограда'
        }
    },
    {
        id: 'h3',
        name: 'Отель Голд',
        location: 'ул. Новорядская, д. 4, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 3026,
        rating: 8,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/c2/a5/c2a57e37196f425e5c0d4badce430054e6dc218b.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/c2/a5/c2a57e37196f425e5c0d4badce430054e6dc218b.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/9a/89/9a89c90d0053471514aa55b874ce38f895e4ce13.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/54/f1/54f1110485dfae7df3ea9ad38098245acfe08d9e.jpeg'
        ],
        additionalInfo: {
            starsCount: 3,
            reviewCount: '510 отзывов',
            ratingCategory: 'Отлично',
            amenities: [
                'Бесплатный интернет',
                'Парковка',
                'Конференц-зал',
                'Кондиционер'
            ],
            valueAdds: [
                'Завтрак вкл.',
                'Беспл. отмена',
                'Оплата на сайте'
            ],
            discount: 'Скидка 10%',
            oldPrice: '3 362 ₽',
            roomType: 'Двухместный номер Standard',
            roomSubtitle: '2 отдельные кровати',
            distance: '1,7 км от центра Волгограда'
        }
    },
    {
        id: 'h4',
        name: 'Отель Hampton by Hilton Волгоград Профсоюзная',
        location: 'улица Профсоюзная, д.13, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 9600,
        rating: 9,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/c9/83/c983d8c9add71c62895ac19ba86593b02856cd19.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/c9/83/c983d8c9add71c62895ac19ba86593b02856cd19.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/media/0800df4c75e248eda82f83bf9e023509.jpg',
            'https://cdn.worldota.net/t/640x400/extranet/92/56/9256292617b85b938367e1b20dfd2113f47b1ceb.jpeg'
        ],
        additionalInfo: {
            starsCount: 4,
            reviewCount: '1134 отзыва',
            ratingCategory: 'Превосходно',
            amenities: [
                'Бесплатный интернет',
                'Парковка',
                'Фитнес',
                'Бар/ресторан',
                'Для гостей с ограниченными возможностями',
                'Конференц-зал'
            ],
            valueAdds: [
                'Завтрак вкл.',
                'Беспл. отмена',
                'Оплата на сайте'
            ],
            discount: '',
            oldPrice: '',
            roomType: 'Двухместный номер',
            roomSubtitle: 'двуспальная кровать',
            distance: '2,1 км от центра Волгограда'
        }
    },
    {
        id: 'h5',
        name: 'Отель Южный',
        location: 'улица Рабоче-Крестьянская, д.18, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 6100,
        rating: 8,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/02/b8/02b849e9f92b7349424eac24790f38a61237a806.JPEG',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/02/b8/02b849e9f92b7349424eac24790f38a61237a806.JPEG',
            'https://cdn.worldota.net/t/640x400/extranet/57/3d/573d2e65b8057304290d8e1c1d8b1b6c0801142a.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/2c/fa/2cfa05c84048a929a605a6446c2d9bca267f3f1e.jpeg'
        ],
        additionalInfo: {
            starsCount: 3,
            reviewCount: '723 отзыва',
            ratingCategory: 'Отлично',
            amenities: [
                'Бесплатный интернет',
                'Парковка',
                'Семейный отель',
                'Бар/ресторан',
                'Конференц-зал',
                'Кондиционер'
            ],
            valueAdds: [
                'Питание не вкл.',
                'Беспл. отмена',
                'Оплата на сайте'
            ],
            discount: '',
            oldPrice: '',
            roomType: 'Двухместный номер в корпусе 1 Standard',
            roomSubtitle: '2 отдельные кровати',
            distance: '2,3 км от центра Волгограда'
        }
    },
    {
        id: 'h6',
        name: 'Отель Волгоград',
        location: 'улица Мира, д.12, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 9000,
        rating: 8,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/10/56/1056a25a11338701e28a786d398b65afa4366895.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/10/56/1056a25a11338701e28a786d398b65afa4366895.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/05/d1/05d11d8606fadce32f78635fd0501d41f0800dc8.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/57/e2/57e246e197bfc64b1b69bbba5f29c8d4f97d1713.jpeg'
        ],
        additionalInfo: {
            starsCount: 5,
            reviewCount: '743 отзыва',
            ratingCategory: 'Отлично',
            amenities: [
                'Бесплатный интернет',
                'Трансфер',
                'Парковка',
                'Семейный отель',
                'Фитнес',
                'Бар/ресторан'
            ],
            valueAdds: [
                'Питание не вкл.',
                'Беспл. отмена',
                'Отложенная оплатаДля бронирования карта не нужна!'
            ],
            discount: '',
            oldPrice: '',
            roomType: 'Двухместный номер Стандартный с видом на внутренний двор',
            roomSubtitle: 'двуспальная кровать',
            distance: '402 м от центра Волгограда'
        }
    },
    {
        id: 'h7',
        name: 'Отель Hilton Garden Inn Volgograd',
        location: 'пр. им В.И. Ленина, д. 56 А, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 6700,
        rating: 8,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/4c/67/4c67e2690c5304c9924effb1c52eed047ef1d3b5.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/4c/67/4c67e2690c5304c9924effb1c52eed047ef1d3b5.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/2a/5e/2a5ed27a55e8b7d160e5c19e5a91c59e934da85a.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/1f/db/1fdb1b64a1a9e217e078e46f34d8521aa05157d2.jpeg'
        ],
        additionalInfo: {
            starsCount: 4,
            reviewCount: '456 отзывов',
            ratingCategory: 'Отлично',
            amenities: [
                'Бесплатный интернет',
                'Трансфер',
                'Парковка',
                'Семейный отель',
                'Фитнес',
                'Бар/ресторан'
            ],
            valueAdds: [
                'Питание не вкл.',
                'Беспл. отмена',
                'Оплата на месте'
            ],
            discount: '',
            oldPrice: '',
            roomType: 'Двухместный номер Стандарт для гостей с ограниченными физическими возможностями',
            roomSubtitle: 'двуспальная кровать',
            distance: '2,5 км от центра Волгограда'
        }
    },
    {
        id: 'h8',
        name: 'Гостевой дом Grant House',
        location: 'проспект Маршала Жукова,д. 79, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 1971,
        rating: 8,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/64/39/6439bb606872e8a15c2e54ff0e59a82216f39404.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/64/39/6439bb606872e8a15c2e54ff0e59a82216f39404.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/34/62/3462550c6230ff2404193970584fb0428cd2cea1.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/29/a6/29a697e8a4a28191f48e24f009cdd644d4192731.jpeg'
        ],
        additionalInfo: {
            starsCount: 0,
            reviewCount: '209 отзывов',
            ratingCategory: 'Отлично',
            amenities: [
                'Бесплатный интернет',
                'Трансфер',
                'Парковка',
                'Семейный отель',
                'Кондиционер',
                'Кухня'
            ],
            valueAdds: [
                'Питание не вкл.',
                'Беспл. отмена',
                'Оплата на сайте'
            ],
            discount: 'Скидка 10%',
            oldPrice: '2 190 ₽',
            roomType: 'Двухместный номер Standard с видом на город',
            roomSubtitle: '2 отдельные кровати',
            distance: '2,7 км от центра Волгограда'
        }
    },
    {
        id: 'h9',
        name: 'Отель Сити',
        location: 'ul. Rokossovskogo, 62, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 6630,
        rating: 8,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/f1/c1/f1c13e8b10b360b5292a20f6d1bba38c19a15630.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/f1/c1/f1c13e8b10b360b5292a20f6d1bba38c19a15630.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/64/64/6464dc07df77172d126368e99980ef90f8c75d2c.JPEG',
            'https://cdn.worldota.net/t/640x400/extranet/f4/fe/f4fe205e1f76693bfc66495e418e87cad69a36dd.JPEG'
        ],
        additionalInfo: {
            starsCount: 5,
            reviewCount: '116 отзывов',
            ratingCategory: 'Отлично',
            amenities: [
                'Бесплатный интернет',
                'Трансфер',
                'Парковка',
                'Фитнес',
                'Бар/ресторан',
                'Конференц-зал'
            ],
            valueAdds: [
                'Завтрак вкл.',
                'Беспл. отмена',
                'Оплата на сайте'
            ],
            discount: '',
            oldPrice: '',
            roomType: 'Двухместный номер Стандартный',
            roomSubtitle: '2 отдельные кровати',
            distance: '2,2 км от центра Волгограда'
        }
    },
    {
        id: 'h10',
        name: 'Отель Estel',
        location: 'улица Рабоче-Крестьянская, дом 46, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 5300,
        rating: 9,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/e3/aa/e3aa0ebff4a72f91b80d40c742171606d2948865.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/e3/aa/e3aa0ebff4a72f91b80d40c742171606d2948865.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/8b/11/8b11ac748a83485452ae2a4e51e7caef62e3609b.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/1a/39/1a3908c0a4162a0b665b1ab30da15024a53e8767.jpeg'
        ],
        additionalInfo: {
            starsCount: 4,
            reviewCount: '451 отзыв',
            ratingCategory: 'Превосходно',
            amenities: [
                'Бесплатный интернет',
                'Парковка',
                'Бар/ресторан',
                'Конференц-зал',
                'Спа-услуги',
                'Кондиционер'
            ],
            valueAdds: [
                'Завтрак вкл.',
                'Беспл. отмена',
                'Оплата на сайте'
            ],
            discount: '',
            oldPrice: '',
            roomType: 'Двухместный номер Стандарт',
            roomSubtitle: '2 отдельные кровати',
            distance: '3,3 км от центра Волгограда'
        }
    },
    {
        id: 'h11',
        name: 'Отель Мартон ПОБЕДА',
        location: 'улица Белоглинская, д.40А, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 2401,
        rating: 7,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/26/85/26856cd18b0110e3c086603aa3d9eae846f858f8.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/26/85/26856cd18b0110e3c086603aa3d9eae846f858f8.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/91/84/91840744fe36ab2b0077c87e7ddececfd331e32f.WEBP',
            'https://cdn.worldota.net/t/640x400/extranet/8e/ed/8eed349f6ba6942af1094c00c2c5f14eaa910c69.WEBP'
        ],
        additionalInfo: {
            starsCount: 3,
            reviewCount: '210 отзывов',
            ratingCategory: 'Очень хорошо',
            amenities: [
                'Бесплатный интернет',
                'Парковка',
                'Бассейн',
                'Бар/ресторан',
                'Спа-услуги',
                'Кондиционер'
            ],
            valueAdds: [
                'Питание не вкл.',
                'Беспл. отмена',
                'Оплата на сайте'
            ],
            discount: 'Скидка 10%',
            oldPrice: '2 668 ₽',
            roomType: 'Двухместный номер Standard',
            roomSubtitle: 'двуспальная кровать',
            distance: '4,6 км от центра Волгограда'
        }
    },
    {
        id: 'h12',
        name: 'Отель HitOtel',
        location: 'проспект Маршала Жукова, 22Б, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 3853,
        rating: 8,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/bc/ea/bcea3c5bff708424478b4fab5d737b304552a7e2.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/bc/ea/bcea3c5bff708424478b4fab5d737b304552a7e2.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/6d/33/6d339dc1eef26d4512260f30c32909120010d6fd.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/05/71/0571836cbe3811d12ccdf1fce9542fdee1793b32.jpeg'
        ],
        additionalInfo: {
            starsCount: 3,
            reviewCount: '61 отзыв',
            ratingCategory: 'Отлично',
            amenities: [
                'Бесплатный интернет',
                'Кондиционер'
            ],
            valueAdds: [
                'Питание не вкл.',
                'Беспл. отмена',
                'Оплата на сайте'
            ],
            discount: 'Скидка 10%',
            oldPrice: '4 281 ₽',
            roomType: 'Двухместный номер Standard',
            roomSubtitle: '2 отдельные кровати',
            distance: '1,8 км от центра Волгограда'
        }
    },
    {
        id: 'h13',
        name: 'Отель Наири',
        location: 'ул. Березовская, д. 2, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 3164,
        rating: 7,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/7d/8a/7d8a8be73c4179e4a48d7ec19696c300db15fa6b.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/7d/8a/7d8a8be73c4179e4a48d7ec19696c300db15fa6b.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/de/30/de30d38599fda0cd514d99b7fd67fb4321734f6a.JPEG',
            'https://cdn.worldota.net/t/640x400/extranet/e8/03/e803eee612e75b75b67f1857bcfba52103c2b024.jpeg'
        ],
        additionalInfo: {
            starsCount: 0,
            reviewCount: '272 отзыва',
            ratingCategory: 'Очень хорошо',
            amenities: [
                'Бесплатный интернет',
                'Трансфер',
                'Парковка',
                'Семейный отель',
                'Бар/ресторан',
                'Конференц-зал'
            ],
            valueAdds: [
                'Завтрак вкл.',
                'Беспл. отмена',
                'Оплата на сайте'
            ],
            discount: 'Скидка 10%',
            oldPrice: '3 516 ₽',
            roomType: 'Двухместный номер Эконом-класса',
            roomSubtitle: 'двуспальная кровать',
            distance: '1,8 км от центра Волгограда'
        }
    },
    {
        id: 'h14',
        name: 'Бутик-Отель 1 и 3',
        location: 'улица Хабаровская, д. 1Б, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 3934,
        rating: 9,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/2a/e3/2ae354d8bba85ed1e158df0a5c734d9b515f3c4c.JPEG',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/2a/e3/2ae354d8bba85ed1e158df0a5c734d9b515f3c4c.JPEG',
            'https://cdn.worldota.net/t/640x400/extranet/6c/d8/6cd89b4d3e5e99293b123667437d80250f6eeab3.JPEG',
            'https://cdn.worldota.net/t/640x400/extranet/d0/86/d0865bb1bc4962a9ed2c5f6ce7166cca384bdf0c.jpeg'
        ],
        additionalInfo: {
            starsCount: 3,
            reviewCount: '102 отзыва',
            ratingCategory: 'Превосходно',
            amenities: [
                'Бесплатный интернет',
                'Парковка',
                'Семейный отель',
                'Бар/ресторан',
                'Кондиционер'
            ],
            valueAdds: [
                'Питание не вкл.',
                'Беспл. отмена',
                'Оплата на сайте'
            ],
            discount: '',
            oldPrice: '',
            roomType: 'Двухместный номер Стандарт',
            roomSubtitle: 'двуспальная кровать',
            distance: '23,6 км от центра Волгограда'
        }
    },
    {
        id: 'h15',
        name: 'Гостевой Дом Well House Hotel',
        location: 'улица Двинская, д. 54, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 2610,
        rating: 8,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/67/5b/675b7ac5818e2c3b90ee15e0ff64c79038235a86.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/67/5b/675b7ac5818e2c3b90ee15e0ff64c79038235a86.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/b2/f3/b2f3ee24e9764d5384b80c0fa9ed62c1e50db18d.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/40/ad/40ada9d695c598f12bfeba7c7e0397942ced9873.jpeg'
        ],
        additionalInfo: {
            starsCount: 0,
            reviewCount: '138 отзывов',
            ratingCategory: 'Отлично',
            amenities: [
                'Бесплатный интернет',
                'Парковка',
                'Семейный отель',
                'Бар/ресторан',
                'Для гостей с ограниченными возможностями',
                'Кондиционер'
            ],
            valueAdds: [
                'Питание не вкл.',
                'Беспл. отмена',
                'Оплата на сайте'
            ],
            discount: 'Скидка 10%',
            oldPrice: '2 900 ₽',
            roomType: 'Трёхместный номер Standard c 1 комнатой',
            roomSubtitle: '',
            distance: '1,6 км от центра Волгограда'
        }
    },
    {
        id: 'h16',
        name: 'Отель Астория',
        location: 'улица Пархоменко, д.27 Б, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 5546,
        rating: 8,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/90/ee/90eeeab4288166d3358015c41b7a8e2e3c195962.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/90/ee/90eeeab4288166d3358015c41b7a8e2e3c195962.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/b3/c4/b3c476142c67b6757396274791facd8dd6423173.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/17/9b/179bcfd4e88141acc529868a79680b2c11fae67f.jpeg'
        ],
        additionalInfo: {
            starsCount: 3,
            reviewCount: '170 отзывов',
            ratingCategory: 'Отлично',
            amenities: [
                'Бесплатный интернет',
                'Трансфер',
                'Парковка',
                'Семейный отель',
                'Кондиционер',
                'Разрешено с домашними животными'
            ],
            valueAdds: [
                'Завтрак вкл.',
                'Беспл. отмена',
                'Оплата на сайте'
            ],
            discount: '',
            oldPrice: '',
            roomType: 'Двухместный номер Standard',
            roomSubtitle: 'двуспальная кровать',
            distance: '772 м от центра Волгограда'
        }
    },
    {
        id: 'h17',
        name: 'Отель VS Hotel',
        location: 'улица Неждановой, д.11, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 3783,
        rating: 8,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/f7/80/f780d8582b1dfef23bc5ee6e53ba6c652eefcabd.JPEG',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/f7/80/f780d8582b1dfef23bc5ee6e53ba6c652eefcabd.JPEG',
            'https://cdn.worldota.net/t/640x400/extranet/a1/20/a12054284199105c69c641014db4ac76e2799145.JPEG',
            'https://cdn.worldota.net/t/640x400/extranet/9b/3b/9b3b3364f80f976272a63362150ca1b0fc582eb7.JPEG'
        ],
        additionalInfo: {
            starsCount: 3,
            reviewCount: '18 отзывов',
            ratingCategory: 'Отлично',
            amenities: [
                'Бесплатный интернет',
                'Парковка',
                'Семейный отель',
                'Бар/ресторан',
                'Кондиционер',
                'Разрешено с домашними животными'
            ],
            valueAdds: [
                'Питание не вкл.',
                'Без беспл. отмены',
                'Оплата на сайте'
            ],
            discount: '',
            oldPrice: '',
            roomType: 'Двухместный номер Стандарт Первой категории Цокольный этаж',
            roomSubtitle: '2 отдельные кровати',
            distance: '4,9 км от центра Волгограда'
        }
    },
    {
        id: 'h18',
        name: 'Гостиница AriTes',
        location: 'Коммунистическая улица, 40, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 3398,
        rating: 7,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/1b/85/1b853f6287b3ed01aca5208502680f3b528bda7e.JPEG',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/1b/85/1b853f6287b3ed01aca5208502680f3b528bda7e.JPEG',
            'https://cdn.worldota.net/t/640x400/extranet/44/ff/44fffb946000bc7c0cdac3332ee0820f80eb3b7d.JPEG',
            'https://cdn.worldota.net/t/640x400/extranet/2f/51/2f514c9eef3c5732ca402dbb950cc2d4d5f84093.JPEG'
        ],
        additionalInfo: {
            starsCount: 0,
            reviewCount: '15 отзывов',
            ratingCategory: 'Очень хорошо',
            amenities: [
                'Бесплатный интернет',
                'Парковка',
                'Кондиционер'
            ],
            valueAdds: [
                'Питание не вкл.',
                'Беспл. отмена',
                'Оплата на сайте'
            ],
            discount: 'Скидка 10%',
            oldPrice: '3 776 ₽',
            roomType: 'Двухместный номер Стандарт',
            roomSubtitle: 'двуспальная кровать',
            distance: '1,1 км от центра Волгограда'
        }
    },
    {
        id: 'h19',
        name: 'Отель МирОтель',
        location: 'улица Васильсурская, д.48, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 3870,
        rating: 8,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/e1/4a/e14a1b63962a79e69a8a2897ef8bd2c7d124f0a8.jpeg',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/e1/4a/e14a1b63962a79e69a8a2897ef8bd2c7d124f0a8.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/ba/26/ba266ef66601889cda80381267201f5d44b75f4b.jpeg',
            'https://cdn.worldota.net/t/640x400/extranet/9c/41/9c4119649a1c9f16d394b942edbf88f1699cfbc2.jpeg'
        ],
        additionalInfo: {
            starsCount: 3,
            reviewCount: '103 отзыва',
            ratingCategory: 'Отлично',
            amenities: [
                'Бесплатный интернет',
                'Парковка',
                'Кондиционер'
            ],
            valueAdds: [
                'Питание не вкл.',
                'Беспл. отмена',
                'Оплата на месте'
            ],
            discount: 'Скидка 10%',
            oldPrice: '4 300 ₽',
            roomType: 'Двухместный номер Standard',
            roomSubtitle: 'двуспальная кровать',
            distance: '1,8 км от центра Волгограда'
        }
    },
    {
        id: 'h20',
        name: 'Квартира 34 Домика на Егорьевской',
        location: 'Егорьевская улица, д.7, Волгоград',
        coordinates: {
            lat: 0,
            lng: 0
        },
        pricePerNight: 3640,
        rating: 9,
        imageUrl: 'https://cdn.worldota.net/t/640x400/extranet/8f/2f/8f2fa307352cf05c67bff8cffea2246d3d44570c.JPEG',
        photos: [
            'https://cdn.worldota.net/t/640x400/extranet/8f/2f/8f2fa307352cf05c67bff8cffea2246d3d44570c.JPEG',
            'https://cdn.worldota.net/t/640x400/extranet/f1/aa/f1aa1d01876183584488d411c8678a155672a936.JPEG',
            'https://cdn.worldota.net/t/640x400/extranet/22/14/221484e55d26d59a1df703c9e26d9077276c9bb5.JPEG'
        ],
        additionalInfo: {
            starsCount: 0,
            reviewCount: '19 отзывов',
            ratingCategory: 'Превосходно',
            amenities: [
                'Бесплатный интернет',
                'Трансфер',
                'Парковка',
                'Семейный отель',
                'Конференц-зал',
                'Кондиционер'
            ],
            valueAdds: [
                'Питание не вкл.',
                'Без беспл. отмены',
                'Оплата на сайте'
            ],
            discount: 'Скидка 10%',
            oldPrice: '4 044 ₽',
            roomType: 'Апартаменты с 2 комнатами с балконом',
            roomSubtitle: '',
            distance: '7,1 км от центра Волгограда'
        }
    }
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
    // Reviews from users that current user follows but are not friends
    { id: 'r_following1', friendId: 'f1', hotelId: 'h1', rating: 5, pros: 'Отличный отель для бизнес-поездок. Удобное расположение и хороший сервис.', cons: 'Нет бассейна, но это не критично для деловой поездки.', lifehack: 'Заказывайте номер на верхних этажах - тише и вид лучше.', tripTags: ['Бизнес'], photos: ['https://picsum.photos/seed/following1/400/300'], date: '2024-07-25', status: 'approved', isPublic: true },
    { id: 'r_following2', friendId: 'f2', hotelId: 'h3', rating: 4, pros: 'Красивый исторический отель с отличным расположением.', cons: 'Номера немного тесноваты, но это особенность старых зданий.', tripTags: ['Романтика'], photos: [], date: '2024-07-28', status: 'approved', isPublic: true },
    { id: 'r_following3', friendId: 'f7', hotelId: 'h2', rating: 5, pros: 'Невероятный вид на город! Бассейн на крыше - это что-то особенное.', cons: 'Очень дорогие напитки в баре.', tripTags: ['Романтика'], photos: ['https://picsum.photos/seed/following3/400/300'], date: '2024-08-01', status: 'approved', isPublic: true },
    // Reviews for HitOtel (h12) to test the slider
    { id: 'r_hitotel1', friendId: 'f1', hotelId: 'h12', rating: 4, pros: 'Хороший отель в Волгограде. Чистые номера и дружелюбный персонал.', cons: 'Завтрак мог бы быть разнообразнее.', tripTags: ['Бизнес'], photos: ['https://picsum.photos/seed/hitotel1/400/300'], date: '2024-07-30', status: 'approved', isPublic: true },
    { id: 'r_hitotel2', friendId: 'f2', hotelId: 'h12', rating: 5, pros: 'Отличное расположение в центре города. Все достопримечательности в пешей доступности.', cons: 'Нет бассейна, но это не критично.', tripTags: ['Соло'], photos: [], date: '2024-08-05', status: 'approved', isPublic: true },
    { id: 'r_hitotel3', friendId: 'f7', hotelId: 'h12', rating: 4, pros: 'Современный отель с хорошим сервисом. Рекомендую для деловых поездок.', cons: 'Wi-Fi иногда работает медленно.', tripTags: ['Бизнес'], photos: ['https://picsum.photos/seed/hitotel3/400/300'], date: '2024-08-10', status: 'approved', isPublic: true },
    // Reviews from following users (not friends) for HitOtel
    { id: 'r_hitotel4', friendId: 'u1', hotelId: 'h12', rating: 5, pros: 'Потрясающий вид на Волгу! Очень понравился номер с панорамными окнами.', cons: 'Завтрак начинается поздно - в 8:00.', tripTags: ['Романтика'], photos: ['https://picsum.photos/seed/hitotel4/400/300'], date: '2024-08-15', status: 'approved', isPublic: true },
    { id: 'r_hitotel5', friendId: 'u2', hotelId: 'h12', rating: 4, pros: 'Отличное расположение для знакомства с Волгоградом. Персонал очень отзывчивый.', cons: 'В номере было немного шумно из-за дороги.', tripTags: ['Соло'], photos: [], date: '2024-08-20', status: 'approved', isPublic: true },
    // Additional reviews for friends with few reviews
    { id: 'r_f6_1', friendId: 'f6', hotelId: 'h1', rating: 4, pros: 'Уютный отель в центре Волгограда. Хорошее соотношение цена-качество.', cons: 'Нет бассейна, но это не критично для короткой поездки.', tripTags: ['Бизнес'], photos: ['https://picsum.photos/seed/f6_1/400/300'], date: '2024-08-25', status: 'approved', isPublic: true },
    { id: 'r_f6_2', friendId: 'f6', hotelId: 'h3', rating: 5, pros: 'Отличный отель! Очень понравился завтрак и персонал.', cons: 'Парковка платная, но это нормально для центра.', tripTags: ['Семья с детьми'], photos: [], date: '2024-09-01', status: 'approved', isPublic: true },
    { id: 'r_f8_1', friendId: 'f8', hotelId: 'h1', rating: 4, pros: 'Хороший отель для семейного отдыха. Дети остались довольны.', cons: 'Wi-Fi работал медленно в номере.', tripTags: ['Семья с детьми'], photos: ['https://picsum.photos/seed/f8_1/400/300'], date: '2024-08-28', status: 'approved', isPublic: true },
    { id: 'r_f8_2', friendId: 'f8', hotelId: 'h4', rating: 5, pros: 'Потрясающее место! Отличный SPA и красивая природа вокруг.', cons: 'Дорого, но оно того стоит.', tripTags: ['Романтика'], photos: [], date: '2024-09-05', status: 'approved', isPublic: true },
    { id: 'r_f10_1', friendId: 'f10', hotelId: 'h1', rating: 4, pros: 'Современный отель с хорошим сервисом. Рекомендую для деловых поездок.', cons: 'Нет бассейна, но есть фитнес-зал.', tripTags: ['Бизнес'], photos: ['https://picsum.photos/seed/f10_1/400/300'], date: '2024-08-30', status: 'approved', isPublic: true },
    { id: 'r_f10_2', friendId: 'f10', hotelId: 'h2', rating: 5, pros: 'Невероятный вид! Очень понравился номер с панорамными окнами.', cons: 'Цены в ресторане высокие, но качество отличное.', tripTags: ['Романтика'], photos: [], date: '2024-09-03', status: 'approved', isPublic: true },
    // More reviews for u1 and u2 to make them more active
    { id: 'r_u1_1', friendId: 'u1', hotelId: 'h1', rating: 4, pros: 'Хороший отель в Волгограде. Удобное расположение и чистые номера.', cons: 'Завтрак мог бы быть разнообразнее.', tripTags: ['Бизнес'], photos: ['https://picsum.photos/seed/u1_1/400/300'], date: '2024-08-22', status: 'approved', isPublic: true },
    { id: 'r_u1_2', friendId: 'u1', hotelId: 'h3', rating: 5, pros: 'Отличный отель! Очень понравился персонал и завтраки.', cons: 'Нет бассейна, но это не критично.', tripTags: ['Семья с детьми'], photos: [], date: '2024-08-26', status: 'approved', isPublic: true },
    { id: 'r_u2_1', friendId: 'u2', hotelId: 'h1', rating: 4, pros: 'Современный отель с хорошим сервисом. Рекомендую для деловых поездок.', cons: 'Wi-Fi иногда работает медленно.', tripTags: ['Бизнес'], photos: ['https://picsum.photos/seed/u2_1/400/300'], date: '2024-08-24', status: 'approved', isPublic: true },
    { id: 'r_u2_2', friendId: 'u2', hotelId: 'h3', rating: 5, pros: 'Потрясающий отель! Очень понравился вид и завтраки.', cons: 'Парковка платная, но это нормально для центра.', tripTags: ['Романтика'], photos: [], date: '2024-08-29', status: 'approved', isPublic: true },
    // More reviews for Volgograd hotels to make the app more populated
    { id: 'r_volgograd_1', friendId: 'f1', hotelId: 'h13', rating: 4, pros: 'Хороший отель в Волгограде. Чистые номера и дружелюбный персонал.', cons: 'Завтрак мог бы быть разнообразнее.', tripTags: ['Бизнес'], photos: ['https://picsum.photos/seed/volgograd1/400/300'], date: '2024-09-10', status: 'approved', isPublic: true },
    { id: 'r_volgograd_2', friendId: 'f2', hotelId: 'h14', rating: 5, pros: 'Отличный бутик-отель! Очень стильно и уютно.', cons: 'Нет бассейна, но это не критично.', tripTags: ['Романтика'], photos: [], date: '2024-09-12', status: 'approved', isPublic: true },
    { id: 'r_volgograd_3', friendId: 'f7', hotelId: 'h15', rating: 4, pros: 'Хороший гостевой дом. Рекомендую для бюджетных поездок.', cons: 'Wi-Fi иногда работает медленно.', tripTags: ['Соло'], photos: ['https://picsum.photos/seed/volgograd3/400/300'], date: '2024-09-15', status: 'approved', isPublic: true },
    { id: 'r_volgograd_4', friendId: 'f8', hotelId: 'h16', rating: 5, pros: 'Отличный отель с историей! Очень понравился персонал.', cons: 'Номера немного тесноваты, но это особенность старых зданий.', tripTags: ['Семья с детьми'], photos: [], date: '2024-09-18', status: 'approved', isPublic: true },
    { id: 'r_volgograd_5', friendId: 'f9', hotelId: 'h17', rating: 4, pros: 'Современный отель с хорошим сервисом. Рекомендую для деловых поездок.', cons: 'Парковка платная, но это нормально для центра.', tripTags: ['Бизнес'], photos: ['https://picsum.photos/seed/volgograd5/400/300'], date: '2024-09-20', status: 'approved', isPublic: true },
    { id: 'r_volgograd_6', friendId: 'f10', hotelId: 'h18', rating: 3, pros: 'Неплохой отель за свои деньги. Чисто и уютно.', cons: 'Завтрак мог бы быть разнообразнее.', tripTags: ['Соло'], photos: [], date: '2024-09-22', status: 'approved', isPublic: true },
    { id: 'r_volgograd_7', friendId: 'f11', hotelId: 'h19', rating: 4, pros: 'Хороший отель в Волгограде. Удобное расположение.', cons: 'Нет бассейна, но есть фитнес-зал.', tripTags: ['Бизнес'], photos: ['https://picsum.photos/seed/volgograd7/400/300'], date: '2024-09-25', status: 'approved', isPublic: true },
    { id: 'r_volgograd_8', friendId: 'f12', hotelId: 'h20', rating: 5, pros: 'Потрясающие апартаменты! Очень понравился вид и интерьер.', cons: 'Дорого, но оно того стоит.', tripTags: ['Романтика'], photos: [], date: '2024-09-28', status: 'approved', isPublic: true },
    // Reviews from following users for Volgograd hotels
    { id: 'r_volgograd_u1_1', friendId: 'u1', hotelId: 'h13', rating: 4, pros: 'Хороший отель в Волгограде. Чистые номера и дружелюбный персонал.', cons: 'Завтрак мог бы быть разнообразнее.', tripTags: ['Бизнес'], photos: ['https://picsum.photos/seed/volgograd_u1_1/400/300'], date: '2024-09-11', status: 'approved', isPublic: true },
    { id: 'r_volgograd_u2_1', friendId: 'u2', hotelId: 'h14', rating: 5, pros: 'Отличный бутик-отель! Очень стильно и уютно.', cons: 'Нет бассейна, но это не критично.', tripTags: ['Романтика'], photos: [], date: '2024-09-13', status: 'approved', isPublic: true },
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

    return Array.from(recommendationsMap.values()).sort((a, b) => b.reviews.length - a.reviews.length);
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
        following: ['f1', 'f2', 'f3', 'f4', 'f5', 'f7', 'f9', 'f11', 'f12', 'u1', 'u2'],
        isExpert: false,
        bio: 'Люблю находить уютные отели с хорошим видом. Всегда ищу места, куда хочется вернуться.',
    },
    'f1': {
        id: 'f1', name: 'Анна Иванова', avatarUrl: 'https://i.pravatar.cc/150?u=f1', level: 2, xp: 2500, miles: 500, achievements: ['b1', 'b4'], visitedLocations: ['Дубай, ОАЭ', 'Сочи, Россия', 'Ижевск, Россия', 'Калининград, Россия', 'Волгоград, Россия'], discoverHistory: [
            { hotelId: 'h3', action: 'like' },
            { hotelId: 'h5', action: 'like' },
            { hotelId: 'h8', action: 'like' },
            { hotelId: 'h1', action: 'like' },
            { hotelId: 'h4', action: 'like' },
            { hotelId: 'h11', action: 'like' },
            { hotelId: 'h12', action: 'like' },
            { hotelId: 'h13', action: 'like' },
        ], following: [], isExpert: false
    },
    'f2': {
        id: 'f2', name: 'Петр Сидоров', avatarUrl: 'https://i.pravatar.cc/150?u=f2', level: 2, xp: 1800, miles: 1200, achievements: ['b1', 'b5'], visitedLocations: ['Ижевск, Россия', 'Дубай, ОАЭ', 'Волгоград, Россия'], discoverHistory: [
            { hotelId: 'h6', action: 'like' },
            { hotelId: 'h7', action: 'like' },
            { hotelId: 'h1', action: 'like' },
            { hotelId: 'h3', action: 'like' },
            { hotelId: 'h5', action: 'like' },
            { hotelId: 'h12', action: 'like' },
            { hotelId: 'h14', action: 'like' },
        ], following: [], isExpert: true
    },
    'f3': {
        id: 'f3', name: 'Елена Васильева', avatarUrl: 'https://i.pravatar.cc/150?u=f3', level: 1, xp: 500, miles: 250, achievements: ['b1'], visitedLocations: ['Москва, Россия'], discoverHistory: [
            { hotelId: 'h1', action: 'like' },
            { hotelId: 'h2', action: 'like' },
            { hotelId: 'h10', action: 'like' },
        ], following: [], isExpert: true
    },
    'f4': {
        id: 'f4', name: 'Дмитрий Петров', avatarUrl: 'https://i.pravatar.cc/150?u=f4', level: 1, xp: 950, miles: 800, achievements: ['b1'], visitedLocations: ['Сочи, Россия', 'Санкт-Петербург, Россия'], discoverHistory: [
            { hotelId: 'h1', action: 'like' },
            { hotelId: 'h9', action: 'like' },
        ], following: [], isExpert: true
    },
    'f5': {
        id: 'f5', name: 'Ольга Смирнова', avatarUrl: 'https://i.pravatar.cc/150?u=f5', level: 3, xp: 6100, miles: 4500, achievements: ['b1', 'b4', 'b7'], visitedLocations: ['Дубай, ОАЭ', 'Казань, Россия'], discoverHistory: [
            { hotelId: 'h1', action: 'like' },
            { hotelId: 'h3', action: 'like' },
            { hotelId: 'h4', action: 'like' },
            { hotelId: 'h8', action: 'like' },
        ], following: ['f7', 'f12'], isExpert: true, bio: 'Обожаю городские путешествия и отели с историей. В моих отзывах всегда найдете детали, которые не пишут в гидах.'
    },
    'f6': {
        id: 'f6', name: 'Ирина Кузнецова', avatarUrl: 'https://i.pravatar.cc/150?u=f6', level: 1, xp: 200, miles: 100, achievements: [], visitedLocations: ['Волгоград, Россия'], discoverHistory: [
            { hotelId: 'h1', action: 'like' },
            { hotelId: 'h3', action: 'like' },
        ], following: [], isExpert: false
    },
    'f7': {
        id: 'f7', name: 'Максим Попов', avatarUrl: 'https://i.pravatar.cc/150?u=f7', level: 3, xp: 5500, miles: 10000, achievements: ['b1', 'b5', 'b6'], visitedLocations: ['Дубай, ОАЭ', 'Санкт-Петербург, Россия', 'Москва, Россия', 'Стамбул, Турция'], discoverHistory: [
            { hotelId: 'h9', action: 'like' },
            { hotelId: 'h3', action: 'like' },
            { hotelId: 'h1', action: 'like' },
            { hotelId: 'h2', action: 'like' },
            { hotelId: 'h4', action: 'like' },
            { hotelId: 'h8', action: 'like' },
            { hotelId: 'h10', action: 'like' },
        ], following: ['user123', 'f5'], isExpert: true, bio: 'Путешествую по работе и для души. Ценю хороший сервис и интересную архитектуру. Делюсь только проверенными местами.'
    }, // Expert
    'f8': {
        id: 'f8', name: 'София Лебедева', avatarUrl: 'https://i.pravatar.cc/150?u=f8', level: 2, xp: 1300, miles: 1100, achievements: ['b1', 'b7'], visitedLocations: ['Сочи, Россия', 'Волгоград, Россия'], discoverHistory: [
            { hotelId: 'h1', action: 'like' },
            { hotelId: 'h4', action: 'like' },
            { hotelId: 'h7', action: 'like' },
        ], following: [], isExpert: true
    },
    'f9': {
        id: 'f9', name: 'Артем Соколов', avatarUrl: 'https://i.pravatar.cc/150?u=f9', level: 2, xp: 4000, miles: 300, achievements: ['b1', 'b4', 'b5'], visitedLocations: ['Москва, Россия'], discoverHistory: [
            { hotelId: 'h1', action: 'like' },
            { hotelId: 'h2', action: 'like' },
            { hotelId: 'h3', action: 'like' },
            { hotelId: 'h4', action: 'like' },
            { hotelId: 'h5', action: 'like' },
        ], following: [], isExpert: true
    },
    'f10': {
        id: 'f10', name: 'Виктория Козлова', avatarUrl: 'https://i.pravatar.cc/150?u=f10', level: 1, xp: 800, miles: 50, achievements: ['b1'], visitedLocations: ['Стамбул, Турция', 'Волгоград, Россия'], discoverHistory: [
            { hotelId: 'h1', action: 'like' },
            { hotelId: 'h2', action: 'like' },
            { hotelId: 'h9', action: 'dislike' },
        ], following: [], isExpert: false
    },
    'f11': {
        id: 'f11', name: 'Михаил Новиков', avatarUrl: 'https://i.pravatar.cc/150?u=f11', level: 1, xp: 1000, miles: 2000, achievements: ['b1'], visitedLocations: ['Казань, Россия'], discoverHistory: [
            { hotelId: 'h6', action: 'like' },
            { hotelId: 'h5', action: 'like' },
            { hotelId: 'h4', action: 'like' },
        ], following: [], isExpert: false
    },
    'f12': {
        id: 'f12', name: 'Алина Орлова', avatarUrl: 'https://i.pravatar.cc/150?u=f12', level: 4, xp: 25000, miles: 15000, achievements: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'], visitedLocations: ['Калининград, Россия', 'Дубай, ОАЭ', 'Санкт-Петербург, Россия', 'Москва, Россия', 'Стамбул, Турция', 'Казань, Россия'], discoverHistory: [
            { hotelId: 'h1', action: 'like' }, { hotelId: 'h2', action: 'like' }, { hotelId: 'h3', action: 'like' }, { hotelId: 'h4', action: 'like' }, { hotelId: 'h5', action: 'like' }, { hotelId: 'h6', action: 'like' }, { hotelId: 'h7', action: 'like' }, { hotelId: 'h8', action: 'like' }, { hotelId: 'h9', action: 'like' }, { hotelId: 'h10', action: 'like' }, { hotelId: 'h11', action: 'like' }
        ], following: ['f7', 'user123', 'f5'], isExpert: true, bio: 'Профессиональный путешественник и отельный критик. Ищу жемчужины по всему миру.'
    }, // New Super Expert
    // Additional users that current user follows but are not friends
    'u1': {
        id: 'u1', name: 'Мария Козлова', avatarUrl: 'https://i.pravatar.cc/150?u=u1', level: 2, xp: 2000, miles: 800, achievements: ['b1', 'b4'], visitedLocations: ['Волгоград, Россия', 'Москва, Россия'], discoverHistory: [
            { hotelId: 'h1', action: 'like' },
            { hotelId: 'h3', action: 'like' },
            { hotelId: 'h12', action: 'like' },
        ], following: [], isExpert: false
    },
    'u2': {
        id: 'u2', name: 'Алексей Новиков', avatarUrl: 'https://i.pravatar.cc/150?u=u2', level: 3, xp: 3000, miles: 1500, achievements: ['b1', 'b2', 'b5'], visitedLocations: ['Волгоград, Россия', 'Санкт-Петербург, Россия', 'Казань, Россия'], discoverHistory: [
            { hotelId: 'h1', action: 'like' },
            { hotelId: 'h3', action: 'like' },
            { hotelId: 'h12', action: 'like' },
        ], following: [], isExpert: true
    },
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
    currentUser: User,
    allUsers: Record<string, User>,
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

        // Add reviews from friends first
        const hotelFriendReviews = allReviews.filter(r =>
            r.hotelId === hotel.id &&
            allFriends.some(f => f.id === r.friendId)
        );

        hotelFriendReviews.forEach(review => {
            const friend = allFriends.find(f => f.id === review.friendId);
            if (friend) {
                sliderContent.push({ type: 'review', review, friend });
            }
        });

        // Add reviews from users that current user follows (but are not friends)
        const hotelFollowingReviews = allReviews.filter(r =>
            r.hotelId === hotel.id &&
            currentUser.following.includes(r.friendId) &&
            !allFriends.some(f => f.id === r.friendId) // Exclude friends as they're already added above
        );

        hotelFollowingReviews.forEach(review => {
            const user = allUsers[review.friendId];
            if (user) {
                sliderContent.push({ type: 'following_review', review, user });
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