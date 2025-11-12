<<<<<<< HEAD
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initializeTheme } from './utils/themeHelper';
import { notificationHelper } from './utils';
=======
// App.tsx - ADD ABOUT ROUTE
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
import Layout from './components/Layout';
import Pomodoro from './pages/Pomodoro';
import Kanban from './pages/Kanban';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
<<<<<<< HEAD

function App() {
  useEffect(() => {
    // Initialize theme from localStorage
    initializeTheme();
    
    // Request notification permission
    if (notificationHelper.isSupported()) {
      notificationHelper.requestPermission();
    }
  }, []);

=======
import About from './pages/About'; // NEW

function App() {
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/pomodoro" replace />} />
          <Route path="pomodoro" element={<Pomodoro />} />
          <Route path="kanban" element={<Kanban />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
<<<<<<< HEAD
=======
          <Route path="about" element={<About />} /> {/* NEW */}
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
