import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TelegramContactsImport from '../TelegramContactsImport';

// Мокаем хук useTelegramContacts
jest.mock('../../hooks/useTelegramContacts', () => ({
  useTelegramContacts: () => ({
    isLoading: false,
    error: null,
    foundContacts: [
      {
        user_id: 123456789,
        first_name: 'Анна',
        last_name: 'Петрова',
        username: 'anna_pet'
      },
      {
        user_id: 987654321,
        first_name: 'Дмитрий',
        last_name: 'Сидоров',
        username: 'dmitry_s'
      }
    ],
    isTelegramWebApp: true,
    requestTelegramContacts: jest.fn().mockResolvedValue([
      {
        user_id: 123456789,
        first_name: 'Анна',
        last_name: 'Петрова',
        username: 'anna_pet'
      },
      {
        user_id: 987654321,
        first_name: 'Дмитрий',
        last_name: 'Сидоров',
        username: 'dmitry_s'
      }
    ]),
    convertTelegramContactsToFriends: jest.fn().mockReturnValue([
      {
        id: 'tg_123456789',
        name: 'Анна Петрова',
        avatarUrl: 'https://i.pravatar.cc/150?u=tg_123456789',
        source: 'telegram'
      },
      {
        id: 'tg_987654321',
        name: 'Дмитрий Сидоров',
        avatarUrl: 'https://i.pravatar.cc/150?u=tg_987654321',
        source: 'telegram'
      }
    ]),
    showTelegramAlert: jest.fn(),
    showTelegramConfirm: jest.fn()
  })
});

describe('TelegramContactsImport', () => {
  const mockOnContactsImported = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('отображает начальный экран с кнопкой импорта', () => {
    render(
      <TelegramContactsImport
        onContactsImported={mockOnContactsImported}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Импорт друзей из Telegram')).toBeInTheDocument();
    expect(screen.getByText('Импортировать')).toBeInTheDocument();
    expect(screen.getByText('Отмена')).toBeInTheDocument();
  });

  it('закрывается при нажатии кнопки отмены', () => {
    render(
      <TelegramContactsImport
        onContactsImported={mockOnContactsImported}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByText('Отмена'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('закрывается при нажатии кнопки X', () => {
    render(
      <TelegramContactsImport
        onContactsImported={mockOnContactsImported}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('закрывается при нажатии ESC', () => {
    render(
      <TelegramContactsImport
        onContactsImported={mockOnContactsImported}
        onClose={mockOnClose}
      />
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('закрывается при клике вне модала', () => {
    render(
      <TelegramContactsImport
        onContactsImported={mockOnContactsImported}
        onClose={mockOnClose}
      />
    );

    const backdrop = screen.getByRole('generic');
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
