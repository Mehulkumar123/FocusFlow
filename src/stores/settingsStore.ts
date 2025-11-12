<<<<<<< HEAD
=======
// stores/settingsStore.ts - COMPLETE v7.5 WITH ALL FIXES
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface CustomLabel {
  id: string;
  name: string;
  color: string;
}

export interface CustomTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    base100: string;
    base200: string;
    base300: string;
    info: string;
    success: string;
    warning: string;
    error: string;
  };
}

<<<<<<< HEAD
interface SettingsState {
  // Theme & Appearance
  theme: string;
  customThemes: CustomTheme[];
  fontSize: number; // Now 4-32px
  fontFamily: string;
  lineHeight: number;
  letterSpacing: number;
  borderRadius: number;
  
  // Sidebar Customization (Enhanced ranges)
  sidebarCollapsed: boolean;
  sidebarWidth: number; // Now 100-500px
  sidebarPosition: 'left' | 'right';
=======
export interface SettingsState {
  // Theme & Appearance
  theme: string;
  customThemes: CustomTheme[];
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  borderRadius: number;
  cardStyle: 'elevated' | 'flat' | 'outlined' | 'gradient';
  listStyle: 'card' | 'minimal' | 'bordered';
  spacing: 'compact' | 'normal' | 'relaxed' | 'loose';
  animationSpeed: 'none' | 'slow' | 'normal' | 'fast';
  shadowIntensity: 'none' | 'light' | 'medium' | 'heavy';
  scrollbarStyle: 'default' | 'minimal' | 'custom';
  showPageHeader: boolean;
  pageTransitions: boolean;
  glassEffect: boolean;

  // Sidebar Settings
  sidebarCollapsed: boolean; // ✅ ADDED
  sidebarWidth: number;
  sidebarOpacity: number;
  sidebarPosition: 'left' | 'right';
  sidebarIconSize: 'small' | 'medium' | 'large';
  sidebarFontSize: 'small' | 'medium' | 'large';
  sidebarBorderStyle: 'none' | 'solid' | 'dashed' | 'dotted';
  sidebarBorderWidth: number;
  sidebarGradient: boolean;
  sidebarGradientFrom: string;
  sidebarGradientTo: string;
  sidebarBlur: boolean;
  sidebarShadow: boolean;
  sidebarAnimation: boolean;
  sidebarCompactMode: boolean;
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  sidebarShowIcons: boolean;
  sidebarShowLabels: boolean;
  sidebarShowProgress: boolean;
  sidebarShowClock: boolean;
  sidebarShowDate: boolean;
  sidebarShowStreak: boolean;
  sidebarShowStats: boolean;
  sidebarShowWeather: boolean;
  sidebarShowQuote: boolean;
<<<<<<< HEAD
  sidebarShowQuickActions: boolean; // NEW
  sidebarCompactMode: boolean;
  sidebarOpacity: number; // Now 30-100
  sidebarBlur: boolean;
  sidebarAnimation: boolean;
  sidebarGradient: boolean;
  sidebarGradientFrom: string;
  sidebarGradientTo: string;
  sidebarBorderStyle: 'none' | 'solid' | 'dashed' | 'dotted';
  sidebarBorderWidth: number;
  sidebarShadow: boolean;
  clockFormat: '12h' | '24h';
  dateFormat: 'short' | 'long' | 'full';
  sidebarIconSize: 'small' | 'medium' | 'large';
  sidebarFontSize: 'small' | 'medium' | 'large';
  
  // Layout (Enhanced compact modes)
  compactMode: boolean;
  ultraCompactMode: boolean; // NEW - Super minimal
  cardCompactLevel: 'normal' | 'compact' | 'ultra'; // NEW
  cardStyle: 'elevated' | 'flat' | 'outlined' | 'gradient';
  listStyle: 'card' | 'minimal' | 'bordered';
  spacing: 'compact' | 'normal' | 'relaxed' | 'loose';
  animationSpeed: 'slow' | 'normal' | 'fast' | 'none';
  showPageHeader: boolean;
  headerSize: 'small' | 'medium' | 'large';
  pageTransitions: boolean;
  scrollbarStyle: 'default' | 'minimal' | 'custom';
  glassEffect: boolean;
  shadowIntensity: 'none' | 'light' | 'medium' | 'heavy';
  
  // Notifications
  notifications: boolean;
  soundEnabled: boolean;
  soundVolume: number;
  notificationPosition: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  
  // Pomodoro
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  dailyPomodoroGoal: number;
  pomodoroTickSound: boolean;
  showTimerInTitle: boolean;
  longBreakAfter: number;
  pomodoroLayout: 'classic' | 'modern' | 'minimal'; // NEW
  showPomodoroStats: boolean; // NEW
  
  // Kanban - Basic
  showCardNumbers: boolean;
  autoArchiveCompleted: boolean;
  cardCompactView: boolean;
  enableDragDrop: boolean;
  showDragHandles: boolean;
  dragAnimationDuration: number;
  customLabels: CustomLabel[];
  
