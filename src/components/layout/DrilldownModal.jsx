import React from 'react';
import { X, User, Briefcase, Award, MapPin, DollarSign, Calendar, Layers, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function DrilldownModal() {
  const { selectedEmployee, setSelectedEmployee } = useData();

  if (!selectedEmployee) return null;

  const emp = selectedEmployee;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem'
    }} onClick={() => setSelectedEmployee(null)}>
      <div 
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          padding: '2rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={() => setSelectedEmployee(null)}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-muted)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-main)'
          }}
        >
          <X size={16} />
        </button>

        {/* Profile Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #005BAC 0%, #00AEEF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '1.5rem',
            fontWeight: 800
          }}>
            {(emp.EMP_NAME || 'Employee').split(' ').filter(Boolean).map(n => n[0]).join('') || 'E'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{emp.EMP_NAME || 'Unknown Employee'}</h2>
              <span className={`card-badge ${emp.BILLABLITY_STATUS === 'Billable' ? 'badge-success' : 'badge-warning'}`}>
                {emp.BILLABLITY_STATUS}
              </span>
              <span className="card-badge badge-primary">
                Band {emp.BAND}
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {emp.JOB_CODE_DESCRIPTION} • {emp.EMPLID} • {emp.EMAIL_ID}
            </div>
          </div>
        </div>

        {/* 3-Column Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1.25rem',
          margin: '1.5rem 0'
        }}>
          {/* Org & Practice */}
          <div style={{ backgroundColor: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '0.6rem' }}>
              <Layers size={16} /> Organization Hierarchy
            </div>
            <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div><span style={{ color: 'var(--text-dim)' }}>IBU:</span> <strong>{emp.EMPLOYEE_IBU}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>IBG:</span> {emp.EMPLOYEE_IBG}</div>
              <div><span style={{ color: 'var(--text-dim)' }}>Practice:</span> {emp.EMPLOYEE_PRACTICE}</div>
              <div><span style={{ color: 'var(--text-dim)' }}>Service Line:</span> {emp.EMPLOYEE_SERVICE_LINE}</div>
              <div><span style={{ color: 'var(--text-dim)' }}>Supervisor:</span> {emp.SUPERVISOR_NAME}</div>
              <div><span style={{ color: 'var(--text-dim)' }}>PM:</span> {emp.PM_NAME}</div>
            </div>
          </div>

          {/* Current Project Assignment */}
          <div style={{ backgroundColor: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.85rem', color: 'var(--secondary)', marginBottom: '0.6rem' }}>
              <Briefcase size={16} /> Project & Allocation
            </div>
            <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div><span style={{ color: 'var(--text-dim)' }}>Project:</span> <strong>{emp.PROJECT_ID}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Client:</span> {emp.CUSTOMER_NAME}</div>
              <div><span style={{ color: 'var(--text-dim)' }}>Allocation:</span> <strong>{emp.TOTAL_ALLOC_PERC}%</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Pricing Model:</span> {emp.PROJECT_PRICING_MODEL}</div>
              <div><span style={{ color: 'var(--text-dim)' }}>Project Tech:</span> {emp.PROJECT_TECHNOLOGY}</div>
              <div><span style={{ color: 'var(--text-dim)' }}>BW Status:</span> {emp.BW_STATUS}</div>
            </div>
          </div>

          {/* Location & Commercials */}
          <div style={{ backgroundColor: 'var(--bg-input)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.85rem', color: 'var(--success)', marginBottom: '0.6rem' }}>
              <MapPin size={16} /> Location & Financials
            </div>
            <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div><span style={{ color: 'var(--text-dim)' }}>Current Location:</span> {emp.CURRENT_LOCATION_CITY}, {emp.CURRENT_COUNTRY}</div>
              <div><span style={{ color: 'var(--text-dim)' }}>Base Location:</span> {emp.BASE_LOCATION_CITY}, {emp.BASE_COUNTRY}</div>
              <div><span style={{ color: 'var(--text-dim)' }}>Deployment:</span> <strong>{emp.ONSHORE_OFFSHORE}</strong></div>
              <div><span style={{ color: 'var(--text-dim)' }}>Total Experience:</span> {emp.TOTAL_EXPERIENCE} Years</div>
              <div><span style={{ color: 'var(--text-dim)' }}>Enterprise Exp:</span> {emp.TECHM_EXPERIENCE} Years</div>
              <div><span style={{ color: 'var(--text-dim)' }}>Monthly Billing Rate:</span> ${emp.MONTHLY_RATE_USD?.toLocaleString()} / mo</div>
            </div>
          </div>
        </div>

        {/* Skills & Certifications Box */}
        <div style={{
          backgroundColor: 'var(--bg-input)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>
            <Award size={16} color="var(--warning)" /> Competency & Verified Certifications
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[emp.TECH_SKILL_1, emp.TECH_SKILL_2, emp.TECH_SKILL_3, emp.TECH_SKILL_4].filter(Boolean).map(skill => (
              <span key={skill} style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.3rem 0.6rem',
                backgroundColor: 'rgba(0, 91, 172, 0.2)',
                color: '#38bdf8',
                borderRadius: '6px',
                border: '1px solid rgba(0, 91, 172, 0.3)'
              }}>
                {skill}
              </span>
            ))}
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.3rem 0.6rem',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: 'var(--success)',
              borderRadius: '6px',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              Cert: {emp.CERTIFICATION_SKILLS || "Certified"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
