import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaFilter } from 'react-icons/fa';
import JobBoardService from '../../services/integrations/JobBoardService';
import JobCard from './JobCard';
import FilterPanel from './FilterPanel';
import './JobSearch.css';

const JobSearch = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState({});
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    experience: '',
    salary: '',
    jobType: '',
    datePosted: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await JobBoardService.searchJobs(query, location, filters);
      setJobs(results);
    } catch (error) {
      console.error('Error searching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const getAllJobs = () => {
    const allJobs = [
      ...Object.values(jobs.linkedin || []),
      ...Object.values(jobs.indeed || []),
      ...Object.values(jobs.glassdoor || []),
    ];
    return allJobs;
  };

  return (
    <div className="job-search-container">
      <div className="search-header">
        <h1>Find Your Next Opportunity</h1>
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title, keywords, or company"
              className="search-input"
            />
          </div>
          <div className="search-input-group">
            <FaMapMarkerAlt className="search-icon" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, state, or zip code"
              className="search-input"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="filter-button"
          >
            <FaFilter /> Filters
          </button>
          <button type="submit" className="search-button">
            Search Jobs
          </button>
        </form>
      </div>

      <div className="search-content">
        {showFilters && (
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        )}

        <div className="jobs-list">
          {loading ? (
            <div className="loading">Loading jobs...</div>
          ) : (
            getAllJobs().map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
