<<<<<<< HEAD
import { useEffect } from 'react';
import { usePomodoroStore, startPomodoroTimer, stopPomodoroTimer } from '../stores/pomodoroStore';
import { useSettingsStore } from '../stores/settingsStore';
import { Play, Pause, RotateCcw, SkipForward, Settings, TrendingUp, Target, Zap, Calendar } from 'lucide-react';
=======
// pages/Pomodoro.tsx - COMPLETE v7.6 WITH BEEP SOUNDS & NO PULSING
import { useEffect, useState } from 'react';
import { usePomodoroStore, startPomodoroTimer, stopPomodoroTimer } from '../stores/pomodoroStore';
import { useSettingsStore } from '../stores/settingsStore';
import { soundHelper } from '../utils/soundHelper';
import { 
  Play, Pause, RotateCcw, SkipForward, Settings, TrendingUp, 
  Target, Zap, Calendar, Minimize2, Volume2, VolumeX, Bell, BellOff, Info 
} from 'lucide-react';
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)

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
<<<<<<< HEAD
  } = useSettingsStore();

=======
    toggleSound,
    toggleNotifications,
    setSoundVolume,
  } = useSettingsStore();

  const [showSettings, setShowSettings] = useState(false);

>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = mode === 'work' 
    ? ((workDuration - timeLeft) / workDuration) * 100
    : mode === 'break'
    ? ((breakDuration - timeLeft) / breakDuration) * 100
    : ((longBreakDuration - timeLeft) / longBreakDuration) * 100;

  const goalProgress = (completedPomodoros / dailyPomodoroGoal) * 100;

<<<<<<< HEAD
  // Start/stop timer
=======
  // Initialize audio on mount
  useEffect(() => {
    soundHelper.init();
    console.log('🔊 Pomodoro: Audio initialized');
  }, []);

  // Handle timer start/stop
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  useEffect(() => {
    if (isRunning) {
      startPomodoroTimer();
    } else {
      stopPomodoroTimer();
    }
    return () => stopPomodoroTimer();
  }, [isRunning]);

