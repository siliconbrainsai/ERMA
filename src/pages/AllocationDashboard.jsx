import React from 'react';
import { PieChart as PieIcon, CheckCircle2, AlertCircle, AlertTriangle, Layers } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { useData } from '../context/DataContext';
import FilterBar from '../components/layout/FilterBar';
import DataTable from '../components/common/DataTable';

export default function AllocationDashboard() {
  const { filteredData, kpis } = useData();

  const allocationSplit = [
    { name: '100% Fully Allocated', value: kpis.fullyAllocated, color: '#10B981' },
    { name: 'Over-allocated (>100%)', value: kpis.overAllocated, color: '#EF4444' },
    { name: 'Under-allocated (<100%)', value: kpis.underAllocated, color: '#F59E0B' },
    { name: 'Unallocated / Bench (0%)', value: kpis.benchCount, color: '#64748B' }
  ];

  // Allocation distribution by IBU
  const ibuAllocMap = {};
  filteredData.forEach(d => {
    const ibu = d.EMPLOYEE_IBU || 'Unknown';
    if (!ibuAllocMap[ibu]) {
      ibuAllocMap[ibu] = { ibu, totalAlloc: 0, count: 0, overCount: 0, underCount: 0, fullCount: 0 };
    }
    ibuAllocMap[ibu].totalAlloc += d.TOTAL_ALLOC_PERC;
    ibuAllocMap[ibu].count += 1;
    if (d.TOTAL_ALLOC_PERC === 100) ibuAllocMap[ibu].fullCount += 1;
    else if (d.TOTAL_ALLOC_PERC > 100) ibuAllocMap[ibu].overCount += 1;
    else if (d.TOTAL_ALLOC_PERC > 0) ibuAllocMap[ibu].underCount += 1;
  });

  const ibuAllocData = Object.values(ibuAllocMap).map(item => ({
    ...item,
    avgAlloc: item.count > 0 ? (item.totalAlloc / item.count).toFixed(0) : 0
  }));

  return (
    <div className="page-wrapper animate-fade">
      <div>
        <h1 className="page-title">
          <PieIcon size={26} color="var(--primary)" /> Allocation & Heatmap Dashboard
        </h1>
        <p className="page-subtitle">
          Capacity planning, allocation distribution, over-allocation burn-out flags, and sector utilization heatmaps.
        </p>
      </div>

      <FilterBar />

      {/* KPI Cards */}
      <div className="grid-kpi-4">
        <div className="kpi-card success">
          <div className="kpi-top">
            <span className="kpi-label">100% Fully Allocated</span>
            <div className="kpi-icon-box"><CheckCircle2 size={18} color="var(--success)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>{kpis.fullyAllocated}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Optimal capacity balance</span></div>
        </div>

        <div className="kpi-card danger">
          <div className="kpi-top">
            <span className="kpi-label">Over-allocated (&gt;100%)</span>
            <div className="kpi-icon-box"><AlertCircle size={18} color="var(--danger)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--danger)' }}>{kpis.overAllocated}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--danger)' }}>Immediate de-risk needed</span></div>
        </div>

        <div className="kpi-card warning">
          <div className="kpi-top">
            <span className="kpi-label">Under-allocated (&lt;100%)</span>
            <div className="kpi-icon-box"><AlertTriangle size={18} color="var(--warning)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--warning)' }}>{kpis.underAllocated}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Partially billing resources</span></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Zero Allocation (Bench)</span>
            <div className="kpi-icon-box"><Layers size={18} /></div>
          </div>
          <div className="kpi-value">{kpis.benchCount}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Available talent capacity</span></div>
        </div>
      </div>

      {/* Visual Analytics */}
      <div className="grid-2">
        {/* Allocation Split Donut */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <PieIcon size={18} color="var(--primary)" /> Allocation Breakdown Structure
            </div>
            <span className="card-badge badge-primary">Capacity Mix</span>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={allocationSplit} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                  {allocationSplit.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Average Allocation by IBU */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Layers size={18} color="var(--secondary)" /> Average Allocation % by Sector (IBU)
            </div>
            <span className="card-badge badge-info">Sector Health</span>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ibuAllocData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis type="number" stroke="var(--text-dim)" fontSize={12} domain={[0, 120]} unit="%" />
                <YAxis dataKey="ibu" type="category" stroke="var(--text-dim)" fontSize={11} width={150} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="avgAlloc" name="Avg Alloc %" fill="#005BAC" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Over-allocated & Under-allocated Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <AlertCircle size={18} color="var(--danger)" /> Non-Standard Allocation Attention List (&gt;100% or &lt;100%)
          </div>
          <span className="card-badge badge-danger">Optimization Priority</span>
        </div>
        <DataTable data={filteredData.filter(d => d.TOTAL_ALLOC_PERC !== 100)} limit={10} />
      </div>
    </div>
  );
}
