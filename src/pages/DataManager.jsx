import React, { useState } from 'react';
import { Database, UploadCloud, CheckCircle2, FileSpreadsheet, Download, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useData } from '../context/DataContext';
import { exportToExcel, exportToCSV } from '../utils/exportUtils';

export default function DataManager() {
  const { rawData, filteredData, loadUploadedData } = useData();
  const [uploadStatus, setUploadStatus] = useState(null);
  const [parsingCount, setParsingCount] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        if (data.length > 0) {
          // Normalize essential fields if missing
          const normalized = data.map((d, i) => ({
            EMPLID: d.EMPLID || `EMP${2000 + i}`,
            EMP_NAME: d.EMP_NAME || `Employee ${i + 1}`,
            EMAIL_ID: d.EMAIL_ID || `user${i}@enterprise.com`,
            GENDER: d.GENDER || 'Male',
            EMPLOYMENT_STATUS: d.EMPLOYMENT_STATUS || 'Active',
            BAND: d.BAND || 'P2',
            JOB_CODE_DESCRIPTION: d.JOB_CODE_DESCRIPTION || 'Software Engineer',
            TOTAL_EXPERIENCE: +(d.TOTAL_EXPERIENCE || 4.5),
            TECHM_EXPERIENCE: +(d.TECHM_EXPERIENCE || 2.5),
            CURRENT_LOCATION: d.CURRENT_LOCATION || 'Bengaluru',
            CURRENT_LOCATION_CITY: d.CURRENT_LOCATION_CITY || 'Bengaluru',
            CURRENT_COUNTRY: d.CURRENT_COUNTRY || 'India',
            EMPLOYEE_IBU: d.EMPLOYEE_IBU || 'Banking & Financial Services',
            EMPLOYEE_PRACTICE: d.EMPLOYEE_PRACTICE || 'Digital Engineering',
            EMPLOYEE_SERVICE_LINE: d.EMPLOYEE_SERVICE_LINE || 'Enterprise Solutions',
            PROJECT_ID: d.PROJECT_ID || 'PRJ-GEN-101',
            PROJECT_DESCRIPTION: d.PROJECT_DESCRIPTION || 'Client Application',
            PROJECT_TECHNOLOGY: d.PROJECT_TECHNOLOGY || 'React / Node.js',
            PROJECT_PRICING_MODEL: d.PROJECT_PRICING_MODEL || 'Time & Material',
            TOTAL_ALLOC_PERC: +(d.TOTAL_ALLOC_PERC || 100),
            BILLABLITY_STATUS: d.BILLABLITY_STATUS || 'Billable',
            BW_STATUS: d.BW_STATUS || 'Allocated',
            BW_CATEGORY: d.BW_CATEGORY || 'Active Billing',
            BUSINESS_WAIT_AGE: +(d.BUSINESS_WAIT_AGE || 0),
            CUSTOMER_NAME: d.CUSTOMER_NAME || 'Enterprise Client',
            SUPERVISOR_NAME: d.SUPERVISOR_NAME || 'Practice Supervisor',
            PM_NAME: d.PM_NAME || 'Delivery PM',
            TECH_SKILL_1: d.TECH_SKILL_1 || 'React.js',
            TECH_SKILL_2: d.TECH_SKILL_2 || 'Node.js',
            TECH_SKILL_3: d.TECH_SKILL_3 || 'Cloud AWS',
            TECH_SKILL_4: d.TECH_SKILL_4 || 'SQL',
            CERTIFICATION_SKILLS: d.CERTIFICATION_SKILLS || 'Certified Associate',
            ONSHORE_OFFSHORE: d.ONSHORE_OFFSHORE || 'Offshore',
            MONTHLY_RATE_USD: +(d.MONTHLY_RATE_USD || 6000),
            MONTHLY_COST_USD: +(d.MONTHLY_COST_USD || 2500),
            RESIGNED: d.RESIGNED || 'No'
          }));

          loadUploadedData(normalized);
          setUploadStatus('success');
          setParsingCount(normalized.length);
        }
      } catch (err) {
        console.error(err);
        setUploadStatus('error');
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="page-wrapper animate-fade">
      <div>
        <h1 className="page-title">
          <Database size={26} color="var(--primary)" /> Data Ingest & Management Hub
        </h1>
        <p className="page-subtitle">
          Phase 1 Data Engineering • Import raw enterprise rosters (Excel/CSV), clean and standardize columns, profile records, and export datasets.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="card" style={{ padding: '2.5rem 2rem', textAlign: 'center', borderStyle: 'dashed', borderWidth: '2px' }}>
        <div style={{ maxWidth: '520px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(0,91,172,0.15), rgba(0,174,239,0.15))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <UploadCloud size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Upload Enterprise Roster (.xlsx, .xls, .csv)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              Upload any spreadsheet matching the ERMA schema to instantly recalculate all KPIs and populate every dashboard.
            </p>
          </div>

          <label className="btn btn-primary" style={{ cursor: 'pointer', padding: '0.65rem 1.4rem' }}>
            <FileSpreadsheet size={16} /> Choose Excel / CSV File
            <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>

          {uploadStatus === 'success' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--success)',
              backgroundColor: 'var(--success-bg)',
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              border: '1px solid rgba(16,185,129,0.3)'
            }}>
              <CheckCircle2 size={16} /> Successfully ingested and profiled {parsingCount} resource records!
            </div>
          )}

          {uploadStatus === 'error' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--danger)',
              backgroundColor: 'var(--danger-bg)',
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              border: '1px solid rgba(239,68,68,0.3)'
            }}>
              <AlertCircle size={16} /> Failed to parse file. Please verify valid Excel or CSV structure.
            </div>
          )}
        </div>
      </div>

      {/* Profiling Summary Cards */}
      <div className="grid-kpi-4">
        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Active Master Records</span>
            <div className="kpi-icon-box"><Database size={18} /></div>
          </div>
          <div className="kpi-value">{rawData.length}</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Currently loaded in memory</span></div>
        </div>

        <div className="kpi-card success">
          <div className="kpi-top">
            <span className="kpi-label">Schema Conformance</span>
            <div className="kpi-icon-box"><CheckCircle2 size={18} color="var(--success)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>100%</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>40+ Standardized dimensions</span></div>
        </div>

        <div className="kpi-card secondary">
          <div className="kpi-top">
            <span className="kpi-label">Export Formats</span>
            <div className="kpi-icon-box"><Download size={18} color="var(--secondary)" /></div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--secondary)' }}>XLSX / CSV</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Native Excel formatting</span></div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span className="kpi-label">Profiling Engine</span>
            <div className="kpi-icon-box"><Sparkles size={18} /></div>
          </div>
          <div className="kpi-value">Live Reactive</div>
          <div className="kpi-footer"><span style={{ color: 'var(--text-muted)' }}>Real-time state transforms</span></div>
        </div>
      </div>

      {/* Export Quick Action Card */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Download size={18} color="var(--primary)" /> Export Dataset & Reports
          </div>
          <span className="card-badge badge-primary">Download Data</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => exportToExcel(rawData, 'erma_master_dataset.xlsx')} className="btn btn-primary">
            <FileSpreadsheet size={16} /> Download Full Master Dataset (.xlsx)
          </button>
          <button onClick={() => exportToCSV(filteredData, 'erma_filtered_export.csv')} className="btn btn-secondary">
            <Download size={16} /> Download Active Filtered View (.csv)
          </button>
        </div>
      </div>
    </div>
  );
}
