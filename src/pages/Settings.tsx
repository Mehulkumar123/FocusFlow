<<<<<<< HEAD
=======
// pages/Settings.tsx - COMPLETE v7.6 FIXED
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
import { useState } from 'react';
import { useSettingsStore, type CustomLabel, type CustomTheme } from '../stores/settingsStore';
import { usePomodoroStore } from '../stores/pomodoroStore';
import { useKanbanStore } from '../stores/kanbanStore';
import { availableThemes } from '../utils/themeHelper';
import { storageHelper, exportHelper } from '../utils';
import {
<<<<<<< HEAD
  Info, Palette, Clock, Layout, Download, Trash2, Heart, Sidebar as SidebarIcon,
  Monitor, Plus, X, Edit2, Tag, Save, Settings as SettingsIcon, Zap, Volume2,
  Keyboard, Gauge, Sliders, Sparkles, Globe, Paintbrush, Maximize2, Eye,
=======
  Info, Palette, Clock, Layout, Download, Trash2, Heart, 
  Sidebar as SidebarIcon, Monitor, Plus, X, Edit2, Tag, Save,
  Settings as SettingsIcon, Zap, Volume2, Keyboard, Gauge, 
  Sliders, Sparkles, Globe, Paintbrush, Maximize2, Eye, Bell,
  Type, Frame
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const colorPalette = [
<<<<<<< HEAD
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#64748b', '#475569', '#1e293b',
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'appearance' | 'sidebar' | 'themes' | 'compact' | 'pomodoro' | 'kanban' | 'labels' | 'advanced' | 'data' | 'about'>('appearance');
  
=======
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', 
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#64748b', '#475569', '#1e293b'
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState<
    'appearance' | 'sidebar' | 'themes' | 'compact' | 'pomodoro' | 
    'kanban' | 'labels' | 'advanced' | 'data'
  >('appearance');

>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  const settings = useSettingsStore();
  const pomodoro = usePomodoroStore();
  const { lists, cards } = useKanbanStore();

  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [editLabelName, setEditLabelName] = useState('');
  const [editLabelColor, setEditLabelColor] = useState('');
  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('#3b82f6');
  const [showAddLabel, setShowAddLabel] = useState(false);
<<<<<<< HEAD

=======
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  const [showThemeBuilder, setShowThemeBuilder] = useState(false);
  const [newThemeName, setNewThemeName] = useState('');
  const [newThemeColors, setNewThemeColors] = useState({
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    neutral: '#1f2937',
    base100: '#ffffff',
    base200: '#f3f4f6',
    base300: '#e5e7eb',
    info: '#0ea5e9',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  });

  const fontFamilies = ['system-ui', 'Inter', 'Roboto', 'Open Sans', 'Poppins', 'Montserrat', 'Lato', 'monospace'];
<<<<<<< HEAD
=======

>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' },
  ];

  const exportData = () => {
    const data = {
      pomodoro: storageHelper.load('pomodoro-storage', {}),
      kanban: storageHelper.load('kanban-storage', {}),
      settings: storageHelper.load('settings-storage', {}),
      exportDate: new Date().toISOString(),
<<<<<<< HEAD
      version: '7.0',
    };
    exportHelper.exportAsJSON(data, `focusflow-backup-v7-${new Date().toISOString().split('T')[0]}.json`);
  };

  const clearAllData = () => {
    if (confirm('⚠️ Warning: This will permanently delete ALL your data including tasks, pomodoro history, and settings. This action cannot be undone!\n\nAre you absolutely sure?')) {
=======
      version: '7.6',
    };
    exportHelper.exportAsJSON(data, `focusflow-backup-v7.6-${new Date().toISOString().split('T')[0]}.json`);
  };

  const clearAllData = () => {
    if (confirm('⚠️ Warning! This will permanently delete ALL your data including tasks, pomodoro history, and settings. This action cannot be undone!\n\nAre you absolutely sure?')) {
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
      if (confirm('Last chance! Click OK to permanently delete everything.')) {
        storageHelper.clear();
        window.location.reload();
      }
    }
  };

  const handleAddLabel = () => {
    if (newLabelName.trim()) {
      settings.addCustomLabel(newLabelName.trim(), newLabelColor);
      setNewLabelName('');
      setNewLabelColor('#3b82f6');
      setShowAddLabel(false);
    }
  };

  const handleEditLabel = (label: CustomLabel) => {
    setEditingLabelId(label.id);
    setEditLabelName(label.name);
    setEditLabelColor(label.color);
  };

  const handleSaveLabel = () => {
    if (editingLabelId && editLabelName.trim()) {
      settings.updateCustomLabel(editingLabelId, editLabelName.trim(), editLabelColor);
      setEditingLabelId(null);
    }
  };

  const handleCreateTheme = () => {
    if (newThemeName.trim()) {
      const newTheme: CustomTheme = {
        id: uuidv4(),
        name: newThemeName,
        colors: newThemeColors,
      };
      settings.addCustomTheme(newTheme);
      setNewThemeName('');
      setShowThemeBuilder(false);
    }
  };

<<<<<<< HEAD
  const tabs = [
=======
  const tabs: Array<{
  id: 'appearance' | 'sidebar' | 'themes' | 'compact' | 'pomodoro' | 'kanban' | 'labels' | 'advanced' | 'data';
  label: string;
  icon: any;
  }> = [
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'sidebar', label: 'Sidebar', icon: SidebarIcon },
    { id: 'themes', label: 'Themes', icon: Paintbrush },
    { id: 'compact', label: 'Compact', icon: Maximize2 },
    { id: 'pomodoro', label: 'Pomodoro', icon: Clock },
    { id: 'kanban', label: 'Kanban', icon: Layout },
    { id: 'labels', label: 'Labels', icon: Tag },
    { id: 'advanced', label: 'Advanced', icon: Sliders },
    { id: 'data', label: 'Data', icon: Monitor },
<<<<<<< HEAD
    { id: 'about', label: 'About', icon: Info },
  ] as const;
=======
    // { id: 'about', label: 'About', icon: Info },
  ];
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)

  const groupedThemes = availableThemes.reduce((acc, theme) => {
    if (!acc[theme.category]) acc[theme.category] = [];
    acc[theme.category].push(theme);
    return acc;
  }, {} as Record<string, typeof availableThemes>);

  return (
<<<<<<< HEAD
    <div className="h-full flex flex-col overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <SettingsIcon size={36} className="text-primary" />
              Settings Hub
            </h1>
            <p className="text-sm opacity-70 mt-2">Complete control with 150+ customization options • FocusFlow v7.0</p>
          </div>
          <div className="stats shadow">
            <div className="stat px-4 py-2">
              <div className="stat-title text-xs">Active Settings</div>
              <div className="stat-value text-2xl text-primary">150+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-4 overflow-x-auto bg-base-100">
        <div className="tabs tabs-boxed bg-base-200 p-1 inline-flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab gap-2 whitespace-nowrap transition-all ${activeTab === tab.id ? 'tab-active shadow-md' : ''}`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
=======
    <div className="h-full flex flex-col overflow-hidden bg-base-100">
      {/* Minimal Header */}
      <div className="border-b border-base-300 bg-base-200/50 backdrop-blur-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SettingsIcon size={28} className="text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-xs opacity-60">150+ customization options</p>
            </div>
          </div>
          <div className="stats shadow-sm bg-base-100 border border-base-300">
            <div className="stat px-4 py-2">
              <div className="stat-title text-xs">Active Theme</div>
              <div className="stat-value text-lg text-primary">{settings.theme}</div>
            </div>
          </div>
        </div>

        {/* Minimal Tabs */}
        <div className="px-6 overflow-x-auto">
          <div className="flex gap-1 border-b border-base-300">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary bg-primary/5'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:bg-base-200'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
        </div>
      </div>

      {/* Tab Content */}
<<<<<<< HEAD
      <div className="flex-1 overflow-y-auto p-6 bg-base-100">
        <div className="max-w-7xl mx-auto">
          
          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="alert alert-info">
                <Sparkles size={20} />
                <span>Customize typography, spacing, and visual effects to match your style</span>
              </div>

              <div className="card bg-base-200 border border-base-300 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-6 flex items-center gap-2">
                    <Sparkles size={24} className="text-primary" />
                    Typography Controls
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Font Family</span></label>
                      <select className="select select-bordered select-lg" value={settings.fontFamily} onChange={(e) => settings.setFontFamily(e.target.value)}>
=======
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <>
              {/* Typography */}
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Type size={20} className="text-primary" />
                    Typography
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="form-control">
                      <label className="label"><span className="label-text text-sm">Font Family</span></label>
                      <select 
                        className="select select-bordered select-sm" 
                        value={settings.fontFamily}
                        onChange={(e) => settings.setFontFamily(e.target.value)}
                      >
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
                        {fontFamilies.map((font) => (
                          <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
<<<<<<< HEAD
                        <span className="label-text font-semibold">Font Size</span>
                        <span className="label-text-alt badge badge-primary">{settings.fontSize}px</span>
                      </label>
                      <input 
                        type="range" 
                        min="4" 
                        max="32" 
                        value={settings.fontSize} 
                        onChange={(e) => settings.setFontSize(Number(e.target.value))} 
                        className="range range-primary range-lg" 
                        step="1" 
                      />
                      <div className="w-full flex justify-between text-xs px-2 mt-2 opacity-70">
                        <span>Tiny (4px)</span>
                        <span>Normal (16px)</span>
                        <span>Huge (32px)</span>
                      </div>
=======
                        <span className="label-text text-sm">Font Size</span>
                        <span className="badge badge-primary badge-sm">{settings.fontSize}px</span>
                      </label>
                      <input 
                        type="range" 
                        min="12" 
                        max="24" 
                        value={settings.fontSize}
                        onChange={(e) => settings.setFontSize(Number(e.target.value))}
                        className="range range-primary range-sm"
                      />
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
                    </div>

                    <div className="form-control">
                      <label className="label">
<<<<<<< HEAD
                        <span className="label-text font-semibold">Line Height</span>
                        <span className="label-text-alt badge badge-secondary">{settings.lineHeight}</span>
=======
                        <span className="label-text text-sm">Line Height</span>
                        <span className="badge badge-secondary badge-sm">{settings.lineHeight}</span>
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
                      </label>
                      <input 
                        type="range" 
                        min="1" 
<<<<<<< HEAD
                        max="2.5" 
                        step="0.1" 
                        value={settings.lineHeight} 
                        onChange={(e) => settings.setLineHeight(Number(e.target.value))} 
                        className="range range-secondary range-lg" 
                      />
                      <div className="w-full flex justify-between text-xs px-2 mt-2 opacity-70">
                        <span>Tight</span>
                        <span>Normal</span>
                        <span>Relaxed</span>
                      </div>
=======
                        max="2" 
                        step="0.1" 
                        value={settings.lineHeight}
                        onChange={(e) => settings.setLineHeight(Number(e.target.value))}
                        className="range range-secondary range-sm"
                      />
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
                    </div>

                    <div className="form-control">
                      <label className="label">
<<<<<<< HEAD
                        <span className="label-text font-semibold">Letter Spacing</span>
                        <span className="label-text-alt badge badge-accent">{settings.letterSpacing}px</span>
                      </label>
                      <input 
                        type="range" 
                        min="-2" 
                        max="4" 
                        step="0.5" 
                        value={settings.letterSpacing} 
                        onChange={(e) => settings.setLetterSpacing(Number(e.target.value))} 
                        className="range range-accent range-lg" 
                      />
                      <div className="w-full flex justify-between text-xs px-2 mt-2 opacity-70">
                        <span>Tight</span>
                        <span>Normal</span>
                        <span>Wide</span>
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Border Radius</span>
                        <span className="label-text-alt badge badge-info">{settings.borderRadius}px</span>
=======
                        <span className="label-text text-sm">Border Radius</span>
                        <span className="badge badge-accent badge-sm">{settings.borderRadius}px</span>
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="24" 
                        step="2" 
<<<<<<< HEAD
                        value={settings.borderRadius} 
                        onChange={(e) => settings.setBorderRadius(Number(e.target.value))} 
                        className="range range-info range-lg" 
                      />
                      <div className="w-full flex justify-between text-xs px-2 mt-2 opacity-70">
                        <span>Square</span>
                        <span>Soft</span>
                        <span>Round</span>
                      </div>
                    </div>
                  </div>

                  <div className="divider my-6"></div>

                  <h4 className="font-bold text-lg mb-4">Preview</h4>
                  <div className="p-6 bg-base-100 rounded-lg border-2 border-base-300" style={{ 
                    fontFamily: settings.fontFamily, 
                    fontSize: `${settings.fontSize}px`,
                    lineHeight: settings.lineHeight,
                    letterSpacing: `${settings.letterSpacing}px`,
                    borderRadius: `${settings.borderRadius}px`
                  }}>
                    <h5 className="font-bold mb-2">Sample Heading</h5>
                    <p>The quick brown fox jumps over the lazy dog. This is a preview of your typography settings with all customizations applied in real-time.</p>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-6">Layout & Visual Effects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Card Style</span></label>
                      <select className="select select-bordered" value={settings.cardStyle} onChange={(e) => settings.setCardStyle(e.target.value as any)}>
                        <option value="elevated">🎨 Elevated (Shadow)</option>
                        <option value="flat">📐 Flat (Minimal)</option>
                        <option value="outlined">🖼️ Outlined (Border)</option>
                        <option value="gradient">🌈 Gradient (Modern)</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">List Style</span></label>
                      <select className="select select-bordered" value={settings.listStyle} onChange={(e) => settings.setListStyle(e.target.value as any)}>
                        <option value="card">Card</option>
                        <option value="minimal">Minimal</option>
                        <option value="bordered">Bordered</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Spacing</span></label>
                      <select className="select select-bordered" value={settings.spacing} onChange={(e) => settings.setSpacing(e.target.value as any)}>
                        <option value="compact">Compact</option>
                        <option value="normal">Normal</option>
                        <option value="relaxed">Relaxed</option>
                        <option value="loose">Loose</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Animation Speed</span></label>
                      <select className="select select-bordered" value={settings.animationSpeed} onChange={(e) => settings.setAnimationSpeed(e.target.value as any)}>
                        <option value="none">⏸️ None</option>
                        <option value="slow">🐢 Slow</option>
                        <option value="normal">⚡ Normal</option>
                        <option value="fast">🚀 Fast</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Shadow Intensity</span></label>
                      <select className="select select-bordered" value={settings.shadowIntensity} onChange={(e) => settings.setShadowIntensity(e.target.value as any)}>
                        <option value="none">None</option>
                        <option value="light">Light</option>
                        <option value="medium">Medium</option>
                        <option value="heavy">Heavy</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Scrollbar Style</span></label>
                      <select className="select select-bordered" value={settings.scrollbarStyle} onChange={(e) => settings.setScrollbarStyle(e.target.value as any)}>
                        <option value="default">Default</option>
                        <option value="minimal">Minimal</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                    <label className="label cursor-pointer justify-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300 hover:border-primary transition-colors">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.showPageHeader} onChange={settings.toggleShowPageHeader} />
                      <span className="label-text font-medium">Page Headers</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300 hover:border-primary transition-colors">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.pageTransitions} onChange={() => settings.setPageTransitions(!settings.pageTransitions)} />
                      <span className="label-text font-medium">Page Transitions</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300 hover:border-primary transition-colors">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.glassEffect} onChange={() => settings.setGlassEffect(!settings.glassEffect)} />
                      <span className="label-text font-medium">Glass Effect</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SIDEBAR TAB */}
          {activeTab === 'sidebar' && (
            <div className="space-y-6">
              <div className="alert alert-success">
                <Eye size={20} />
                <span>Enhanced sidebar controls with extended ranges - Width: 100-500px, Opacity: 30-100%</span>
              </div>

              <div className="card bg-base-200 border border-base-300 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-6">Sidebar Dimensions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Width</span>
                        <span className="label-text-alt badge badge-primary badge-lg">{settings.sidebarWidth}px</span>
                      </label>
                      <input 
                        type="range" 
                        min="100" 
                        max="500" 
                        value={settings.sidebarWidth} 
                        onChange={(e) => settings.setSidebarWidth(Number(e.target.value))} 
                        className="range range-primary range-lg" 
                        step="20" 
                      />
                      <div className="w-full flex justify-between text-xs px-2 mt-2 opacity-70">
                        <span>Narrow (100px)</span>
                        <span>Normal (300px)</span>
                        <span>Wide (500px)</span>
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Opacity</span>
                        <span className="label-text-alt badge badge-secondary badge-lg">{settings.sidebarOpacity}%</span>
                      </label>
                      <input 
                        type="range" 
                        min="30" 
                        max="100" 
                        value={settings.sidebarOpacity} 
                        onChange={(e) => settings.setSidebarOpacity(Number(e.target.value))} 
                        className="range range-secondary range-lg" 
                        step="5" 
                      />
                      <div className="w-full flex justify-between text-xs px-2 mt-2 opacity-70">
                        <span>Transparent (30%)</span>
                        <span>Medium (65%)</span>
                        <span>Solid (100%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Position</span></label>
                      <div className="join w-full">
                        <button className={`btn join-item flex-1 ${settings.sidebarPosition === 'left' ? 'btn-primary' : 'btn-outline'}`} onClick={() => settings.setSidebarPosition('left')}>← Left</button>
                        <button className={`btn join-item flex-1 ${settings.sidebarPosition === 'right' ? 'btn-primary' : 'btn-outline'}`} onClick={() => settings.setSidebarPosition('right')}>Right →</button>
                      </div>
                    </div>
                    
                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Icon Size</span></label>
                      <select className="select select-bordered" value={settings.sidebarIconSize} onChange={(e) => settings.setSidebarIconSize(e.target.value as any)}>
                        <option value="small">Small (16px)</option>
                        <option value="medium">Medium (20px)</option>
                        <option value="large">Large (24px)</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Font Size</span></label>
                      <select className="select select-bordered" value={settings.sidebarFontSize} onChange={(e) => settings.setSidebarFontSize(e.target.value as any)}>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>

                    <div className="form-control md:col-span-2">
                      <label className="label"><span className="label-text font-semibold">Clock Format</span></label>
                      <div className="join w-full">
                        <button className={`btn join-item flex-1 ${settings.clockFormat === '12h' ? 'btn-primary' : 'btn-outline'}`} onClick={() => settings.setClockFormat('12h')}>12 Hour</button>
                        <button className={`btn join-item flex-1 ${settings.clockFormat === '24h' ? 'btn-primary' : 'btn-outline'}`} onClick={() => settings.setClockFormat('24h')}>24 Hour</button>
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Date Format</span></label>
                      <select className="select select-bordered" value={settings.dateFormat} onChange={(e) => settings.setDateFormat(e.target.value as any)}>
                        <option value="short">Short (Jan 9)</option>
                        <option value="long">Long (January 9, 2025)</option>
                        <option value="full">Full (Sunday, January 9, 2025)</option>
                      </select>
=======
                        value={settings.borderRadius}
                        onChange={(e) => settings.setBorderRadius(Number(e.target.value))}
                        className="range range-accent range-sm"
                      />
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
                    </div>
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              <div className="card bg-base-200 border border-base-300 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-6">Sidebar Styling</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-semibold">Border Style</span></label>
                      <select className="select select-bordered" value={settings.sidebarBorderStyle} onChange={(e) => settings.setSidebarBorderStyle(e.target.value as any)}>
                        <option value="none">None</option>
                        <option value="solid">Solid Line</option>
                        <option value="dashed">Dashed</option>
                        <option value="dotted">Dotted</option>
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Border Width</span>
                        <span className="label-text-alt">{settings.sidebarBorderWidth}px</span>
                      </label>
                      <input type="range" min="1" max="5" value={settings.sidebarBorderWidth} onChange={(e) => settings.setSidebarBorderWidth(Number(e.target.value))} className="range range-accent" />
                    </div>
                  </div>
                  
                  <div className="form-control mb-4">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="toggle toggle-primary toggle-lg" checked={settings.sidebarGradient} onChange={() => settings.setSidebarGradient(!settings.sidebarGradient)} />
                      <span className="label-text font-semibold">Enable Gradient Background</span>
                    </label>
                  </div>

                  {settings.sidebarGradient && (
                    <div className="grid grid-cols-2 gap-6 p-6 bg-base-100 rounded-xl border-2 border-primary/30">
                      <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Gradient From</span></label>
                        <input type="color" className="input input-bordered h-16 w-full cursor-pointer" value={settings.sidebarGradientFrom} onChange={(e) => settings.setSidebarGradientFrom(e.target.value)} />
                        <p className="text-xs mt-2 opacity-60">{settings.sidebarGradientFrom}</p>
                      </div>
                      <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Gradient To</span></label>
                        <input type="color" className="input input-bordered h-16 w-full cursor-pointer" value={settings.sidebarGradientTo} onChange={(e) => settings.setSidebarGradientTo(e.target.value)} />
                        <p className="text-xs mt-2 opacity-60">{settings.sidebarGradientTo}</p>
                      </div>
                      <div className="col-span-2">
                        <label className="label"><span className="label-text font-semibold">Preview</span></label>
                        <div className="h-24 rounded-xl shadow-lg" style={{ background: `linear-gradient(180deg, ${settings.sidebarGradientFrom}, ${settings.sidebarGradientTo})` }}></div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                    <label className="label cursor-pointer justify-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300 hover:border-primary transition-colors">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.sidebarBlur} onChange={() => settings.setSidebarBlur(!settings.sidebarBlur)} />
                      <span className="label-text font-medium">Blur</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300 hover:border-primary transition-colors">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.sidebarShadow} onChange={() => settings.setSidebarShadow(!settings.sidebarShadow)} />
                      <span className="label-text font-medium">Shadow</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300 hover:border-primary transition-colors">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.sidebarAnimation} onChange={() => settings.setSidebarAnimation(!settings.sidebarAnimation)} />
                      <span className="label-text font-medium">Animations</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300 hover:border-primary transition-colors">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.sidebarCompactMode} onChange={settings.toggleSidebarCompactMode} />
                      <span className="label-text font-medium">Compact</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-6">Display Widgets</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { key: 'sidebarShowIcons', label: 'Icons', toggle: settings.toggleSidebarIcons, checked: settings.sidebarShowIcons },
                      { key: 'sidebarShowLabels', label: 'Labels', toggle: settings.toggleSidebarLabels, checked: settings.sidebarShowLabels },
                      { key: 'sidebarShowProgress', label: 'Progress', toggle: settings.toggleSidebarProgress, checked: settings.sidebarShowProgress },
                      { key: 'sidebarShowClock', label: 'Clock', toggle: settings.toggleSidebarClock, checked: settings.sidebarShowClock },
                      { key: 'sidebarShowDate', label: 'Date', toggle: settings.toggleSidebarDate, checked: settings.sidebarShowDate },
                      { key: 'sidebarShowStreak', label: 'Streak', toggle: settings.toggleSidebarStreak, checked: settings.sidebarShowStreak },
                      { key: 'sidebarShowStats', label: 'Stats', toggle: settings.toggleSidebarStats, checked: settings.sidebarShowStats },
                      { key: 'sidebarShowWeather', label: 'Weather', toggle: settings.toggleSidebarWeather, checked: settings.sidebarShowWeather },
                      { key: 'sidebarShowQuote', label: 'Quote', toggle: settings.toggleSidebarQuote, checked: settings.sidebarShowQuote },
                      { key: 'sidebarShowQuickActions', label: 'Quick Actions', toggle: settings.toggleSidebarQuickActions, checked: settings.sidebarShowQuickActions },
                    ].map((item) => (
                      <label key={item.key} className="label cursor-pointer justify-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300 hover:border-primary transition-colors">
                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={item.checked} onChange={item.toggle} />
                        <span className="label-text font-medium">{item.label}</span>
=======
              {/* Visual Effects */}
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Sparkles size={20} className="text-primary" />
                    Visual Effects
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                      { label: 'Card Style', value: settings.cardStyle, options: ['elevated', 'flat', 'outlined', 'gradient'] as const, set: (val: string) => settings.setCardStyle(val as any) },
                      { label: 'List Style', value: settings.listStyle, options: ['card', 'minimal', 'bordered'] as const, set: (val: string) => settings.setListStyle(val as any) },
                      { label: 'Spacing', value: settings.spacing, options: ['compact', 'normal', 'relaxed', 'loose'] as const, set: (val: string) => settings.setSpacing(val as any) },
                      { label: 'Animation', value: settings.animationSpeed, options: ['none', 'slow', 'normal', 'fast'] as const, set: (val: string) => settings.setAnimationSpeed(val as any) },
                      { label: 'Shadow', value: settings.shadowIntensity, options: ['none', 'light', 'medium', 'heavy'] as const, set: (val: string) => settings.setShadowIntensity(val as any) },
                      { label: 'Scrollbar', value: settings.scrollbarStyle, options: ['default', 'minimal', 'custom'] as const, set: (val: string) => settings.setScrollbarStyle(val as any) },
                    ].map((item) => (
                      <div key={item.label} className="form-control">
                        <label className="label pb-1"><span className="label-text text-xs">{item.label}</span></label>
                        <select className="select select-bordered select-sm" value={item.value} onChange={(e) => item.set(e.target.value)}>
                          {item.options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  <div className="divider my-3"></div>

                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: 'Page Header', checked: settings.showPageHeader, toggle: settings.toggleShowPageHeader },
                      { label: 'Page Transitions', checked: settings.pageTransitions, toggle: () => settings.setPageTransitions(!settings.pageTransitions) },
                      { label: 'Glass Effect', checked: settings.glassEffect, toggle: () => settings.setGlassEffect(!settings.glassEffect) },
                    ].map((item) => (
                      <label key={item.label} className="label cursor-pointer gap-2 px-4 py-2 bg-base-100 rounded-lg border border-base-300 hover:border-primary transition-colors">
                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={item.checked} onChange={item.toggle} />
                        <span className="label-text text-sm">{item.label}</span>
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
                      </label>
                    ))}
                  </div>
                </div>
              </div>
<<<<<<< HEAD
            </div>
=======
            </>
          )}

          {/* SIDEBAR TAB */}
          {activeTab === 'sidebar' && (
            <>
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Frame size={20} className="text-primary" />
                    Sidebar Layout
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-sm">Width</span>
                        <span className="badge badge-sm">{settings.sidebarWidth}px</span>
                      </label>
                      <input type="range" min="200" max="400" step="20" value={settings.sidebarWidth} onChange={(e) => settings.setSidebarWidth(Number(e.target.value))} className="range range-primary range-sm" />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-sm">Opacity</span>
                        <span className="badge badge-sm">{settings.sidebarOpacity}%</span>
                      </label>
                      <input type="range" min="50" max="100" value={settings.sidebarOpacity} onChange={(e) => settings.setSidebarOpacity(Number(e.target.value))} className="range range-primary range-sm" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text text-sm">Position</span></label>
                      <select className="select select-bordered select-sm" value={settings.sidebarPosition} onChange={(e) => settings.setSidebarPosition(e.target.value as any)}>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text text-sm">Icon Size</span></label>
                      <select className="select select-bordered select-sm" value={settings.sidebarIconSize} onChange={(e) => settings.setSidebarIconSize(e.target.value as any)}>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Eye size={20} className="text-primary" />
                    Sidebar Elements
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { label: 'Show Icons', checked: settings.sidebarShowIcons, toggle: settings.toggleSidebarIcons },
                      { label: 'Show Labels', checked: settings.sidebarShowLabels, toggle: settings.toggleSidebarLabels },
                      { label: 'Show Progress', checked: settings.sidebarShowProgress, toggle: settings.toggleSidebarProgress },
                      { label: 'Show Clock', checked: settings.sidebarShowClock, toggle: settings.toggleSidebarClock },
                      { label: 'Show Date', checked: settings.sidebarShowDate, toggle: settings.toggleSidebarDate },
                      { label: 'Show Streak', checked: settings.sidebarShowStreak, toggle: settings.toggleSidebarStreak },
                      { label: 'Show Stats', checked: settings.sidebarShowStats, toggle: settings.toggleSidebarStats },
                      { label: 'Compact Mode', checked: settings.sidebarCompactMode, toggle: settings.toggleSidebarCompactMode },
                      { label: 'Shadow', checked: settings.sidebarShadow, toggle: () => settings.setSidebarShadow(!settings.sidebarShadow) },
                      { label: 'Blur Effect', checked: settings.sidebarBlur, toggle: () => settings.setSidebarBlur(!settings.sidebarBlur) },
                      { label: 'Animation', checked: settings.sidebarAnimation, toggle: () => settings.setSidebarAnimation(!settings.sidebarAnimation) },
                    ].map((item) => (
                      <label key={item.label} className="label cursor-pointer justify-start gap-2 px-3 py-2 bg-base-100 rounded-lg border border-base-300 hover:border-primary transition-colors">
                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={item.checked} onChange={item.toggle} />
                        <span className="label-text text-sm">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </>
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
          )}

          {/* THEMES TAB */}
          {activeTab === 'themes' && (
<<<<<<< HEAD
            <div className="space-y-6">
              <div className="card bg-base-200 border border-base-300 shadow-xl">
                <div className="card-body">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="card-title text-xl flex items-center gap-2">
                      <Paintbrush size={24} className="text-primary" />
                      Built-in Themes ({availableThemes.length})
                    </h3>
                    <button onClick={() => setShowThemeBuilder(true)} className="btn btn-primary gap-2">
                      <Plus size={18} /> Create Custom Theme
                    </button>
                  </div>

                  {Object.entries(groupedThemes).map(([category, themes]) => (
                    <div key={category} className="mb-6">
                      <h4 className="font-bold text-md mb-3 flex items-center gap-2">
                        <Sparkles size={16} className="text-primary" />
                        {category} Themes
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                        {themes.map((t) => (
                          <button
                            key={t.name}
                            onClick={() => settings.setTheme(t.name)}
                            className={`btn btn-sm ${settings.theme === t.name ? 'btn-primary' : 'btn-outline'}`}
                            title={t.label}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {settings.customThemes.length > 0 && (
                <div className="card bg-base-200 border border-base-300 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-xl mb-6">Your Custom Themes ({settings.customThemes.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {settings.customThemes.map((theme) => (
                        <div key={theme.id} className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition-shadow">
                          <div className="card-body p-4">
                            <h4 className="font-bold mb-2">{theme.name}</h4>
                            <div className="flex gap-1 mb-3 flex-wrap">
                              <div className="w-6 h-6 rounded" style={{ backgroundColor: theme.colors.primary }} title="Primary" />
                              <div className="w-6 h-6 rounded" style={{ backgroundColor: theme.colors.secondary }} title="Secondary" />
                              <div className="w-6 h-6 rounded" style={{ backgroundColor: theme.colors.accent }} title="Accent" />
                              <div className="w-6 h-6 rounded" style={{ backgroundColor: theme.colors.success }} title="Success" />
                              <div className="w-6 h-6 rounded" style={{ backgroundColor: theme.colors.error }} title="Error" />
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => settings.setTheme(theme.id)} className={`btn btn-sm flex-1 ${settings.theme === theme.id ? 'btn-primary' : 'btn-outline'}`}>
                                {settings.theme === theme.id ? 'Active' : 'Apply'}
                              </button>
                              <button onClick={() => settings.deleteCustomTheme(theme.id)} className="btn btn-sm btn-error btn-outline">
                                <Trash2 size={14} />
                              </button>
                            </div>
=======
            <>
              <div className="alert alert-info border border-info/30">
                <Info size={20} />
                <div>
                  <h4 className="font-bold">Theme Gallery</h4>
                  <p className="text-sm">Choose from {availableThemes.length} beautiful pre-built themes or create your own</p>
                </div>
              </div>

              {Object.entries(groupedThemes).map(([category, themes]) => (
                <div key={category} className="card bg-base-200 border border-base-300">
                  <div className="card-body">
                    <h3 className="text-lg font-bold mb-4 capitalize">{category} Themes</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {themes.map((theme) => {
                        // Generate color from theme name
                        const hash = theme.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                        const hue = hash % 360;
                        const gradient = `linear-gradient(135deg, hsl(${hue}, 70%, 50%) 0%, hsl(${(hue + 60) % 360}, 70%, 50%) 100%)`;

                        return (
                          <button
                            key={theme.name}
                            onClick={() => settings.setTheme(theme.name)}
                            className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                              settings.theme === theme.name ? 'border-primary ring-2 ring-primary/50' : 'border-base-300 hover:border-primary/50'
                            }`}
                            style={{ background: gradient }}
                          >
                            <div className="text-sm font-bold text-white drop-shadow-lg">{theme.label || theme.name}</div>
                            {settings.theme === theme.name && (
                              <div className="badge badge-sm bg-white text-primary mt-2">Active</div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {settings.customThemes.length > 0 && (
                <div className="card bg-base-200 border border-base-300">
                  <div className="card-body">
                    <h3 className="text-lg font-bold mb-4">Custom Themes</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {settings.customThemes.map((theme) => (
                        <div key={theme.id} className={`p-4 rounded-lg border-2 relative ${settings.theme === theme.name ? 'border-primary' : 'border-base-300'}`}
                          style={{ background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)` }}
                        >
                          <div className="text-sm font-bold text-white mb-2">{theme.name}</div>
                          <div className="flex gap-2">
                            <button onClick={() => settings.setTheme(theme.name)} className="btn btn-xs btn-primary flex-1">Apply</button>
                            <button onClick={() => settings.deleteCustomTheme(theme.id)} className="btn btn-xs btn-error"><Trash2 size={12} /></button>
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

<<<<<<< HEAD
              {showThemeBuilder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowThemeBuilder(false)}>
                  <div className="bg-base-200 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-base-300 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-base-300">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                          <Paintbrush size={24} />
                          Create Custom Theme
                        </h3>
                        <button onClick={() => setShowThemeBuilder(false)} className="btn btn-ghost btn-sm btn-circle">
                          <X size={20} />
                        </button>
                      </div>

                      <div className="form-control">
                        <label className="label"><span className="label-text font-medium">Theme Name</span></label>
                        <input type="text" className="input input-bordered" value={newThemeName} onChange={(e) => setNewThemeName(e.target.value)} placeholder="My Awesome Theme" />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(newThemeColors).map(([key, value]) => (
                          <div key={key} className="form-control">
                            <label className="label"><span className="label-text font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span></label>
                            <input type="color" className="input input-bordered h-12 w-full cursor-pointer" value={value} onChange={(e) => setNewThemeColors({ ...newThemeColors, [key]: e.target.value })} />
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-base-300">
                        <button onClick={handleCreateTheme} className="btn btn-primary flex-1 gap-2" disabled={!newThemeName.trim()}>
                          <Save size={18} /> Create Theme
                        </button>
                        <button onClick={() => setShowThemeBuilder(false)} className="btn btn-outline">Cancel</button>
                      </div>
=======
              <button onClick={() => setShowThemeBuilder(!showThemeBuilder)} className="btn btn-primary btn-block gap-2">
                <Plus size={20} />
                Create Custom Theme
              </button>

              {showThemeBuilder && (
                <div className="card bg-base-200 border-2 border-primary">
                  <div className="card-body">
                    <h3 className="text-lg font-bold mb-4">Theme Builder</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label"><span className="label-text">Theme Name</span></label>
                        <input type="text" className="input input-bordered" placeholder="My Awesome Theme" value={newThemeName} onChange={(e) => setNewThemeName(e.target.value)} />
                      </div>
                      {Object.entries(newThemeColors).map(([key, value]) => (
                        <div key={key} className="form-control">
                          <label className="label">
                            <span className="label-text capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <div className="w-8 h-8 rounded border-2 border-base-300" style={{ backgroundColor: value }}></div>
                          </label>
                          <input type="color" className="input input-bordered h-12" value={value} onChange={(e) => setNewThemeColors({ ...newThemeColors, [key]: e.target.value })} />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={handleCreateTheme} className="btn btn-primary flex-1 gap-2"><Save size={18} /> Create Theme</button>
                      <button onClick={() => setShowThemeBuilder(false)} className="btn btn-ghost"><X size={18} /></button>
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
                    </div>
                  </div>
                </div>
              )}
<<<<<<< HEAD
            </div>
          )}

          {/* COMPACT MODE TAB */}
          {activeTab === 'compact' && (
            <div className="space-y-6">
              <div className="alert alert-warning">
                <Maximize2 size={20} />
                <span>Compact modes reduce spacing and size for more content on screen</span>
              </div>

              <div className="card bg-base-200 border border-base-300 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-6">Compact Mode Levels</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className={`card ${!settings.compactMode && !settings.ultraCompactMode ? 'bg-primary text-primary-content' : 'bg-base-100 border border-base-300'} cursor-pointer transition-all hover:scale-105`} onClick={() => { settings.compactMode && settings.toggleCompactMode(); settings.ultraCompactMode && settings.toggleUltraCompactMode(); }}>
                      <div className="card-body items-center text-center p-6">
                        <h4 className="text-2xl font-bold mb-2">🖥️ Normal</h4>
                        <p className="text-sm opacity-80">Standard spacing and sizes</p>
                        <div className="badge badge-lg mt-4">Default</div>
                      </div>
                    </div>

                    <div className={`card ${settings.compactMode && !settings.ultraCompactMode ? 'bg-primary text-primary-content' : 'bg-base-100 border border-base-300'} cursor-pointer transition-all hover:scale-105`} onClick={() => { !settings.compactMode && settings.toggleCompactMode(); settings.ultraCompactMode && settings.toggleUltraCompactMode(); }}>
                      <div className="card-body items-center text-center p-6">
                        <h4 className="text-2xl font-bold mb-2">📱 Compact</h4>
                        <p className="text-sm opacity-80">Reduced spacing, smaller elements</p>
                        <div className="badge badge-lg mt-4 badge-secondary">Efficient</div>
                      </div>
                    </div>

                    <div className={`card ${settings.ultraCompactMode ? 'bg-primary text-primary-content' : 'bg-base-100 border border-base-300'} cursor-pointer transition-all hover:scale-105`} onClick={() => { !settings.compactMode && settings.toggleCompactMode(); !settings.ultraCompactMode && settings.toggleUltraCompactMode(); }}>
                      <div className="card-body items-center text-center p-6">
                        <h4 className="text-2xl font-bold mb-2">⚡ Ultra</h4>
                        <p className="text-sm opacity-80">Minimal spacing, maximum density</p>
                        <div className="badge badge-lg mt-4 badge-accent">Power User</div>
                      </div>
                    </div>
                  </div>

                  <div className="divider">Card-Specific Compact</div>

                  <div className="form-control mb-6">
                    <label className="label"><span className="label-text font-semibold">Card Compact Level</span></label>
                    <select className="select select-bordered select-lg" value={settings.cardCompactLevel} onChange={(e) => settings.setCardCompactLevel(e.target.value as any)}>
                      <option value="normal">Normal - Full card details</option>
                      <option value="compact">Compact - Reduced padding</option>
                      <option value="ultra">Ultra - Minimal view</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="label cursor-pointer justify-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300 hover:border-primary transition-colors">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.cardCompactView} onChange={settings.toggleCardCompactView} />
                      <div>
                        <span className="label-text font-medium block">Kanban Compact View</span>
                        <span className="text-xs opacity-60">Smaller cards in Kanban board</span>
                      </div>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300 hover:border-primary transition-colors">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.sidebarCompactMode} onChange={settings.toggleSidebarCompactMode} />
                      <div>
                        <span className="label-text font-medium block">Sidebar Compact</span>
                        <span className="text-xs opacity-60">Reduced sidebar padding</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300 shadow-xl">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-4">Comparison</h3>
                  <div className="overflow-x-auto">
                    <table className="table table-zebra">
                      <thead>
                        <tr>
                          <th>Feature</th>
                          <th>Normal</th>
                          <th>Compact</th>
                          <th>Ultra</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Padding</td>
                          <td>Standard (16px)</td>
                          <td>Reduced (8px)</td>
                          <td>Minimal (4px)</td>
                        </tr>
                        <tr>
                          <td>Font Size</td>
                          <td>Base size</td>
                          <td>-10%</td>
                          <td>-20%</td>
                        </tr>
                        <tr>
                          <td>Line Height</td>
                          <td>1.5</td>
                          <td>1.3</td>
                          <td>1.2</td>
                        </tr>
                        <tr>
                          <td>Content Density</td>
                          <td>Low</td>
                          <td>Medium</td>
                          <td>High</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* POMODORO, KANBAN, LABELS, ADVANCED, DATA, ABOUT TABS */}
          {/* Keep the same implementation as V6.0 for these tabs */}
          {/* For brevity, I've shown the key new tabs. Other tabs remain the same */}
          {/* POMODORO TAB */}
          {activeTab === 'pomodoro' && (
            <div className="space-y-6">
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">Timer Durations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">Work (min)</span></label>
                      <input type="number" min="1" max="60" value={pomodoro.workDuration / 60} onChange={(e) => pomodoro.setWorkDuration(Number(e.target.value) * 60)} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">Short Break (min)</span></label>
                      <input type="number" min="1" max="30" value={pomodoro.breakDuration / 60} onChange={(e) => pomodoro.setBreakDuration(Number(e.target.value) * 60)} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">Long Break (min)</span></label>
                      <input type="number" min="1" max="60" value={pomodoro.longBreakDuration / 60} onChange={(e) => pomodoro.setLongBreakDuration(Number(e.target.value) * 60)} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">Long Break After</span></label>
                      <input type="number" min="2" max="10" value={settings.longBreakAfter} onChange={(e) => settings.setLongBreakAfter(Number(e.target.value))} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">Daily Goal</span></label>
                      <input type="number" min="1" max="20" value={settings.dailyPomodoroGoal} onChange={(e) => settings.setDailyPomodoroGoal(Number(e.target.value))} className="input input-bordered" />
=======
            </>
          )}

          {/* Continue in next part due to length... */}
          {/* COMPACT MODE TAB */}
          {activeTab === 'compact' && (
            <>
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Maximize2 size={20} className="text-primary" />
                    Compact Mode Settings
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Compact Mode', checked: settings.compactMode, toggle: settings.toggleCompactMode },
                      { label: 'Ultra Compact', checked: settings.ultraCompactMode, toggle: settings.toggleUltraCompactMode },
                      { label: 'Compact Cards', checked: settings.cardCompactView, toggle: settings.toggleCardCompactView },
                    ].map((item) => (
                      <label key={item.label} className="label cursor-pointer justify-start gap-2 px-4 py-3 bg-base-100 rounded-lg border border-base-300">
                        <input type="checkbox" className="toggle toggle-primary" checked={item.checked} onChange={item.toggle} />
                        <span className="label-text font-medium">{item.label}</span>
                      </label>
                    ))}
                    <div className="form-control">
                      <label className="label"><span className="label-text text-sm">Card Density</span></label>
                      <select className="select select-bordered select-sm" value={settings.cardCompactLevel} onChange={(e) => settings.setCardCompactLevel(e.target.value as any)}>
                        <option value="normal">Normal</option>
                        <option value="compact">Compact</option>
                        <option value="ultra">Ultra Compact</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* POMODORO TAB */}
          {activeTab === 'pomodoro' && (
            <>
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Clock size={20} className="text-primary" />
                    Timer Configuration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Work Duration</span>
                        <span className="badge badge-primary">{pomodoro.workDuration / 60} min</span>
                      </label>
                      <input type="range" min="5" max="60" step="5" value={pomodoro.workDuration / 60} onChange={(e) => pomodoro.setWorkDuration(Number(e.target.value) * 60)} className="range range-primary" />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Short Break</span>
                        <span className="badge badge-success">{pomodoro.breakDuration / 60} min</span>
                      </label>
                      <input type="range" min="1" max="15" value={pomodoro.breakDuration / 60} onChange={(e) => pomodoro.setBreakDuration(Number(e.target.value) * 60)} className="range range-success" />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Long Break</span>
                        <span className="badge badge-info">{pomodoro.longBreakDuration / 60} min</span>
                      </label>
                      <input type="range" min="10" max="45" step="5" value={pomodoro.longBreakDuration / 60} onChange={(e) => pomodoro.setLongBreakDuration(Number(e.target.value) * 60)} className="range range-info" />
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
<<<<<<< HEAD
                  <h3 className="card-title text-lg mb-4">Behavior</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.autoStartBreaks} onChange={settings.toggleAutoStartBreaks} />
                      <span className="label-text">Auto-start Breaks</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.autoStartPomodoros} onChange={settings.toggleAutoStartPomodoros} />
                      <span className="label-text">Auto-start Pomodoros</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.pomodoroTickSound} onChange={settings.togglePomodoroTickSound} />
                      <span className="label-text">Tick Sound</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.showTimerInTitle} onChange={settings.toggleShowTimerInTitle} />
                      <span className="label-text">Show Timer in Title</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">Sound & Notifications</h3>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <Volume2 size={16} />
                        Sound Volume: {settings.soundVolume}%
                      </span>
                    </label>
                    <input type="range" min="0" max="100" step="10" value={settings.soundVolume} onChange={(e) => settings.setSoundVolume(Number(e.target.value))} className="range range-warning" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium">Notification Position</span></label>
                      <select className="select select-bordered" value={settings.notificationPosition} onChange={(e) => settings.setNotificationPosition(e.target.value as any)}>
=======
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Zap size={20} className="text-primary" />
                    Behavior & Display
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { label: 'Auto-start Breaks', checked: settings.autoStartBreaks, toggle: settings.toggleAutoStartBreaks },
                      { label: 'Auto-start Pomodoros', checked: settings.autoStartPomodoros, toggle: settings.toggleAutoStartPomodoros },
                      { label: 'Tick Sound', checked: settings.pomodoroTickSound, toggle: settings.togglePomodoroTickSound },
                      { label: 'Timer in Title', checked: settings.showTimerInTitle, toggle: settings.toggleShowTimerInTitle },
                      { label: 'Show Statistics', checked: settings.showPomodoroStats, toggle: settings.toggleShowPomodoroStats },
                    ].map((item) => (
                      <label key={item.label} className="label cursor-pointer justify-start gap-2 px-3 py-2 bg-base-100 rounded-lg border border-base-300">
                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={item.checked} onChange={item.toggle} />
                        <span className="label-text text-sm">{item.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="divider my-2"></div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Daily Goal</span>
                      <span className="badge badge-accent">{settings.dailyPomodoroGoal} sessions</span>
                    </label>
                    <input type="range" min="1" max="20" value={settings.dailyPomodoroGoal} onChange={(e) => settings.setDailyPomodoroGoal(Number(e.target.value))} className="range range-accent" />
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Layout size={20} className="text-primary" />
                    Timer Layout
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {['classic', 'modern', 'minimal', 'fullscreen', 'compact', 'focus', 'minimal-pro'].map((layout) => (
                      <button
                        key={layout}
                        onClick={() => settings.setPomodoroLayout(layout as any)}
                        className={`btn btn-sm ${settings.pomodoroLayout === layout ? 'btn-primary' : 'btn-outline'}`}
                      >
                        {layout}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* KANBAN TAB */}
          {activeTab === 'kanban' && (
            <>
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Layout size={20} className="text-primary" />
                    Board Behavior
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[
                      { label: 'Card Numbers', checked: settings.showCardNumbers, toggle: settings.toggleCardNumbers },
                      { label: 'Drag & Drop', checked: settings.enableDragDrop, toggle: settings.toggleEnableDragDrop },
                      { label: 'Drag Handles', checked: settings.showDragHandles, toggle: settings.toggleShowDragHandles },
                      { label: 'Auto Archive', checked: settings.autoArchiveCompleted, toggle: settings.toggleAutoArchiveCompleted },
                      { label: 'Card Covers', checked: settings.showCardCovers, toggle: settings.toggleShowCardCovers },
                      { label: 'Color Coding', checked: settings.cardColorCoding, toggle: settings.toggleCardColorCoding },
                      { label: 'Highlight Overdue', checked: settings.highlightOverdueCards, toggle: settings.toggleHighlightOverdueCards },
                      { label: 'Show Age', checked: settings.showCardAge, toggle: settings.toggleShowCardAge },
                      { label: 'Hover Preview', checked: settings.cardHoverPreview, toggle: settings.toggleCardHoverPreview },
                      { label: 'Quick Edit', checked: settings.enableQuickEdit, toggle: settings.toggleEnableQuickEdit },
                    ].map((item) => (
                      <label key={item.label} className="label cursor-pointer justify-start gap-2 px-3 py-2 bg-base-100 rounded-lg border border-base-300 hover:border-primary transition-colors">
                        <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={item.checked} onChange={item.toggle} />
                        <span className="label-text text-sm">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Sliders size={20} className="text-primary" />
                    Advanced Options
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Drag Animation Speed</span>
                        <span className="badge badge-sm">{settings.dragAnimationDuration}ms</span>
                      </label>
                      <input type="range" min="100" max="500" step="50" value={settings.dragAnimationDuration} onChange={(e) => settings.setDragAnimationDuration(Number(e.target.value))} className="range range-primary range-sm" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text">Auto-sort Cards</span></label>
                      <select className="select select-bordered select-sm" value={settings.autoSortCards} onChange={(e) => settings.setAutoSortCards(e.target.value as any)}>
                        <option value="none">None</option>
                        <option value="priority">By Priority</option>
                        <option value="date">By Date</option>
                        <option value="alphabetical">Alphabetical</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* LABELS TAB */}
          {activeTab === 'labels' && (
            <>
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Tag size={20} className="text-primary" />
                      Custom Labels ({settings.customLabels.length})
                    </h3>
                    <button onClick={() => setShowAddLabel(!showAddLabel)} className="btn btn-primary btn-sm gap-2">
                      <Plus size={16} />
                      Add Label
                    </button>
                  </div>

                  {showAddLabel && (
                    <div className="bg-base-100 p-4 rounded-lg border border-primary mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="form-control md:col-span-2">
                          <input type="text" className="input input-bordered input-sm" placeholder="Label name" value={newLabelName} onChange={(e) => setNewLabelName(e.target.value)} />
                        </div>
                        <div className="form-control">
                          <input type="color" className="input input-bordered h-10" value={newLabelColor} onChange={(e) => setNewLabelColor(e.target.value)} />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button onClick={handleAddLabel} className="btn btn-primary btn-sm flex-1 gap-2">
                          <Save size={16} />
                          Save Label
                        </button>
                        <button onClick={() => setShowAddLabel(false)} className="btn btn-ghost btn-sm">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {settings.customLabels.map((label) => (
                      <div key={label.id} className="flex items-center gap-2 p-3 bg-base-100 rounded-lg border border-base-300">
                        {editingLabelId === label.id ? (
                          <>
                            <input type="text" className="input input-bordered input-sm flex-1" value={editLabelName} onChange={(e) => setEditLabelName(e.target.value)} />
                            <input type="color" className="w-10 h-10 rounded border" value={editLabelColor} onChange={(e) => setEditLabelColor(e.target.value)} />
                            <button onClick={handleSaveLabel} className="btn btn-primary btn-sm btn-circle">
                              <Save size={14} />
                            </button>
                            <button onClick={() => setEditingLabelId(null)} className="btn btn-ghost btn-sm btn-circle">
                              <X size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: label.color }}></div>
                            <span className="flex-1 text-sm font-medium">{label.name}</span>
                            <button onClick={() => handleEditLabel(label)} className="btn btn-ghost btn-sm btn-circle">
                              <Edit2 size={14} />
                            </button>
                            <button onClick={() => settings.deleteCustomLabel(label.id)} className="btn btn-ghost btn-sm btn-circle text-error">
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  {settings.customLabels.length === 0 && (
                    <div className="text-center py-8 opacity-60">
                      <Tag size={48} className="mx-auto mb-3 opacity-30" />
                      <p>No custom labels yet. Create your first label above!</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Palette size={20} className="text-primary" />
                    Color Palette
                  </h3>
                  <div className="grid grid-cols-10 md:grid-cols-20 gap-2">
                    {colorPalette.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewLabelColor(color)}
                        className="w-10 h-10 rounded-lg border-2 border-base-300 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ADVANCED TAB */}
          {activeTab === 'advanced' && (
            <>
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Volume2 size={20} className="text-primary" />
                    Audio & Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-base-100 rounded-lg border border-base-300">
                      <div className="flex items-center gap-3">
                        <Volume2 size={20} />
                        <div>
                          <div className="font-medium">Sound Effects</div>
                          <div className="text-xs opacity-60">Play beeps when timer completes</div>
                        </div>
                      </div>
                      <input type="checkbox" className="toggle toggle-primary" checked={settings.soundEnabled} onChange={settings.toggleSound} />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Sound Volume</span>
                        <span className="badge badge-primary">{settings.soundVolume}%</span>
                      </label>
                      <input type="range" min="0" max="100" value={settings.soundVolume} onChange={(e) => settings.setSoundVolume(Number(e.target.value))} className="range range-primary" disabled={!settings.soundEnabled} />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-base-100 rounded-lg border border-base-300">
                      <div className="flex items-center gap-3">
                        <Bell size={20} />
                        <div>
                          <div className="font-medium">Browser Notifications</div>
                          <div className="text-xs opacity-60">Show desktop notifications</div>
                        </div>
                      </div>
                      <input type="checkbox" className="toggle toggle-primary" checked={settings.notifications} onChange={settings.toggleNotifications} />
                    </div>

                    <div className="form-control">
                      <label className="label"><span className="label-text">Notification Position</span></label>
                      <select className="select select-bordered" value={settings.notificationPosition} onChange={(e) => settings.setNotificationPosition(e.target.value as any)} disabled={!settings.notifications}>
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
                        <option value="top-right">Top Right</option>
                        <option value="top-left">Top Left</option>
                        <option value="bottom-right">Bottom Right</option>
                        <option value="bottom-left">Bottom Left</option>
                      </select>
                    </div>
                  </div>
<<<<<<< HEAD
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.notifications} onChange={settings.toggleNotifications} />
                      <span className="label-text">Desktop Notifications</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.soundEnabled} onChange={settings.toggleSound} />
                      <span className="label-text">Sound Effects</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* KANBAN TAB - Keep existing from V5.5 */}
          {activeTab === 'kanban' && (
            <div className="space-y-6">
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">Basic Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.showCardNumbers} onChange={settings.toggleCardNumbers} />
                      <span className="label-text">Show Card Numbers</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.cardCompactView} onChange={settings.toggleCardCompactView} />
                      <span className="label-text">Compact Card View</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.autoArchiveCompleted} onChange={settings.toggleAutoArchiveCompleted} />
                      <span className="label-text">Auto-Archive Completed</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">Drag & Drop</h3>
                  <div className="form-control mb-4">
                    <label className="label"><span className="label-text font-medium">Animation Duration: {settings.dragAnimationDuration}ms</span></label>
                    <input type="range" min="100" max="500" step="50" value={settings.dragAnimationDuration} onChange={(e) => settings.setDragAnimationDuration(Number(e.target.value))} className="range range-accent" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.enableDragDrop} onChange={settings.toggleEnableDragDrop} />
                      <span className="label-text">Enable Drag & Drop</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.showDragHandles} onChange={settings.toggleShowDragHandles} />
                      <span className="label-text">Show Drag Handles</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border-2 border-warning">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="card-title text-lg">Advanced Features</h3>
                    <div className="badge badge-warning">Experimental</div>
                  </div>
                  <p className="text-sm opacity-70 mb-4">These features are disabled by default and may affect performance.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.showCardCovers} onChange={settings.toggleShowCardCovers} />
                      <span className="label-text">Card Covers</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.showCardAttachments} onChange={settings.toggleShowCardAttachments} />
                      <span className="label-text">Attachments</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.showCardComments} onChange={settings.toggleShowCardComments} />
                      <span className="label-text">Comments</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.showCardActivity} onChange={settings.toggleShowCardActivity} />
                      <span className="label-text">Activity Log</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.cardColorCoding} onChange={settings.toggleCardColorCoding} />
                      <span className="label-text">Color Coding</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.showCardEstimates} onChange={settings.toggleShowCardEstimates} />
                      <span className="label-text">Time Estimates</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.enableCardTemplates} onChange={settings.toggleEnableCardTemplates} />
                      <span className="label-text">Card Templates</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.showListLimits} onChange={settings.toggleShowListLimits} />
                      <span className="label-text">List Limits</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.highlightOverdueCards} onChange={settings.toggleHighlightOverdueCards} />
                      <span className="label-text">Highlight Overdue</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.showCardAge} onChange={settings.toggleShowCardAge} />
                      <span className="label-text">Show Card Age</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.enableCardDependencies} onChange={settings.toggleEnableCardDependencies} />
                      <span className="label-text">Dependencies</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.showCardProgress} onChange={settings.toggleShowCardProgress} />
                      <span className="label-text">Progress Bars</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.cardHoverPreview} onChange={settings.toggleCardHoverPreview} />
                      <span className="label-text">Hover Preview</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.enableQuickEdit} onChange={settings.toggleEnableQuickEdit} />
                      <span className="label-text">Quick Edit</span>
                    </label>
                  </div>
                  <div className="divider"></div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-medium">Auto Sort Cards</span></label>
                    <select className="select select-bordered" value={settings.autoSortCards} onChange={(e) => settings.setAutoSortCards(e.target.value as any)}>
                      <option value="none">None (Manual)</option>
                      <option value="priority">By Priority</option>
                      <option value="date">By Due Date</option>
                      <option value="alphabetical">Alphabetical</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LABELS TAB - Keep existing */}
          {activeTab === 'labels' && (
            <div className="space-y-6">
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">Custom Labels ({settings.customLabels.length})</h3>
                  <div className="space-y-3 mb-4">
                    {settings.customLabels.map((label) => (
                      <div key={label.id} className="flex items-center gap-3 p-3 bg-base-100 rounded-lg border border-base-300">
                        {editingLabelId === label.id ? (
                          <>
                            <input type="text" className="input input-sm input-bordered flex-1" value={editLabelName} onChange={(e) => setEditLabelName(e.target.value)} placeholder="Label name" />
                            <div className="flex gap-1 flex-wrap">
                              {colorPalette.slice(0, 10).map((color) => (
                                <button key={color} className={`w-8 h-8 rounded border-2 transition-transform ${editLabelColor === color ? 'border-base-content scale-110' : 'border-transparent'}`} style={{ backgroundColor: color }} onClick={() => setEditLabelColor(color)} />
                              ))}
                            </div>
                            <button onClick={handleSaveLabel} className="btn btn-primary btn-sm gap-1"><Save size={14} /> Save</button>
                            <button onClick={() => setEditingLabelId(null)} className="btn btn-ghost btn-sm"><X size={14} /></button>
                          </>
                        ) : (
                          <>
                            <div className="w-6 h-6 rounded" style={{ backgroundColor: label.color }} />
                            <span className="flex-1 font-medium">{label.name}</span>
                            <button onClick={() => handleEditLabel(label)} className="btn btn-ghost btn-sm gap-1"><Edit2 size={14} /> Edit</button>
                            <button onClick={() => settings.deleteCustomLabel(label.id)} className="btn btn-ghost btn-sm text-error"><Trash2 size={14} /></button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  {showAddLabel ? (
                    <div className="p-4 bg-base-100 rounded-lg border border-primary space-y-3">
                      <input type="text" className="input input-bordered w-full" value={newLabelName} onChange={(e) => setNewLabelName(e.target.value)} placeholder="Enter label name" autoFocus />
                      <div className="flex gap-2 flex-wrap">
                        {colorPalette.map((color) => (
                          <button key={color} className={`w-10 h-10 rounded border-2 transition-transform ${newLabelColor === color ? 'border-base-content scale-110' : 'border-transparent'}`} style={{ backgroundColor: color }} onClick={() => setNewLabelColor(color)} />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={handleAddLabel} className="btn btn-primary flex-1">Add Label</button>
                        <button onClick={() => setShowAddLabel(false)} className="btn btn-outline">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setShowAddLabel(true)} className="btn btn-outline gap-2"><Plus size={18} /> Add New Label</button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ADVANCED TAB */}
          {activeTab === 'advanced' && (
            <div className="space-y-6">
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4 flex items-center gap-2"><Gauge size={20} /> Advanced Settings</h3>
                  <div className="form-control mb-4">
                    <label className="label"><span className="label-text font-medium">Auto-Save Interval: {settings.autoSaveInterval}s</span></label>
                    <input type="range" min="10" max="120" step="10" value={settings.autoSaveInterval} onChange={(e) => settings.setAutoSaveInterval(Number(e.target.value))} className="range range-info" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-medium flex items-center gap-2"><Globe size={16} /> Language</span></label>
                      <select className="select select-bordered" value={settings.language} onChange={(e) => settings.setLanguage(e.target.value as any)}>
=======
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Keyboard size={20} className="text-primary" />
                    Keyboard & Accessibility
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { label: 'Keyboard Shortcuts', checked: settings.enableKeyboardShortcuts, toggle: settings.toggleEnableKeyboardShortcuts },
                      { label: 'Auto-save', checked: settings.enableAutoSave, toggle: settings.toggleEnableAutoSave },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-3 bg-base-100 rounded-lg border border-base-300">
                        <span className="font-medium">{item.label}</span>
                        <input type="checkbox" className="toggle toggle-primary" checked={item.checked} onChange={item.toggle} />
                      </div>
                    ))}
                  </div>

                  {settings.enableAutoSave && (
                    <div className="form-control mt-4">
                      <label className="label">
                        <span className="label-text">Auto-save Interval</span>
                        <span className="badge badge-secondary">{settings.autoSaveInterval}s</span>
                      </label>
                      <input type="range" min="10" max="120" step="10" value={settings.autoSaveInterval} onChange={(e) => settings.setAutoSaveInterval(Number(e.target.value))} className="range range-secondary" />
                    </div>
                  )}
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Globe size={20} className="text-primary" />
                    Localization
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label"><span className="label-text">Language</span></label>
                      <select className="select select-bordered" value={settings.language} onChange={(e) => settings.setLanguage(e.target.value)}>
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-control">
<<<<<<< HEAD
                      <label className="label"><span className="label-text font-medium">Time Zone</span></label>
                      <input type="text" className="input input-bordered" value={settings.timeZone} onChange={(e) => settings.setTimeZone(e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.enableKeyboardShortcuts} onChange={settings.toggleEnableKeyboardShortcuts} />
                      <span className="label-text flex items-center gap-2"><Keyboard size={16} /> Keyboard Shortcuts</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.enableAutoSave} onChange={settings.toggleEnableAutoSave} />
                      <span className="label-text">Auto-Save</span>
                    </label>
                    <label className="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" className="checkbox checkbox-primary" checked={settings.enableAnalytics} onChange={settings.toggleEnableAnalytics} />
                      <span className="label-text">Analytics</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DATA TAB */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">Storage Information</h3>
                  <div className="stats shadow w-full">
                    <div className="stat"><div className="stat-title">Lists</div><div className="stat-value text-primary">{lists.length}</div></div>
                    <div className="stat"><div className="stat-title">Cards</div><div className="stat-value text-secondary">{Object.keys(cards).length}</div></div>
                    <div className="stat"><div className="stat-title">Storage</div><div className="stat-value text-accent text-2xl">{storageHelper.getSize()} KB</div></div>
                  </div>
                </div>
              </div>
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4">Data Management</h3>
                  <div className="flex flex-col md:flex-row gap-3">
                    <button onClick={exportData} className="btn btn-primary gap-2 flex-1"><Download size={18} /> Export Data</button>
                    <button onClick={clearAllData} className="btn btn-error gap-2 flex-1"><Trash2 size={18} /> Clear All Data</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-2xl mb-4 flex items-center gap-2"><Zap size={24} className="text-primary" /> FocusFlow v6.0 Pro</h3>
                  <p className="text-base mb-6">The ultimate productivity suite with 100+ customization options, custom theme builder, and advanced features.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h4 className="font-bold mb-3 text-base">✨ What's New in V6.0</h4>
                      <ul className="space-y-2 opacity-80">
                        <li>✓ Custom Theme Builder</li>
                        <li>✓ 100+ Customization Options</li>
                        <li>✓ Enhanced Sidebar (Weather, Quotes)</li>
                        <li>✓ Advanced Typography Controls</li>
                        <li>✓ Gradient Backgrounds</li>
                        <li>✓ Multi-language Support</li>
                        <li>✓ Glass Effect & Shadows</li>
                        <li>✓ Notification Positioning</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-base">🛠️ Technology</h4>
                      <ul className="space-y-2 opacity-80">
                        <li>• React 18 + TypeScript</li>
                        <li>• Vite Build Tool</li>
                        <li>• Tailwind CSS v3</li>
                        <li>• DaisyUI Components</li>
                        <li>• Zustand State Management</li>
                        <li>• @dnd-kit v6 (Enhanced)</li>
                        <li>• Recharts Analytics</li>
                        <li>• LocalStorage Persistence</li>
                      </ul>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart size={16} className="text-error" fill="currentColor" />
                      <span className="text-sm">Built with passion for productivity</span>
                    </div>
                    <div className="badge badge-primary badge-lg">v6.0 Pro</div>
                  </div>
                </div>
              </div>
            </div>
          )}
=======
                      <label className="label"><span className="label-text">Time Zone</span></label>
                      <input type="text" className="input input-bordered" value={settings.timeZone} readOnly />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Gauge size={20} className="text-primary" />
                    Performance
                  </h3>
                  <div className="flex items-center justify-between p-3 bg-base-100 rounded-lg border border-base-300">
                    <div>
                      <div className="font-medium">Anonymous Analytics</div>
                      <div className="text-xs opacity-60">Help improve FocusFlow by sharing usage data</div>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary" checked={settings.enableAnalytics} onChange={settings.toggleEnableAnalytics} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Continue in final part... */}
          {/* DATA TAB */}
          {activeTab === 'data' && (
            <>
              <div className="alert alert-warning border border-warning/30">
                <Info size={20} />
                <div>
                  <h4 className="font-bold">Data Management</h4>
                  <p className="text-sm">Export your data regularly as a backup. All data is stored locally in your browser.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card bg-base-200 border border-base-300">
                  <div className="card-body items-center text-center">
                    <Clock size={40} className="text-primary mb-2" />
                    <div className="stat-title">Pomodoro Sessions</div>
                    <div className="stat-value text-3xl text-primary">{pomodoro.totalPomodoros}</div>
                    <div className="stat-desc">Total completed</div>
                  </div>
                </div>

                <div className="card bg-base-200 border border-base-300">
                  <div className="card-body items-center text-center">
                    <Layout size={40} className="text-secondary mb-2" />
                    <div className="stat-title">Kanban Cards</div>
                    <div className="stat-value text-3xl text-secondary">{Object.keys(cards).length}</div>
                    <div className="stat-desc">Across {lists.length} lists</div>
                  </div>
                </div>

                <div className="card bg-base-200 border border-base-300">
                  <div className="card-body items-center text-center">
                    <Tag size={40} className="text-accent mb-2" />
                    <div className="stat-title">Custom Labels</div>
                    <div className="stat-value text-3xl text-accent">{settings.customLabels.length}</div>
                    <div className="stat-desc">Created by you</div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <Download size={20} className="text-primary" />
                    Export & Backup
                  </h3>
                  <div className="space-y-3">
                    <button onClick={exportData} className="btn btn-primary btn-block gap-2">
                      <Download size={20} />
                      Export All Data (JSON)
                    </button>
                    <div className="alert">
                      <Info size={18} />
                      <span className="text-sm">
                        Exports all your pomodoro sessions, kanban boards, and settings as a JSON file. 
                        Save this file in a safe place as a backup.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-error/10 border-2 border-error/30">
                <div className="card-body">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-error">
                    <Trash2 size={20} />
                    Danger Zone
                  </h3>
                  <div className="alert alert-error mb-4">
                    <Info size={20} />
                    <div>
                      <p className="font-bold">⚠️ Warning: This action cannot be undone!</p>
                      <p className="text-sm">Clearing all data will permanently delete your pomodoro history, kanban boards, custom labels, and all settings.</p>
                    </div>
                  </div>
                  <button onClick={clearAllData} className="btn btn-error gap-2">
                    <Trash2 size={20} />
                    Clear All Data
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ABOUT TAB */}
          {/* {activeTab === 'about' && (
            <>
              <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30">
                <div className="card-body items-center text-center">
                  <div className="text-6xl mb-4">🎯</div>
                  <h2 className="text-4xl font-bold mb-2">FocusFlow</h2>
                  <div className="badge badge-primary badge-lg mb-4">v7.6</div>
                  <p className="text-lg max-w-2xl mb-6">
                    A powerful productivity app combining Pomodoro technique with Kanban boards. 
                    Stay focused, organized, and achieve your goals.
                  </p>
                  <div className="flex gap-2">
                    <div className="badge badge-outline">React + TypeScript</div>
                    <div className="badge badge-outline">Vite</div>
                    <div className="badge badge-outline">DaisyUI</div>
                    <div className="badge badge-outline">Zustand</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card bg-base-200 border border-base-300">
                  <div className="card-body">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                      <Zap size={20} className="text-primary" />
                      Features
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">✅ 7 Pomodoro timer layouts</li>
                      <li className="flex items-center gap-2">✅ Advanced Kanban board with drag & drop</li>
                      <li className="flex items-center gap-2">✅ Detailed analytics & insights</li>
                      <li className="flex items-center gap-2">✅ 150+ customization options</li>
                      <li className="flex items-center gap-2">✅ Custom themes & labels</li>
                      <li className="flex items-center gap-2">✅ Keyboard shortcuts</li>
                      <li className="flex items-center gap-2">✅ Sound notifications</li>
                      <li className="flex items-center gap-2">✅ Offline-first, privacy-focused</li>
                    </ul>
                  </div>
                </div>

                <div className="card bg-base-200 border border-base-300">
                  <div className="card-body">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                      <Keyboard size={20} className="text-primary" />
                      Keyboard Shortcuts
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Start/Pause Timer</span>
                        <kbd className="kbd kbd-sm">Space</kbd>
                      </div>
                      <div className="flex justify-between">
                        <span>Reset Timer</span>
                        <div className="flex gap-1">
                          <kbd className="kbd kbd-sm">Ctrl</kbd>
                          <kbd className="kbd kbd-sm">R</kbd>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>Skip Session</span>
                        <div className="flex gap-1">
                          <kbd className="kbd kbd-sm">Ctrl</kbd>
                          <kbd className="kbd kbd-sm">S</kbd>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>Exit Fullscreen</span>
                        <kbd className="kbd kbd-sm">ESC</kbd>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body items-center text-center">
                  <Heart size={40} className="text-error mb-3" />
                  <h3 className="text-xl font-bold mb-2">Made with ❤️</h3>
                  <p className="text-sm opacity-60 mb-4">
                    FocusFlow is built with modern web technologies to help you be more productive.
                    All data is stored locally on your device for privacy and offline access.
                  </p>
                  <div className="stats stats-vertical lg:stats-horizontal shadow">
                    <div className="stat">
                      <div className="stat-title">Version</div>
                      <div className="stat-value text-2xl">7.6</div>
                      <div className="stat-desc">Latest Release</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Settings</div>
                      <div className="stat-value text-2xl">150+</div>
                      <div className="stat-desc">Customization Options</div>
                    </div>
                    <div className="stat">
                      <div className="stat-title">Themes</div>
                      <div className="stat-value text-2xl">{availableThemes.length}</div>
                      <div className="stat-desc">Built-in Themes</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )} */}

>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
        </div>
      </div>
    </div>
  );
};

export default Settings;
