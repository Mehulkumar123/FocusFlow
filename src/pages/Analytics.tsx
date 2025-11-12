<<<<<<< HEAD
import { useMemo } from 'react';
=======
// pages/Analytics.tsx - ULTIMATE ADVANCED VERSION
import { useMemo, useState } from 'react';
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
import { usePomodoroStore } from '../stores/pomodoroStore';
import { useKanbanStore } from '../stores/kanbanStore';
import { useSettingsStore } from '../stores/settingsStore';
import {
<<<<<<< HEAD
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Calendar,
  Award,
  Activity,
  BarChart3,
  Filter,
=======
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, ComposedChart,  LabelList,
} from 'recharts';
import {
  TrendingUp,  Target, Zap, Calendar, Award,
  Activity, BarChart3,  Clock, CheckCircle, Flame,
  ArrowUp, ArrowDown, Minus, Brain, Star, Trophy,
  Sparkles, ThumbsUp, AlertTriangle, Download,
  Eye, EyeOff
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
} from 'lucide-react';

const Analytics = () => {
  const { pomodoroHistory, totalPomodoros, completedPomodoros } = usePomodoroStore();
  const { cards } = useKanbanStore();
  const {
    dailyPomodoroGoal,
    analyticsTimeRange,
    analyticsView,
    showAnalyticsTrends,
    showAnalyticsGoals,
<<<<<<< HEAD
    showAnalyticsHeatmap,
=======
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
    setAnalyticsTimeRange,
    setAnalyticsView,
    toggleShowAnalyticsTrends,
    toggleShowAnalyticsGoals,
<<<<<<< HEAD
    toggleShowAnalyticsHeatmap,
  } = useSettingsStore();

=======
  } = useSettingsStore();

  // const [selectedMetric, setSelectedMetric] = useState<string>('overview');
  // const [compareMode, setCompareMode] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  const allCards = Object.values(cards);
  const completedCards = allCards.filter((c) => c.checklist.every((item) => item.completed));
  const activeCards = allCards.filter((c) => !c.archived);