  // Kanban - Advanced
=======
  sidebarShowQuickActions: boolean;
  clockFormat: '12h' | '24h';
  dateFormat: 'short' | 'long' | 'full';

  // Compact Mode
  compactMode: boolean;
  ultraCompactMode: boolean;
  cardCompactLevel: 'normal' | 'compact' | 'ultra';
  cardCompactView: boolean;

  // Pomodoro Settings
  pomodoroLayout: 'classic' | 'modern' | 'minimal' | 'fullscreen' | 'compact' | 'focus' | 'minimal-pro';
  dailyPomodoroGoal: number;
  longBreakAfter: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  pomodoroTickSound: boolean;
  showTimerInTitle: boolean;
  showPomodoroStats: boolean;

  // Kanban Settings
  showCardNumbers: boolean;
  enableDragDrop: boolean;
  showDragHandles: boolean;
  dragAnimationDuration: number;
  autoArchiveCompleted: boolean;
  autoSortCards: 'none' | 'priority' | 'date' | 'alphabetical';
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  showCardCovers: boolean;
  showCardAttachments: boolean;
  showCardComments: boolean;
  showCardActivity: boolean;
  cardColorCoding: boolean;
<<<<<<< HEAD
  autoSortCards: 'none' | 'priority' | 'date' | 'alphabetical';
=======
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  showCardEstimates: boolean;
  enableCardTemplates: boolean;
  showListLimits: boolean;
  highlightOverdueCards: boolean;
  showCardAge: boolean;
  enableCardDependencies: boolean;
  showCardProgress: boolean;
  cardHoverPreview: boolean;
  enableQuickEdit: boolean;
<<<<<<< HEAD
  
  // Analytics (NEW - Enhanced)
  analyticsTimeRange: '7d' | '30d' | '90d' | 'all';
  analyticsView: 'overview' | 'detailed' | 'comparison';
  showAnalyticsTrends: boolean;
  showAnalyticsGoals: boolean;
  showAnalyticsHeatmap: boolean;
  
  // Advanced
=======

  // Analytics Settings (✅ ADDED)
  analyticsTimeRange: '7days' | '30days' | '90days' | 'all';
  analyticsView: 'overview' | 'detailed' | 'charts';
  showAnalyticsTrends: boolean;
  showAnalyticsGoals: boolean;

  // Labels
  customLabels: CustomLabel[];

  // Audio & Notifications
  soundEnabled: boolean;
  soundVolume: number;
  notifications: boolean;
  notificationPosition: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

  // Advanced Settings
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  enableKeyboardShortcuts: boolean;
  enableAutoSave: boolean;
  autoSaveInterval: number;
  enableAnalytics: boolean;
<<<<<<< HEAD
  language: 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh';
  timeZone: string;
  
