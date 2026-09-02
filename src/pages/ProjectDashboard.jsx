import React from 'react';
import { Briefcase, Building, Layers, DollarSign, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { useData } from '../context/DataContext';
import FilterBar from '../components/layout/FilterBar';
import DataTable from '../components/common/DataTable';
import { groupBy } from '../utils/dataProcessor';

const COLORS = ['#005BAC', '#00AEEF', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6'];

export default function ProjectDashboard() {
  const { filteredData, kpis } = useData();

  const pricingModelData = groupBy(filteredData.filter(d => d.PROJECT_PRICING_MODEL !== 'Non-Billable'), 'PROJECT_PRICING_MODEL');
  const customerVerticalData = groupBy(filteredData.filter(d => d.VERTICAL_CUSTOMER !== 'Internal'), 'VERTICAL_CUSTOMER');
  const projectTypeData = groupBy(filteredData.filter(d => d.PROJECT_MAIN_TYPE !== 'Bench'), 'PROJECT_MAIN_TYPE');

  // Group by project to get resource count per project
  const projectMap = {};
  filteredData.filter(d => d && d.PROJECT_ID && !String(d.PROJECT_ID).startsWith('BENCH-')).forEach(d => {
    const pId = String(d.PROJECT_ID);
    if (!projectMap[pId]) {
      projectMap[pId] = {
        projectId: pId,
        desc: d.PROJECT_DESCRIPTION || 'Enterprise Project',
        customer: d.CUSTOMER_NAME || 'Enterprise Client',
        tech: d.PROJECT_TECHNOLOGY || 'Full Stack',
        pricing: d.PROJECT_PRICING_MODEL || 'Time & Material',
        resourceCount: 0,
        monthlyRev: 0
      };
    }
    projectMap[pId].resourceCount += 1;
    projectMap[pId].monthlyRev += (Number(d.MONTHLY_RATE_USD) || 0);
  });

  const projectList = Object.values(projectMap).sort((a, b) => b.resourceCount - a.resourceCount);

  return (
    <div className="page-wrapper animate-fade">
      <div>
        <h1 className="page-title">
          <Briefcase size={26} color="var(--primary)" /> Project Portfolio Dashboard
        </h1>
        <p className="page-subtitle">
          Customer delivery portfolio, project engagement models, technology stacks, and project staffing headcount.
        </p>
      </div>

      <FilterBar />

      {/* Scorecards */}
      <div className="grid-kpi-4">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Active Client Projects</span>
            <div className="kpi-icon-box"><Briefcase size={18} /></div>
          </div>
          <div className="kpi-value">{projectList.length}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Unique enterprise engagements</span></div>
        </div>

        <div className="kpi-card success">
          <div className="kpi-top">
            <span className="kpi-label">Strategic Accounts</span>
            <div className="kpi-icon-box"><Building size={18} color="var(--success)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>{kpis.totalCustomers}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Tier-1 global accounts</span></div>
        </div>

        <div className="kpi-card secondary">
          <div className="kpi-top">
            <span className="kpi-label">Project Revenue / Mo</span>
            <div className="kpi-icon-box"><DollarSign size={18} color="var(--secondary)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--secondary)' }}>
            ${(kpis.monthlyRevenueUSD / 1000).toFixed(0)}k
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Active client monthly billing</span></div>
        </div>

        <div className="kpi-card warning">
          <div className="kpi-top">
            <span className="kpi-label">Avg Team Density</span>
            <div className="kpi-icon-box"><Layers size={18} color="var(--warning)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--warning)' }}>
            {projectList.length > 0 ? (kpis.billableResources / projectList.length).toFixed(1) : 0} <span style={{ fontSize: '0.9rem' }}>FTEs</span>
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Per project pod staffing</span></div>
        </div>
      </div>

      {/* Visual Analytics */}
      <div className="grid-2">
        {/* Pricing Model Split */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <DollarSign size={18} color="var(--primary)" /> Projects by Commercial Pricing Model
            </div>
            <span className="card-badge badge-primary">Commercials</span>
          </div>
          <div style={{ height: '270px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pricingModelData} cx="50%" cy="50%" outerRadius={85} dataKey="value" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                  <Cell fill="#005BAC" />
                  <Cell fill="#00AEEF" />
                  <Cell fill="#10B981" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vertical Distribution */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Building size={18} color="var(--secondary)" /> Projects by Industry Vertical
            </div>
            <span className="card-badge badge-info">Verticals</span>
          </div>
          <div style={{ height: '270px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerVerticalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="name" stroke="var(--text-dim)" fontSize={11} interval={0} angle={-15} textAnchor="end" height={50} />
                <YAxis stroke="var(--text-dim)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="value" name="Resources" fill="#00AEEF" radius={[4, 4, 0, 0]}>
                  {customerVerticalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Project Roster Breakdown Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Briefcase size={18} color="var(--primary)" /> Active Project Portfolio Directory
          </div>
          <span className="card-badge badge-primary">{projectList.length} Active Projects</span>
        </div>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Project Code</th>
                <th style={{ padding: '0.75rem 1rem' }}>Project Description</th>
                <th style={{ padding: '0.75rem 1rem' }}>Client</th>
                <th style={{ padding: '0.75rem 1rem' }}>Technology Stack</th>
                <th style={{ padding: '0.75rem 1rem' }}>Pricing</th>
                <th style={{ padding: '0.75rem 1rem' }}>Team Size</th>
                <th style={{ padding: '0.75rem 1rem' }}>Monthly Value</th>
              </tr>
            </thead>
            <tbody>
              {projectList.map(proj => (
                <tr key={proj.projectId} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--primary)' }}>{proj.projectId}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{proj.desc}</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{proj.customer}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#38bdf8', fontSize: '0.75rem' }}>{proj.tech}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span className="card-badge badge-info">{proj.pricing}</span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--success)' }}>{proj.resourceCount} FTEs</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>${proj.monthlyRev.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
