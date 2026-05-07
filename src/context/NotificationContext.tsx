import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import type { NotificationAlert } from '../types';

interface NotificationContextValue {
  notifications: NotificationAlert[];
  addNotification: (n: Omit<NotificationAlert, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationAlert[]>([]);
  const counterRef = useRef(0);

  const addNotification = useCallback((n: Omit<NotificationAlert, 'id' | 'timestamp' | 'read'>) => {
    counterRef.current += 1;
    const entry: NotificationAlert = {
      ...n,
      id: `toast-${counterRef.current}`,
      timestamp: 'Just now',
      read: false,
    };
    // Keep max 3 toasts visible at once
    setNotifications(prev => [entry, ...prev].slice(0, 3));

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(x => x.id !== entry.id));
    }, 4000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(x => x.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
}
