import React from 'react';
import { UserMinus, AlertTriangle, TrendingDown, MapPin, Building, ShieldAlert } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { useData } from '../context/DataContext';
import FilterBar from '../components/layout/FilterBar';
import DataTable from '../components/common/DataTable';
import { groupBy } from '../utils/dataProcessor';

const COLORS = ['#EF4444', '#F59E0B', '#6366F1', '#EC4899', '#005BAC'];

export default function AttritionDashboard() {
  const { filteredData, kpis } = useData();

  const resignedList = filteredData.filter(d => d.EMPLOYMENT_STATUS === 'Resigned' || d.RESIGNED === 'Yes');
  const resignedByPractice = groupBy(resignedList, 'EMPLOYEE_PRACTICE');
  const resignedByLocation = groupBy(resignedList, 'CURRENT_LOCATION');

  return (
    <div className="page-wrapper animate-fade">
      <div>
        <h1 className="page-title">
          <UserMinus size={26} color="var(--danger)" /> Attrition & Retention Analytics
        </h1>
        <p className="page-subtitle">
          Flight risk monitoring, notice period tracking, practice attrition hot-spots, and retention intervention.
        </p>
      </div>

      <FilterBar />

      {/* KPI Cards */}
      <div className="grid-kpi-4">
        <div className="kpi-card danger">
          <div className="kpi-top">
            <span className="kpi-label">Resigned Resources</span>
            <div className="kpi-icon-box"><UserMinus size={18} color="var(--danger)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--danger)' }}>{resignedList.length}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Currently serving notice period</span></div>
        </div>

        <div className="kpi-card danger">
          <div className="kpi-top">
            <span className="kpi-label">Attrition Percentage</span>
            <div className="kpi-icon-box"><TrendingDown size={18} color="var(--danger)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--danger)' }}>{kpis.attritionRate}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Annualized benchmark: &lt;12%</span></div>
        </div>

        <div className="kpi-card warning">
          <div className="kpi-top">
            <span className="kpi-label">Critical Skill Resignations</span>
            <div className="kpi-icon-box"><AlertTriangle size={18} color="var(--warning)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--warning)' }}>
            {resignedList.filter(d => d.TECH_SKILL_1?.includes('React') || d.TECH_SKILL_1?.includes('AWS') || d.TECH_SKILL_1?.includes('Python')).length}
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>High demand tech replacement</span></div>
        </div>

        <div className="kpi-card success">
          <div className="kpi-top">
            <span className="kpi-label">Workforce Retention Rate</span>
            <div className="kpi-icon-box"><ShieldAlert size={18} color="var(--success)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>
            {filteredData.length > 0 ? (100 - parseFloat(kpis.attritionRate)).toFixed(1) : 100}%
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Healthy core retention</span></div>
        </div>
      </div>

      {/* Visual Analytics */}
      <div className="grid-2">
        {/* Practice Wise Attrition */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Building size={18} color="var(--danger)" /> Attrition by Practice Hotspot
            </div>
            <span className="card-badge badge-danger">Practice Impact</span>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resignedByPractice} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis type="number" stroke="var(--text-dim)" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="var(--text-dim)" fontSize={11} width={140} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="value" name="Resigned" fill="#EF4444" radius={[0, 4, 4, 0]}>
                  {resignedByPractice.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Location Wise Attrition */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <MapPin size={18} color="var(--warning)" /> Attrition by City Location
            </div>
            <span className="card-badge badge-warning">Geo Hotspots</span>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resignedByLocation}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="name" stroke="var(--text-dim)" fontSize={11} />
                <YAxis stroke="var(--text-dim)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="value" name="Resigned" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Resigned Employee Notice Tracking Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <UserMinus size={18} color="var(--danger)" /> Active Notice Period & Handover Tracker
          </div>
          <span className="card-badge badge-danger">{resignedList.length} In Transition</span>
        </div>
        <DataTable data={resignedList} limit={10} />
      </div>
    </div>
  );
}
