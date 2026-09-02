import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  DollarSign, 
  Briefcase, 
  Building, 
  AlertTriangle, 
  TrendingUp, 
  Award,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { useData } from '../context/DataContext';
import FilterBar from '../components/layout/FilterBar';
import DataTable from '../components/common/DataTable';
import { groupBy, getTopSkills } from '../utils/dataProcessor';

const COLORS = ['#005BAC', '#00AEEF', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6'];

export default function ExecutiveSummary() {
  const { filteredData, kpis } = useData();

  const ibuDistribution = groupBy(filteredData, 'EMPLOYEE_IBU');
  const billabilityDist = [
    { name: 'Billable', value: kpis.billableResources },
    { name: 'Non Billable / Bench', value: kpis.nonBillableResources }
  ];
  const topSkills = getTopSkills(filteredData);

  // Revenue & Margin Trend Mock for Executive overview
  const financialTrend = [
    { month: 'Apr', revenue: (kpis.monthlyRevenueUSD * 0.88) / 1000, cost: (kpis.monthlyCostUSD * 0.90) / 1000 },
    { month: 'May', revenue: (kpis.monthlyRevenueUSD * 0.92) / 1000, cost: (kpis.monthlyCostUSD * 0.92) / 1000 },
    { month: 'Jun', revenue: (kpis.monthlyRevenueUSD * 0.95) / 1000, cost: (kpis.monthlyCostUSD * 0.94) / 1000 },
    { month: 'Jul', revenue: (kpis.monthlyRevenueUSD * 0.98) / 1000, cost: (kpis.monthlyCostUSD * 0.97) / 1000 },
    { month: 'Aug', revenue: (kpis.monthlyRevenueUSD * 1.00) / 1000, cost: (kpis.monthlyCostUSD * 1.00) / 1000 },
    { month: 'Sep (Current)', revenue: (kpis.monthlyRevenueUSD * 1.03) / 1000, cost: (kpis.monthlyCostUSD * 1.01) / 1000 }
  ];

  return (
    <div className="page-wrapper animate-fade">
      {/* Header Title */}
      <div>
        <h1 className="page-title">
          <Layers size={26} color="var(--primary)" /> Executive Summary Dashboard
        </h1>
        <p className="page-subtitle">
          Enterprise Resource Management Analytics • High-level organizational KPIs, revenue, utilization, and workforce distribution.
        </p>
      </div>

      {/* Global Filter Bar */}
      <FilterBar />

      {/* Primary KPI Scorecards */}
      <div className="grid-kpi-4">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Total Headcount</span>
            <div className="kpi-icon-box"><Users size={18} /></div>
          </div>
          <div className="kpi-value">{kpis.totalEmployees}</div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>{kpis.activeEmployees} Active</span>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <span style={{ color: 'var(--danger)' }}>{kpis.resignedEmployees} Resigned ({kpis.attritionRate})</span>
          </div>
        </div>

        <div className="kpi-card success">
          <div className="kpi-top">
            <span className="kpi-label">Resource Billability</span>
            <div className="kpi-icon-box"><CheckCircle2 size={18} color="var(--success)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>{kpis.billablePercentage}</div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--text-muted)' }}>{kpis.billableResources} Billable FTEs out of {kpis.totalEmployees}</span>
          </div>
        </div>

        <div className="kpi-card warning">
          <div className="kpi-top">
            <span className="kpi-label">Bench / BW Exposure</span>
            <div className="kpi-icon-box"><AlertTriangle size={18} color="var(--warning)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--warning)' }}>{kpis.benchCount}</div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--text-muted)' }}>{kpis.benchPercentage} Bench Ratio • Avg <strong>{kpis.avgBenchDays}d</strong> BW</span>
          </div>
        </div>

        <div className="kpi-card secondary">
          <div className="kpi-top">
            <span className="kpi-label">Monthly Gross Margin</span>
            <div className="kpi-icon-box"><DollarSign size={18} color="var(--secondary)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--secondary)' }}>{kpis.grossMarginPerc}</div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--text-muted)' }}>${(kpis.grossMarginUSD / 1000).toFixed(0)}k Margin / ${(kpis.monthlyRevenueUSD / 1000).toFixed(0)}k Rev</span>
          </div>
        </div>
      </div>

      {/* Secondary KPI Cards */}
      <div className="grid-kpi-4">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Active Projects</span>
            <div className="kpi-icon-box"><Briefcase size={18} /></div>
          </div>
          <div className="kpi-value">{kpis.totalProjects}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Across 6 Major Industry Verticals</span></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Enterprise Customers</span>
            <div className="kpi-icon-box"><Building size={18} /></div>
          </div>
          <div className="kpi-value">{kpis.totalCustomers}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Tier-1 Global Strategic Accounts</span></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Avg Experience</span>
            <div className="kpi-icon-box"><Award size={18} /></div>
          </div>
          <div className="kpi-value">{kpis.avgExperience} <span style={{ fontSize: '1rem', fontWeight: 500 }}>Yrs</span></div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Talent Competency Depth</span></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">100% Fully Allocated</span>
            <div className="kpi-icon-box"><TrendingUp size={18} /></div>
          </div>
          <div className="kpi-value">{kpis.fullyAllocated}</div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{kpis.overAllocated} Over-allocated</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Row 1 */}
      <div className="grid-2">
        {/* Revenue & Cost Run-rate */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <TrendingUp size={18} color="var(--primary)" /> Monthly Financial Run-rate ($k USD)
            </div>
            <span className="card-badge badge-primary">Run-Rate</span>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={financialTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="month" stroke="var(--text-dim)" fontSize={12} />
                <YAxis stroke="var(--text-dim)" fontSize={12} unit="k" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Billing Revenue ($k)" stroke="#005BAC" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 7 }} />
                <Line type="monotone" dataKey="cost" name="Resource Cost ($k)" stroke="#EF4444" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Headcount by IBU */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Building size={18} color="var(--secondary)" /> Resource Distribution by IBU
            </div>
            <span className="card-badge badge-info">Sector Breakdown</span>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ibuDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis type="number" stroke="var(--text-dim)" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="var(--text-dim)" fontSize={11} width={150} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }} />
                <Bar dataKey="value" name="Resources" fill="#00AEEF" radius={[0, 4, 4, 0]}>
                  {ibuDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Visual Analytics Row 2 */}
      <div className="grid-2">
        {/* Billable vs Non-Billable Donut */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <CheckCircle2 size={18} color="var(--success)" /> Billability Split
            </div>
            <span className="card-badge badge-success">{kpis.billablePercentage} Target</span>
          </div>
          <div style={{ height: '260px', width: '100%', display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={billabilityDist}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#10B981" />
                  <Cell fill="#F59E0B" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Technical Competencies */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Sparkles size={18} color="var(--accent)" /> Top Technical Competencies
            </div>
            <span className="card-badge badge-primary">Talent Depth</span>
          </div>
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSkills}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="skill" stroke="var(--text-dim)" fontSize={11} interval={0} angle={-25} textAnchor="end" height={60} />
                <YAxis stroke="var(--text-dim)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }} />
                <Bar dataKey="count" name="Engineers" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Roster Table Section */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Users size={18} color="var(--primary)" /> Filtered Resource Master Roster
          </div>
          <span className="card-badge badge-primary">{filteredData.length} Matching Records</span>
        </div>
        <DataTable data={filteredData} limit={10} />
      </div>
    </div>
  );
}
