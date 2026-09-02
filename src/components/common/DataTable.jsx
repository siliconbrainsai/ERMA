import React from 'react';
import { Eye } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function DataTable({ data, limit = 15 }) {
  const { setSelectedEmployee } = useData();

  if (!data || data.length === 0) {
    return (
      <div style={{
        padding: '3rem 1rem',
        textAlign: 'center',
        color: 'var(--text-dim)',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)'
      }}>
        No records match the current filter selection.
      </div>
    );
  }

  const displayedData = data.slice(0, limit);

  return (
    <div style={{
      width: '100%',
      overflowX: 'auto',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-card)'
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
        fontSize: '0.825rem'
      }}>
        <thead>
          <tr style={{
            backgroundColor: 'var(--bg-input)',
            borderBottom: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            fontSize: '0.72rem'
          }}>
            <th style={{ padding: '0.75rem 1rem' }}>Employee</th>
            <th style={{ padding: '0.75rem 1rem' }}>Band / Role</th>
            <th style={{ padding: '0.75rem 1rem' }}>IBU / Practice</th>
            <th style={{ padding: '0.75rem 1rem' }}>Project / Client</th>
            <th style={{ padding: '0.75rem 1rem' }}>Alloc %</th>
            <th style={{ padding: '0.75rem 1rem' }}>Status</th>
            <th style={{ padding: '0.75rem 1rem' }}>Location</th>
            <th style={{ padding: '0.75rem 1rem' }}>Primary Skill</th>
            <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((emp, index) => {
            const isBillable = emp.BILLABLITY_STATUS === 'Billable';
            const isBench = emp.BW_STATUS === 'Bench (BW)';
            const isResigned = emp.EMPLOYMENT_STATUS === 'Resigned' || emp.RESIGNED === 'Yes';

            return (
              <tr 
                key={emp.EMPLID + index}
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {/* Employee Name & ID */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{emp.EMP_NAME}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{emp.EMPLID}</div>
                </td>

                {/* Band & Role */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '1px 5px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--bg-muted)',
                      color: 'var(--text-main)'
                    }}>
                      {emp.BAND}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>{emp.JOB_CODE_DESCRIPTION}</span>
                  </div>
                </td>

                {/* IBU */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ fontWeight: 500, color: 'var(--text-main)' }}>{emp.EMPLOYEE_IBU}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{emp.EMPLOYEE_PRACTICE}</div>
                </td>

                {/* Project / Client */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{emp.PROJECT_ID}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{emp.CUSTOMER_NAME}</div>
                </td>

                {/* Allocation */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{
                    fontWeight: 700,
                    color: emp.TOTAL_ALLOC_PERC === 100 ? 'var(--success)' : emp.TOTAL_ALLOC_PERC > 100 ? 'var(--danger)' : 'var(--warning)'
                  }}>
                    {emp.TOTAL_ALLOC_PERC}%
                  </span>
                </td>

                {/* Status */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span className={`card-badge ${isResigned ? 'badge-danger' : isBench ? 'badge-warning' : isBillable ? 'badge-success' : 'badge-info'}`}>
                    {isResigned ? 'Resigned' : isBench ? `Bench (${emp.BUSINESS_WAIT_AGE}d)` : emp.BILLABLITY_STATUS}
                  </span>
                </td>

                {/* Location */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div>{emp.CURRENT_LOCATION_CITY}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{emp.ONSHORE_OFFSHORE}</div>
                </td>

                {/* Skill */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: '#38bdf8'
                  }}>
                    {emp.TECH_SKILL_1}
                  </span>
                </td>

                {/* Action Drilldown */}
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                  <button
                    onClick={() => setSelectedEmployee(emp)}
                    style={{
                      padding: '0.3rem 0.6rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-muted)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.75rem'
                    }}
                    title="View Profile Details"
                  >
                    <Eye size={13} color="var(--primary)" /> View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {data.length > limit && (
        <div style={{ padding: '0.75rem 1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)' }}>
          Showing first {limit} records out of {data.length}. Use export or filters for complete slice.
        </div>
      )}
    </div>
  );
}
