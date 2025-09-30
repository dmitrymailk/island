// Конфигурация для API сервера
export const API_CONFIG = {
  // Адрес сервера для Telegram Bot API
  // Можно переопределить через переменную окружения VITE_TELEGRAM_SERVER_URL
  TELEGRAM_SERVER_URL: import.meta.env.VITE_TELEGRAM_SERVER_URL || 'http://localhost:3001',
};

// Функция для получения полного URL endpoint'а
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.TELEGRAM_SERVER_URL.replace(/\/$/, ''); // Убираем trailing slash
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
};

// Экспорт для удобства
export default API_CONFIG;