<<<<<<< HEAD
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
=======
  // ✅ Handle timer completion with beep sounds
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      // Play beep sound based on mode
      if (soundEnabled) {
        if (mode === 'work') {
          soundHelper.playSuccessSound(soundVolume / 100);
          console.log('🎵 Playing work complete beep');
        } else if (mode === 'break') {
          soundHelper.playBreakSound(soundVolume / 100);
          console.log('🎵 Playing break complete beep');
        } else if (mode === 'longBreak') {
          soundHelper.playLongBreakSound(soundVolume / 100);
          console.log('🎵 Playing long break complete beep');
        }
      }
      
      // Show notification
      if (notifications && Notification.permission === 'granted') {
        if (mode === 'work') {
          new Notification('🎉 Pomodoro Complete!', {
            body: 'Great job! Time for a well-deserved break.',
            icon: '/vite.svg',
            badge: '/vite.svg',
          });
        } else if (mode === 'break') {
          new Notification('⏰ Break Complete!', {
            body: 'Ready to focus again? Let\'s continue!',
            icon: '/vite.svg',
            badge: '/vite.svg',
          });
        } else if (mode === 'longBreak') {
          new Notification('🌟 Long Break Complete!', {
            body: 'Refreshed and ready! Time to get back to work.',
            icon: '/vite.svg',
            badge: '/vite.svg',
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
          });
        }
      }
    }
  }, [timeLeft, isRunning, mode, soundEnabled, soundVolume, notifications]);

  // Update document title
  useEffect(() => {
<<<<<<< HEAD
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
=======
    if (isRunning) {
      document.title = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - ${mode === 'work' ? 'Focus' : mode === 'break' ? 'Break' : 'Long Break'} - FocusFlow`;
    } else {
      document.title = 'FocusFlow - Pomodoro Timer';
    }
    return () => {
      document.title = 'FocusFlow';
    };
  }, [minutes, seconds, isRunning, mode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        isRunning ? pause() : start();
      } else if (e.code === 'KeyR' && e.ctrlKey) {
        e.preventDefault();
        reset();
      } else if (e.code === 'KeyS' && e.ctrlKey) {
        e.preventDefault();
        skip();
      } else if (e.code === 'Escape' && pomodoroLayout === 'fullscreen') {
        setPomodoroLayout('modern');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, pomodoroLayout, pause, start, reset, skip, setPomodoroLayout]);

  // LAYOUT 1: Classic
  const ClassicLayout = () => (
    <div className="flex flex-col items-center justify-center min-h-[600px]">
      <div className="relative">
        <svg className="transform -rotate-90" width="400" height="400">
          <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="12" fill="none" className="text-base-300" />
          <circle
            cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="12" fill="none"
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
            strokeDasharray={`${2 * Math.PI * 180}`}
            strokeDashoffset={`${2 * Math.PI * 180 * (1 - progress / 100)}`}
            className={`${mode === 'work' ? 'text-primary' : mode === 'break' ? 'text-success' : 'text-info'} transition-all duration-1000`}
            strokeLinecap="round"
          />
        </svg>
        
<<<<<<< HEAD
        {/* Timer Display */}
=======
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-8xl font-bold font-mono mb-4">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className={`text-2xl font-semibold uppercase tracking-wider ${mode === 'work' ? 'text-primary' : mode === 'break' ? 'text-success' : 'text-info'}`}>
            {mode === 'work' ? 'Focus Time' : mode === 'break' ? 'Short Break' : 'Long Break'}
          </div>
<<<<<<< HEAD
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
=======
          <div className="text-sm opacity-60 mt-2">Session {completedPomodoros + 1}</div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={reset} className="btn btn-outline btn-circle btn-lg" title="Reset (Ctrl+R)">
          <RotateCcw size={24} />
        </button>
        <button onClick={isRunning ? pause : start} className="btn btn-primary btn-circle btn-lg w-24 h-24" title="Start/Pause (Space)">
          {isRunning ? <Pause size={36} /> : <Play size={36} />}
        </button>
        <button onClick={skip} className="btn btn-outline btn-circle btn-lg" title="Skip (Ctrl+S)">
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  );

<<<<<<< HEAD
  // Modern Layout (Card-based with stats)
  const ModernLayout = () => (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Timer Card */}
=======
  // LAYOUT 2: Modern
  const ModernLayout = () => (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
        <div className="lg:col-span-2 card bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
          <div className="card-body items-center text-center">
            <h2 className={`text-2xl font-bold uppercase tracking-wider mb-4 ${mode === 'work' ? 'text-primary' : mode === 'break' ? 'text-success' : 'text-info'}`}>
              {mode === 'work' ? '🎯 Focus Time' : mode === 'break' ? '☕ Short Break' : '🌟 Long Break'}
            </h2>
            
            <div className="text-9xl font-bold font-mono my-8">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>

<<<<<<< HEAD
            {/* Progress Bar */}
=======
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
            <div className="w-full max-w-md">
              <progress className={`progress w-full h-4 ${mode === 'work' ? 'progress-primary' : mode === 'break' ? 'progress-success' : 'progress-info'}`} value={progress} max="100"></progress>
              <div className="flex justify-between text-xs mt-2 opacity-60">
                <span>Started</span>
                <span>{progress.toFixed(0)}%</span>
                <span>Complete</span>
              </div>
            </div>

<<<<<<< HEAD
            {/* Controls */}
=======
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
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

<<<<<<< HEAD
        {/* Stats Sidebar */}
=======
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
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

<<<<<<< HEAD
  // Minimal Layout (Ultra clean)
=======
  // LAYOUT 3: Minimal
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
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

<<<<<<< HEAD
        {/* Minimal Controls */}
=======
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
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
<<<<<<< HEAD
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
=======
            <div><div className="text-2xl font-bold">{completedPomodoros}</div><div className="opacity-60">Today</div></div>
            <div><div className="text-2xl font-bold">{totalPomodoros}</div><div className="opacity-60">Total</div></div>
            <div><div className="text-2xl font-bold">{pomodorosUntilLongBreak}</div><div className="opacity-60">Until Break</div></div>
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
          </div>
        )}
      </div>
    </div>
  );

<<<<<<< HEAD
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
=======
  // LAYOUT 4: Fullscreen
  const FullscreenLayout = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-base-100 via-base-200 to-base-300 z-50 flex flex-col">
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-gradient-to-b from-base-100/80 to-transparent backdrop-blur-sm">
        <div className="text-sm opacity-60">
          <div>Session #{completedPomodoros + 1}</div>
          <div className="text-xs">{totalPomodoros} total sessions</div>
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => setPomodoroLayout('modern')} className="btn btn-primary btn-sm gap-2" title="Exit Fullscreen (ESC)">
            <Minimize2 size={16} /> Exit Fullscreen
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-6xl w-full px-8">
          <div className={`inline-block px-8 py-3 rounded-full mb-16 ${mode === 'work' ? 'bg-primary/20 text-primary' : mode === 'break' ? 'bg-success/20 text-success' : 'bg-info/20 text-info'} shadow-lg border ${mode === 'work' ? 'border-primary/30' : mode === 'break' ? 'border-success/30' : 'border-info/30'}`}>
            <span className="text-lg font-bold uppercase tracking-[0.3em]">
              {mode === 'work' ? '🎯 FOCUS MODE' : mode === 'break' ? '☕ BREAK TIME' : '🌟 LONG BREAK'}
            </span>
          </div>
          
          <div className="text-[18rem] font-bold font-mono leading-none mb-12 drop-shadow-2xl">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          <div className="w-full max-w-5xl mx-auto h-6 bg-base-300/50 rounded-full overflow-hidden mb-16 shadow-inner backdrop-blur-sm border border-base-300">
            <div 
              className={`h-full transition-all duration-1000 shadow-2xl ${mode === 'work' ? 'bg-gradient-to-r from-primary via-secondary to-primary' : mode === 'break' ? 'bg-gradient-to-r from-success via-info to-success' : 'bg-gradient-to-r from-info via-accent to-info'}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-center gap-8 mb-12">
            <button onClick={reset} className="btn btn-lg btn-circle btn-ghost hover:bg-base-300 w-20 h-20">
              <RotateCcw size={32} />
            </button>
            <button onClick={isRunning ? pause : start} className={`btn btn-lg rounded-full shadow-2xl w-40 h-40 ${mode === 'work' ? 'btn-primary' : mode === 'break' ? 'btn-success' : 'btn-info'}`}>
              {isRunning ? <Pause size={56} /> : <Play size={56} />}
            </button>
            <button onClick={skip} className="btn btn-lg btn-circle btn-ghost hover:bg-base-300 w-20 h-20">
              <SkipForward size={32} />
            </button>
          </div>

          <div className="text-xl opacity-70">
            {isRunning ? 'Stay focused, you\'re doing amazing! 💪' : 'Ready to begin when you are ✨'}
          </div>
        </div>
      </div>

      <div className="p-8 border-t border-base-300/50 backdrop-blur-sm bg-base-200/30">
        <div className="flex justify-center gap-16 text-center">
          <div><div className="text-5xl font-bold mb-2">{completedPomodoros}</div><div className="text-sm opacity-60 uppercase tracking-wider">Today</div></div>
          <div className="w-px h-16 bg-base-300"></div>
          <div><div className="text-5xl font-bold mb-2">{Math.round(goalProgress)}%</div><div className="text-sm opacity-60 uppercase tracking-wider">Goal Progress</div></div>
          <div className="w-px h-16 bg-base-300"></div>
          <div><div className="text-5xl font-bold mb-2">{pomodorosUntilLongBreak}</div><div className="text-sm opacity-60 uppercase tracking-wider">Until Long Break</div></div>
        </div>
      </div>
    </div>
  );

  // LAYOUT 5: Compact
  const CompactLayout = () => (
    <div className="max-w-2xl mx-auto">
      <div className="card bg-base-200 border border-base-300">
        <div className="card-body p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${mode === 'work' ? 'bg-primary' : mode === 'break' ? 'bg-success' : 'bg-info'}`}></div>
              <span className={`text-sm font-semibold uppercase tracking-wider ${mode === 'work' ? 'text-primary' : mode === 'break' ? 'text-success' : 'text-info'}`}>
                {mode === 'work' ? 'Focus' : mode === 'break' ? 'Break' : 'Long Break'}
              </span>
            </div>
            <div className="text-xs opacity-60">Session #{completedPomodoros + 1}</div>
          </div>

          <div className="text-7xl font-bold font-mono text-center mb-6">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          <progress className={`progress w-full h-3 mb-6 ${mode === 'work' ? 'progress-primary' : mode === 'break' ? 'progress-success' : 'progress-info'}`} value={progress} max="100"></progress>

          <div className="flex gap-3">
            <button onClick={reset} className="btn btn-outline btn-sm flex-1">
              <RotateCcw size={18} /> Reset
            </button>
            <button onClick={isRunning ? pause : start} className={`btn ${mode === 'work' ? 'btn-primary' : mode === 'break' ? 'btn-success' : 'btn-info'} btn-sm flex-[2]`}>
              {isRunning ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start</>}
            </button>
            <button onClick={skip} className="btn btn-outline btn-sm flex-1">
              <SkipForward size={18} /> Skip
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="text-center p-3 bg-base-300 rounded-lg">
              <div className="text-2xl font-bold">{completedPomodoros}</div>
              <div className="text-xs opacity-60">Today</div>
            </div>
            <div className="text-center p-3 bg-base-300 rounded-lg">
              <div className="text-2xl font-bold">{totalPomodoros}</div>
              <div className="text-xs opacity-60">Total</div>
            </div>
            <div className="text-center p-3 bg-base-300 rounded-lg">
              <div className="text-2xl font-bold">{pomodorosUntilLongBreak}</div>
              <div className="text-xs opacity-60">Next Break</div>
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
=======

  // LAYOUT 6: Focus Mode
  const FocusModeLayout = () => (
    <div className="flex flex-col items-center justify-center min-h-[600px] bg-gradient-to-br from-base-100 to-base-200">
      <div className="text-center max-w-4xl p-12">
        <div className={`inline-block px-6 py-2 rounded-full mb-12 ${mode === 'work' ? 'bg-primary/20 text-primary' : mode === 'break' ? 'bg-success/20 text-success' : 'bg-info/20 text-info'}`}>
          <span className="text-sm font-bold uppercase tracking-widest">
            {mode === 'work' ? '🎯 Deep Focus' : mode === 'break' ? '☕ Recharge' : '🌟 Extended Break'}
          </span>
        </div>

        <div className="text-[10rem] font-bold font-mono leading-none mb-8">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="w-full max-w-3xl h-4 bg-base-300 rounded-full overflow-hidden mb-12 shadow-inner">
          <div 
            className={`h-full transition-all duration-1000 shadow-lg ${mode === 'work' ? 'bg-gradient-to-r from-primary to-secondary' : mode === 'break' ? 'bg-gradient-to-r from-success to-info' : 'bg-gradient-to-r from-info to-accent'}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-center gap-6 mb-8">
          <button onClick={reset} className="btn btn-lg btn-circle btn-ghost hover:bg-base-300">
            <RotateCcw size={24} />
          </button>
          <button onClick={isRunning ? pause : start} className={`btn btn-lg w-28 h-28 rounded-full shadow-xl ${mode === 'work' ? 'btn-primary' : mode === 'break' ? 'btn-success' : 'btn-info'}`}>
            {isRunning ? <Pause size={40} /> : <Play size={40} />}
          </button>
          <button onClick={skip} className="btn btn-lg btn-circle btn-ghost hover:bg-base-300">
            <SkipForward size={24} />
          </button>
        </div>

        <div className="text-sm opacity-60">
          {isRunning ? 'Stay focused, you\'re doing great!' : 'Ready when you are'}
        </div>
      </div>
    </div>
  );

  // LAYOUT 7: Minimal Pro
  const MinimalProLayout = () => (
    <div className="flex items-center justify-center min-h-[600px]">
      <div className="text-center">
        <div className="mb-6">
          <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${mode === 'work' ? 'text-primary' : mode === 'break' ? 'text-success' : 'text-info'}`}>
            {mode === 'work' ? 'Focus' : mode === 'break' ? 'Break' : 'Long Break'}
          </span>
        </div>

        <div className="text-[14rem] font-light font-mono leading-none mb-4" style={{ letterSpacing: '-0.05em' }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="w-96 h-px bg-gradient-to-r from-transparent via-base-300 to-transparent mb-12"></div>

        <div className="flex justify-center gap-4 mb-12">
          <button onClick={reset} className="w-12 h-12 rounded-full border border-base-300 hover:bg-base-200 flex items-center justify-center transition-all">
            <RotateCcw size={18} />
          </button>
          <button onClick={isRunning ? pause : start} className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${mode === 'work' ? 'bg-primary hover:bg-primary/90' : mode === 'break' ? 'bg-success hover:bg-success/90' : 'bg-info hover:bg-info/90'} text-primary-content`}>
            {isRunning ? <Pause size={28} /> : <Play size={28} />}
          </button>
          <button onClick={skip} className="w-12 h-12 rounded-full border border-base-300 hover:bg-base-200 flex items-center justify-center transition-all">
            <SkipForward size={18} />
          </button>
        </div>

        <div className="flex justify-center gap-12 text-xs">
          <div><div className="text-3xl font-light mb-1">{completedPomodoros}</div><div className="opacity-50 uppercase tracking-wider">Today</div></div>
          <div className="w-px h-12 bg-base-300"></div>
          <div><div className="text-3xl font-light mb-1">{pomodorosUntilLongBreak}</div><div className="opacity-50 uppercase tracking-wider">Remaining</div></div>
        </div>
      </div>
    </div>
  );

  // Main Component Return
  return (
    <div className="h-full p-6 overflow-y-auto">
      {pomodoroLayout !== 'fullscreen' && (
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
            <p className="text-sm opacity-60 mt-1">Stay focused and productive</p>
          </div>
          
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-outline gap-2">
                <Settings size={16} />
                {pomodoroLayout === 'classic' && 'Classic'}
                {pomodoroLayout === 'modern' && 'Modern'}
                {pomodoroLayout === 'minimal' && 'Minimal'}
                {pomodoroLayout === 'fullscreen' && 'Fullscreen'}
                {pomodoroLayout === 'compact' && 'Compact'}
                {pomodoroLayout === 'focus' && 'Focus'}
                {pomodoroLayout === 'minimal-pro' && 'Minimal Pro'}
              </button>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-200 rounded-lg w-48 z-50 border border-base-300">
                <li><a onClick={() => setPomodoroLayout('classic')}>Classic</a></li>
                <li><a onClick={() => setPomodoroLayout('modern')}>Modern</a></li>
                <li><a onClick={() => setPomodoroLayout('minimal')}>Minimal</a></li>
                <li><a onClick={() => setPomodoroLayout('fullscreen')}>Fullscreen</a></li>
                <li><a onClick={() => setPomodoroLayout('compact')}>Compact</a></li>
                <li><a onClick={() => setPomodoroLayout('focus')}>Focus Mode</a></li>
                <li><a onClick={() => setPomodoroLayout('minimal-pro')}>Minimal Pro</a></li>
              </ul>
            </div>

            <button onClick={toggleSound} className={`btn ${soundEnabled ? 'btn-primary' : 'btn-outline'}`} title={soundEnabled ? 'Sound On' : 'Sound Off'}>
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button onClick={toggleNotifications} className={`btn ${notifications ? 'btn-primary' : 'btn-outline'}`} title={notifications ? 'Notifications On' : 'Notifications Off'}>
              {notifications ? <Bell size={16} /> : <BellOff size={16} />}
            </button>

            {(pomodoroLayout === 'minimal' || pomodoroLayout === 'minimal-pro') && (
              <button onClick={toggleShowPomodoroStats} className={`btn ${showPomodoroStats ? 'btn-primary' : 'btn-outline'}`}>
                <TrendingUp size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {pomodoroLayout === 'classic' && <ClassicLayout />}
      {pomodoroLayout === 'modern' && <ModernLayout />}
      {pomodoroLayout === 'minimal' && <MinimalLayout />}
      {pomodoroLayout === 'fullscreen' && <FullscreenLayout />}
      {pomodoroLayout === 'compact' && <CompactLayout />}
      {pomodoroLayout === 'focus' && <FocusModeLayout />}
      {pomodoroLayout === 'minimal-pro' && <MinimalProLayout />}

      {pomodoroLayout !== 'fullscreen' && (
        <div className="card bg-base-200 border border-base-300 mt-8">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h3 className="card-title text-lg">Timer Settings</h3>
              <button onClick={() => setShowSettings(!showSettings)} className="btn btn-ghost btn-sm">
                {showSettings ? 'Hide' : 'Show'} Advanced
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Work Duration (minutes)</span></label>
                <input type="number" className="input input-bordered" value={workDuration / 60} onChange={(e) => setWorkDuration(Number(e.target.value) * 60)} min="1" max="60" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Short Break (minutes)</span></label>
                <input type="number" className="input input-bordered" value={breakDuration / 60} onChange={(e) => setBreakDuration(Number(e.target.value) * 60)} min="1" max="30" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Long Break (minutes)</span></label>
                <input type="number" className="input input-bordered" value={longBreakDuration / 60} onChange={(e) => setLongBreakDuration(Number(e.target.value) * 60)} min="1" max="60" />
              </div>
            </div>

            {showSettings && (
              <div className="mt-6 pt-6 border-t border-base-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* SOUND SETTINGS */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-base flex items-center gap-2">
                      <Volume2 size={18} />
                      Sound Settings
                    </h4>
                    
                    <label className="label cursor-pointer justify-start gap-4 bg-base-100 p-3 rounded-lg">
                      <input type="checkbox" checked={soundEnabled} onChange={toggleSound} className="toggle toggle-primary toggle-lg" />
                      <div className="flex-1">
                        <span className="label-text font-medium block">Enable Sounds</span>
                        <span className="label-text-alt text-xs opacity-60">Play beeps when timer completes</span>
                      </div>
                    </label>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Sound Volume</span>
                        <span className="label-text-alt badge badge-primary">{soundVolume}%</span>
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={soundVolume} 
                        onChange={(e) => setSoundVolume(Number(e.target.value))} 
                        className="range range-primary range-lg" 
                        disabled={!soundEnabled}
                      />
                      <div className="w-full flex justify-between text-xs px-2 mt-2 opacity-60">
                        <span>Silent</span>
                        <span>50%</span>
                        <span>Max</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        console.log('🔊 Testing audio...');
                        soundHelper.testAudio();
                      }} 
                      className="btn btn-outline btn-block gap-2"
                      disabled={!soundEnabled}
                    >
                      <Volume2 size={18} />
                      Test Sound
                    </button>

                    <div className="alert alert-info">
                      <Info size={18} />
                      <div className="text-xs">
                        <p className="font-semibold mb-1">Sounds play when:</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          <li>Work session completes (3 tones)</li>
                          <li>Short break completes (2 tones)</li>
                          <li>Long break completes (4 tones)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* NOTIFICATION SETTINGS */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-base flex items-center gap-2">
                      <Bell size={18} />
                      Notification Settings
                    </h4>
                    
                    <label className="label cursor-pointer justify-start gap-4 bg-base-100 p-3 rounded-lg">
                      <input type="checkbox" checked={notifications} onChange={toggleNotifications} className="toggle toggle-primary toggle-lg" />
                      <div className="flex-1">
                        <span className="label-text font-medium block">Enable Notifications</span>
                        <span className="label-text-alt text-xs opacity-60">Show desktop notifications</span>
                      </div>
                    </label>

                    <div className="alert alert-warning">
                      <Info size={18} />
                      <div className="text-xs">
                        <p className="font-semibold mb-1">Browser notifications:</p>
                        <p>Make sure to allow notifications in your browser settings for this site.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="divider my-6"></div>

                <div className="alert alert-info">
                  <Info size={20} />
                  <div className="text-sm">
                    <p className="font-semibold mb-2">Keyboard Shortcuts:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><kbd className="kbd kbd-sm">Space</kbd> Start/Pause</div>
                      <div><kbd className="kbd kbd-sm">Ctrl</kbd> + <kbd className="kbd kbd-sm">R</kbd> Reset</div>
                      <div><kbd className="kbd kbd-sm">Ctrl</kbd> + <kbd className="kbd kbd-sm">S</kbd> Skip</div>
                      <div><kbd className="kbd kbd-sm">ESC</kbd> Exit Fullscreen</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
};

export default Pomodoro;