  // Actions (existing + new)
  setTheme: (theme: string) => void;
  setFontSize: (size: number) => void;
  setFontFamily: (family: string) => void;
  setLineHeight: (height: number) => void;
  setLetterSpacing: (spacing: number) => void;
  setBorderRadius: (radius: number) => void;
  setSidebarWidth: (width: number) => void;
  setSidebarPosition: (position: 'left' | 'right') => void;
  setSidebarOpacity: (opacity: number) => void;
  setSidebarBlur: (blur: boolean) => void;
  setSidebarAnimation: (animation: boolean) => void;
  setSidebarGradient: (gradient: boolean) => void;
  setSidebarGradientFrom: (color: string) => void;
  setSidebarGradientTo: (color: string) => void;
  setSidebarBorderStyle: (style: 'none' | 'solid' | 'dashed' | 'dotted') => void;
  setSidebarBorderWidth: (width: number) => void;
  setSidebarShadow: (shadow: boolean) => void;
  setClockFormat: (format: '12h' | '24h') => void;
  setDateFormat: (format: 'short' | 'long' | 'full') => void;
  setSidebarIconSize: (size: 'small' | 'medium' | 'large') => void;
  setSidebarFontSize: (size: 'small' | 'medium' | 'large') => void;
  setCardStyle: (style: 'elevated' | 'flat' | 'outlined' | 'gradient') => void;
  setListStyle: (style: 'card' | 'minimal' | 'bordered') => void;
  setSpacing: (spacing: 'compact' | 'normal' | 'relaxed' | 'loose') => void;
  setAnimationSpeed: (speed: 'slow' | 'normal' | 'fast' | 'none') => void;
  setHeaderSize: (size: 'small' | 'medium' | 'large') => void;
  setSoundVolume: (volume: number) => void;
  setNotificationPosition: (position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left') => void;
  setDragAnimationDuration: (duration: number) => void;
  setAutoSaveInterval: (interval: number) => void;
  setAutoSortCards: (sort: 'none' | 'priority' | 'date' | 'alphabetical') => void;
  setPageTransitions: (transitions: boolean) => void;
  setScrollbarStyle: (style: 'default' | 'minimal' | 'custom') => void;
  setGlassEffect: (effect: boolean) => void;
  setShadowIntensity: (intensity: 'none' | 'light' | 'medium' | 'heavy') => void;
  setLanguage: (language: 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh') => void;
  setTimeZone: (zone: string) => void;
  setCardCompactLevel: (level: 'normal' | 'compact' | 'ultra') => void;
  setPomodoroLayout: (layout: 'classic' | 'modern' | 'minimal') => void;
  setAnalyticsTimeRange: (range: '7d' | '30d' | '90d' | 'all') => void;
  setAnalyticsView: (view: 'overview' | 'detailed' | 'comparison') => void;
  toggleSidebar: () => void;
=======
  language: string;
  timeZone: string;

  // Theme Actions
  setTheme: (theme: string) => void;
  addCustomTheme: (theme: CustomTheme) => void;
  deleteCustomTheme: (id: string) => void;

  // Appearance Actions
  setFontFamily: (font: string) => void;
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setLetterSpacing: (spacing: number) => void;
  setBorderRadius: (radius: number) => void;
  setCardStyle: (style: 'elevated' | 'flat' | 'outlined' | 'gradient') => void;
  setListStyle: (style: 'card' | 'minimal' | 'bordered') => void;
  setSpacing: (spacing: 'compact' | 'normal' | 'relaxed' | 'loose') => void;
  setAnimationSpeed: (speed: 'none' | 'slow' | 'normal' | 'fast') => void;
  setShadowIntensity: (intensity: 'none' | 'light' | 'medium' | 'heavy') => void;
  setScrollbarStyle: (style: 'default' | 'minimal' | 'custom') => void;
  toggleShowPageHeader: () => void;
  setPageTransitions: (enabled: boolean) => void;
  setGlassEffect: (enabled: boolean) => void;

  // Sidebar Actions
  toggleSidebar: () => void; // ✅ ADDED
  setSidebarWidth: (width: number) => void;
  setSidebarOpacity: (opacity: number) => void;
  setSidebarPosition: (position: 'left' | 'right') => void;
  setSidebarIconSize: (size: 'small' | 'medium' | 'large') => void;
  setSidebarFontSize: (size: 'small' | 'medium' | 'large') => void;
  setSidebarBorderStyle: (style: 'none' | 'solid' | 'dashed' | 'dotted') => void;
  setSidebarBorderWidth: (width: number) => void;
  setSidebarGradient: (enabled: boolean) => void;
  setSidebarGradientFrom: (color: string) => void;
  setSidebarGradientTo: (color: string) => void;
  setSidebarBlur: (enabled: boolean) => void;
  setSidebarShadow: (enabled: boolean) => void;
  setSidebarAnimation: (enabled: boolean) => void;
  toggleSidebarCompactMode: () => void;
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  toggleSidebarIcons: () => void;
  toggleSidebarLabels: () => void;
  toggleSidebarProgress: () => void;
  toggleSidebarClock: () => void;
  toggleSidebarDate: () => void;
  toggleSidebarStreak: () => void;
  toggleSidebarStats: () => void;
  toggleSidebarWeather: () => void;
  toggleSidebarQuote: () => void;
  toggleSidebarQuickActions: () => void;
<<<<<<< HEAD
  toggleSidebarCompactMode: () => void;
  toggleNotifications: () => void;
  toggleSound: () => void;
  toggleAutoStartBreaks: () => void;
  toggleAutoStartPomodoros: () => void;
  toggleCompactMode: () => void;
  toggleUltraCompactMode: () => void;
  toggleCardNumbers: () => void;
  togglePomodoroTickSound: () => void;
  toggleShowPomodoroStats: () => void;
  toggleAutoArchiveCompleted: () => void;
  toggleCardCompactView: () => void;
  toggleEnableDragDrop: () => void;
  toggleShowDragHandles: () => void;
  toggleShowTimerInTitle: () => void;
  toggleShowPageHeader: () => void;
  toggleEnableKeyboardShortcuts: () => void;
  toggleEnableAutoSave: () => void;
  toggleEnableAnalytics: () => void;
  toggleShowAnalyticsTrends: () => void;
  toggleShowAnalyticsGoals: () => void;
  toggleShowAnalyticsHeatmap: () => void;
=======
  setClockFormat: (format: '12h' | '24h') => void;
  setDateFormat: (format: 'short' | 'long' | 'full') => void;

  // Compact Mode Actions
  toggleCompactMode: () => void;
  toggleUltraCompactMode: () => void;
  setCardCompactLevel: (level: 'normal' | 'compact' | 'ultra') => void;
  toggleCardCompactView: () => void;

  // Pomodoro Actions
  // stores/settingsStore.ts - line ~173
  setPomodoroLayout: (layout: 'classic' | 'modern' | 'minimal' | 'fullscreen' | 'compact' | 'focus' | 'minimal-pro') => void;
  setDailyPomodoroGoal: (goal: number) => void;
  setLongBreakAfter: (count: number) => void;
  toggleAutoStartBreaks: () => void;
  toggleAutoStartPomodoros: () => void;
  togglePomodoroTickSound: () => void;
  toggleShowTimerInTitle: () => void;
  toggleShowPomodoroStats: () => void;

  // Kanban Actions
  toggleCardNumbers: () => void;
  toggleEnableDragDrop: () => void;
  toggleShowDragHandles: () => void;
  setDragAnimationDuration: (duration: number) => void;
  toggleAutoArchiveCompleted: () => void;
  setAutoSortCards: (method: 'none' | 'priority' | 'date' | 'alphabetical') => void;
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  toggleShowCardCovers: () => void;
  toggleShowCardAttachments: () => void;
  toggleShowCardComments: () => void;
  toggleShowCardActivity: () => void;
  toggleCardColorCoding: () => void;
  toggleShowCardEstimates: () => void;
  toggleEnableCardTemplates: () => void;
  toggleShowListLimits: () => void;
  toggleHighlightOverdueCards: () => void;
  toggleShowCardAge: () => void;
  toggleEnableCardDependencies: () => void;
  toggleShowCardProgress: () => void;
  toggleCardHoverPreview: () => void;
  toggleEnableQuickEdit: () => void;
<<<<<<< HEAD
  setDailyPomodoroGoal: (goal: number) => void;
  setLongBreakAfter: (count: number) => void;
  addCustomLabel: (name: string, color: string) => void;
  updateCustomLabel: (id: string, name: string, color: string) => void;
  deleteCustomLabel: (id: string) => void;
  addCustomTheme: (theme: CustomTheme) => void;
  updateCustomTheme: (id: string, theme: Partial<CustomTheme>) => void;
  deleteCustomTheme: (id: string) => void;
}

const defaultLabels: CustomLabel[] = [
  { id: uuidv4(), name: 'Bug', color: '#ef4444' },
  { id: uuidv4(), name: 'Feature', color: '#3b82f6' },
  { id: uuidv4(), name: 'Urgent', color: '#f59e0b' },
  { id: uuidv4(), name: 'Review', color: '#8b5cf6' },
  { id: uuidv4(), name: 'Done', color: '#10b981' },
];
=======

  // Analytics Actions (✅ ADDED)
  setAnalyticsTimeRange: (range: '7days' | '30days' | '90days' | 'all') => void;
  setAnalyticsView: (view: 'overview' | 'detailed' | 'charts') => void;
  toggleShowAnalyticsTrends: () => void;
  toggleShowAnalyticsGoals: () => void;

  // Label Actions
  addCustomLabel: (name: string, color: string) => void;
  updateCustomLabel: (id: string, name: string, color: string) => void;
  deleteCustomLabel: (id: string) => void;

  // Audio & Notification Actions
  toggleSound: () => void;
  setSoundVolume: (volume: number) => void;
  toggleNotifications: () => void;
  setNotificationPosition: (position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left') => void;

  // Advanced Actions
  toggleEnableKeyboardShortcuts: () => void;
  toggleEnableAutoSave: () => void;
  setAutoSaveInterval: (interval: number) => void;
  toggleEnableAnalytics: () => void;
  setLanguage: (language: string) => void;
  setTimeZone: (timezone: string) => void;
}
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
<<<<<<< HEAD
      // Initial State
      theme: 'light',
      customThemes: [],
      fontSize: 16,
      fontFamily: 'system-ui',
      lineHeight: 1.5,
      letterSpacing: 0,
      borderRadius: 8,
      
      sidebarCollapsed: false,
      sidebarWidth: 280,
      sidebarPosition: 'left',
=======
      // Theme & Appearance
      theme: 'dark',
      customThemes: [],
      fontFamily: 'system-ui',
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: 0,
      borderRadius: 8,
      cardStyle: 'elevated',
      listStyle: 'card',
      spacing: 'normal',
      animationSpeed: 'normal',
      shadowIntensity: 'medium',
      scrollbarStyle: 'custom',
      showPageHeader: true,
      pageTransitions: true,
      glassEffect: false,

      // Sidebar
      sidebarCollapsed: false, // ✅ ADDED
      sidebarWidth: 280,
      sidebarOpacity: 100,
      sidebarPosition: 'left',
      sidebarIconSize: 'medium',
      sidebarFontSize: 'medium',
      sidebarBorderStyle: 'solid',
      sidebarBorderWidth: 1,
      sidebarGradient: false,
      sidebarGradientFrom: '#3b82f6',
      sidebarGradientTo: '#8b5cf6',
      sidebarBlur: false,
      sidebarShadow: true,
      sidebarAnimation: true,
      sidebarCompactMode: false,
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
      sidebarShowIcons: true,
      sidebarShowLabels: true,
      sidebarShowProgress: true,
      sidebarShowClock: true,
      sidebarShowDate: true,
<<<<<<< HEAD
      sidebarShowStreak: false,
=======
      sidebarShowStreak: true,
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
      sidebarShowStats: true,
      sidebarShowWeather: false,
      sidebarShowQuote: false,
      sidebarShowQuickActions: true,
<<<<<<< HEAD
      sidebarCompactMode: false,
      sidebarOpacity: 100,
      sidebarBlur: false,
      sidebarAnimation: true,
      sidebarGradient: false,
      sidebarGradientFrom: '#3b82f6',
      sidebarGradientTo: '#8b5cf6',
      sidebarBorderStyle: 'none',
      sidebarBorderWidth: 1,
      sidebarShadow: false,
      clockFormat: '24h',
      dateFormat: 'short',
      sidebarIconSize: 'medium',
      sidebarFontSize: 'medium',
      
      compactMode: false,
      ultraCompactMode: false,
      cardCompactLevel: 'normal',
      cardStyle: 'elevated',
      listStyle: 'card',
      spacing: 'normal',
      animationSpeed: 'normal',
      showPageHeader: true,
      headerSize: 'medium',
      pageTransitions: true,
      scrollbarStyle: 'default',
      glassEffect: false,
      shadowIntensity: 'medium',
      
      notifications: true,
      soundEnabled: true,
      soundVolume: 50,
      notificationPosition: 'top-right',
      
      autoStartBreaks: false,
      autoStartPomodoros: false,
      dailyPomodoroGoal: 8,
      pomodoroTickSound: false,
      showTimerInTitle: true,
      longBreakAfter: 4,
      pomodoroLayout: 'modern',
      showPomodoroStats: true,
      
      showCardNumbers: true,
      autoArchiveCompleted: false,
      cardCompactView: false,
      enableDragDrop: true,
      showDragHandles: false,
      dragAnimationDuration: 300,
      customLabels: defaultLabels,
      
=======
      clockFormat: '12h',
      dateFormat: 'short',

      // Compact Mode
      compactMode: false,
      ultraCompactMode: false,
      cardCompactLevel: 'normal',
      cardCompactView: false,

      // Pomodoro
      pomodoroLayout: 'modern' as const,
      dailyPomodoroGoal: 8,
      longBreakAfter: 4,
      autoStartBreaks: false,
      autoStartPomodoros: false,
      pomodoroTickSound: false,
      showTimerInTitle: true,
      showPomodoroStats: true,

      // Kanban
      showCardNumbers: false,
      enableDragDrop: true,
      showDragHandles: false,
      dragAnimationDuration: 200,
      autoArchiveCompleted: false,
      autoSortCards: 'none',
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
      showCardCovers: false,
      showCardAttachments: false,
      showCardComments: false,
      showCardActivity: false,
<<<<<<< HEAD
      cardColorCoding: false,
      autoSortCards: 'none',
      showCardEstimates: false,
      enableCardTemplates: false,
      showListLimits: false,
      highlightOverdueCards: false,
      showCardAge: false,
      enableCardDependencies: false,
      showCardProgress: false,
      cardHoverPreview: false,
      enableQuickEdit: false,
      
      analyticsTimeRange: '30d',
      analyticsView: 'overview',
      showAnalyticsTrends: true,
      showAnalyticsGoals: true,
      showAnalyticsHeatmap: true,
      
=======
      cardColorCoding: true,
      showCardEstimates: false,
      enableCardTemplates: false,
      showListLimits: false,
      highlightOverdueCards: true,
      showCardAge: false,
      enableCardDependencies: false,
      showCardProgress: true,
      cardHoverPreview: true,
      enableQuickEdit: true,

      // Analytics (✅ ADDED)
      analyticsTimeRange: '30days',
      analyticsView: 'overview',
      showAnalyticsTrends: true,
      showAnalyticsGoals: true,

      // Labels
      customLabels: [],

      // Audio & Notifications
      soundEnabled: true,
      soundVolume: 70,
      notifications: false,
      notificationPosition: 'top-right',

      // Advanced
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
      enableKeyboardShortcuts: true,
      enableAutoSave: true,
      autoSaveInterval: 30,
      enableAnalytics: true,
      language: 'en',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,

<<<<<<< HEAD
      // Actions
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      },
      setFontSize: (size) => set({ fontSize: size }),
      setFontFamily: (family) => set({ fontFamily: family }),
      setLineHeight: (height) => set({ lineHeight: height }),
      setLetterSpacing: (spacing) => set({ letterSpacing: spacing }),
      setBorderRadius: (radius) => set({ borderRadius: radius }),
      setSidebarWidth: (width) => set({ sidebarWidth: width }),
      setSidebarPosition: (position) => set({ sidebarPosition: position }),
      setSidebarOpacity: (opacity) => set({ sidebarOpacity: opacity }),
      setSidebarBlur: (blur) => set({ sidebarBlur: blur }),
      setSidebarAnimation: (animation) => set({ sidebarAnimation: animation }),
      setSidebarGradient: (gradient) => set({ sidebarGradient: gradient }),
      setSidebarGradientFrom: (color) => set({ sidebarGradientFrom: color }),
      setSidebarGradientTo: (color) => set({ sidebarGradientTo: color }),
      setSidebarBorderStyle: (style) => set({ sidebarBorderStyle: style }),
      setSidebarBorderWidth: (width) => set({ sidebarBorderWidth: width }),
      setSidebarShadow: (shadow) => set({ sidebarShadow: shadow }),
      setClockFormat: (format) => set({ clockFormat: format }),
      setDateFormat: (format) => set({ dateFormat: format }),
      setSidebarIconSize: (size) => set({ sidebarIconSize: size }),
      setSidebarFontSize: (size) => set({ sidebarFontSize: size }),
=======
      // Theme Actions
      setTheme: (theme) => set({ theme }),
      addCustomTheme: (theme) => set((state) => ({ customThemes: [...state.customThemes, theme] })),
      deleteCustomTheme: (id) => set((state) => ({ customThemes: state.customThemes.filter((t) => t.id !== id) })),

