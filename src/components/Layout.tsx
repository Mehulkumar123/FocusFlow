import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useSettingsStore } from '../stores/settingsStore';
import { useEffect } from 'react';

const Layout = () => {
  const {
    theme,
    fontSize,
    fontFamily,
    compactMode,
    sidebarPosition,
    spacing,
  } = useSettingsStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.documentElement.style.fontFamily = fontFamily;
    
    // Apply spacing classes
    document.documentElement.classList.remove('compact-spacing', 'normal-spacing', 'relaxed-spacing');
    document.documentElement.classList.add(`${spacing}-spacing`);
    
    if (compactMode) {
      document.documentElement.classList.add('compact-mode');
    } else {
      document.documentElement.classList.remove('compact-mode');
    }
  }, [theme, fontSize, fontFamily, compactMode, spacing]);

  return (
    <div className={`flex h-screen overflow-hidden ${sidebarPosition === 'right' ? 'flex-row-reverse' : ''}`}>
      <Sidebar />
      <main className="flex-1 overflow-auto bg-base-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
