import React from 'react';
import { Users, Globe2, Briefcase, CheckCircle2, UserCheck, Shield } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, CartesianGrid, Legend } from 'recharts';
import { useData } from '../context/DataContext';
import FilterBar from '../components/layout/FilterBar';
import DataTable from '../components/common/DataTable';
import { groupBy } from '../utils/dataProcessor';

const COLORS = ['#005BAC', '#00AEEF', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1'];

export default function ResourceAnalytics() {
  const { filteredData, kpis } = useData();

  const onshoreOffshoreData = groupBy(filteredData, 'ONSHORE_OFFSHORE');
  const serviceLineData = groupBy(filteredData, 'EMPLOYEE_SERVICE_LINE');
  const practiceData = groupBy(filteredData, 'EMPLOYEE_PRACTICE');
  const genderData = groupBy(filteredData, 'GENDER');

  return (
    <div className="page-wrapper animate-fade">
      <div>
        <h1 className="page-title">
          <Users size={26} color="var(--primary)" /> Resource Analytics Dashboard
        </h1>
        <p className="page-subtitle">
          In-depth workforce allocation, deployment mix (Onsite vs Offshore), practice alignment, and demographic insights.
        </p>
      </div>

      <FilterBar />

      {/* KPI Cards */}
      <div className="grid-kpi-4">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Filtered Resources</span>
            <div className="kpi-icon-box"><Users size={18} /></div>
          </div>
          <div className="kpi-value">{filteredData.length}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Workforce sample size</span></div>
        </div>

        <div className="kpi-card success">
          <div className="kpi-top">
            <span className="kpi-label">Allocated to Client</span>
            <div className="kpi-icon-box"><CheckCircle2 size={18} color="var(--success)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>{kpis.billableResources}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>{kpis.billablePercentage} Billability</span></div>
        </div>

        <div className="kpi-card secondary">
          <div className="kpi-top">
            <span className="kpi-label">Onsite Resources</span>
            <div className="kpi-icon-box"><Globe2 size={18} color="var(--secondary)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--secondary)' }}>
            {filteredData.filter(d => d.ONSHORE_OFFSHORE === 'Onsite').length}
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Global customer locations</span></div>
        </div>

        <div className="kpi-card warning">
          <div className="kpi-top">
            <span className="kpi-label">Offshore Delivery</span>
            <div className="kpi-icon-box"><Shield size={18} color="var(--warning)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--warning)' }}>
            {filteredData.filter(d => d.ONSHORE_OFFSHORE === 'Offshore').length}
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>High-efficiency delivery centers</span></div>
        </div>
      </div>

      {/* Charts 1 */}
      <div className="grid-2">
        {/* Onsite vs Offshore */}
        <div className="card">
          <div className="card-header">
            <div className="card-title"><Globe2 size={18} color="var(--primary)" /> Onsite vs Offshore Distribution</div>
            <span className="card-badge badge-primary">Model</span>
          </div>
          <div style={{ height: '270px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={onshoreOffshoreData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  <Cell fill="#005BAC" />
                  <Cell fill="#00AEEF" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Practice Breakdown */}
        <div className="card">
          <div className="card-header">
            <div className="card-title"><Briefcase size={18} color="var(--secondary)" /> Headcount by Practice</div>
            <span className="card-badge badge-info">Capability</span>
          </div>
          <div style={{ height: '270px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={practiceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis type="number" stroke="var(--text-dim)" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="var(--text-dim)" fontSize={11} width={140} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="value" name="Resources" fill="#6366F1" radius={[0, 4, 4, 0]}>
                  {practiceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts 2 */}
      <div className="grid-2">
        {/* Service Line Split */}
        <div className="card">
          <div className="card-header">
            <div className="card-title"><UserCheck size={18} color="var(--success)" /> Service Line Alignment</div>
            <span className="card-badge badge-success">Service Lines</span>
          </div>
          <div style={{ height: '270px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceLineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="name" stroke="var(--text-dim)" fontSize={11} interval={0} />
                <YAxis stroke="var(--text-dim)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="value" name="Engineers" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Demographics */}
        <div className="card">
          <div className="card-header">
            <div className="card-title"><Users size={18} color="var(--accent)" /> Gender Diversity Distribution</div>
            <span className="card-badge badge-primary">Diversity</span>
          </div>
          <div style={{ height: '270px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderData} cx="50%" cy="50%" outerRadius={85} dataKey="value" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                  <Cell fill="#00AEEF" />
                  <Cell fill="#EC4899" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title"><Users size={18} color="var(--primary)" /> Resource Allocation Details</div>
          <span className="card-badge badge-primary">{filteredData.length} Records</span>
        </div>
        <DataTable data={filteredData} limit={12} />
      </div>
    </div>
  );
}
