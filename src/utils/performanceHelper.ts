// Performance optimization utilities
export const performanceHelper = {
  // Debounce function
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<T>) => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle function
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean = false;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Measure performance
  measurePerformance: (label: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${label}: ${(end - start).toFixed(2)}ms`);
  },
};

// Local storage with compression
export const storageOptimizer = {
  compress: (data: string): string => {
    // Simple compression - in production, use a proper compression library
    try {
      return btoa(data);
    } catch (error) {
      console.error('Compression error:', error);
      return data;
    }
  },

  decompress: (data: string): string => {
    try {
      return atob(data);
    } catch (error) {
      console.error('Decompression error:', error);
      return data;
    }
  },

  saveCompressed: (key: string, data: any): boolean => {
    try {
      const json = JSON.stringify(data);
      const compressed = storageOptimizer.compress(json);
      localStorage.setItem(key, compressed);
      return true;
    } catch (error) {
      console.error('Error saving compressed data:', error);
      return false;
    }
  },

  loadCompressed: <T>(key: string, defaultValue: T): T => {
    try {
      const compressed = localStorage.getItem(key);
      if (!compressed) return defaultValue;
      const json = storageOptimizer.decompress(compressed);
      return JSON.parse(json);
    } catch (error) {
      console.error('Error loading compressed data:', error);
      return defaultValue;
    }
  },
};
