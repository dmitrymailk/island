// Утилиты для работы с изображениями в Telegram Web Apps

export interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

// Fallback изображение для случаев ошибки загрузки
export const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwTDEyMCA3MEwxODAgNzBMMTUwIDEwMFoiIGZpbGw9IiM5Q0E5QUYiLz4KPHBhdGggZD0iTTE1MCAxMDBMMTIwIDEzMEwxODAgMTMwTDE1MCAxMDBaIiBmaWxsPSIjOUNBOUE5Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjM3MzgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';

// Генерация аватара на основе имени пользователя
export const generateAvatarUrl = (userId: string, name: string, size: number = 150): string => {
  // Используем несколько сервисов для надежности
  const services = [
    `https://i.pravatar.cc/${size}?u=${userId}`,
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=random`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}&size=${size}`,
  ];

  // Возвращаем первый сервис (pravatar.cc) как основной
  return services[0];
};

// Компонент изображения с fallback для Telegram Web Apps
export const createImageWithFallback = (props: ImageWithFallbackProps) => {
  const {
    src,
    alt,
    className = '',
    style = {},
    onLoad,
    onError,
    fallbackSrc = FALLBACK_IMAGE
  } = props;

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    console.warn(`Failed to load image: ${img.src}`);
    if (img.src !== fallbackSrc) {
      img.src = fallbackSrc;
    }
    onError?.();
  };

  const handleLoad = () => {
    onLoad?.();
  };

  return {
    src,
    alt,
    className,
    style,
    loading: 'lazy' as const,
    // Убираем crossOrigin для внешних сервисов, которые могут не поддерживать CORS
    onError: handleError,
    onLoad: handleLoad,
    // Дополнительные атрибуты для лучшей совместимости с Telegram Web Apps
    decoding: 'async' as const,
    draggable: false,
  };
};

// Проверка, является ли устройство мобильным
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Проверка, работает ли приложение в Telegram Web App
export const isTelegramWebApp = (): boolean => {
  if (typeof window === 'undefined') return false;

  return !!(window as any).Telegram?.WebApp;
};

// Получение оптимальных параметров изображения для Telegram Web Apps
export const getImageProps = (src: string, alt: string, className?: string) => {
  const baseProps = createImageWithFallback({
    src,
    alt,
    className,
    fallbackSrc: FALLBACK_IMAGE
  });

  // Дополнительные настройки для мобильных устройств в Telegram Web Apps
  if (isMobileDevice() && isTelegramWebApp()) {
    return {
      ...baseProps,
      // Принудительная загрузка изображений на мобильных устройствах
      loading: 'eager' as const,
      // Дополнительные атрибуты для стабильности
      referrerPolicy: 'no-referrer' as const,
    };
  }

  return baseProps;
};

// Альтернативная функция, которая не перезаписывает className
export const getImagePropsSafe = (src: string, alt: string, className?: string) => {
  // Создаем альтернативные источники для аватаров
  const alternativeSources = [
    src, // Оригинальный источник
    `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&size=150&background=random`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${alt}&size=150`,
  ];

  let currentSourceIndex = 0;

  const baseProps = {
    src: alternativeSources[currentSourceIndex],
    alt,
    loading: 'lazy' as const,
    // Убираем crossOrigin для внешних сервисов, которые могут не поддерживать CORS
    decoding: 'async' as const,
    draggable: false,
    onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const img = e.currentTarget;
      console.warn(`Failed to load image: ${img.src}`);

      // Пробуем следующий источник
      currentSourceIndex++;
      if (currentSourceIndex < alternativeSources.length) {
        img.src = alternativeSources[currentSourceIndex];
        return;
      }

      // Если все источники исчерпаны, используем fallback
      if (img.src !== FALLBACK_IMAGE) {
        img.src = FALLBACK_IMAGE;
      }
    },
  };

  // Добавляем className только если он передан
  if (className) {
    return { ...baseProps, className };
  }

  // Дополнительные настройки для мобильных устройств в Telegram Web Apps
  if (isMobileDevice() && isTelegramWebApp()) {
    return {
      ...baseProps,
      loading: 'eager' as const,
      referrerPolicy: 'no-referrer' as const,
    };
  }

  return baseProps;
};

// Предзагрузка изображений для улучшения производительности
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

// Предзагрузка массива изображений
export const preloadImages = async (urls: string[]): Promise<void> => {
  const promises = urls.map(url => preloadImage(url).catch(() => {
    // Игнорируем ошибки предзагрузки, чтобы не блокировать приложение
    console.warn(`Failed to preload image: ${url}`);
  }));

  await Promise.all(promises);
};

// Предзагрузка критически важных изображений при инициализации приложения
export const preloadCriticalImages = async (hotels: any[], reviews: any[]): Promise<void> => {
  const criticalImages: string[] = [];

  // Добавляем изображения отелей (первые 5)
  hotels.slice(0, 5).forEach(hotel => {
    if (hotel.imageUrl) {
      criticalImages.push(hotel.imageUrl);
    }
    // Добавляем дополнительные фото отелей
    if (hotel.photos) {
      criticalImages.push(...hotel.photos.slice(0, 2));
    }
  });

  // Добавляем изображения из отзывов (первые 10)
  reviews.slice(0, 10).forEach(review => {
    if (review.photos) {
      criticalImages.push(...review.photos.slice(0, 1));
    }
  });

  // Удаляем дубликаты
  const uniqueImages = [...new Set(criticalImages)];

  // Предзагружаем изображения
  await preloadImages(uniqueImages);
};
