import { useState } from 'react';
import { useSettingsStore, type CustomLabel, type CustomTheme } from '../stores/settingsStore';
import { usePomodoroStore } from '../stores/pomodoroStore';
import { useKanbanStore } from '../stores/kanbanStore';
import { availableThemes } from '../utils/themeHelper';
import { storageHelper, exportHelper } from '../utils';
import {
  Info, Palette, Clock, Layout, Download, Trash2, Heart, Sidebar as SidebarIcon,
  Monitor, Plus, X, Edit2, Tag, Save, Settings as SettingsIcon, Zap, Volume2,
  Keyboard, Gauge, Sliders, Sparkles, Globe, Paintbrush, Maximize2, Eye,
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const colorPalette = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#64748b', '#475569', '#1e293b',
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'appearance' | 'sidebar' | 'themes' | 'compact' | 'pomodoro' | 'kanban' | 'labels' | 'advanced' | 'data' | 'about'>('appearance');
  
  const settings = useSettingsStore();
  const pomodoro = usePomodoroStore();
  const { lists, cards } = useKanbanStore();

  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [editLabelName, setEditLabelName] = useState('');
  const [editLabelColor, setEditLabelColor] = useState('');
  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('#3b82f6');
  const [showAddLabel, setShowAddLabel] = useState(false);

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
      version: '7.0',
    };
    exportHelper.exportAsJSON(data, `focusflow-backup-v7-${new Date().toISOString().split('T')[0]}.json`);
  };

  const clearAllData = () => {
    if (confirm('⚠️ Warning: This will permanently delete ALL your data including tasks, pomodoro history, and settings. This action cannot be undone!\n\nAre you absolutely sure?')) {
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

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'sidebar', label: 'Sidebar', icon: SidebarIcon },
    { id: 'themes', label: 'Themes', icon: Paintbrush },
    { id: 'compact', label: 'Compact', icon: Maximize2 },
    { id: 'pomodoro', label: 'Pomodoro', icon: Clock },
    { id: 'kanban', label: 'Kanban', icon: Layout },
    { id: 'labels', label: 'Labels', icon: Tag },
    { id: 'advanced', label: 'Advanced', icon: Sliders },
    { id: 'data', label: 'Data', icon: Monitor },
    { id: 'about', label: 'About', icon: Info },
  ] as const;

  const groupedThemes = availableThemes.reduce((acc, theme) => {
    if (!acc[theme.category]) acc[theme.category] = [];
    acc[theme.category].push(theme);
    return acc;
  }, {} as Record<string, typeof availableThemes>);

  return (
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
        </div>
      </div>

      {/* Tab Content */}
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
                        {fontFamilies.map((font) => (
                          <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
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
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Line Height</span>
                        <span className="label-text-alt badge badge-secondary">{settings.lineHeight}</span>
                      </label>
                      <input 
                        type="range" 
                        min="1" 
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
                    </div>

                    <div className="form-control">
                      <label className="label">
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
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="24" 
                        step="2" 
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
                    </div>
                  </div>
                </div>
              </div>

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
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* THEMES TAB */}
          {activeTab === 'themes' && (
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

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
                    </div>
                  </div>
                </div>
              )}
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-200 border border-base-300">
                <div className="card-body">
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
                        <option value="top-right">Top Right</option>
                        <option value="top-left">Top Left</option>
                        <option value="bottom-right">Bottom Right</option>
                        <option value="bottom-left">Bottom Left</option>
                      </select>
                    </div>
                  </div>
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
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-control">
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
        </div>
      </div>
    </div>
  );
};

export default Settings;
