import React from 'react';
import { Hourglass, AlertTriangle, DollarSign, UserX, Calendar, ShieldAlert } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { useData } from '../context/DataContext';
import FilterBar from '../components/layout/FilterBar';
import DataTable from '../components/common/DataTable';
import { getBenchAgeingBuckets, groupBy } from '../utils/dataProcessor';

const COLORS = ['#10B981', '#F59E0B', '#F97316', '#EF4444'];

export default function BenchDashboard() {
  const { filteredData, kpis } = useData();

  const benchResources = filteredData.filter(d => d.BW_STATUS === 'Bench (BW)' || d.BILLABLITY_STATUS === 'Non Billable');
  const benchAgeingBuckets = getBenchAgeingBuckets(filteredData);
  const benchCategoryData = groupBy(benchResources, 'BW_CATEGORY');
  const benchCostUSD = benchResources.reduce((acc, curr) => acc + (curr.MONTHLY_COST_USD || 0), 0);

  return (
    <div className="page-wrapper animate-fade">
      <div>
        <h1 className="page-title">
          <Hourglass size={26} color="var(--warning)" /> Bench & Business Wait (BW) Dashboard
        </h1>
        <p className="page-subtitle">
          Bench ageing analysis, cost impact, business wait (BW) categories, and deployment pipeline health.
        </p>
      </div>

      <FilterBar />

      {/* KPI Cards */}
      <div className="grid-kpi-4">
        <div className="kpi-card warning">
          <div className="kpi-top">
            <span className="kpi-label">Total Bench (BW) Resources</span>
            <div className="kpi-icon-box"><Hourglass size={18} color="var(--warning)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--warning)' }}>{benchResources.length}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>{kpis.benchPercentage} Bench Ratio</span></div>
        </div>

        <div className="kpi-card danger">
          <div className="kpi-top">
            <span className="kpi-label">Monthly Bench Cost Drag</span>
            <div className="kpi-icon-box"><DollarSign size={18} color="var(--danger)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--danger)' }}>
            ${(benchCostUSD / 1000).toFixed(0)}k <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>/ mo</span>
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Unrecovered monthly salary cost</span></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Average Bench Ageing</span>
            <div className="kpi-icon-box"><Calendar size={18} /></div>
          </div>
          <div className="kpi-value">{kpis.avgBenchDays} <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Days</span></div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Target: &lt; 30 Days</span></div>
        </div>

        <div className="kpi-card danger">
          <div className="kpi-top">
            <span className="kpi-label">Critical Ageing (&gt;60d)</span>
            <div className="kpi-icon-box"><ShieldAlert size={18} color="var(--danger)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--danger)' }}>
            {benchResources.filter(d => (d.BUSINESS_WAIT_AGE || 0) > 60).length}
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--danger)' }}>Requires leadership intervention</span></div>
        </div>
      </div>

      {/* Visual Analytics */}
      <div className="grid-2">
        {/* Bench Ageing Histogram */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Hourglass size={18} color="var(--warning)" /> Bench Ageing Distribution Buckets
            </div>
            <span className="card-badge badge-warning">Ageing Days</span>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchAgeingBuckets}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="bucket" stroke="var(--text-dim)" fontSize={11} interval={0} />
                <YAxis stroke="var(--text-dim)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="count" name="Resources" fill="#F59E0B" radius={[4, 4, 0, 0]}>
                  {benchAgeingBuckets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bench Categories */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <AlertTriangle size={18} color="var(--primary)" /> Bench Classification Category
            </div>
            <span className="card-badge badge-primary">Classification</span>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={benchCategoryData} cx="50%" cy="50%" outerRadius={85} dataKey="value" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                  <Cell fill="#005BAC" />
                  <Cell fill="#00AEEF" />
                  <Cell fill="#F59E0B" />
                  <Cell fill="#EF4444" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bench Resource Action Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <UserX size={18} color="var(--warning)" /> Active Bench Resources Roster & Upskilling Status
          </div>
          <span className="card-badge badge-warning">{benchResources.length} Available for Deployment</span>
        </div>
        <DataTable data={benchResources} limit={15} />
      </div>
    </div>
  );
}