      // Appearance Actions
      setFontFamily: (font) => set({ fontFamily: font }),
      setFontSize: (size) => set({ fontSize: size }),
      setLineHeight: (height) => set({ lineHeight: height }),
      setLetterSpacing: (spacing) => set({ letterSpacing: spacing }),
      setBorderRadius: (radius) => set({ borderRadius: radius }),
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
      setCardStyle: (style) => set({ cardStyle: style }),
      setListStyle: (style) => set({ listStyle: style }),
      setSpacing: (spacing) => set({ spacing }),
      setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
<<<<<<< HEAD
      setHeaderSize: (size) => set({ headerSize: size }),
      setSoundVolume: (volume) => set({ soundVolume: volume }),
      setNotificationPosition: (position) => set({ notificationPosition: position }),
      setDragAnimationDuration: (duration) => set({ dragAnimationDuration: duration }),
      setAutoSaveInterval: (interval) => set({ autoSaveInterval: interval }),
      setAutoSortCards: (sort) => set({ autoSortCards: sort }),
      setPageTransitions: (transitions) => set({ pageTransitions: transitions }),
      setScrollbarStyle: (style) => set({ scrollbarStyle: style }),
      setGlassEffect: (effect) => set({ glassEffect: effect }),
      setShadowIntensity: (intensity) => set({ shadowIntensity: intensity }),
      setLanguage: (language) => set({ language }),
      setTimeZone: (zone) => set({ timeZone: zone }),
      setCardCompactLevel: (level) => set({ cardCompactLevel: level }),
      setPomodoroLayout: (layout) => set({ pomodoroLayout: layout }),
      setAnalyticsTimeRange: (range) => set({ analyticsTimeRange: range }),
      setAnalyticsView: (view) => set({ analyticsView: view }),
      
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
=======
      setShadowIntensity: (intensity) => set({ shadowIntensity: intensity }),
      setScrollbarStyle: (style) => set({ scrollbarStyle: style }),
      toggleShowPageHeader: () => set((state) => ({ showPageHeader: !state.showPageHeader })),
      setPageTransitions: (enabled) => set({ pageTransitions: enabled }),
      setGlassEffect: (enabled) => set({ glassEffect: enabled }),

