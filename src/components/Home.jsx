import React, { useState } from 'react';
import { ShieldCheck, Terminal, Cpu, Lock, User, ArrowRight } from 'lucide-react';

export default function Home({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Secret Password configured for ERMA
  const SECRET_PASSWORD = 'ERMA@2026_Secure';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (password === SECRET_PASSWORD) {
        onLogin({ username: username.trim() || 'Operator', password });
      } else {
        setError('ACCESS DENIED: Invalid Access Key / Password.');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="auth-wrapper">
      {/* Background Cyber-Grid Effect */}
      <div className="auth-cyber-grid" />
      <div className="auth-glow-orb auth-glow-1" />
      <div className="auth-glow-orb auth-glow-2" />

      {/* Hero Header */}
      <div className="auth-header">
        <div className="auth-badge">
          <Cpu size={14} className="animate-spin-slow" />
          <span>Secure Enclave Active</span>
        </div>
        <h1 className="auth-title">
          ERMA ENTERPRISE
        </h1>
        <p className="auth-subtitle">
          Advanced Resource Management & Analytics Intelligence Suite
        </p>
      </div>

      {/* Glassmorphism Sign-In Card */}
      <div className="auth-card">
        <div className="auth-card-top">
          <div className="auth-card-title-group">
            <Terminal size={20} color="#00AEEF" />
            <h2>Operator Authentication</h2>
          </div>
          <ShieldCheck size={20} color="#10B981" />
        </div>

        {error && (
          <div className="auth-error-box">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label>Operator ID</label>
            <div className="auth-input-wrapper">
              <User size={16} className="auth-input-icon" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter ID (optional)..."
                autoComplete="username"
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Access Key / Password</label>
            <div className="auth-input-wrapper">
              <Lock size={16} className="auth-input-icon" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter secure access key..."
                autoComplete="current-password"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="auth-submit-btn"
          >
            {isLoading ? (
              <span className="auth-spinner" />
            ) : (
              <>
                <span>INITIALIZE SESSION</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="auth-card-footer">
          <p>SECURE ACCESS KEY REQUIRED • ERMA v4.2</p>
        </div>
      </div>
    </div>
  );
}
