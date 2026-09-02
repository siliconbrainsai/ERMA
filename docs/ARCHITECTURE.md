# ERMA System Architecture & Data Flow

```mermaid
flowchart TD
    subgraph Data Layer
        A[Excel / CSV File Ingest] --> B[Data Normalization & Cleaning]
        M[Mock Enterprise Dataset] --> B
        B --> C[Reactive In-Memory Data Context]
    end

    subgraph Analytics & KPI Engine
        C --> D[Multi-Dimensional Filter Engine]
        D --> E[KPI Computation Module]
        D --> F[Aggregation & GroupBy Pipeline]
        D --> G[Phase 9 AI Predictive Forecasting]
    end

    subgraph React UI Component Hierarchy
        E & F & G --> H[Global State Provider]
        H --> I[Executive Summary Dashboard]
        H --> J[Resource Analytics Dashboard]
        H --> K[Skills & Competency Suite]
        H --> L[Project Portfolio Dashboard]
        H --> N[Allocation & Heatmap]
        H --> O[Bench & BW Analytics]
        H --> P[Geography & Global Mobility]
        H --> Q[Manager Analytics]
        H --> R[Experience & Band Demographics]
        H --> S[Attrition & Retention]
        H --> T[Predictive Insights & AI Forecaster]
        H --> U[Data Hub & Ingest Center]
    end

    subgraph Export & Drilldown
        H --> V[Excel / CSV Exporter Engine]
        H --> W[Interactive Employee Drilldown Modal]
    end
```

## Technical Architecture Details
1. **State Management**: Built on React Context API with optimized useMemo selectors to maintain sub-millisecond filtering across 100+ multi-dimensional records.
2. **Component Architecture**: Modular page designs adhering to Single Responsibility Principle, with shared Layout (Sidebar, Header, FilterBar) and reusable DataTable and Card primitives.
3. **Data Security & Privacy**: Client-side in-memory analytics ensuring no corporate roster data leaves the user session.
