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

<<<<<<< HEAD
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
=======
// utils/themeHelper.ts - UPDATED with 35+ themes
  // utils/themeHelper.ts - ADD PREVIEW TO ALL THEMES
export const availableThemes = [
  // Default Themes
  {
    name: 'light',
    label: 'Light',
    category: 'default',
    preview: { primary: '#3b82f6', secondary: '#8b5cf6' }  // ✅ Add this
  },
  {
    name: 'dark',
    label: 'Dark',
    category: 'default',
    preview: { primary: '#1e40af', secondary: '#7c3aed' }
  },
  {
    name: 'cupcake',
    label: 'Cupcake',
    category: 'default',
    preview: { primary: '#65c3c8', secondary: '#ef9fbc' }
  },
  {
    name: 'bumblebee',
    label: 'Bumblebee',
    category: 'default',
    preview: { primary: '#f59e0b', secondary: '#fef08a' }
  },
  {
    name: 'emerald',
    label: 'Emerald',
    category: 'default',
    preview: { primary: '#10b981', secondary: '#34d399' }
  },
  {
    name: 'corporate',
    label: 'Corporate',
    category: 'default',
    preview: { primary: '#3b82f6', secondary: '#1e40af' }
  },
  {
    name: 'synthwave',
    label: 'Synthwave',
    category: 'vibrant',
    preview: { primary: '#e779c1', secondary: '#58c7f3' }
  },
  {
    name: 'retro',
    label: 'Retro',
    category: 'vibrant',
    preview: { primary: '#ef9995', secondary: '#f28585' }
  },
  {
    name: 'cyberpunk',
    label: 'Cyberpunk',
    category: 'vibrant',
    preview: { primary: '#ff7598', secondary: '#ffee00' }
  },
  {
    name: 'valentine',
    label: 'Valentine',
    category: 'vibrant',
    preview: { primary: '#e96d7b', secondary: '#f0a0b5' }
  },
  {
    name: 'halloween',
    label: 'Halloween',
    category: 'dark',
    preview: { primary: '#ff6a00', secondary: '#8b5cf6' }
  },
  {
    name: 'garden',
    label: 'Garden',
    category: 'nature',
    preview: { primary: '#5c7f67', secondary: '#90c695' }
  },
  {
    name: 'forest',
    label: 'Forest',
    category: 'nature',
    preview: { primary: '#1eb854', secondary: '#065f46' }
  },
  {
    name: 'aqua',
    label: 'Aqua',
    category: 'nature',
    preview: { primary: '#09ecf3', secondary: '#06b6d4' }
  },
  {
    name: 'lofi',
    label: 'Lo-Fi',
    category: 'minimal',
    preview: { primary: '#0d0d0d', secondary: '#1a1a1a' }
  },
  {
    name: 'pastel',
    label: 'Pastel',
    category: 'minimal',
    preview: { primary: '#d4b4ec', secondary: '#fde2b4' }
  },
  {
    name: 'fantasy',
    label: 'Fantasy',
    category: 'vibrant',
    preview: { primary: '#6e0b75', secondary: '#a700cf' }
  },
  {
    name: 'wireframe',
    label: 'Wireframe',
    category: 'minimal',
    preview: { primary: '#000000', secondary: '#b8b8b8' }
  },
  {
    name: 'black',
    label: 'Black',
    category: 'dark',
    preview: { primary: '#373737', secondary: '#000000' }
  },
  {
    name: 'luxury',
    label: 'Luxury',
    category: 'dark',
    preview: { primary: '#ffffff', secondary: '#331800' }
  },
  {
    name: 'dracula',
    label: 'Dracula',
    category: 'dark',
    preview: { primary: '#ff79c6', secondary: '#bd93f9' }
  },
  {
    name: 'cmyk',
    label: 'CMYK',
    category: 'vibrant',
    preview: { primary: '#0097d6', secondary: '#ec1c4b' }
  },
  {
    name: 'autumn',
    label: 'Autumn',
    category: 'nature',
    preview: { primary: '#8c0327', secondary: '#df7e00' }
  },
  {
    name: 'business',
    label: 'Business',
    category: 'minimal',
    preview: { primary: '#1c4e80', secondary: '#7c909a' }
  },
  {
    name: 'acid',
    label: 'Acid',
    category: 'vibrant',
    preview: { primary: '#ff00f4', secondary: '#00ff00' }
  },
  {
    name: 'lemonade',
    label: 'Lemonade',
    category: 'nature',
    preview: { primary: '#519903', secondary: '#fde047' }
  },
  {
    name: 'night',
    label: 'Night',
    category: 'dark',
    preview: { primary: '#38bdf8', secondary: '#818cf8' }
  },
  {
    name: 'coffee',
    label: 'Coffee',
    category: 'dark',
    preview: { primary: '#db924b', secondary: '#6f4e37' }
  },
  {
    name: 'winter',
    label: 'Winter',
    category: 'nature',
    preview: { primary: '#047aed', secondary: '#7dd3fc' }
  },
  {
    name: 'dim',
    label: 'Dim',
    category: 'dark',
    preview: { primary: '#9ca3af', secondary: '#374151' }
  },
  {
    name: 'nord',
    label: 'Nord',
    category: 'minimal',
    preview: { primary: '#88c0d0', secondary: '#5e81ac' }
  },
  {
    name: 'sunset',
    label: 'Sunset',
    category: 'nature',
    preview: { primary: '#ff6e6c', secondary: '#ffcf44' }
  },
];
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
