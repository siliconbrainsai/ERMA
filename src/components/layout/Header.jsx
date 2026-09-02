import React from 'react';
import { 
  Sun, 
  Moon, 
  Download, 
  RefreshCw, 
  FileSpreadsheet, 
  FileText, 
  Building2,
  LogOut
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { exportToCSV, exportToExcel } from '../../utils/exportUtils';

export default function Header({ onLogout }) {
  const { theme, toggleTheme, filteredData, resetFilters } = useData();

  return (
    <header style={{
      height: '68px',
      backgroundColor: 'var(--bg-header)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 20
    }}>
      {/* Left Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.825rem' }}>
          <Building2 size={16} color="var(--primary)" />
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Global Enterprise Delivery</span>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <span>FY 2026-Q3 Roster Intelligence</span>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Reset Filters */}
        <button 
          onClick={resetFilters}
          className="btn btn-secondary btn-sm"
          title="Reset all active filters"
        >
          <RefreshCw size={14} />
          <span>Reset Filters</span>
        </button>

        {/* CSV Export */}
        <button 
          onClick={() => exportToCSV(filteredData)}
          className="btn btn-secondary btn-sm"
          title="Export filtered records to CSV"
        >
          <FileText size={14} />
          <span>CSV</span>
        </button>

        {/* Excel Export */}
        <button 
          onClick={() => exportToExcel(filteredData)}
          className="btn btn-primary btn-sm"
          title="Export complete dataset to Excel (.xlsx)"
        >
          <FileSpreadsheet size={14} />
          <span>Export Excel</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-main)'
          }}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={17} color="#F59E0B" /> : <Moon size={17} color="#6366F1" />}
        </button>

        {/* Logout Button */}
        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
            title="Terminate Operator Session"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </header>
  );
}
