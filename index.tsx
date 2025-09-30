
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import App from './App';

// Инициализация Telegram WebApp
if (typeof window !== 'undefined' && WebApp.initDataUnsafe?.user) {
  WebApp.ready();
  WebApp.expand();

  // Настройки для лучшего отображения изображений в Telegram Web Apps
  if (WebApp.platform === 'ios' || WebApp.platform === 'android') {
    // Включаем поддержку изображений на мобильных устройствах
    WebApp.enableClosingConfirmation();

    // Настройки для стабильной работы с изображениями
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    document.head.appendChild(meta);
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
