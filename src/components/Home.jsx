import React, { useState } from 'react';
import { ShieldCheck, Terminal, Cpu, Lock, User, ArrowRight } from 'lucide-react';

export default function Home({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulated secure handshake delay
    setTimeout(() => {
      if (username.trim() && password.trim()) {
        onLogin({ username, password });
      } else {
        setError('ACCESS DENIED: Invalid Operator Credentials.');
        setIsLoading(false);
      }
    }, 800);
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
          <span>Secure Terminal v4.2 Active</span>
        </div>
        <h1 className="auth-title">
          ERMA ENTERPRISE
        </h1>
        <p className="auth-subtitle">
          Advanced Resource Management & Analytics Intelligence Suite for Mission-Critical Systems.
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
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter ID (e.g., operator_01)"
                autoComplete="username"
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Access Key</label>
            <div className="auth-input-wrapper">
              <Lock size={16} className="auth-input-icon" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
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
          <p>SECURE ENCLAVE • AUTHORIZED ACCESS ONLY</p>
        </div>
      </div>
    </div>
  );
}
