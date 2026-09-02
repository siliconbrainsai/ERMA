# Enterprise Resource Management Analytics - Interview Questions & Answers

### 1. What was the core business motivation behind building ERMA?
**Answer:** Enterprise IT services and consulting organizations face critical margin leakage when resource utilization drops or bench ageing exceeds 30-45 days. ERMA unifies fragmented data across HR, delivery PMs, skills databases, and finance into a single pane of glass, enabling proactive decision-making on redeployment, upskilling, billing optimization, and attrition mitigation.

### 2. How are KPIs calculated dynamically in the React GUI?
**Answer:** In `dataProcessor.js` and `DataContext.jsx`, KPI calculations (such as Billability %, Attrition %, Monthly Gross Margin, and Bench Ageing Buckets) are executed in real time over the active filtered array using React `useMemo`. As any filter (IBU, Country, Band, Tech) is altered, all scorecards and charts update simultaneously without full page reloads.

### 3. How does the Phase 9 Predictive Analytics Engine work?
**Answer:** The predictive engine integrates multiple heuristic and statistical forecasting algorithms:
- **Utilization Confidence Cone:** Calculates projected 6-month utilization based on current baseline, roll-off trends, and seasonal hiring buffers.
- **ML Flight Risk Heuristic:** Evaluates multiple vulnerability vectors (over-allocation >110%, long bench stagnation >45 days, salary progression lag) to score and flag potential flight risks before resignations occur.
- **Skill Demand-Supply Gap Matrix:** Compares current workforce supply against future project pipeline requirements to flag skill deficits (e.g. GenAI, Snowflake, Kubernetes).