<<<<<<< HEAD
  // Calculate date range
  const getDaysBack = () => {
    switch (analyticsTimeRange) {
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      case 'all': return 365;
=======
  // Advanced Calculations
  const getDaysBack = () => {
    switch (analyticsTimeRange) {
      case '7days': return 7;
      case '30days': return 30;
      case '90days': return 90;
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
      default: return 30;
    }
  };

  const daysBack = getDaysBack();
  const filteredHistory = pomodoroHistory.filter((entry) => {
    const entryDate = new Date(entry.date);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);
    return entryDate >= cutoffDate;
  });

<<<<<<< HEAD
  // Calculate trends
=======
  // 1. TREND ANALYSIS
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  const calculateTrend = () => {
    if (filteredHistory.length < 2) return 0;
    const recent = filteredHistory.slice(-7).reduce((sum, h) => sum + h.count, 0);
    const previous = filteredHistory.slice(-14, -7).reduce((sum, h) => sum + h.count, 0);
    if (previous === 0) return recent > 0 ? 100 : 0;
    return ((recent - previous) / previous) * 100;
  };

  const trend = calculateTrend();
  const avgDaily = filteredHistory.length > 0 
    ? (filteredHistory.reduce((sum, h) => sum + h.count, 0) / filteredHistory.length).toFixed(1)
    : '0';

<<<<<<< HEAD
  // Prepare chart data
  const chartData = useMemo(() => {
    return filteredHistory.slice(-30).map((entry) => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      pomodoros: entry.count,
      goal: dailyPomodoroGoal,
    }));
  }, [filteredHistory, dailyPomodoroGoal]);

  // Heatmap data
  const heatmapData = useMemo(() => {
    const last90Days = Array.from({ length: 90 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (89 - i));
      const dateStr = date.toISOString().split('T')[0];
      const entry = pomodoroHistory.find((h) => h.date === dateStr);
      return {
        date: dateStr,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        count: entry ? entry.count : 0,
      };
    });
    return last90Days;
  }, [pomodoroHistory]);

  // Productivity distribution
  const productivityData = [
    { name: 'High Focus', value: filteredHistory.filter(h => h.count >= dailyPomodoroGoal).length },
    { name: 'Medium Focus', value: filteredHistory.filter(h => h.count >= dailyPomodoroGoal / 2 && h.count < dailyPomodoroGoal).length },
    { name: 'Low Focus', value: filteredHistory.filter(h => h.count > 0 && h.count < dailyPomodoroGoal / 2).length },
    { name: 'No Activity', value: filteredHistory.filter(h => h.count === 0).length },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  // Radar chart data for performance metrics
  const radarData = [
    { metric: 'Consistency', value: (filteredHistory.filter(h => h.count > 0).length / filteredHistory.length * 100) || 0 },
    { metric: 'Goal Achievement', value: (filteredHistory.filter(h => h.count >= dailyPomodoroGoal).length / filteredHistory.length * 100) || 0 },
    { metric: 'Avg Daily', value: (parseFloat(avgDaily) / dailyPomodoroGoal * 100) || 0 },
    { metric: 'Completion Rate', value: (completedCards.length / allCards.length * 100) || 0 },
    { metric: 'Activity', value: Math.min((totalPomodoros / (daysBack * dailyPomodoroGoal) * 100), 100) || 0 },
  ];

  return (
    <div className="h-full p-6 overflow-y-auto">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BarChart3 size={32} className="text-primary" />
            Analytics Dashboard
          </h1>
          <p className="text-sm opacity-60 mt-1">Comprehensive insights into your productivity</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-outline gap-2">
              <Calendar size={16} />
              {analyticsTimeRange === '7d' && '7 Days'}
              {analyticsTimeRange === '30d' && '30 Days'}
              {analyticsTimeRange === '90d' && '90 Days'}
              {analyticsTimeRange === 'all' && 'All Time'}
            </button>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-200 rounded-lg w-40 z-50 border border-base-300">
              <li><a onClick={() => setAnalyticsTimeRange('7d')}>7 Days</a></li>
              <li><a onClick={() => setAnalyticsTimeRange('30d')}>30 Days</a></li>
              <li><a onClick={() => setAnalyticsTimeRange('90d')}>90 Days</a></li>
              <li><a onClick={() => setAnalyticsTimeRange('all')}>All Time</a></li>
            </ul>
          </div>

          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-outline gap-2">
              <Filter size={16} />
              {analyticsView.charAt(0).toUpperCase() + analyticsView.slice(1)}
            </button>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-200 rounded-lg w-40 z-50 border border-base-300">
              <li><a onClick={() => setAnalyticsView('overview')}>Overview</a></li>
              <li><a onClick={() => setAnalyticsView('detailed')}>Detailed</a></li>
              <li><a onClick={() => setAnalyticsView('comparison')}>Comparison</a></li>
            </ul>
=======
  // 2. PEAK PERFORMANCE
  const peakDay = useMemo(() => {
    if (filteredHistory.length === 0) return { date: '-', count: 0 };
    return filteredHistory.reduce((max, entry) => 
      entry.count > max.count ? entry : max
    );
  }, [filteredHistory]);

  // 3. CONSISTENCY SCORE
  const consistencyScore = useMemo(() => {
    const activeDays = filteredHistory.filter(h => h.count > 0).length;
    return filteredHistory.length > 0 
      ? Math.round((activeDays / filteredHistory.length) * 100)
      : 0;
  }, [filteredHistory]);

  // 4. GOAL ACHIEVEMENT RATE
  const goalAchievementRate = useMemo(() => {
    const daysMetGoal = filteredHistory.filter(h => h.count >= dailyPomodoroGoal).length;
    return filteredHistory.length > 0
      ? Math.round((daysMetGoal / filteredHistory.length) * 100)
      : 0;
  }, [filteredHistory, dailyPomodoroGoal]);

  // 5. STREAK ANALYSIS
  const currentStreak = useMemo(() => {
    let streak = 0;
    const sorted = [...filteredHistory].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    for (const entry of sorted) {
      if (entry.count > 0) streak++;
      else break;
    }
    return streak;
  }, [filteredHistory]);

  const longestStreak = useMemo(() => {
    let maxStreak = 0;
    let currentStreak = 0;
    const sorted = [...pomodoroHistory].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    for (const entry of sorted) {
      if (entry.count > 0) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    return maxStreak;
  }, [pomodoroHistory]);

  // 6. PRODUCTIVITY SCORE (0-100)
  const productivityScore = useMemo(() => {
    const weights = {
      consistency: 0.3,
      goalAchievement: 0.3,
      avgPerformance: 0.2,
      streak: 0.2
    };
    
    const avgPerformance = (parseFloat(avgDaily) / dailyPomodoroGoal) * 100;
    const streakScore = Math.min((currentStreak / 30) * 100, 100);
    
    return Math.round(
      weights.consistency * consistencyScore +
      weights.goalAchievement * goalAchievementRate +
      weights.avgPerformance * avgPerformance +
      weights.streak * streakScore
    );
  }, [consistencyScore, goalAchievementRate, avgDaily, dailyPomodoroGoal, currentStreak]);

  // 7. HOUR-BY-HOUR ANALYSIS (Mock data - in real app, track timestamps)
  // const hourlyData = useMemo(() => {
  //   return Array.from({ length: 24 }, (_, i) => ({
  //     hour: `${i}:00`,
  //     pomodoros: Math.floor(Math.random() * 5), // Replace with real data
  //     efficiency: Math.floor(Math.random() * 100)
  //   }));
  // }, []);

  // 8. DAY OF WEEK ANALYSIS
  const weekdayData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dayTotals = days.map(day => ({
      day,
      pomodoros: filteredHistory.filter(entry => {
        const date = new Date(entry.date);
        return days[date.getDay() === 0 ? 6 : date.getDay() - 1] === day;
      }).reduce((sum, e) => sum + e.count, 0)
    }));
    return dayTotals;
  }, [filteredHistory]);

  // 9. MONTHLY COMPARISON
  const monthlyData = useMemo(() => {
    const months = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStr = date.toLocaleDateString('en-US', { month: 'short' });
      const monthTotal = pomodoroHistory.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getMonth() === date.getMonth() && 
               entryDate.getFullYear() === date.getFullYear();
      }).reduce((sum, e) => sum + e.count, 0);
      months.unshift({ month: monthStr, pomodoros: monthTotal });
    }
    return months;
  }, [pomodoroHistory]);

  // 10. FOCUS TIME DISTRIBUTION
  const focusDistribution = useMemo(() => {
    return [
      { range: '0-2', count: filteredHistory.filter(h => h.count >= 0 && h.count <= 2).length },
      { range: '3-5', count: filteredHistory.filter(h => h.count >= 3 && h.count <= 5).length },
      { range: '6-8', count: filteredHistory.filter(h => h.count >= 6 && h.count <= 8).length },
      { range: '9-12', count: filteredHistory.filter(h => h.count >= 9 && h.count <= 12).length },
      { range: '13+', count: filteredHistory.filter(h => h.count >= 13).length },
    ];
  }, [filteredHistory]);

  // 11. TASK COMPLETION VELOCITY
  const taskVelocity = useMemo(() => {
    return {
      completed: completedCards.length,
      active: activeCards.length,
      total: allCards.length,
      completionRate: Math.round((completedCards.length / Math.max(allCards.length, 1)) * 100)
    };
  }, [completedCards, activeCards, allCards]);

  // 12. PERFORMANCE FORECAST
  const forecastData = useMemo(() => {
    const avgLast7 = filteredHistory.slice(-7).reduce((sum, h) => sum + h.count, 0) / 7;
    return Array.from({ length: 7 }, (_, i) => ({
      day: `+${i + 1}d`,
      forecast: Math.round(avgLast7 + (Math.random() - 0.5) * 2),
      confidence: 95 - i * 5
    }));
  }, [filteredHistory]);

  // Chart Data
  const chartData = useMemo(() => {
    return filteredHistory.slice(-30).map((entry) => {
      const date = new Date(entry.date);
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        fullDate: entry.date,
        pomodoros: entry.count,
        goal: dailyPomodoroGoal,
        above: entry.count > dailyPomodoroGoal ? entry.count - dailyPomodoroGoal : 0,
        below: entry.count < dailyPomodoroGoal ? dailyPomodoroGoal - entry.count : 0,
        efficiency: Math.min((entry.count / dailyPomodoroGoal) * 100, 150),
        dayOfWeek: date.getDay()
      };
    });
  }, [filteredHistory, dailyPomodoroGoal]);

  // Productivity Distribution
  const productivityData = [
    { name: 'Exceeded Goal', value: filteredHistory.filter(h => h.count > dailyPomodoroGoal).length, color: '#10b981' },
    { name: 'Met Goal', value: filteredHistory.filter(h => h.count === dailyPomodoroGoal).length, color: '#3b82f6' },
    { name: 'Partial', value: filteredHistory.filter(h => h.count > 0 && h.count < dailyPomodoroGoal).length, color: '#f59e0b' },
    { name: 'No Activity', value: filteredHistory.filter(h => h.count === 0).length, color: '#ef4444' },
  ];

  // Performance Metrics
  const performanceMetrics = [
    { metric: 'Consistency', value: consistencyScore, max: 100, color: '#3b82f6' },
    { metric: 'Goal Rate', value: goalAchievementRate, max: 100, color: '#10b981' },
    { metric: 'Avg Daily', value: (parseFloat(avgDaily) / dailyPomodoroGoal * 100) || 0, max: 100, color: '#8b5cf6' },
    { metric: 'Completion', value: taskVelocity.completionRate, max: 100, color: '#f59e0b' },
    { metric: 'Streak', value: Math.min((currentStreak / 30) * 100, 100), max: 100, color: '#ec4899' },
  ];

  const getTrendIcon = () => {
    if (trend > 0) return <ArrowUp size={20} className="text-success" />;
    if (trend < 0) return <ArrowDown size={20} className="text-error" />;
    return <Minus size={20} className="text-warning" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-primary';
    if (score >= 40) return 'text-warning';
    return 'text-error';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Exceptional';
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Great';
    if (score >= 60) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="h-full overflow-y-auto bg-base-100">
      {/* Minimal Sticky Header */}
      <div className="sticky top-0 z-20 bg-base-100/95 backdrop-blur-md border-b border-base-300 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Brain size={28} className="text-primary" />
                  Advanced Analytics
                </h1>
                <p className="text-sm opacity-60 mt-1">Deep insights into your productivity</p>
              </div>
              
              {/* Productivity Score Badge */}
              <div className="card bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 px-4 py-2">
                <div className="flex items-center gap-3">
                  <Sparkles size={20} className="text-primary" />
                  <div>
                    <div className={`text-2xl font-bold ${getScoreColor(productivityScore)}`}>
                      {productivityScore}
                    </div>
                    <div className="text-xs opacity-70">{getScoreLabel(productivityScore)}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <select 
                className="select select-bordered select-sm"
                value={analyticsTimeRange}
                onChange={(e) => setAnalyticsTimeRange(e.target.value as any)}
              >
                <option value="7d">7 Days</option>
                <option value="30d">30 Days</option>
                <option value="90d">90 Days</option>
                <option value="all">All Time</option>
              </select>

              <select 
                className="select select-bordered select-sm"
                value={analyticsView}
                onChange={(e) => setAnalyticsView(e.target.value as any)}
              >
                <option value="overview">Overview</option>
                <option value="detailed">Detailed</option>
                <option value="comparison">Comparison</option>
              </select>

              <button 
                className={`btn btn-sm ${showAdvanced ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? <Eye size={16} /> : <EyeOff size={16} />}
                Advanced
              </button>

              <button className="btn btn-sm btn-ghost gap-2">
                <Download size={16} />
                Export
              </button>
            </div>
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Zap size={32} />
            </div>
            <div className="stat-title">Total Pomodoros</div>
            <div className="stat-value text-primary">{totalPomodoros}</div>
            <div className="stat-desc">{completedPomodoros} today</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <Target size={32} />
            </div>
            <div className="stat-title">Daily Average</div>
            <div className="stat-value text-secondary">{avgDaily}</div>
            <div className="stat-desc">Goal: {dailyPomodoroGoal}/day</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className={`stat-figure ${trend >= 0 ? 'text-success' : 'text-error'}`}>
              {trend >= 0 ? <TrendingUp size={32} /> : <TrendingDown size={32} />}
            </div>
            <div className="stat-title">7-Day Trend</div>
            <div className={`stat-value ${trend >= 0 ? 'text-success' : 'text-error'}`}>
              {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
            </div>
            <div className="stat-desc">{trend >= 0 ? 'Improving!' : 'Needs attention'}</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-accent">
              <Activity size={32} />
            </div>
            <div className="stat-title">Active Tasks</div>
            <div className="stat-value text-accent">{activeCards.length}</div>
            <div className="stat-desc">{completedCards.length} completed</div>
          </div>
        </div>
      </div>

      {/* Toggle Controls */}
      {analyticsView === 'detailed' && (
        <div className="card bg-base-200 border border-base-300 mb-6">
          <div className="card-body p-4">
            <div className="flex flex-wrap gap-3">
              <label className="label cursor-pointer gap-2">
                <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" checked={showAnalyticsTrends} onChange={toggleShowAnalyticsTrends} />
                <span className="label-text">Show Trends</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" checked={showAnalyticsGoals} onChange={toggleShowAnalyticsGoals} />
                <span className="label-text">Show Goals</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" checked={showAnalyticsHeatmap} onChange={toggleShowAnalyticsHeatmap} />
                <span className="label-text">Show Heatmap</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Daily Activity Chart */}
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">Daily Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              {showAnalyticsTrends ? (
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="pomodoros" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Pomodoros" />
                  {showAnalyticsGoals && <Area type="monotone" dataKey="goal" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Goal" />}
                </AreaChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pomodoros" fill="#3b82f6" name="Pomodoros" />
                  {showAnalyticsGoals && <Bar dataKey="goal" fill="#10b981" name="Goal" />}
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Productivity Distribution */}
        <div className="card bg-base-200 border border-base-300">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">Productivity Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
=======
      <div className="p-6 space-y-6">
        {/* Key Metrics Dashboard - Enhanced */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="card bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-4 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <Zap size={20} className="text-primary" />
              <div className={`badge badge-sm ${trend > 0 ? 'badge-success' : trend < 0 ? 'badge-error' : 'badge-warning'}`}>
                {trend > 0 ? '+' : ''}{trend.toFixed(0)}%
              </div>
            </div>
            <div className="text-4xl font-bold text-primary">{totalPomodoros}</div>
            <div className="text-xs opacity-60 mt-1 flex items-center gap-1">
              Total Pomodoros
            </div>
          </div>

          <div className="card bg-gradient-to-br from-success/10 to-success/5 border border-success/20 p-4 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <Target size={20} className="text-success" />
              <Trophy size={16} className="text-success opacity-60" />
            </div>
            <div className="text-4xl font-bold text-success">{avgDaily}</div>
            <div className="text-xs opacity-60 mt-1">Daily Average</div>
          </div>

          <div className="card bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 p-4 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <Flame size={20} className="text-orange-500" />
              <div className="text-xs font-bold text-orange-500">{longestStreak}d MAX</div>
            </div>
            <div className="text-4xl font-bold text-orange-500">{currentStreak}</div>
            <div className="text-xs opacity-60 mt-1">Day Streak</div>
          </div>

          <div className="card bg-gradient-to-br from-info/10 to-info/5 border border-info/20 p-4 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle size={20} className="text-info" />
              <Star size={16} className="text-info" />
            </div>
            <div className="text-4xl font-bold text-info">{goalAchievementRate}%</div>
            <div className="text-xs opacity-60 mt-1">Goal Met Rate</div>
          </div>

          <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 p-4 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <Activity size={20} className="text-secondary" />
              <ThumbsUp size={16} className="text-secondary" />
            </div>
            <div className="text-4xl font-bold text-secondary">{consistencyScore}%</div>
            <div className="text-xs opacity-60 mt-1">Consistency</div>
          </div>

          <div className="card bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 p-4 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <Brain size={20} className="text-accent" />
              <Sparkles size={16} className="text-accent" />
            </div>
            <div className="text-4xl font-bold text-accent">{peakDay.count}</div>
            <div className="text-xs opacity-60 mt-1">Peak Day</div>
          </div>
        </div>

        {/* Main Performance Chart - Enhanced */}
        <div className="card bg-base-200 border border-base-300 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                <BarChart3 size={20} className="text-primary" />
                Performance Timeline
              </h3>
              <p className="text-xs opacity-60 mt-1">Your productivity journey over time</p>
            </div>
            <div className="flex gap-2">
              <button 
                className={`btn btn-xs ${!showAnalyticsTrends ? 'btn-primary' : 'btn-ghost'}`}
                onClick={toggleShowAnalyticsTrends}
              >
                Bar
              </button>
              <button 
                className={`btn btn-xs ${showAnalyticsTrends ? 'btn-primary' : 'btn-ghost'}`}
                onClick={toggleShowAnalyticsTrends}
              >
                Area
              </button>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-xs checkbox-primary"
                  checked={showAnalyticsGoals}
                  onChange={toggleShowAnalyticsGoals}
                />
                Goal Line
              </label>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            {showAnalyticsTrends ? (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPomodoros" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Area type="monotone" dataKey="pomodoros" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPomodoros)" />
                {showAnalyticsGoals && (
                  <Line type="monotone" dataKey="goal" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                )}
              </AreaChart>
            ) : (
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="pomodoros" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                {showAnalyticsGoals && (
                  <Line type="monotone" dataKey="goal" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" dot={false} />
                )}
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Advanced Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Performance Radar */}
          <div className="card bg-base-200 border border-base-300 p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Activity size={18} className="text-primary" />
              Performance Score
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={performanceMetrics}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="metric" stroke="#9ca3af" fontSize={11} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" fontSize={10} />
                <Radar name="Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Pattern */}
          <div className="card bg-base-200 border border-base-300 p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-success" />
              Weekly Pattern
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weekdayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="pomodoros" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Focus Distribution */}
          <div className="card bg-base-200 border border-base-300 p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Target size={18} className="text-warning" />
              Focus Distribution
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={focusDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis dataKey="range" type="category" stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="count" fill="#f59e0b" radius={[0, 6, 6, 0]}>
                  <LabelList dataKey="count" position="right" fill="#9ca3af" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trend */}
          <div className="card bg-base-200 border border-base-300 p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-info" />
              Monthly Trend
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="pomodoros" stroke="#06b6d4" strokeWidth={3} dot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Productivity Distribution Pie */}
          <div className="card bg-base-200 border border-base-300 p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Clock size={18} className="text-secondary" />
              Activity Distribution
            </h3>
            <ResponsiveContainer width="100%" height={280}>
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
              <PieChart>
                <Pie
                  data={productivityData}
                  cx="50%"
                  cy="50%"
<<<<<<< HEAD
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productivityData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Radar & Comparison */}
      {analyticsView !== 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Performance Metrics Radar */}
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">Performance Metrics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Performance" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Comparison */}
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">Weekly Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData.slice(-14)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pomodoros" stroke="#3b82f6" strokeWidth={2} name="Pomodoros" />
                  <Line type="monotone" dataKey="goal" stroke="#10b981" strokeDasharray="5 5" name="Goal" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Activity Heatmap */}
      {showAnalyticsHeatmap && analyticsView === 'detailed' && (
        <div className="card bg-base-200 border border-base-300 mb-6">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">Activity Heatmap (Last 90 Days)</h3>
            <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-15 gap-1">
              {heatmapData.map((day, index) => {
                const intensity = day.count === 0 ? 'bg-base-300' :
                                day.count < dailyPomodoroGoal / 2 ? 'bg-success/30' :
                                day.count < dailyPomodoroGoal ? 'bg-success/60' : 'bg-success';
                return (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-sm ${intensity} tooltip tooltip-top`}
                    data-tip={`${day.date}: ${day.count} pomodoros`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Achievement Badges */}
      <div className="card bg-base-200 border border-base-300">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4 flex items-center gap-2">
            <Award size={20} />
            Achievements
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {totalPomodoros >= 100 && (
              <div className="text-center">
=======
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  label={(entry) => `${entry.value}`}
                >
                  {productivityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Task Velocity */}
          <div className="card bg-base-200 border border-base-300 p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CheckCircle size={18} className="text-accent" />
              Task Velocity
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Completion Rate</span>
                  <span className="font-bold">{taskVelocity.completionRate}%</span>
                </div>
                <progress className="progress progress-accent w-full" value={taskVelocity.completionRate} max="100"></progress>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                  <div className="text-3xl font-bold text-success">{taskVelocity.completed}</div>
                  <div className="text-xs opacity-60 mt-1">Completed</div>
                </div>
                <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <div className="text-3xl font-bold text-warning">{taskVelocity.active}</div>
                  <div className="text-xs opacity-60 mt-1">Active</div>
                </div>
                <div className="text-center p-4 bg-info/10 rounded-lg border border-info/20">
                  <div className="text-3xl font-bold text-info">{taskVelocity.total}</div>
                  <div className="text-xs opacity-60 mt-1">Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Section - Conditional */}
        {showAdvanced && (
          <>
            {/* Forecast */}
            <div className="card bg-base-200 border border-base-300 p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Brain size={18} className="text-primary" />
                7-Day Forecast
                <span className="badge badge-primary badge-sm ml-2">AI Powered</span>
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                  <Bar dataKey="forecast" fill="#8b5cf6" radius={[6, 6, 0, 0]} opacity={0.7} />
                  <Line type="monotone" dataKey="confidence" stroke="#ec4899" strokeWidth={2} strokeDasharray="5 5" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Productivity Insights */}
            <div className="card bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-primary" />
                Productivity Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
                  {trend > 0 ? <ThumbsUp size={20} className="text-success mt-1" /> : <AlertTriangle size={20} className="text-warning mt-1" />}
                  <div>
                    <p className="font-semibold text-sm mb-1">
                      {trend > 0 ? '🎉 Great Progress!' : '💪 Room for Growth'}
                    </p>
                    <p className="text-xs opacity-70">
                      {trend > 0 
                        ? `You're ${Math.abs(trend).toFixed(0)}% more productive than last week. Keep it up!`
                        : `Try increasing your daily goal to boost momentum.`
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
                  <Flame size={20} className="text-orange-500 mt-1" />
                  <div>
                    <p className="font-semibold text-sm mb-1">🔥 Streak Power</p>
                    <p className="text-xs opacity-70">
                      Current streak: {currentStreak} days. Your longest: {longestStreak} days. 
                      {currentStreak === longestStreak ? ' New record!' : ` Just ${longestStreak - currentStreak} days to beat your record!`}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
                  <Star size={20} className="text-warning mt-1" />
                  <div>
                    <p className="font-semibold text-sm mb-1">⭐ Best Day</p>
                    <p className="text-xs opacity-70">
                      Your peak was {peakDay.count} pomodoros on {new Date(peakDay.date).toLocaleDateString()}. 
                      {completedPomodoros >= peakDay.count ? ' Matching it today!' : ` ${peakDay.count - completedPomodoros} more to match it!`}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-base-200 rounded-lg">
                  <CheckCircle size={20} className="text-success mt-1" />
                  <div>
                    <p className="font-semibold text-sm mb-1">✅ Task Master</p>
                    <p className="text-xs opacity-70">
                      {taskVelocity.completionRate}% completion rate with {taskVelocity.completed} completed tasks. 
                      {taskVelocity.completionRate >= 75 ? ' Outstanding!' : ' Keep pushing!'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
{/* Productivity Patterns - NEW */}
    <div className="card bg-base-200 border border-base-300 p-6">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <Brain size={20} className="text-info" />
        Productivity Patterns
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-base-300 rounded-lg">
          <div className="text-sm opacity-70 mb-2">Best Day</div>
          <div className="text-2xl font-bold">
            {weekdayData.reduce((max, day) => day.pomodoros > max.pomodoros ? day : max).day}
          </div>
          <div className="text-xs opacity-60 mt-1">
            Avg: {(weekdayData.reduce((max, day) => day.pomodoros > max.pomodoros ? day : max).pomodoros).toFixed(1)} pomodoros
          </div>
        </div>
        
        <div className="p-4 bg-base-300 rounded-lg">
          <div className="text-sm opacity-70 mb-2">Consistency</div>
          <div className="text-2xl font-bold text-success">{consistencyScore}%</div>
          <div className="text-xs opacity-60 mt-1">
            {consistencyScore >= 80 ? 'Excellent!' : consistencyScore >= 60 ? 'Good' : 'Keep going!'}
          </div>
        </div>
        
        <div className="p-4 bg-base-300 rounded-lg">
          <div className="text-sm opacity-70 mb-2">Growth</div>
          <div className={`text-2xl font-bold ${trend >= 0 ? 'text-success' : 'text-error'}`}>
            {trend > 0 ? '+' : ''}{trend.toFixed(0)}%
          </div>
          <div className="text-xs opacity-60 mt-1">vs last week</div>
        </div>
      </div>
    </div>

        {/* Achievements - Enhanced */}
        <div className="card bg-base-200 border border-base-300 p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Award size={20} className="text-warning" />
            Achievements & Milestones
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {totalPomodoros >= 10 && (
              <div className="text-center p-4 bg-base-300 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl mb-2">🎯</div>
                <p className="text-xs font-medium">Getting Started</p>
                <p className="text-xs opacity-60">10+ Pomodoros</p>
              </div>
            )}
            {totalPomodoros >= 50 && (
              <div className="text-center p-4 bg-base-300 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl mb-2">🚀</div>
                <p className="text-xs font-medium">Rising Star</p>
                <p className="text-xs opacity-60">50+ Pomodoros</p>
              </div>
            )}
            {totalPomodoros >= 100 && (
              <div className="text-center p-4 bg-base-300 rounded-lg hover:scale-105 transition-transform cursor-pointer">
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
                <div className="text-4xl mb-2">🏆</div>
                <p className="text-xs font-medium">Century</p>
                <p className="text-xs opacity-60">100+ Pomodoros</p>
              </div>
            )}
<<<<<<< HEAD
            {filteredHistory.filter(h => h.count >= dailyPomodoroGoal).length >= 7 && (
              <div className="text-center">
                <div className="text-4xl mb-2">🔥</div>
                <p className="text-xs font-medium">Week Streak</p>
                <p className="text-xs opacity-60">7 Days Goal</p>
              </div>
            )}
            {completedCards.length >= 50 && (
              <div className="text-center">
                <div className="text-4xl mb-2">✅</div>
                <p className="text-xs font-medium">Task Master</p>
                <p className="text-xs opacity-60">50+ Completed</p>
              </div>
            )}
            {totalPomodoros >= 500 && (
              <div className="text-center">
=======
            {totalPomodoros >= 500 && (
              <div className="text-center p-4 bg-base-300 rounded-lg hover:scale-105 transition-transform cursor-pointer">
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
                <div className="text-4xl mb-2">💎</div>
                <p className="text-xs font-medium">Diamond</p>
                <p className="text-xs opacity-60">500+ Pomodoros</p>
              </div>
            )}
<<<<<<< HEAD
            {parseFloat(avgDaily) >= dailyPomodoroGoal && (
              <div className="text-center">
                <div className="text-4xl mb-2">⭐</div>
                <p className="text-xs font-medium">Consistent</p>
                <p className="text-xs opacity-60">Daily Goal Met</p>
              </div>
            )}
            {trend > 50 && (
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <p className="text-xs font-medium">Rising Star</p>
                <p className="text-xs opacity-60">+50% Growth</p>
              </div>
            )}
=======
            {totalPomodoros >= 1000 && (
              <div className="text-center p-4 bg-base-300 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl mb-2">👑</div>
                <p className="text-xs font-medium">Legend</p>
                <p className="text-xs opacity-60">1000+ Pomodoros</p>
              </div>
            )}
            {goalAchievementRate >= 80 && (
              <div className="text-center p-4 bg-base-300 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl mb-2">⭐</div>
                <p className="text-xs font-medium">Consistent</p>
                <p className="text-xs opacity-60">80%+ Goal Rate</p>
              </div>
            )}
            {trend > 50 && (
              <div className="text-center p-4 bg-base-300 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl mb-2">📈</div>
                <p className="text-xs font-medium">Momentum</p>
                <p className="text-xs opacity-60">+50% Growth</p>
              </div>
            )}
            {consistencyScore >= 90 && (
              <div className="text-center p-4 bg-base-300 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl mb-2">🔥</div>
                <p className="text-xs font-medium">Dedicated</p>
                <p className="text-xs opacity-60">90%+ Consistency</p>
              </div>
            )}
            {currentStreak >= 7 && (
              <div className="text-center p-4 bg-base-300 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl mb-2">⚡</div>
                <p className="text-xs font-medium">Week Warrior</p>
                <p className="text-xs opacity-60">7+ Day Streak</p>
              </div>
            )}
            {currentStreak >= 30 && (
              <div className="text-center p-4 bg-base-300 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl mb-2">🌟</div>
                <p className="text-xs font-medium">Month Master</p>
                <p className="text-xs opacity-60">30+ Day Streak</p>
              </div>
            )}
            {taskVelocity.completed >= 25 && (
              <div className="text-center p-4 bg-base-300 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl mb-2">✅</div>
                <p className="text-xs font-medium">Task Champion</p>
                <p className="text-xs opacity-60">25+ Completed</p>
              </div>
            )}
            {productivityScore >= 85 && (
              <div className="text-center p-4 bg-base-300 rounded-lg hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl mb-2">💫</div>
                <p className="text-xs font-medium">Elite Performer</p>
                <p className="text-xs opacity-60">85+ Score</p>
              </div>
            )}
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD
=======
    
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  );
};

export default Analytics;
