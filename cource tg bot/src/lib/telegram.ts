export interface TelegramUser {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
}

export function initTelegram() {
  if (typeof window === 'undefined') {
    return;
  }

  const tg = (window as any).Telegram?.WebApp;
  if (!tg) {
    return;
  }

  tg.ready();
  tg.expand();
  if (tg.setHeaderColor) {
    tg.setHeaderColor('#0a0c18');
  }
  if (tg.setBackgroundColor) {
    tg.setBackgroundColor('#0a0c18');
  }
}

export function getTelegramUser(): TelegramUser | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const tg = (window as any).Telegram?.WebApp;
  return tg?.initDataUnsafe?.user ?? null;
}
