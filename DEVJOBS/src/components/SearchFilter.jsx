import React, { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { useJobs } from '../context/JobContext'

const SearchFilter = () => {
  const { searchTerm, setSearchTerm, techFilter, setTechFilter, applyFilters } = useJobs()
  const [showFilters, setShowFilters] = useState(false)

  const techStacks = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'PHP', 
    'Ruby', 'Go', 'TypeScript', 'Vue.js', 'Angular', 'Django',
    'Laravel', 'Spring', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL'
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    applyFilters()
  }

  const handleTechToggle = (tech) => {
    const newTechFilter = techFilter.includes(tech)
      ? techFilter.filter(t => t !== tech)
      : [...techFilter, tech]
    setTechFilter(newTechFilter)
  }

  return (
    <div className="search-filter">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
        <button 
          type="button" 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} />
          Filters
        </button>
      </form>

      {showFilters && (
        <div className="filter-panel">
          <h3>Tech Stack</h3>
          <div className="tech-filters">
            {techStacks.map(tech => (
              <button
                key={tech}
                className={`tech-filter ${techFilter.includes(tech) ? 'active' : ''}`}
                onClick={() => handleTechToggle(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
          {techFilter.length > 0 && (
            <button 
              className="clear-filters"
              onClick={() => setTechFilter([])}
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchFilter

