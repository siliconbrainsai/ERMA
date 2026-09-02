import React, { createContext, useContext, useState, useMemo } from 'react';
import { mockEmployees } from '../data/mockEnterpriseData';
import { filterDataset, computeExecutiveKPIs } from '../utils/dataProcessor';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [rawData, setRawData] = useState(mockEmployees);
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('executive');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Global filters
  const [filters, setFilters] = useState({
    search: '',
    country: 'All',
    location: 'All',
    ibu: 'All',
    billability: 'All',
    status: 'All',
    technology: 'All',
    customer: 'All',
    onshoreOffshore: 'All',
    band: 'All'
  });

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      country: 'All',
      location: 'All',
      ibu: 'All',
      billability: 'All',
      status: 'All',
      technology: 'All',
      customer: 'All',
      onshoreOffshore: 'All',
      band: 'All'
    });
  };

  // Filtered dataset
  const filteredData = useMemo(() => {
    return filterDataset(rawData, filters);
  }, [rawData, filters]);

  // Executive KPIs calculated dynamically on filtered dataset
  const kpis = useMemo(() => {
    return computeExecutiveKPIs(filteredData);
  }, [filteredData]);

  // Filter options for dropdowns
  const filterOptions = useMemo(() => {
    const countries = ['All', ...new Set(rawData.map(d => d.CURRENT_COUNTRY).filter(Boolean))];
    const locations = ['All', ...new Set(rawData.map(d => d.CURRENT_LOCATION).filter(Boolean))];
    const ibus = ['All', ...new Set(rawData.map(d => d.EMPLOYEE_IBU).filter(Boolean))];
    const customers = ['All', ...new Set(rawData.map(d => d.CUSTOMER_NAME).filter(c => c && c !== "Internal Bench Pool"))];
    const bands = ['All', 'U1', 'U2', 'P1', 'P2', 'P3', 'P4', 'M1', 'M2'];
    const technologies = ['All', 'React', 'Python', 'Java', 'Kubernetes', 'Databricks', 'AWS', 'CyberArk', 'Golang', '.NET'];

    return {
      countries,
      locations,
      ibus,
      customers,
      bands,
      technologies
    };
  }, [rawData]);

  const loadUploadedData = (newData) => {
    setRawData(newData);
    resetFilters();
  };

  const value = {
    rawData,
    filteredData,
    kpis,
    filters,
    updateFilter,
    resetFilters,
    filterOptions,
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    selectedEmployee,
    setSelectedEmployee,
    loadUploadedData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
