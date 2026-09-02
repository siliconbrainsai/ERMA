import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function FilterBar() {
  const { filters, updateFilter, filterOptions, filteredData, rawData } = useData();

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: '1rem 1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.85rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Search & Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 320px', minWidth: '260px' }}>
          <div style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px' }} />
            <input
              type="text"
              placeholder="Search by Employee Name, EMPLID, Project, Customer, Skill..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 1rem 0.55rem 2.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                fontSize: '0.825rem',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            {filters.search && (
              <button 
                onClick={() => updateFilter('search', '')}
                style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Counter Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <Filter size={14} color="var(--primary)" />
          <span>Showing <strong style={{ color: 'var(--text-main)' }}>{filteredData.length}</strong> of {rawData.length} resources</span>
        </div>
      </div>

      {/* Select Dropdown Filters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '0.75rem',
        paddingTop: '0.5rem',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        {/* IBU */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>IBU / Sector</label>
          <select
            value={filters.ibu}
            onChange={(e) => updateFilter('ibu', e.target.value)}
            style={selectStyle}
          >
            {filterOptions.ibus.map(ibu => (
              <option key={ibu} value={ibu}>{ibu}</option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Country</label>
          <select
            value={filters.country}
            onChange={(e) => updateFilter('country', e.target.value)}
            style={selectStyle}
          >
            {filterOptions.countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Location City */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Location City</label>
          <select
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            style={selectStyle}
          >
            {filterOptions.locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Billability */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Billability</label>
          <select
            value={filters.billability}
            onChange={(e) => updateFilter('billability', e.target.value)}
            style={selectStyle}
          >
            <option value="All">All Statuses</option>
            <option value="Billable">Billable</option>
            <option value="Non Billable">Non Billable / Bench</option>
          </select>
        </div>

        {/* Onsite / Offshore */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Deployment Model</label>
          <select
            value={filters.onshoreOffshore}
            onChange={(e) => updateFilter('onshoreOffshore', e.target.value)}
            style={selectStyle}
          >
            <option value="All">All Deployment</option>
            <option value="Offshore">Offshore</option>
            <option value="Onsite">Onsite</option>
          </select>
        </div>

        {/* Band */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Band Level</label>
          <select
            value={filters.band}
            onChange={(e) => updateFilter('band', e.target.value)}
            style={selectStyle}
          >
            {filterOptions.bands.map(b => (
              <option key={b} value={b}>{b === 'All' ? 'All Bands' : `Band ${b}`}</option>
            ))}
          </select>
        </div>

        {/* Technology */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Technology</label>
          <select
            value={filters.technology}
            onChange={(e) => updateFilter('technology', e.target.value)}
            style={selectStyle}
          >
            {filterOptions.technologies.map(t => (
              <option key={t} value={t}>{t === 'All' ? 'All Tech' : t}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

const selectStyle = {
  padding: '0.45rem 0.65rem',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--bg-input)',
  border: '1px solid var(--border-color)',
  color: 'var(--text-main)',
  fontSize: '0.8rem',
  outline: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit'
};
