import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ComingSoonModal from './components/ComingSoonModal';
import Home from './pages/Home';
// import Shop from './pages/Shop';
import Shop from './pages/Shop';
import Specials from './pages/Specials';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import WorkerLogin from './pages/WorkerLogin';
import WorkerRegister from './pages/WorkerRegister';
import WorkerDashboard from './pages/WorkerDashboard';
import About from './pages/About';
import Support from './pages/Support';
import Legal from './pages/Legal';
import Settings from './pages/Settings';
import { useAuth } from './context/AuthContext';
import './components/Header.css';

// Theme definitions
const themes = {
  teal: { primary: '#0d9488', secondary: '#06b6d4' },
  purple: { primary: '#7c3aed', secondary: '#a855f7' },
  rose: { primary: '#e11d48', secondary: '#f43f5e' },
  amber: { primary: '#d97706', secondary: '#f59e0b' },
  emerald: { primary: '#059669', secondary: '#10b981' },
  blue: { primary: '#2563eb', secondary: '#3b82f6' }
};

function App() {
  const { user } = useAuth();

  // Apply user's saved theme globally
  useEffect(() => {
    if (user && user.theme && themes[user.theme]) {
      const theme = themes[user.theme];
      document.documentElement.style.setProperty('--color-primary', theme.primary);
      document.documentElement.style.setProperty('--color-secondary', theme.secondary);
    }
  }, [user?.theme]);

  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/specials" element={<Specials />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/worker/login" element={<WorkerLogin />} />
        <Route path="/worker/register" element={<WorkerRegister />} />
        <Route path="/worker/dashboard" element={<WorkerDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="*" element={<Home />} /> {/* Fallback */}
      </Routes>
      <ComingSoonModal />
      <Footer />
    </div>
  )
}

export default App;
