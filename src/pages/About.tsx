// pages/About.tsx - Complete About Page
import { Heart, Github, Coffee, Mail, Star, Zap, Target, Shield, Code, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-base-100 to-base-200">
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-primary/10 rounded-full animate-pulse">
              <Zap size={64} className="text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FocusFlow
          </h1>
          <p className="text-xl opacity-70">Your Ultimate Productivity Companion</p>
          <div className="badge badge-primary badge-lg">Version 7.6</div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-base-200 shadow-xl border border-base-300 hover:scale-105 transition-all">
            <div className="card-body">
              <Target size={32} className="text-primary mb-2" />
              <h3 className="card-title">Pomodoro Timer</h3>
              <p className="text-sm opacity-70">
                Boost focus with customizable work sessions and break intervals. Track your productivity with detailed statistics.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl border border-base-300 hover:scale-105 transition-all">
            <div className="card-body">
              <Code size={32} className="text-secondary mb-2" />
              <h3 className="card-title">Kanban Board</h3>
              <p className="text-sm opacity-70">
                Organize tasks visually with drag-and-drop cards, lists, labels, and priorities. Enhanced with @dnd-kit.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl border border-base-300 hover:scale-105 transition-all">
            <div className="card-body">
              <Sparkles size={32} className="text-accent mb-2" />
              <h3 className="card-title">Analytics Dashboard</h3>
              <p className="text-sm opacity-70">
                Visualize your productivity trends with beautiful charts and insights into your work patterns.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl border border-base-300 hover:scale-105 transition-all">
            <div className="card-body">
              <Shield size={32} className="text-success mb-2" />
              <h3 className="card-title">Privacy First</h3>
              <p className="text-sm opacity-70">
                All data stored locally on your device. No cloud sync, no tracking, complete offline functionality.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4 flex items-center gap-2">
              <Code size={24} className="text-primary" />
              Built With Modern Tech
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                'React 18', 'TypeScript', 'Vite', 'Zustand', 'DaisyUI',
                'Tailwind CSS', '@dnd-kit', 'Recharts', 'Lucide Icons'
              ].map(tech => (
                <div key={tech} className="badge badge-lg badge-outline">{tech}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats stats-vertical lg:stats-horizontal shadow w-full border border-base-300">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Star size={32} />
            </div>
            <div className="stat-title">Version</div>
            <div className="stat-value text-primary">7.6</div>
            <div className="stat-desc">Latest Release</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <Zap size={32} />
            </div>
            <div className="stat-title">Features</div>
            <div className="stat-value text-secondary">25+</div>
            <div className="stat-desc">Productivity Tools</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-accent">
              <Heart size={32} />
            </div>
            <div className="stat-title">Made with</div>
            <div className="stat-value text-accent">❤️</div>
            <div className="stat-desc">Love & Code</div>
          </div>
        </div>

        {/* Developer Section */}
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">About the Developer</h2>
            <p className="text-sm opacity-70 mb-4">
              FocusFlow is developed by a passionate full-stack developer dedicated to creating 
              beautiful, functional productivity tools. Built with React, TypeScript, and modern 
              web technologies to help you achieve your goals.
            </p>
            <div className="flex gap-2">
              <button className="btn btn-primary gap-2">
                <Github size={16} />
                GitHub
              </button>
              <button className="btn btn-outline gap-2">
                <Coffee size={16} />
                Buy Me Coffee
              </button>
              <button className="btn btn-outline gap-2">
                <Mail size={16} />
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Key Features List */}
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Key Features</h2>
            <ul className="space-y-2">
              {[
                '🍅 Pomodoro Timer with customizable intervals',
                '📊 Advanced analytics and productivity insights',
                '📋 Kanban board with drag-and-drop',
                '✅ Checklist support in cards',
                '🏷️ Custom labels and categories',
                '🎨 10+ beautiful themes',
                '🌙 Dark mode support',
                '⚡ Lightning fast performance',
                '💾 Export/Import data',
                '🔒 100% offline, privacy-focused',
                '♿ Accessibility features',
                '⌨️ Keyboard shortcuts'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4 py-8 border-t border-base-300">
          <p className="text-sm opacity-60">
            Made with <Heart size={14} className="inline text-error" /> by a passionate developer
          </p>
          <p className="text-xs opacity-40">
            © 2025 FocusFlow. All rights reserved. Built with React + TypeScript + Vite
          </p>
          <div className="flex justify-center gap-4">
            <a href="#" className="link link-hover text-xs opacity-60">Privacy Policy</a>
            <a href="#" className="link link-hover text-xs opacity-60">Terms of Service</a>
            <a href="#" className="link link-hover text-xs opacity-60">Changelog</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
