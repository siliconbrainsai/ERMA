import React from 'react';
import { UserCheck, Users, TrendingUp, AlertTriangle, Briefcase, Award } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { useData } from '../context/DataContext';
import FilterBar from '../components/layout/FilterBar';
import { getManagerAnalytics } from '../utils/dataProcessor';

export default function ManagerAnalytics() {
  const { filteredData } = useData();

  const managerData = getManagerAnalytics(filteredData);

  return (
    <div className="page-wrapper animate-fade">
      <div>
        <h1 className="page-title">
          <UserCheck size={26} color="var(--primary)" /> Manager & Leadership Analytics
        </h1>
        <p className="page-subtitle">
          Span of control, PM/SPM resource utilization, bench management per leader, and delivery revenue contribution.
        </p>
      </div>

      <FilterBar />

      {/* KPI Cards */}
      <div className="grid-kpi-4">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Active Delivery Leaders</span>
            <div className="kpi-icon-box"><UserCheck size={18} /></div>
          </div>
          <div className="kpi-value">{managerData.length}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>PMs & Program Managers</span></div>
        </div>

        <div className="kpi-card success">
          <div className="kpi-top">
            <span className="kpi-label">Top Team Utilization</span>
            <div className="kpi-icon-box"><TrendingUp size={18} color="var(--success)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>
            {managerData[0]?.utilization || 100}%
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Lead: {managerData[0]?.name || 'N/A'}</span></div>
        </div>

        <div className="kpi-card secondary">
          <div className="kpi-top">
            <span className="kpi-label">Avg Team Span</span>
            <div className="kpi-icon-box"><Users size={18} color="var(--secondary)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--secondary)' }}>
            {managerData.length > 0 ? (filteredData.length / managerData.length).toFixed(1) : 0} <span style={{ fontSize: '0.9rem' }}>FTEs</span>
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Direct reports per manager</span></div>
        </div>

        <div className="kpi-card warning">
          <div className="kpi-top">
            <span className="kpi-label">Unassigned / Bench Pool</span>
            <div className="kpi-icon-box"><AlertTriangle size={18} color="var(--warning)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--warning)' }}>
            {managerData.find(m => m.name === 'Unassigned')?.totalResources || 0}
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Awaiting PM assignment</span></div>
        </div>
      </div>

      {/* Manager Comparison Chart */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <UserCheck size={18} color="var(--primary)" /> Project Manager Headcount & Utilization Comparison
          </div>
          <span className="card-badge badge-primary">Delivery Span</span>
        </div>
        <div style={{ height: '320px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={managerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
              <XAxis dataKey="name" stroke="var(--text-dim)" fontSize={11} interval={0} />
              <YAxis stroke="var(--text-dim)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="billable" name="Billable Resources" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="bench" name="Bench Pool" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leadership Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Award size={18} color="var(--primary)" /> Delivery Leadership Performance Scorecard
          </div>
          <span className="card-badge badge-primary">Manager Roster</span>
        </div>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Project Manager</th>
                <th style={{ padding: '0.75rem 1rem' }}>Total Direct Headcount</th>
                <th style={{ padding: '0.75rem 1rem' }}>Billable Count</th>
                <th style={{ padding: '0.75rem 1rem' }}>Bench Count</th>
                <th style={{ padding: '0.75rem 1rem' }}>Utilization Rate</th>
                <th style={{ padding: '0.75rem 1rem' }}>Monthly Revenue Managed</th>
              </tr>
            </thead>
            <tbody>
              {managerData.map(mgr => (
                <tr key={mgr.name} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-main)' }}>{mgr.name}</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{mgr.totalResources} FTEs</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--success)', fontWeight: 600 }}>{mgr.billable}</td>
                  <td style={{ padding: '0.75rem 1rem', color: mgr.bench > 0 ? 'var(--warning)' : 'var(--text-muted)', fontWeight: 600 }}>{mgr.bench}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span className={`card-badge ${+mgr.utilization >= 85 ? 'badge-success' : +mgr.utilization >= 60 ? 'badge-warning' : 'badge-danger'}`}>
                      {mgr.utilization}%
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>${mgr.revenueUSD.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
