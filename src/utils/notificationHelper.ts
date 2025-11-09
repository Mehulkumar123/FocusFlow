// Notification utilities
export const notificationHelper = {
  // Request permission
  requestPermission: async (): Promise<boolean> => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  },

  // Show notification
  showNotification: (title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/vite.svg',
        badge: '/vite.svg',
        ...options,
      });
    }
  },

  // Check if notifications are supported
  isSupported: (): boolean => {
    return 'Notification' in window;
  },

  // Check if permission is granted
  isGranted: (): boolean => {
    return 'Notification' in window && Notification.permission === 'granted';
  },
};
