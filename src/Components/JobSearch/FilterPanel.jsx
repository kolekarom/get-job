import React from 'react';
import { FaFilter } from 'react-icons/fa';
import './FilterPanel.css';

const FilterPanel = ({ filters, onFilterChange }) => {
  const handleChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <FaFilter />
        <h3>Filters</h3>
      </div>

      <div className="filter-section">
        <h4>Experience Level</h4>
        <select
          value={filters.experience}
          onChange={(e) => handleChange('experience', e.target.value)}
        >
          <option value="">All Levels</option>
          <option value="entry">Entry Level</option>
          <option value="mid">Mid Level</option>
          <option value="senior">Senior Level</option>
          <option value="executive">Executive</option>
        </select>
      </div>

      <div className="filter-section">
        <h4>Salary Range</h4>
        <select
          value={filters.salary}
          onChange={(e) => handleChange('salary', e.target.value)}
        >
          <option value="">Any Salary</option>
          <option value="0-50000">$0 - $50,000</option>
          <option value="50000-100000">$50,000 - $100,000</option>
          <option value="100000-150000">$100,000 - $150,000</option>
          <option value="150000+">$150,000+</option>
        </select>
      </div>

      <div className="filter-section">
        <h4>Job Type</h4>
        <select
          value={filters.jobType}
          onChange={(e) => handleChange('jobType', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      <div className="filter-section">
        <h4>Date Posted</h4>
        <select
          value={filters.datePosted}
          onChange={(e) => handleChange('datePosted', e.target.value)}
        >
          <option value="">Any Time</option>
          <option value="today">Today</option>
          <option value="3days">Last 3 Days</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
