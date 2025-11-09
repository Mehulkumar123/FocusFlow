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
  sidebarShowIcons: boolean;
  sidebarShowLabels: boolean;
  sidebarShowProgress: boolean;
  sidebarShowClock: boolean;
  sidebarShowDate: boolean;
  sidebarShowStreak: boolean;
  sidebarShowStats: boolean;
  sidebarShowWeather: boolean;
  sidebarShowQuote: boolean;
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
  showCardCovers: boolean;
  showCardAttachments: boolean;
  showCardComments: boolean;
  showCardActivity: boolean;
  cardColorCoding: boolean;
  autoSortCards: 'none' | 'priority' | 'date' | 'alphabetical';
  showCardEstimates: boolean;
  enableCardTemplates: boolean;
  showListLimits: boolean;
  highlightOverdueCards: boolean;
  showCardAge: boolean;
  enableCardDependencies: boolean;
  showCardProgress: boolean;
  cardHoverPreview: boolean;
  enableQuickEdit: boolean;
  
  // Analytics (NEW - Enhanced)
  analyticsTimeRange: '7d' | '30d' | '90d' | 'all';
  analyticsView: 'overview' | 'detailed' | 'comparison';
  showAnalyticsTrends: boolean;
  showAnalyticsGoals: boolean;
  showAnalyticsHeatmap: boolean;
  
  // Advanced
  enableKeyboardShortcuts: boolean;
  enableAutoSave: boolean;
  autoSaveInterval: number;
  enableAnalytics: boolean;
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

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
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
      sidebarShowIcons: true,
      sidebarShowLabels: true,
      sidebarShowProgress: true,
      sidebarShowClock: true,
      sidebarShowDate: true,
      sidebarShowStreak: false,
      sidebarShowStats: true,
      sidebarShowWeather: false,
      sidebarShowQuote: false,
      sidebarShowQuickActions: true,
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
      
      showCardCovers: false,
      showCardAttachments: false,
      showCardComments: false,
      showCardActivity: false,
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
      
      enableKeyboardShortcuts: true,
      enableAutoSave: true,
      autoSaveInterval: 30,
      enableAnalytics: true,
      language: 'en',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,

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
      setCardStyle: (style) => set({ cardStyle: style }),
      setListStyle: (style) => set({ listStyle: style }),
      setSpacing: (spacing) => set({ spacing }),
      setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
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
    }),
    {
      name: 'settings-storage',
    }
  )
);
