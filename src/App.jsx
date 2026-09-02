import React from 'react';
import { useData } from './context/DataContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DrilldownModal from './components/layout/DrilldownModal';

// Pages
import ExecutiveSummary from './pages/ExecutiveSummary';
import ResourceAnalytics from './pages/ResourceAnalytics';
import SkillsDashboard from './pages/SkillsDashboard';
import ProjectDashboard from './pages/ProjectDashboard';
import AllocationDashboard from './pages/AllocationDashboard';
import BenchDashboard from './pages/BenchDashboard';
import GeographyDashboard from './pages/GeographyDashboard';
import ManagerAnalytics from './pages/ManagerAnalytics';
import ExperienceDashboard from './pages/ExperienceDashboard';
import AttritionDashboard from './pages/AttritionDashboard';
import PredictiveInsights from './pages/PredictiveInsights';
import DataManager from './pages/DataManager';

export default function App() {
  const { activeTab } = useData();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'executive':
        return <ExecutiveSummary />;
      case 'resources':
        return <ResourceAnalytics />;
      case 'skills':
        return <SkillsDashboard />;
      case 'projects':
        return <ProjectDashboard />;
      case 'allocation':
        return <AllocationDashboard />;
      case 'bench':
        return <BenchDashboard />;
      case 'geography':
        return <GeographyDashboard />;
      case 'manager':
        return <ManagerAnalytics />;
      case 'experience':
        return <ExperienceDashboard />;
      case 'attrition':
        return <AttritionDashboard />;
      case 'predictive':
        return <PredictiveInsights />;
      case 'datamanager':
        return <DataManager />;
      default:
        return <ExecutiveSummary />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main style={{ flex: 1 }}>
          {renderActivePage()}
        </main>
      </div>
      <DrilldownModal />
    </div>
  );
}
