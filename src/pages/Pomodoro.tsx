import { useEffect } from 'react';
import { usePomodoroStore, startPomodoroTimer, stopPomodoroTimer } from '../stores/pomodoroStore';
import { useSettingsStore } from '../stores/settingsStore';
import { Play, Pause, RotateCcw, SkipForward, Settings, TrendingUp, Target, Zap, Calendar } from 'lucide-react';

const Pomodoro = () => {
  const {
    timeLeft,
    isRunning,
    mode,
    completedPomodoros,
    totalPomodoros,
    pomodorosUntilLongBreak,
    workDuration,
    breakDuration,
    longBreakDuration,
    start,
    pause,
    reset,
    skip,
    setWorkDuration,
    setBreakDuration,
    setLongBreakDuration,
  } = usePomodoroStore();

  const {
    soundEnabled,
    soundVolume,
    notifications,
    dailyPomodoroGoal,
    pomodoroLayout,
    showPomodoroStats,
    setPomodoroLayout,
    toggleShowPomodoroStats,
  } = useSettingsStore();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = mode === 'work' 
    ? ((workDuration - timeLeft) / workDuration) * 100
    : mode === 'break'
    ? ((breakDuration - timeLeft) / breakDuration) * 100
    : ((longBreakDuration - timeLeft) / longBreakDuration) * 100;

  const goalProgress = (completedPomodoros / dailyPomodoroGoal) * 100;

  // Start/stop timer
  useEffect(() => {
    if (isRunning) {
      startPomodoroTimer();
    } else {
      stopPomodoroTimer();
    }
    return () => stopPomodoroTimer();
  }, [isRunning]);

  // Handle completion
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      if (soundEnabled) {
        // Play completion sound
        const audio = new Audio('/notification.mp3');
        audio.volume = soundVolume / 100;
        audio.play().catch(() => {});
      }
      if (notifications && Notification.permission === 'granted') {
        if (mode === 'work') {
          new Notification('Pomodoro Complete!', {
            body: 'Great job! Time for a break.',
            icon: '/icon.png',
          });
        } else {
          new Notification('Break Complete!', {
            body: 'Ready to focus again?',
            icon: '/icon.png',
          });
        }
      }
    }
  }, [timeLeft, isRunning, mode, soundEnabled, soundVolume, notifications]);

  // Update document title
  useEffect(() => {
    document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - FocusFlow`;
    return () => {
      document.title = 'FocusFlow';
    };
  }, [minutes, seconds]);

  // Classic Layout (Circular Timer)
  const ClassicLayout = () => (
    <div className="flex flex-col items-center justify-center min-h-[600px]">
      {/* Circular Progress */}
      <div className="relative">
        <svg className="transform -rotate-90" width="400" height="400">
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-base-300"
          />
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 180}`}
            strokeDashoffset={`${2 * Math.PI * 180 * (1 - progress / 100)}`}
            className={`${mode === 'work' ? 'text-primary' : mode === 'break' ? 'text-success' : 'text-info'} transition-all duration-1000`}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Timer Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-8xl font-bold font-mono mb-4">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className={`text-2xl font-semibold uppercase tracking-wider ${mode === 'work' ? 'text-primary' : mode === 'break' ? 'text-success' : 'text-info'}`}>
            {mode === 'work' ? 'Focus Time' : mode === 'break' ? 'Short Break' : 'Long Break'}
          </div>
          <div className="text-sm opacity-60 mt-2">
            Session {completedPomodoros + 1}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-8">
        <button onClick={reset} className="btn btn-outline btn-circle btn-lg">
          <RotateCcw size={24} />
        </button>
        <button onClick={isRunning ? pause : start} className="btn btn-primary btn-circle btn-lg w-24 h-24">
          {isRunning ? <Pause size={36} /> : <Play size={36} />}
        </button>
        <button onClick={skip} className="btn btn-outline btn-circle btn-lg">
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  );

  // Modern Layout (Card-based with stats)
  const ModernLayout = () => (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Timer Card */}
        <div className="lg:col-span-2 card bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
          <div className="card-body items-center text-center">
            <h2 className={`text-2xl font-bold uppercase tracking-wider mb-4 ${mode === 'work' ? 'text-primary' : mode === 'break' ? 'text-success' : 'text-info'}`}>
              {mode === 'work' ? '🎯 Focus Time' : mode === 'break' ? '☕ Short Break' : '🌟 Long Break'}
            </h2>
            
            <div className="text-9xl font-bold font-mono my-8">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md">
              <progress className={`progress w-full h-4 ${mode === 'work' ? 'progress-primary' : mode === 'break' ? 'progress-success' : 'progress-info'}`} value={progress} max="100"></progress>
              <div className="flex justify-between text-xs mt-2 opacity-60">
                <span>Started</span>
                <span>{progress.toFixed(0)}%</span>
                <span>Complete</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 mt-8">
              <button onClick={reset} className="btn btn-outline gap-2">
                <RotateCcw size={20} /> Reset
              </button>
              <button onClick={isRunning ? pause : start} className={`btn ${mode === 'work' ? 'btn-primary' : mode === 'break' ? 'btn-success' : 'btn-info'} gap-2 px-12`}>
                {isRunning ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Start</>}
              </button>
              <button onClick={skip} className="btn btn-outline gap-2">
                <SkipForward size={20} /> Skip
              </button>
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-4">
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={20} className="text-primary" />
                <h3 className="font-bold">Today's Progress</h3>
              </div>
              <div className="text-4xl font-bold text-primary mb-2">{completedPomodoros}</div>
              <progress className="progress progress-primary w-full" value={goalProgress} max="100"></progress>
              <p className="text-xs opacity-60 mt-2">Goal: {dailyPomodoroGoal} pomodoros</p>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target size={20} className="text-secondary" />
                <h3 className="font-bold">Total Sessions</h3>
              </div>
              <div className="text-4xl font-bold text-secondary">{totalPomodoros}</div>
              <p className="text-xs opacity-60 mt-2">All time</p>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={20} className="text-accent" />
                <h3 className="font-bold">Until Long Break</h3>
              </div>
              <div className="text-4xl font-bold text-accent">{pomodorosUntilLongBreak}</div>
              <p className="text-xs opacity-60 mt-2">pomodoros remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Minimal Layout (Ultra clean)
  const MinimalLayout = () => (
    <div className="flex flex-col items-center justify-center min-h-[600px]">
      <div className="text-center max-w-2xl">
        <div className={`text-sm uppercase tracking-widest mb-4 ${mode === 'work' ? 'text-primary' : mode === 'break' ? 'text-success' : 'text-info'}`}>
          {mode === 'work' ? 'Focus' : mode === 'break' ? 'Break' : 'Long Break'}
        </div>
        
        <div className="text-[12rem] font-bold font-mono leading-none mb-8">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="w-full max-w-lg h-2 bg-base-300 rounded-full overflow-hidden mb-8">
          <div 
            className={`h-full transition-all duration-1000 ${mode === 'work' ? 'bg-primary' : mode === 'break' ? 'bg-success' : 'bg-info'}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Minimal Controls */}
        <div className="flex justify-center gap-2">
          <button onClick={reset} className="btn btn-ghost btn-sm btn-circle">
            <RotateCcw size={16} />
          </button>
          <button onClick={isRunning ? pause : start} className="btn btn-ghost btn-lg btn-circle">
            {isRunning ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button onClick={skip} className="btn btn-ghost btn-sm btn-circle">
            <SkipForward size={16} />
          </button>
        </div>

        {showPomodoroStats && (
          <div className="flex justify-center gap-8 mt-12 text-sm">
            <div>
              <div className="text-2xl font-bold">{completedPomodoros}</div>
              <div className="opacity-60">Today</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{totalPomodoros}</div>
              <div className="opacity-60">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{pomodorosUntilLongBreak}</div>
              <div className="opacity-60">Until Break</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full p-6 overflow-y-auto">
      {/* Header with Layout Switcher */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
          <p className="text-sm opacity-60 mt-1">Stay focused and productive</p>
        </div>
        
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-outline gap-2">
              <Settings size={16} />
              Layout
            </button>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-200 rounded-lg w-40 z-50 border border-base-300">
              <li><a onClick={() => setPomodoroLayout('classic')} className={pomodoroLayout === 'classic' ? 'active' : ''}>Classic</a></li>
              <li><a onClick={() => setPomodoroLayout('modern')} className={pomodoroLayout === 'modern' ? 'active' : ''}>Modern</a></li>
              <li><a onClick={() => setPomodoroLayout('minimal')} className={pomodoroLayout === 'minimal' ? 'active' : ''}>Minimal</a></li>
            </ul>
          </div>
          {pomodoroLayout === 'minimal' && (
            <button onClick={toggleShowPomodoroStats} className={`btn ${showPomodoroStats ? 'btn-primary' : 'btn-outline'}`}>
              <TrendingUp size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Render Layout */}
      {pomodoroLayout === 'classic' && <ClassicLayout />}
      {pomodoroLayout === 'modern' && <ModernLayout />}
      {pomodoroLayout === 'minimal' && <MinimalLayout />}

      {/* Duration Settings (Bottom) */}
      <div className="card bg-base-200 border border-base-300 mt-8">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4">Timer Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Work Duration (minutes)</span></label>
              <input 
                type="number" 
                className="input input-bordered" 
                value={workDuration / 60} 
                onChange={(e) => setWorkDuration(Number(e.target.value) * 60)}
                min="1"
                max="60"
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Short Break (minutes)</span></label>
              <input 
                type="number" 
                className="input input-bordered" 
                value={breakDuration / 60} 
                onChange={(e) => setBreakDuration(Number(e.target.value) * 60)}
                min="1"
                max="30"
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Long Break (minutes)</span></label>
              <input 
                type="number" 
                className="input input-bordered" 
                value={longBreakDuration / 60} 
                onChange={(e) => setLongBreakDuration(Number(e.target.value) * 60)}
                min="1"
                max="60"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
