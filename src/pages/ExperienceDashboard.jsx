import React from 'react';
import { GraduationCap, Award, TrendingUp, Layers, Users } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { useData } from '../context/DataContext';
import FilterBar from '../components/layout/FilterBar';
import DataTable from '../components/common/DataTable';
import { getExperienceBuckets, groupBy } from '../utils/dataProcessor';

const COLORS = ['#005BAC', '#00AEEF', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'];

export default function ExperienceDashboard() {
  const { filteredData, kpis } = useData();

  const expBuckets = getExperienceBuckets(filteredData);
  const bandData = groupBy(filteredData, 'BAND').sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));

  const highestExp = filteredData.reduce((max, curr) => Math.max(max, Number(curr?.TOTAL_EXPERIENCE) || 0), 0);

  return (
    <div className="page-wrapper animate-fade">
      <div>
        <h1 className="page-title">
          <GraduationCap size={26} color="var(--primary)" /> Experience & Band Demographics
        </h1>
        <p className="page-subtitle">
          Total experience distribution, corporate band leveling (U1-U4, P1-P4, M1-M3), and tenure depth.
        </p>
      </div>

      <FilterBar />

      {/* KPI Cards */}
      <div className="grid-kpi-4">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Average Total Experience</span>
            <div className="kpi-icon-box"><GraduationCap size={18} /></div>
          </div>
          <div className="kpi-value">{kpis.avgExperience} <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Years</span></div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Organization average tenure</span></div>
        </div>

        <div className="kpi-card success">
          <div className="kpi-top">
            <span className="kpi-label">Highest Experience</span>
            <div className="kpi-icon-box"><Award size={18} color="var(--success)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>{highestExp} <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Years</span></div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Chief Architect / Fellow level</span></div>
        </div>

        <div className="kpi-card secondary">
          <div className="kpi-top">
            <span className="kpi-label">Senior / Lead Talent (6+ Yrs)</span>
            <div className="kpi-icon-box"><TrendingUp size={18} color="var(--secondary)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--secondary)' }}>
            {filteredData.filter(d => (d.TOTAL_EXPERIENCE || 0) >= 6).length}
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Core delivery backbone</span></div>
        </div>

        <div className="kpi-card warning">
          <div className="kpi-top">
            <span className="kpi-label">Early Career Talent (&lt;3 Yrs)</span>
            <div className="kpi-icon-box"><Users size={18} color="var(--warning)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--warning)' }}>
            {filteredData.filter(d => (d.TOTAL_EXPERIENCE || 0) < 3).length}
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Campus & Lateral hires</span></div>
        </div>
      </div>

      {/* Visual Analytics */}
      <div className="grid-2">
        {/* Experience Histogram */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <GraduationCap size={18} color="var(--primary)" /> Experience Histogram (Tenure Buckets)
            </div>
            <span className="card-badge badge-primary">Experience Bands</span>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expBuckets}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="range" stroke="var(--text-dim)" fontSize={10} interval={0} angle={-15} textAnchor="end" height={45} />
                <YAxis stroke="var(--text-dim)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="count" name="Employees" fill="#005BAC" radius={[4, 4, 0, 0]}>
                  {expBuckets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Band Hierarchy Distribution */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Layers size={18} color="var(--secondary)" /> Corporate Band Hierarchy Breakdown
            </div>
            <span className="card-badge badge-info">Leveling</span>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="name" stroke="var(--text-dim)" fontSize={12} />
                <YAxis stroke="var(--text-dim)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="value" name="Headcount" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Experience Roster */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Award size={18} color="var(--primary)" /> High Experience Senior Leadership & Architect Profiles
          </div>
          <span className="card-badge badge-primary">Senior Profiles</span>
        </div>
        <DataTable data={filteredData.filter(d => (d.TOTAL_EXPERIENCE || 0) >= 8)} limit={10} />
      </div>
    </div>
  );
}
