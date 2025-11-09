// Formatting utilities
export const formatHelper = {
  // Format time in MM:SS
  formatTime: (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  // Format date
  formatDate: (date: string | Date): string => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  // Format date time
  formatDateTime: (date: string | Date): string => {
    const d = new Date(date);
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Truncate text
  truncate: (text: string, length: number): string => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  },

  // Format number with commas
  formatNumber: (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  // Calculate percentage
  calculatePercentage: (value: number, total: number): number => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  },
};
