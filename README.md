# ERMA - Enterprise Resource Management Analytics Dashboard

Production-grade, full-stack Enterprise Resource Management & Roster Intelligence Suite built with **ReactJS**, **Vite**, **Recharts**, and modern corporate glassmorphism styling.

---

## 🌟 Key Features

1. **Executive Summary Dashboard**:
   - Comprehensive enterprise KPIs: Headcount, Active vs Resigned Attrition %, Billability %, Bench Ratio, Monthly Gross Margin, and Run-rate projections.
   - Monthly Financial Run-rate charts ($k USD revenue vs resource cost) and Sector IBU breakdowns.

2. **Resource Analytics Dashboard**:
   - Available vs Allocated headcount, Onsite vs Offshore global delivery mix, practice alignment, and workforce diversity metrics.

3. **Skills & Competency Analytics**:
   - Top primary & secondary technical skill competencies, certified professional tracking, interactive keyword talent finder and skill gap search.

4. **Project Portfolio Dashboard**:
   - Active client project directory, pricing models (Time & Material, Fixed Price, Milestone Based), customer industry vertical breakdowns, and pod staffing densities.

5. **Allocation & Heatmap Dashboard**:
   - Capacity planning: 100% Fully Allocated, Over-allocated (>100% burnout risks), Under-allocated (<100%), and average allocation % per IBU sector.

6. **Bench & Business Wait (BW) Analytics**:
   - Active bench exposure, monthly unrecovered salary cost drag ($k USD), bench ageing buckets (0-30d, 31-60d, 61-90d, 90+d critical), and category classification.

7. **Geography & Global Mobility Dashboard**:
   - Global delivery footprint across India, USA, UK, EU, UAE, Saudi Arabia, Australia, and Canada with active Visa/Work Permit tracking (H1-B, L1, Schengen, TSS 482).

8. **Manager & Leadership Analytics**:
   - PM / SPM span of control, delivery manager utilization rates, team bench counts, and monthly revenue portfolio managed.

9. **Experience & Band Demographics**:
   - Total experience tenure histogram, corporate band hierarchy distribution (U1-U4, P1-P4, M1-M3), and senior talent depth.

10. **Attrition & Retention Dashboard**:
    - Flight risk monitoring, notice period handover tracking, practice attrition hotspots, and retention health metrics.

11. **Phase 9: AI Predictive Insights & Forecasting**:
    - 6-Month Utilization Predictive Confidence Cone (ARIMA-style forecast), Bench Roll-off vs Incoming Demand projection, Enterprise Skill Demand-Supply Gap Matrix, and Machine Learning Flight Risk scoring.

12. **Data Hub & Ingest Center**:
    - Drag-and-drop Excel/CSV spreadsheet upload, live in-memory data normalization and profiling, and one-click full master Excel (.xlsx) and filtered CSV exports.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm**: v9.0 or higher

### Installation & Local Run
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 📁 Project Architecture

```
d:/ERMA/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css                     # Corporate theme & design system
│   ├── context/
│   │   └── DataContext.jsx           # Global state, filters, theme, and reactive dataset
│   ├── data/
│   │   └── mockEnterpriseData.js     # Enterprise mock roster data (100+ records)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx           # Nav menu with badge alerts
│   │   │   ├── Header.jsx            # Top bar with exports and theme switcher
│   │   │   ├── FilterBar.jsx         # Multi-select dynamic filter bar
│   │   │   └── DrilldownModal.jsx    # Interactive employee profile modal
│   │   └── common/
│   │       └── DataTable.jsx         # Status-badged data table with drilldown
│   ├── pages/
│   │   ├── ExecutiveSummary.jsx
│   │   ├── ResourceAnalytics.jsx
│   │   ├── SkillsDashboard.jsx
│   │   ├── ProjectDashboard.jsx
│   │   ├── AllocationDashboard.jsx
│   │   ├── BenchDashboard.jsx
│   │   ├── GeographyDashboard.jsx
│   │   ├── ManagerAnalytics.jsx
│   │   ├── ExperienceDashboard.jsx
│   │   ├── AttritionDashboard.jsx
│   │   ├── PredictiveInsights.jsx
│   │   └── DataManager.jsx
│   └── utils/
│       ├── dataProcessor.js          # KPI engine, aggregations, filtering
│       ├── exportUtils.js            # CSV & Excel (.xlsx) exporter
│       └── forecastingEngine.js      # Heuristics & predictive algorithms
└── docs/
    ├── ARCHITECTURE.md
    ├── TECHNICAL_DOCS.md
    ├── INTERVIEW_QUESTIONS.md
    └── RESUME_DESCRIPTION.md
```
