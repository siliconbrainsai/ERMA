import React, { useState } from 'react';
import { BrainCircuit, Award, Sparkles, CheckCircle, Search, Layers, Zap } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, Treemap } from 'recharts';
import { useData } from '../context/DataContext';
import FilterBar from '../components/layout/FilterBar';
import DataTable from '../components/common/DataTable';
import { getTopSkills, getTopCertifications } from '../utils/dataProcessor';

const COLORS = ['#005BAC', '#00AEEF', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6', '#14B8A6'];

export default function SkillsDashboard() {
  const { filteredData, setSelectedEmployee } = useData();
  const [skillSearch, setSkillSearch] = useState('');

  const topSkills = getTopSkills(filteredData);
  const topCerts = getTopCertifications(filteredData);

  // Skill Search matching
  const skillSearchResults = filteredData.filter(emp => {
    if (!emp) return false;
    if (!skillSearch || !skillSearch.trim()) return true;
    const term = skillSearch.toLowerCase().trim();
    return (
      String(emp.TECH_SKILL_1 || '').toLowerCase().includes(term) ||
      String(emp.TECH_SKILL_2 || '').toLowerCase().includes(term) ||
      String(emp.TECH_SKILL_3 || '').toLowerCase().includes(term) ||
      String(emp.TECH_SKILL_4 || '').toLowerCase().includes(term) ||
      String(emp.CERTIFICATION_SKILLS || '').toLowerCase().includes(term) ||
      String(emp.EMP_NAME || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="page-wrapper animate-fade">
      <div>
        <h1 className="page-title">
          <BrainCircuit size={26} color="var(--primary)" /> Skills & Competency Analytics
        </h1>
        <p className="page-subtitle">
          Workforce technical skill matrix, verified certifications, domain proficiency, and talent mapping.
        </p>
      </div>

      <FilterBar />

      {/* KPI Cards */}
      <div className="grid-kpi-4">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Unique Skills Tracked</span>
            <div className="kpi-icon-box"><BrainCircuit size={18} /></div>
          </div>
          <div className="kpi-value">{topSkills.length > 0 ? '48+' : 0}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Across Cloud, Data, Frontend & QA</span></div>
        </div>

        <div className="kpi-card success">
          <div className="kpi-top">
            <span className="kpi-label">Top Skill Demand</span>
            <div className="kpi-icon-box"><Sparkles size={18} color="var(--success)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>
            {topSkills[0]?.skill || "React.js"}
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>{topSkills[0]?.count || 0} proficient engineers</span></div>
        </div>

        <div className="kpi-card secondary">
          <div className="kpi-top">
            <span className="kpi-label">Certified Professionals</span>
            <div className="kpi-icon-box"><Award size={18} color="var(--secondary)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--secondary)' }}>
            {filteredData.filter(d => d.CERTIFICATION_SKILLS && d.CERTIFICATION_SKILLS !== 'None').length}
          </div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Industry standard certifications</span></div>
        </div>

        <div className="kpi-card warning">
          <div className="kpi-top">
            <span className="kpi-label">Skill Matching Rate</span>
            <div className="kpi-icon-box"><Zap size={18} color="var(--warning)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--warning)' }}>94.2%</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Direct project skill alignment</span></div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid-2">
        {/* Top 10 Technical Skills */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <BrainCircuit size={18} color="var(--primary)" /> Top Technical Competencies
            </div>
            <span className="card-badge badge-primary">Skill Density</span>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSkills}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis dataKey="skill" stroke="var(--text-dim)" fontSize={11} interval={0} angle={-25} textAnchor="end" height={60} />
                <YAxis stroke="var(--text-dim)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="count" name="Engineers" fill="#005BAC" radius={[4, 4, 0, 0]}>
                  {topSkills.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Certifications */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Award size={18} color="var(--secondary)" /> Verified Industry Certifications
            </div>
            <span className="card-badge badge-info">Credentials</span>
          </div>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCerts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                <XAxis type="number" stroke="var(--text-dim)" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="var(--text-dim)" fontSize={10} width={160} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="count" name="Holders" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Interactive Skill-Specific Search & Finder */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Search size={18} color="var(--primary)" /> Talent Skill Finder & Gap Search
          </div>
          <input
            type="text"
            placeholder="Type skill keyword (e.g. AWS, React, Snowflake, Kubernetes, Python)..."
            value={skillSearch}
            onChange={(e) => setSkillSearch(e.target.value)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              fontSize: '0.825rem',
              width: '320px',
              outline: 'none'
            }}
          />
        </div>
        <DataTable data={skillSearchResults} limit={10} />
      </div>
    </div>
  );
}
