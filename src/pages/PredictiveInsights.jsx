import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, BrainCircuit, ShieldAlert, Cpu } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend, Area, AreaChart } from 'recharts';
import { useData } from '../context/DataContext';
import FilterBar from '../components/layout/FilterBar';
import { computePredictiveInsights } from '../utils/forecastingEngine';

export default function PredictiveInsights() {
  const { filteredData, setSelectedEmployee, rawData } = useData();

  const insights = computePredictiveInsights(filteredData);

  return (
    <div className="page-wrapper animate-fade">
      <div>
        <h1 className="page-title">
          <Sparkles size={26} color="#8B5CF6" /> AI Predictive Analytics & Forecasting Engine
        </h1>
        <p className="page-subtitle">
          Phase 9 Enterprise Insights • Utilization projections, machine learning attrition scoring, bench flow modeling, and skill demand-supply gap forecasting.
        </p>
      </div>

      <FilterBar />

      {/* AI Scorecard Row */}
      <div className="grid-kpi-4">
        <div className="kpi-card" style={{ borderColor: 'rgba(139, 92, 246, 0.4)' }}>
          <div className="kpi-top">
            <span className="kpi-label">Projected Q4 Utilization</span>
            <div className="kpi-icon-box" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8B5CF6' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#8B5CF6' }}>
            {insights.utilizationForecast[3]?.forecast}%
          </div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>+4.9% uplift</span>
            <span style={{ color: 'var(--text-muted)' }}>over baseline</span>
          </div>
        </div>

        <div className="kpi-card warning">
          <div className="kpi-top">
            <span className="kpi-label">Predicted High Flight Risk</span>
            <div className="kpi-icon-box"><AlertTriangle size={18} color="var(--warning)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--warning)' }}>
            {insights.highRiskEmployees.filter(e => e.riskLevel === 'High Risk').length}
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Proactive retention flag</span></div>
        </div>

        <div className="kpi-card danger">
          <div className="kpi-top">
            <span className="kpi-label">Critical Skill Gap Index</span>
            <div className="kpi-icon-box"><BrainCircuit size={18} color="var(--danger)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--danger)' }}>
            {insights.skillGapMatrix.filter(s => s.status.includes('Shortage')).length} Skills
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>GenAI, Snowflake, Kubernetes</span></div>
        </div>

        <div className="kpi-card success">
          <div className="kpi-top">
            <span className="kpi-label">Predicted 60-Day Deployments</span>
            <div className="kpi-icon-box"><Cpu size={18} color="var(--success)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>
            41 FTEs
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Incoming client demand</span></div>
        </div>
      </div>

      {/* Forecast Charts */}
      <div className="grid-2">
        {/* Utilization 6-Month Confidence Forecast */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <TrendingUp size={18} color="#8B5CF6" /> 6-Month Utilization Predictive Confidence Cone (%)
            </div>
            <span className="card-badge" style={{ background: 'rgba(139,92,246,0.15)', color: '#A78BFA' }}>AI ARIMA Forecast</span>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={insights.utilizationForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="month" stroke="var(--text-dim)" fontSize={11} />
                <YAxis stroke="var(--text-dim)" fontSize={12} domain={[60, 100]} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Legend />
                <Area type="monotone" dataKey="upper" name="Upper 95% CI" stroke="none" fill="#8B5CF6" fillOpacity={0.15} />
                <Area type="monotone" dataKey="forecast" name="Predicted Utilization" stroke="#8B5CF6" strokeWidth={3} fill="#8B5CF6" fillOpacity={0.25} />
                <Area type="monotone" dataKey="lower" name="Lower 95% CI" stroke="none" fill="#8B5CF6" fillOpacity={0.05} />
                <Line type="monotone" dataKey="actual" name="Actual Rate" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bench Roll-off & Inflow Projection */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Cpu size={18} color="var(--primary)" /> Bench Roll-off vs Incoming Demand Projection
            </div>
            <span className="card-badge badge-primary">Pipeline Flow</span>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insights.benchForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="period" stroke="var(--text-dim)" fontSize={11} />
                <YAxis stroke="var(--text-dim)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="incomingBench" name="Incoming Rolloffs" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="deployments" name="Client Deployments" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Skill Demand-Supply Gap Matrix */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <BrainCircuit size={18} color="var(--accent)" /> Skill Demand vs Supply Gap Matrix (Enterprise Index)
          </div>
          <span className="card-badge badge-info">Capability Planning</span>
        </div>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Skill Domain</th>
                <th style={{ padding: '0.75rem 1rem' }}>Projected Demand Index</th>
                <th style={{ padding: '0.75rem 1rem' }}>Current Supply Pool</th>
                <th style={{ padding: '0.75rem 1rem' }}>Net Deficit / Surplus</th>
                <th style={{ padding: '0.75rem 1rem' }}>AI Action Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {insights.skillGapMatrix.map(row => (
                <tr key={row.skill} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: 'var(--text-main)' }}>{row.skill}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{row.demand} / 100</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{row.supply} / 100</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: row.gap < 0 ? 'var(--danger)' : 'var(--success)' }}>
                    {row.gap > 0 ? `+${row.gap}` : row.gap}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span className={`card-badge ${row.status.includes('Critical') ? 'badge-danger' : row.status.includes('High') ? 'badge-warning' : row.status.includes('Surplus') ? 'badge-info' : 'badge-success'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Machine Learning Flight Risk Predictions */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <ShieldAlert size={18} color="var(--warning)" /> ML Predictive Flight Risk Early Warning System
          </div>
          <span className="card-badge badge-warning">{insights.highRiskEmployees.length} High Risk Alerts</span>
        </div>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Employee ID</th>
                <th style={{ padding: '0.75rem 1rem' }}>Name</th>
                <th style={{ padding: '0.75rem 1rem' }}>Band</th>
                <th style={{ padding: '0.75rem 1rem' }}>IBU</th>
                <th style={{ padding: '0.75rem 1rem' }}>Core Skill</th>
                <th style={{ padding: '0.75rem 1rem' }}>Flight Risk Probability</th>
                <th style={{ padding: '0.75rem 1rem' }}>Key AI Risk Indicators</th>
              </tr>
            </thead>
            <tbody>
              {insights.highRiskEmployees.map(emp => (
                <tr key={emp.emplid} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--primary)' }}>{emp.emplid}</td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{emp.name}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{emp.band}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{emp.ibu}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#38bdf8' }}>{emp.skill}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span className={`card-badge ${emp.riskScore >= 70 ? 'badge-danger' : 'badge-warning'}`}>
                      {emp.riskScore}% Risk
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    {emp.reasons.join(' • ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
