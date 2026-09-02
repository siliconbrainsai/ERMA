import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BrainCircuit, 
  Briefcase, 
  PieChart, 
  Hourglass, 
  Globe2, 
  UserCheck, 
  GraduationCap, 
  UserMinus, 
  Sparkles, 
  Database,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const NAV_ITEMS = [
  { id: 'executive', label: 'Executive Summary', icon: LayoutDashboard, badge: 'Core' },
  { id: 'resources', label: 'Resource Analytics', icon: Users },
  { id: 'skills', label: 'Skills & Competency', icon: BrainCircuit },
  { id: 'projects', label: 'Project Portfolio', icon: Briefcase },
  { id: 'allocation', label: 'Allocation & Heatmap', icon: PieChart },
  { id: 'bench', label: 'Bench / BW Analytics', icon: Hourglass, alert: true },
  { id: 'geography', label: 'Global Geography', icon: Globe2 },
  { id: 'manager', label: 'Manager Analytics', icon: UserCheck },
  { id: 'experience', label: 'Experience & Bands', icon: GraduationCap },
  { id: 'attrition', label: 'Attrition & Retention', icon: UserMinus },
  { id: 'predictive', label: 'AI Insights & Forecast', icon: Sparkles, badge: 'AI' },
  { id: 'datamanager', label: 'Data Hub & Ingest', icon: Database }
];

export default function Sidebar() {
  const { activeTab, setActiveTab, kpis } = useData();

  return (
    <aside style={{
      width: '270px',
      backgroundColor: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      flexShrink: 0,
      position: 'sticky',
      top: 0
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.875rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #005BAC 0%, #00AEEF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(0, 91, 172, 0.4)'
        }}>
          <Layers size={22} />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
            ERMA <span style={{ color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: 700, padding: '2px 6px', background: 'rgba(0,174,239,0.12)', borderRadius: '4px', border: '1px solid rgba(0,174,239,0.25)' }}>ENTERPRISE</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Resource Intelligence Suite
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav style={{
        flex: 1,
        padding: '1rem 0.75rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem'
      }}>
        <div style={{ padding: '0.25rem 0.75rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
          Dashboards & Analytics
        </div>

        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'rgba(0, 91, 172, 0.15)' : 'transparent',
                color: isActive ? '#38bdf8' : 'var(--text-muted)',
                border: isActive ? '1px solid rgba(0, 91, 172, 0.3)' : '1px solid transparent',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Icon size={18} color={isActive ? '#38bdf8' : 'var(--text-dim)'} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '4px',
                  background: item.badge === 'AI' ? 'linear-gradient(135deg, #8B5CF6, #EC4899)' : 'var(--bg-muted)',
                  color: '#ffffff'
                }}>
                  {item.badge}
                </span>
              )}

              {item.alert && kpis.benchCount > 0 && (
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '999px',
                  background: 'var(--danger-bg)',
                  color: 'var(--danger)',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}>
                  {kpis.benchCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Summary Footer */}
      <div style={{
        padding: '1rem',
        margin: '0.75rem',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>Active Resources</span>
          <strong style={{ color: 'var(--text-main)' }}>{kpis.activeEmployees}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>Billability Rate</span>
          <strong style={{ color: 'var(--success)' }}>{kpis.billablePercentage}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>Bench Count</span>
          <strong style={{ color: kpis.benchCount > 0 ? 'var(--warning)' : 'var(--text-main)' }}>{kpis.benchCount}</strong>
        </div>
      </div>
    </aside>
  );
}
