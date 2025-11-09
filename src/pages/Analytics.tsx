import { useMemo } from 'react';
import { usePomodoroStore } from '../stores/pomodoroStore';
import { useKanbanStore } from '../stores/kanbanStore';
import { useSettingsStore } from '../stores/settingsStore';
import {
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
    showAnalyticsHeatmap,
    setAnalyticsTimeRange,
    setAnalyticsView,
    toggleShowAnalyticsTrends,
    toggleShowAnalyticsGoals,
    toggleShowAnalyticsHeatmap,
  } = useSettingsStore();

  const allCards = Object.values(cards);
  const completedCards = allCards.filter((c) => c.checklist.every((item) => item.completed));
  const activeCards = allCards.filter((c) => !c.archived);

  // Calculate date range
  const getDaysBack = () => {
    switch (analyticsTimeRange) {
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      case 'all': return 365;
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

  // Calculate trends
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
          </div>
        </div>
      </div>

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
              <PieChart>
                <Pie
                  data={productivityData}
                  cx="50%"
                  cy="50%"
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
                <div className="text-4xl mb-2">🏆</div>
                <p className="text-xs font-medium">Century</p>
                <p className="text-xs opacity-60">100+ Pomodoros</p>
              </div>
            )}
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
                <div className="text-4xl mb-2">💎</div>
                <p className="text-xs font-medium">Diamond</p>
                <p className="text-xs opacity-60">500+ Pomodoros</p>
              </div>
            )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
