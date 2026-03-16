'use client';

import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
    // Обновляем каждые 30 секунд
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications?unreadOnly=true');
      const data = await response.json();
      if (response.ok) {
        setUnreadCount(data.unreadCount);
        
        // Получаем все уведомления
        const allResponse = await fetch('/api/notifications');
        const allData = await allResponse.json();
        if (allResponse.ok) {
          setNotifications(allData.notifications);
        }
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: true })
      });

      if (response.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST'
      });

      if (response.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Только что';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} мин назад`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ч назад`;
    return date.toLocaleDateString('ru-RU');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return '📚';
      case 'payment': return '💳';
      case 'assignment': return '📝';
      default: return '🔔';
    }
  };

  return (
    <div className="relative">
      {/* Колокольчик */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[color:var(--muted)] transition hover:text-white"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--neon-2)] text-xs font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Выпадающий список */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute right-0 z-50 mt-2 w-80 overflow-hidden">
            <div className="border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Уведомления</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-xs text-[color:var(--neon-2)] hover:underline"
                  >
                    Прочитать все
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center text-sm text-[color:var(--muted)]">
                  Загрузка...
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-[color:var(--muted)]">
                  Нет уведомлений
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleMarkAsRead(notification.id)}
                      className={`cursor-pointer p-4 transition ${
                        !notification.read ? 'bg-[color:var(--neon)]/5' : ''
                      } hover:bg-white/5`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl">{getTypeIcon(notification.type)}</span>
                        <div className="flex-1">
                          <p className={`text-sm ${!notification.read ? 'font-semibold text-white' : 'text-white'}`}>
                            {notification.title}
                          </p>
                          <p className="mt-1 text-xs text-[color:var(--muted)]">
                            {notification.message}
                          </p>
                          <p className="mt-2 text-xs text-[color:var(--muted)]">
                            {formatTimeAgo(notification.createdAt)}
                          </p>
                        </div>
                        {!notification.read && (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--neon-2)]" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