      // Sidebar Actions
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })), // ✅ ADDED
      setSidebarWidth: (width) => set({ sidebarWidth: width }),
      setSidebarOpacity: (opacity) => set({ sidebarOpacity: opacity }),
      setSidebarPosition: (position) => set({ sidebarPosition: position }),
      setSidebarIconSize: (size) => set({ sidebarIconSize: size }),
      setSidebarFontSize: (size) => set({ sidebarFontSize: size }),
      setSidebarBorderStyle: (style) => set({ sidebarBorderStyle: style }),
      setSidebarBorderWidth: (width) => set({ sidebarBorderWidth: width }),
      setSidebarGradient: (enabled) => set({ sidebarGradient: enabled }),
      setSidebarGradientFrom: (color) => set({ sidebarGradientFrom: color }),
      setSidebarGradientTo: (color) => set({ sidebarGradientTo: color }),
      setSidebarBlur: (enabled) => set({ sidebarBlur: enabled }),
      setSidebarShadow: (enabled) => set({ sidebarShadow: enabled }),
      setSidebarAnimation: (enabled) => set({ sidebarAnimation: enabled }),
      toggleSidebarCompactMode: () => set((state) => ({ sidebarCompactMode: !state.sidebarCompactMode })),
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
      toggleSidebarIcons: () => set((state) => ({ sidebarShowIcons: !state.sidebarShowIcons })),
      toggleSidebarLabels: () => set((state) => ({ sidebarShowLabels: !state.sidebarShowLabels })),
      toggleSidebarProgress: () => set((state) => ({ sidebarShowProgress: !state.sidebarShowProgress })),
      toggleSidebarClock: () => set((state) => ({ sidebarShowClock: !state.sidebarShowClock })),
      toggleSidebarDate: () => set((state) => ({ sidebarShowDate: !state.sidebarShowDate })),
      toggleSidebarStreak: () => set((state) => ({ sidebarShowStreak: !state.sidebarShowStreak })),
      toggleSidebarStats: () => set((state) => ({ sidebarShowStats: !state.sidebarShowStats })),
      toggleSidebarWeather: () => set((state) => ({ sidebarShowWeather: !state.sidebarShowWeather })),
      toggleSidebarQuote: () => set((state) => ({ sidebarShowQuote: !state.sidebarShowQuote })),
      toggleSidebarQuickActions: () => set((state) => ({ sidebarShowQuickActions: !state.sidebarShowQuickActions })),
