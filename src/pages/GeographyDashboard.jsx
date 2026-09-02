import React from 'react';
import { Globe2, MapPin, Plane, ShieldCheck, Building } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { useData } from '../context/DataContext';
import FilterBar from '../components/layout/FilterBar';
import DataTable from '../components/common/DataTable';
import { groupBy } from '../utils/dataProcessor';

const COLORS = ['#005BAC', '#00AEEF', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'];

export default function GeographyDashboard() {
  const { filteredData } = useData();

  const countryData = groupBy(filteredData, 'CURRENT_COUNTRY');
  const cityData = groupBy(filteredData, 'CURRENT_LOCATION_CITY');
  const visaHolders = filteredData.filter(d => d.VISA_PERMIT_TYPE && d.VISA_PERMIT_TYPE !== 'None' && d.VISA_PERMIT_TYPE !== 'Saudi National');

  return (
    <div className="page-wrapper animate-fade">
      <div>
        <h1 className="page-title">
          <Globe2 size={26} color="var(--primary)" /> Geography & Global Mobility Dashboard
        </h1>
        <p className="page-subtitle">
          Global footprint, onshore vs offshore geo-distribution, international travel status, and visa permit tracking.
        </p>
      </div>

      <FilterBar />

      {/* KPI Cards */}
      <div className="grid-kpi-4">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Countries Represented</span>
            <div className="kpi-icon-box"><Globe2 size={18} /></div>
          </div>
          <div className="kpi-value">{countryData.length}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Global strategic presence</span></div>
        </div>

        <div className="kpi-card secondary">
          <div className="kpi-top">
            <span className="kpi-label">Delivery Hub Cities</span>
            <div className="kpi-icon-box"><Building size={18} color="var(--secondary)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--secondary)' }}>{cityData.length}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>India, USA, UK, EU, UAE, ANZ</span></div>
        </div>

        <div className="kpi-card success">
          <div className="kpi-top">
            <span className="kpi-label">Active Visa / Work Permits</span>
            <div className="kpi-icon-box"><ShieldCheck size={18} color="var(--success)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>{visaHolders.length}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>H1B, L1, Schengen, TSS 482</span></div>
        </div>

        <div className="kpi-card warning">
          <div className="kpi-top">
            <span className="kpi-label">Travel / Onsite Deployments</span>
            <div className="kpi-icon-box"><Plane size={18} color="var(--warning)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--warning)' }}>
            {filteredData.filter(d => d.TRAVEL_TO_LOCATION && d.TRAVEL_TO_LOCATION !== 'None').length}
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Active international assignments</span></div>
        </div>
      </div>

      {/* Visual Analytics */}
      <div className="grid-2">
        {/* Country Breakdown */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Globe2 size={18} color="var(--primary)" /> Country Wise Resource Headcount
            </div>
            <span className="card-badge badge-primary">Global Footprint</span>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis type="number" stroke="var(--text-dim)" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="var(--text-dim)" fontSize={11} width={110} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="value" name="Resources" fill="#005BAC" radius={[0, 4, 4, 0]}>
                  {countryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* City Wise Breakdown */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <MapPin size={18} color="var(--secondary)" /> Top Delivery Cities
            </div>
            <span className="card-badge badge-info">City Clusters</span>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="name" stroke="var(--text-dim)" fontSize={10} interval={0} angle={-25} textAnchor="end" height={55} />
                <YAxis stroke="var(--text-dim)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="value" name="Engineers" fill="#00AEEF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Onsite & Global Mobility Roster */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Plane size={18} color="var(--primary)" /> Global Deployment & Visa Tracking Roster
          </div>
          <span className="card-badge badge-primary">{filteredData.filter(d => d.ONSHORE_OFFSHORE === 'Onsite').length} Onsite Resources</span>
        </div>
        <DataTable data={filteredData.filter(d => d.ONSHORE_OFFSHORE === 'Onsite')} limit={10} />
      </div>
    </div>
  );
}
