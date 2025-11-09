export const applyTheme = (theme: string, customThemes?: any[]) => {
  const html = document.documentElement;
  
  // Check if it's a custom theme
  const customTheme = customThemes?.find(t => t.id === theme);
  
  if (customTheme) {
    // Apply custom theme colors as CSS variables
    html.style.setProperty('--p', customTheme.colors.primary);
    html.style.setProperty('--s', customTheme.colors.secondary);
    html.style.setProperty('--a', customTheme.colors.accent);
    html.style.setProperty('--n', customTheme.colors.neutral);
    html.style.setProperty('--b1', customTheme.colors.base100);
    html.style.setProperty('--b2', customTheme.colors.base200);
    html.style.setProperty('--b3', customTheme.colors.base300);
    html.setAttribute('data-theme', 'light'); // Use light as base
  } else {
    // Apply built-in theme
    html.setAttribute('data-theme', theme);
  }
  
  localStorage.setItem('theme', theme);
  void html.offsetHeight;
};

export const getStoredTheme = (): string => {
  return localStorage.getItem('theme') || 'light';
};

export const initializeTheme = () => {
  const storedTheme = getStoredTheme();
  document.documentElement.setAttribute('data-theme', storedTheme);
};

export const availableThemes = [
  { name: 'light', label: 'Light', category: 'Default' },
  { name: 'dark', label: 'Dark', category: 'Default' },
  { name: 'cupcake', label: 'Cupcake', category: 'Light' },
  { name: 'bumblebee', label: 'Bumblebee', category: 'Light' },
  { name: 'emerald', label: 'Emerald', category: 'Light' },
  { name: 'corporate', label: 'Corporate', category: 'Light' },
  { name: 'synthwave', label: 'Synthwave', category: 'Dark' },
  { name: 'retro', label: 'Retro', category: 'Light' },
  { name: 'cyberpunk', label: 'Cyberpunk', category: 'Dark' },
  { name: 'valentine', label: 'Valentine', category: 'Light' },
  { name: 'halloween', label: 'Halloween', category: 'Dark' },
  { name: 'garden', label: 'Garden', category: 'Light' },
  { name: 'forest', label: 'Forest', category: 'Dark' },
  { name: 'aqua', label: 'Aqua', category: 'Light' },
  { name: 'lofi', label: 'Lofi', category: 'Light' },
  { name: 'pastel', label: 'Pastel', category: 'Light' },
  { name: 'fantasy', label: 'Fantasy', category: 'Light' },
  { name: 'wireframe', label: 'Wireframe', category: 'Light' },
  { name: 'black', label: 'Black', category: 'Dark' },
  { name: 'luxury', label: 'Luxury', category: 'Dark' },
  { name: 'dracula', label: 'Dracula', category: 'Dark' },
  { name: 'cmyk', label: 'CMYK', category: 'Light' },
  { name: 'autumn', label: 'Autumn', category: 'Light' },
  { name: 'business', label: 'Business', category: 'Dark' },
  { name: 'acid', label: 'Acid', category: 'Light' },
  { name: 'lemonade', label: 'Lemonade', category: 'Light' },
  { name: 'night', label: 'Night', category: 'Dark' },
  { name: 'coffee', label: 'Coffee', category: 'Dark' },
  { name: 'winter', label: 'Winter', category: 'Light' },
  { name: 'dim', label: 'Dim', category: 'Dark' },
  { name: 'nord', label: 'Nord', category: 'Light' },
  { name: 'sunset', label: 'Sunset', category: 'Dark' },
];
