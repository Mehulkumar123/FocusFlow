import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initializeTheme } from './utils/themeHelper';
import { notificationHelper } from './utils';
import Layout from './components/Layout';
import Pomodoro from './pages/Pomodoro';
import Kanban from './pages/Kanban';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  useEffect(() => {
    // Initialize theme from localStorage
    initializeTheme();
    
    // Request notification permission
    if (notificationHelper.isSupported()) {
      notificationHelper.requestPermission();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/pomodoro" replace />} />
          <Route path="pomodoro" element={<Pomodoro />} />
          <Route path="kanban" element={<Kanban />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