<<<<<<< HEAD
      toggleSidebarCompactMode: () => set((state) => ({ sidebarCompactMode: !state.sidebarCompactMode })),
      toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleAutoStartBreaks: () => set((state) => ({ autoStartBreaks: !state.autoStartBreaks })),
      toggleAutoStartPomodoros: () => set((state) => ({ autoStartPomodoros: !state.autoStartPomodoros })),
      toggleCompactMode: () => set((state) => ({ compactMode: !state.compactMode })),
      toggleUltraCompactMode: () => set((state) => ({ ultraCompactMode: !state.ultraCompactMode })),
      toggleCardNumbers: () => set((state) => ({ showCardNumbers: !state.showCardNumbers })),
      togglePomodoroTickSound: () => set((state) => ({ pomodoroTickSound: !state.pomodoroTickSound })),
      toggleShowPomodoroStats: () => set((state) => ({ showPomodoroStats: !state.showPomodoroStats })),
      toggleAutoArchiveCompleted: () => set((state) => ({ autoArchiveCompleted: !state.autoArchiveCompleted })),
      toggleCardCompactView: () => set((state) => ({ cardCompactView: !state.cardCompactView })),
      toggleEnableDragDrop: () => set((state) => ({ enableDragDrop: !state.enableDragDrop })),
      toggleShowDragHandles: () => set((state) => ({ showDragHandles: !state.showDragHandles })),
      toggleShowTimerInTitle: () => set((state) => ({ showTimerInTitle: !state.showTimerInTitle })),
      toggleShowPageHeader: () => set((state) => ({ showPageHeader: !state.showPageHeader })),
      toggleEnableKeyboardShortcuts: () => set((state) => ({ enableKeyboardShortcuts: !state.enableKeyboardShortcuts })),
      toggleEnableAutoSave: () => set((state) => ({ enableAutoSave: !state.enableAutoSave })),
      toggleEnableAnalytics: () => set((state) => ({ enableAnalytics: !state.enableAnalytics })),
      toggleShowAnalyticsTrends: () => set((state) => ({ showAnalyticsTrends: !state.showAnalyticsTrends })),
      toggleShowAnalyticsGoals: () => set((state) => ({ showAnalyticsGoals: !state.showAnalyticsGoals })),
      toggleShowAnalyticsHeatmap: () => set((state) => ({ showAnalyticsHeatmap: !state.showAnalyticsHeatmap })),
      
