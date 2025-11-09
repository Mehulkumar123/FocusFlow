// Validation utilities
export const validationHelper = {
  // Validate email
  isValidEmail: (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Validate number range
  isInRange: (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  },

  // Validate not empty
  isNotEmpty: (value: string): boolean => {
    return value.trim().length > 0;
  },

  // Validate min length
  hasMinLength: (value: string, minLength: number): boolean => {
    return value.length >= minLength;
  },

  // Sanitize input
  sanitizeInput: (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  },
};
