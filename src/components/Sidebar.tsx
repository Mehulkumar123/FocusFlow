import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Timer, LayoutGrid, BarChart3, Settings, ChevronLeft, ChevronRight, Circle, Calendar as CalendarIcon, Clock as ClockIcon, Flame, TrendingUp, Cloud, Quote } from 'lucide-react';
import { useSettingsStore } from '../stores/settingsStore';
import { usePomodoroStore } from '../stores/pomodoroStore';
import { useKanbanStore } from '../stores/kanbanStore';
import { formatHelper } from '../utils';

const Sidebar = () => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [streak, setStreak] = useState(0);
  const [dailyQuote, setDailyQuote] = useState('');
  
  const {
    sidebarCollapsed,
    sidebarWidth,
    sidebarShowIcons,
    sidebarShowLabels,
    sidebarShowProgress,
    sidebarShowClock,
    sidebarShowDate,
    sidebarShowStreak,
    sidebarShowStats,
    sidebarShowWeather,
    sidebarShowQuote,
    sidebarCompactMode,
    sidebarOpacity,
    sidebarBlur,
    sidebarAnimation,
    sidebarGradient,
    sidebarGradientFrom,
    sidebarGradientTo,
    sidebarBorderStyle,
    sidebarBorderWidth,
    sidebarShadow,
    clockFormat,
    dateFormat,
    sidebarIconSize,
    sidebarFontSize,
    dailyPomodoroGoal,
    toggleSidebar,
  } = useSettingsStore();
  
  const { completedPomodoros, pomodoroHistory, totalPomodoros } = usePomodoroStore();
  const { cards } = useKanbanStore();
  const progress = formatHelper.calculatePercentage(completedPomodoros, dailyPomodoroGoal);

  const allCards = Object.values(cards);
  const activeCards = allCards.filter(c => !c.archived).length;

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate streak
  useEffect(() => {
    let currentStreak = 0;
    const sortedHistory = [...pomodoroHistory].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    for (let i = 0; i < sortedHistory.length; i++) {
      if (sortedHistory[i].count > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
    setStreak(currentStreak);
  }, [pomodoroHistory]);

  // Load daily quote
  useEffect(() => {
    const quotes = [
      "Focus is the art of knowing what to ignore.",
      "Small progress is still progress.",
      "Productivity is never an accident.",
      "The secret of getting ahead is getting started.",
      "Action is the foundational key to all success.",
      "Success is the sum of small efforts repeated daily.",
      "Focus on being productive instead of busy.",
      "Don't watch the clock; do what it does. Keep going.",
      "The way to get started is to quit talking and begin doing.",
      "Your limitation—it's only your imagination.",
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setDailyQuote(randomQuote);
  }, []);

  const formatTime = () => {
    if (clockFormat === '12h') {
      return currentTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      });
    }
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
  };

  const formatDate = () => {
    switch (dateFormat) {
      case 'short':
        return currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case 'long':
        return currentTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      case 'full':
        return currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      default:
        return currentTime.toLocaleDateString();
    }
  };

  const getIconSize = () => {
    switch (sidebarIconSize) {
      case 'small': return 16;
      case 'large': return 24;
      default: return 20;
    }
  };

  const getFontSizeClass = () => {
    switch (sidebarFontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
  };

  const menuItems = [
    { path: '/pomodoro', icon: Timer, label: 'Pomodoro' },
    { path: '/kanban', icon: LayoutGrid, label: 'Kanban' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const padding = sidebarCompactMode ? 'p-2' : 'p-4';
  const itemPadding = sidebarCompactMode ? 'px-3 py-2' : 'px-4 py-3';

  const sidebarStyle: React.CSSProperties = {
    width: sidebarCollapsed ? '70px' : `${sidebarWidth}px`,
    opacity: sidebarOpacity / 100,
    background: sidebarGradient 
      ? `linear-gradient(180deg, ${sidebarGradientFrom}, ${sidebarGradientTo})`
      : undefined,
    borderStyle: sidebarBorderStyle,
    borderWidth: sidebarBorderStyle !== 'none' ? `${sidebarBorderWidth}px` : 0,
    boxShadow: sidebarShadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : undefined,
  };

  return (
    <aside
      className={`h-screen flex flex-col border-r border-base-300 ${sidebarAnimation ? 'transition-all duration-300' : ''} ${sidebarBlur ? 'backdrop-blur-sm' : ''} ${!sidebarGradient ? 'bg-base-200' : ''}`}
      style={sidebarStyle}
    >
      {/* Header */}
      <div className={`${padding} flex items-center justify-between border-b border-base-300`}>
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <Circle size={24} className="text-primary" fill="currentColor" />
            <div>
              <h1 className={`font-bold ${getFontSizeClass()}`}>FocusFlow</h1>
              <p className="text-xs opacity-60">v6.0 Pro</p>
            </div>
          </div>
        )}
        {sidebarCollapsed && (
          <Circle size={24} className="text-primary mx-auto" fill="currentColor" />
        )}
        <button
          onClick={toggleSidebar}
          className="btn btn-ghost btn-sm btn-square hover:bg-base-300"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Clock & Date Section */}
      {!sidebarCollapsed && (sidebarShowClock || sidebarShowDate) && (
        <div className={`${padding} border-b border-base-300 space-y-2`}>
          {sidebarShowClock && (
            <div className={`flex items-center gap-2 font-mono ${sidebarFontSize === 'large' ? 'text-xl' : 'text-lg'}`}>
              <ClockIcon size={getIconSize()} className="text-primary" />
              <span className="font-bold">{formatTime()}</span>
            </div>
          )}
          {sidebarShowDate && (
            <div className={`flex items-center gap-2 ${sidebarFontSize === 'small' ? 'text-xs' : 'text-sm'} opacity-80`}>
              <CalendarIcon size={getIconSize() - 2} className="text-secondary" />
              <span>{formatDate()}</span>
            </div>
          )}
        </div>
      )}

      {/* Weather Widget */}
      {!sidebarCollapsed && sidebarShowWeather && (
        <div className={`${padding} border-b border-base-300`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud size={getIconSize()} className="text-info" />
              <span className={`${getFontSizeClass()} font-medium`}>Weather</span>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">72°F</p>
              <p className="text-xs opacity-70">Sunny</p>
            </div>
          </div>
        </div>
      )}

      {/* Progress Section */}
      {!sidebarCollapsed && sidebarShowProgress && (
        <div className={`${padding} border-b border-base-300`}>
          <div className="space-y-3">
            <div className={`flex justify-between items-center ${getFontSizeClass()}`}>
              <span className="font-medium">Daily Goal</span>
              <span className="font-bold text-primary">{completedPomodoros}/{dailyPomodoroGoal}</span>
            </div>
            <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-500 flex items-center justify-center"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                {progress >= 30 && (
                  <span className="text-xs text-primary-content font-bold">{progress}%</span>
                )}
              </div>
            </div>
            {progress >= 100 && (
              <div className="text-xs text-center text-success font-semibold animate-pulse">
                🎉 Goal Achieved!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Streak & Stats Section */}
      {!sidebarCollapsed && (sidebarShowStreak || sidebarShowStats) && (
        <div className={`${padding} border-b border-base-300 space-y-2`}>
          {sidebarShowStreak && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame size={getIconSize()} className="text-orange-500" />
                <span className={`${getFontSizeClass()} font-medium`}>Streak</span>
              </div>
              <span className={`${sidebarFontSize === 'large' ? 'text-xl' : 'text-lg'} font-bold text-orange-500`}>{streak} days</span>
            </div>
          )}
          
          {sidebarShowStats && (
            <div className="space-y-2">
              <div className={`flex items-center justify-between ${sidebarFontSize === 'small' ? 'text-xs' : 'text-sm'}`}>
                <span className="opacity-70">Total Pomodoros</span>
                <span className="font-bold">{totalPomodoros}</span>
              </div>
              <div className={`flex items-center justify-between ${sidebarFontSize === 'small' ? 'text-xs' : 'text-sm'}`}>
                <span className="opacity-70">Active Tasks</span>
                <span className="font-bold">{activeCards}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quote Section */}
      {!sidebarCollapsed && sidebarShowQuote && (
        <div className={`${padding} border-b border-base-300`}>
          <div className="flex items-start gap-2">
            <Quote size={getIconSize()} className="text-accent mt-1 flex-shrink-0" />
            <p className={`${sidebarFontSize === 'small' ? 'text-xs' : 'text-sm'} italic opacity-80`}>{dailyQuote}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`flex-1 ${padding} overflow-y-auto custom-scrollbar`}>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 ${itemPadding} rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary text-primary-content shadow-md'
                      : 'hover:bg-base-300'
                  }`}
                >
                  {sidebarShowIcons && <Icon size={getIconSize()} />}
                  {!sidebarCollapsed && sidebarShowLabels && (
                    <span className={`font-medium ${getFontSizeClass()}`}>{item.label}</span>
                  )}
                  {isActive && !sidebarCollapsed && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-primary-content" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!sidebarCollapsed && (
        <div className={`${padding} border-t border-base-300 text-center ${sidebarFontSize === 'small' ? 'text-xs' : 'text-sm'} opacity-50`}>
          <p>© 2025 FocusFlow</p>
          <p className="mt-1 flex items-center justify-center gap-1">
            <TrendingUp size={12} />
            Stay Productive
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