=======
      setClockFormat: (format) => set({ clockFormat: format }),
      setDateFormat: (format) => set({ dateFormat: format }),

      // Compact Mode Actions
      toggleCompactMode: () => set((state) => ({ compactMode: !state.compactMode })),
      toggleUltraCompactMode: () => set((state) => ({ ultraCompactMode: !state.ultraCompactMode })),
      setCardCompactLevel: (level) => set({ cardCompactLevel: level }),
      toggleCardCompactView: () => set((state) => ({ cardCompactView: !state.cardCompactView })),

      // Pomodoro Actions
      setPomodoroLayout: (layout) => set({ pomodoroLayout: layout }),
      setDailyPomodoroGoal: (goal) => set({ dailyPomodoroGoal: goal }),
      setLongBreakAfter: (count) => set({ longBreakAfter: count }),
      toggleAutoStartBreaks: () => set((state) => ({ autoStartBreaks: !state.autoStartBreaks })),
      toggleAutoStartPomodoros: () => set((state) => ({ autoStartPomodoros: !state.autoStartPomodoros })),
      togglePomodoroTickSound: () => set((state) => ({ pomodoroTickSound: !state.pomodoroTickSound })),
      toggleShowTimerInTitle: () => set((state) => ({ showTimerInTitle: !state.showTimerInTitle })),
      toggleShowPomodoroStats: () => set((state) => ({ showPomodoroStats: !state.showPomodoroStats })),

      // Kanban Actions
      toggleCardNumbers: () => set((state) => ({ showCardNumbers: !state.showCardNumbers })),
      toggleEnableDragDrop: () => set((state) => ({ enableDragDrop: !state.enableDragDrop })),
      toggleShowDragHandles: () => set((state) => ({ showDragHandles: !state.showDragHandles })),
      setDragAnimationDuration: (duration) => set({ dragAnimationDuration: duration }),
      toggleAutoArchiveCompleted: () => set((state) => ({ autoArchiveCompleted: !state.autoArchiveCompleted })),
      setAutoSortCards: (method) => set({ autoSortCards: method }),
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
      toggleShowCardCovers: () => set((state) => ({ showCardCovers: !state.showCardCovers })),
      toggleShowCardAttachments: () => set((state) => ({ showCardAttachments: !state.showCardAttachments })),
      toggleShowCardComments: () => set((state) => ({ showCardComments: !state.showCardComments })),
      toggleShowCardActivity: () => set((state) => ({ showCardActivity: !state.showCardActivity })),
      toggleCardColorCoding: () => set((state) => ({ cardColorCoding: !state.cardColorCoding })),
      toggleShowCardEstimates: () => set((state) => ({ showCardEstimates: !state.showCardEstimates })),
      toggleEnableCardTemplates: () => set((state) => ({ enableCardTemplates: !state.enableCardTemplates })),
      toggleShowListLimits: () => set((state) => ({ showListLimits: !state.showListLimits })),
      toggleHighlightOverdueCards: () => set((state) => ({ highlightOverdueCards: !state.highlightOverdueCards })),
      toggleShowCardAge: () => set((state) => ({ showCardAge: !state.showCardAge })),
      toggleEnableCardDependencies: () => set((state) => ({ enableCardDependencies: !state.enableCardDependencies })),
      toggleShowCardProgress: () => set((state) => ({ showCardProgress: !state.showCardProgress })),
      toggleCardHoverPreview: () => set((state) => ({ cardHoverPreview: !state.cardHoverPreview })),
      toggleEnableQuickEdit: () => set((state) => ({ enableQuickEdit: !state.enableQuickEdit })),
