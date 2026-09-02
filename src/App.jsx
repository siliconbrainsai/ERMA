import React, { useState } from 'react';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('erma_auth_session') === 'active';
  });

  const handleLogin = (credentials) => {
    // Enterprise credential verification placeholder (integrate with Supabase/Firebase/Auth0 here)
    if (credentials.username && credentials.password) {
      localStorage.setItem('erma_auth_session', 'active');
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('erma_auth_session');
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Home onLogin={handleLogin} />
      )}
    </div>
  );
}