<<<<<<< HEAD
      
      setDailyPomodoroGoal: (goal) => set({ dailyPomodoroGoal: goal }),
      setLongBreakAfter: (count) => set({ longBreakAfter: count }),
      
      addCustomLabel: (name, color) => {
        set((state) => ({
          customLabels: [...state.customLabels, { id: uuidv4(), name, color }],
        }));
      },
      updateCustomLabel: (id, name, color) => {
        set((state) => ({
          customLabels: state.customLabels.map((label) =>
            label.id === id ? { ...label, name, color } : label
          ),
        }));
      },
      deleteCustomLabel: (id) => {
        set((state) => ({
          customLabels: state.customLabels.filter((label) => label.id !== id),
        }));
      },
      
      addCustomTheme: (theme) => {
        set((state) => ({
          customThemes: [...state.customThemes, theme],
        }));
      },
      updateCustomTheme: (id, updates) => {
        set((state) => ({
          customThemes: state.customThemes.map((theme) =>
            theme.id === id ? { ...theme, ...updates } : theme
          ),
        }));
      },
      deleteCustomTheme: (id) => {
        set((state) => ({
          customThemes: state.customThemes.filter((theme) => theme.id !== id),
        }));
      },
=======

      // Analytics Actions (✅ ADDED)
      setAnalyticsTimeRange: (range) => set({ analyticsTimeRange: range }),
      setAnalyticsView: (view) => set({ analyticsView: view }),
      toggleShowAnalyticsTrends: () => set((state) => ({ showAnalyticsTrends: !state.showAnalyticsTrends })),
      toggleShowAnalyticsGoals: () => set((state) => ({ showAnalyticsGoals: !state.showAnalyticsGoals })),

      // Label Actions
      addCustomLabel: (name, color) => set((state) => ({
        customLabels: [...state.customLabels, { id: uuidv4(), name, color }],
      })),
      updateCustomLabel: (id, name, color) => set((state) => ({
        customLabels: state.customLabels.map((label) =>
          label.id === id ? { ...label, name, color } : label
        ),
      })),
      deleteCustomLabel: (id) => set((state) => ({
        customLabels: state.customLabels.filter((label) => label.id !== id),
      })),

      // Audio & Notification Actions
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      setSoundVolume: (volume) => set({ soundVolume: volume }),
      toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
      setNotificationPosition: (position) => set({ notificationPosition: position }),

      // Advanced Actions
      toggleEnableKeyboardShortcuts: () => set((state) => ({ enableKeyboardShortcuts: !state.enableKeyboardShortcuts })),
      toggleEnableAutoSave: () => set((state) => ({ enableAutoSave: !state.enableAutoSave })),
      setAutoSaveInterval: (interval) => set({ autoSaveInterval: interval }),
      toggleEnableAnalytics: () => set((state) => ({ enableAnalytics: !state.enableAnalytics })),
      setLanguage: (language) => set({ language }),
      setTimeZone: (timezone) => set({ timeZone: timezone }),
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
    }),
    {
      name: 'settings-storage',
    }
  )
);
